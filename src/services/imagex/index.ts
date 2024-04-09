import fs from "fs";
import axios from "axios";
import { promisify } from "util";
import get from "lodash.get";
import { getDefaultOption } from "../../base/utils";
import Signer, { queryParamsToString } from "../../base/sign";
import {
  ServiceOptions,
  OpenApiResponse,
  FetchParams,
  Statement,
  Policy,
  SecurityToken2,
  OpenApiResponseMetadataParams,
} from "../../base/types";
import { GetUploadAuthParams, GetUploadAuthTokenParams, UploadPutResult } from "./types";
import {
  ApplyImageUploadQuery,
  ApplyImageUploadRes,
  CommitImageUploadBody,
  CommitImageUploadQuery,
  CommitImageUploadRes,
} from "./type";
import ImagexAutoService from "./client";

const fsAccess = promisify(fs.access);

const defaultUploadAuthParams: GetUploadAuthParams = {
  serviceIds: [],
  storeKeys: [],
  expire: 60 * 60 * 1000,
};

const newAllowStatement = (actions: string[], resources: string[]): Statement => {
  return {
    Effect: "Allow",
    Action: actions,
    Resource: resources,
  };
};

// 考虑到filename可能包含中文 因此url encode下 否则分片上传会失败
function getEncodedUri(originUri: string): string {
  if (!originUri) return "";
  const arr = originUri.split("/");
  return arr.map((v) => encodeURIComponent(v)).join("/");
}

function formatApiErrMsg(params: OpenApiResponseMetadataParams) {
  return `API ${params.Action} error, reqId: ${params.RequestId}, CodeN: ${
    params.Error?.CodeN || "-"
  }, Code: ${params.Error?.Code || "-"}, ErrMessage: ${params.Error?.Message}`;
}

export class ImagexService extends ImagexAutoService {
  constructor(options?: ServiceOptions) {
    super({
      ...options,
      defaultVersion: "2018-08-01",
      serviceName: "imagex",
    });
  }

  UploadImages = async (
    params: {
      ApplyParams: ApplyImageUploadQuery;
      CommitParams?: CommitImageUploadQuery & CommitImageUploadBody;
      SkipCommit?: boolean;
    },
    files: string[] | NodeJS.ReadableStream[] | ArrayBuffer[] | ArrayBufferView[]
  ): Promise<OpenApiResponse<CommitImageUploadRes["Result"]>> => {
    // 1. apply
    if (!files.length || files.length > 10) {
      throw Error(`files num ${files.length} is invalid, the range is [1, 10]`);
    }

    const applyFinalParams = {
      ...params.ApplyParams,
      UploadNum: files.length,
    };
    let originalApplyStoreKeys: string[] = [];
    const applyStoreKeys = params.ApplyParams.StoreKeys;
    if (Array.isArray(applyStoreKeys)) {
      if (applyStoreKeys.length !== files.length) {
        throw Error(`StoreKeys len ${applyStoreKeys.length} != files num ${files.length}`);
      }
      // applyStoreKeys.length > 0
      originalApplyStoreKeys = applyStoreKeys?.slice(0);
      applyFinalParams.StoreKeys = applyStoreKeys.slice(0).sort(); // top 参数鉴权需要将数组按字母序排列
    }

    const applyRes = await this.ApplyImageUpload(applyFinalParams);
    if (applyRes.ResponseMetadata?.Error) {
      throw new Error(formatApiErrMsg(applyRes.ResponseMetadata));
    }
    const reqId = applyRes.Result?.RequestId;
    const uploadAddr = applyRes.Result?.UploadAddress;
    const uploadHosts = uploadAddr?.UploadHosts ?? [];
    const storeInfos = uploadAddr?.StoreInfos ?? [];

    if (!uploadAddr) {
      throw Error(`no upload address found, reqId: ${reqId}`);
    }
    if (!uploadHosts.length) {
      throw Error(`no upload host found, reqId: ${reqId}`);
    }
    if (storeInfos.length !== files.length) {
      throw Error(
        `store info len ${storeInfos.length} != upload num ${files.length}, reqId: ${reqId}`
      );
    }

    // 用户自定义了存储 key
    // Prefix 与 FileExtension 仅当未指定StoreKeys时生效, 因此无需考虑这两个参数
    const newStoreInfos: ApplyImageUploadRes["Result"]["UploadAddress"]["StoreInfos"] = [];
    if (originalApplyStoreKeys.length) {
      for (const originalStoreKey of originalApplyStoreKeys) {
        // StoreUri 形如 {bucketid}/xxxx/yyy/zzz 其中 xxxx/yyy/zzz === 用户指定的 StoreKey
        // 指定StoreKeys时 Prefix 与 FileExtension无影响 无需考虑 此时用户指定的路径即是服务下发的路径
        const targetStoreInfo = storeInfos.find(
          ({ StoreUri }) => StoreUri.slice(StoreUri.split("/")[0].length + 1) === originalStoreKey
        );
        targetStoreInfo && newStoreInfos.push(targetStoreInfo);
      }
    }
    // 2. upload
    // 记录上传任务的执行结果
    const uploadTaskResults = await this.DoUpload(
      files,
      uploadHosts[0],
      newStoreInfos.length ? newStoreInfos : storeInfos
    );
    // 存在失败文件 则 error 提示,但是不阻塞流程
    for (const res of uploadTaskResults) {
      if (!res.success) {
        console.error(
          `uri ${res.uri} upload error, ${
            !res.putErr
              ? ""
              : Object.entries(res.putErr)
                  .map(([k, v]) => `${k}: ${v || "-"}`)
                  .join(", ")
          }`
        );
      }
    }
    // 跳过 commmit 阶段或者没有一个文件上传成功
    if (params.SkipCommit || !uploadTaskResults.filter((item) => item.success).length) {
      return {
        Results: uploadTaskResults.map((item) => {
          if (item.success) {
            return {
              Uri: item.uri,
              UriStatus: 2000, //上传成功
            };
          }
          return {
            Uri: item.uri,
            UriStatus: 2001, // 上传失败
            PutError: item.putErr,
          };
        }),
      } as any;
    }

    // 3. commit
    const commitParams = {
      ServiceId: params.ApplyParams.ServiceId,
      SessionKey: uploadAddr.SessionKey,
      SuccessOids: uploadTaskResults.filter((item) => item.success).map((item) => item.uri),
      ...params.CommitParams,
    };
    const commitRes = await this.CommitImageUpload(commitParams);
    if (commitRes.ResponseMetadata?.Error) {
      throw new Error(formatApiErrMsg(commitRes.ResponseMetadata));
    }
    return commitRes;
  };

  DoUpload = async (
    files: string[] | NodeJS.ReadableStream[] | ArrayBuffer[] | ArrayBufferView[],
    uploadHost: string,
    storeInfos: ApplyImageUploadRes["Result"]["UploadAddress"]["StoreInfos"]
  ) => {
    const promiseArray: Promise<UploadPutResult>[] = [];
    for (let i = 0; i < files.length; i++) {
      const { StoreUri: oid, Auth: auth } = storeInfos[i];
      promiseArray.push(
        this.directUpload({
          uploadHost,
          oid,
          auth,
          file: files[i],
        })
      );
    }
    return await Promise.all(promiseArray);
  };

  private directUpload = async (params: {
    uploadHost: string;
    oid: string;
    auth: string;
    file: string | NodeJS.ReadableStream | ArrayBuffer | ArrayBufferView;
  }): Promise<UploadPutResult> => {
    const { uploadHost, oid, auth, file } = params;
    let fileCopy = file;
    if (Object.prototype.toString.call(fileCopy) === "[object String]") {
      try {
        await fsAccess(fileCopy as string);
        fileCopy = fs.createReadStream(fileCopy as string);
      } catch (err) {
        return {
          uri: oid,
          success: false,
          putErr: {
            errMsg: err.message,
          },
        };
      }
    }
    try {
      await axios(`http://${uploadHost}/${getEncodedUri(oid)}`, {
        method: "post",
        headers: {
          "Content-CRC32": "Ignore",
          Authorization: auth,
        },
        data: fileCopy,
      });
      return { uri: oid, success: true };
    } catch (error) {
      return {
        uri: oid,
        success: false,
        putErr: {
          errStatus: get(error, "response.data.error.code"),
          errCodeN: get(error, "response.data.error.error_code"),
          errMsg: get(error, "response.data.error.message"),
          errCode: get(error, "response.data.error.error"),
        },
      };
    }
  };

  /**
   * 获取上传临时密钥, 默认超时时间为 1h
   */
  GetUploadAuth = (options?: GetUploadAuthParams): SecurityToken2 => {
    const { serviceIds, storeKeys, uploadOverwrite, uploadPolicy, expire } =
      options ?? defaultUploadAuthParams;
    const serviceIdPolicy = serviceIds?.length
      ? serviceIds.map((serviceId) => `trn:ImageX:*:*:ServiceId/${serviceId}`)
      : ["trn:ImageX:*:*:ServiceId/*"];
    const storeKeysPolicy = storeKeys?.length
      ? storeKeys.map((storeKey) => `trn:ImageX:*:*:StoreKeys/${storeKey}`)
      : ["trn:ImageX:*:*:StoreKeys/*"];

    const policy: Policy = {
      Statement: [
        newAllowStatement(
          ["ImageX:ApplyImageUpload", "ImageX:CommitImageUpload"],
          [...serviceIdPolicy, ...storeKeysPolicy]
        ),
      ],
    };
    // 配置重名覆盖上传
    if (typeof uploadOverwrite === "boolean") {
      policy.Statement.push(newAllowStatement(["UploadOverwrite"], [`${uploadOverwrite}`]));
    }
    // 配置上传策略
    if (uploadPolicy && typeof uploadPolicy === "object" && Object.keys(uploadPolicy).length) {
      policy.Statement.push(newAllowStatement(["UploadPolicy"], [JSON.stringify(uploadPolicy)]));
    }

    return this.signSts2(policy, expire ?? 60 * 60 * 1000);
  };

  /**
   * 获取临时上传凭证
   */
  GetUploadAuthToken = (query: GetUploadAuthTokenParams): string => {
    const applyUploadToken = this._signUrl({
      method: "GET",
      params: { Action: "ApplyImageUpload", Version: "2018-08-01", ...query },
    });

    const commitUploadToken = this._signUrl({
      method: "POST",
      params: { Action: "CommitImageUpload", Version: "2018-08-01", ...query },
    });

    const tokens = {
      Version: "v1",
      ApplyUploadToken: applyUploadToken,
      CommitUploadToken: commitUploadToken,
    };

    const tokensJson = JSON.stringify(tokens).replace("\\u0026", "&");

    return Buffer.from(tokensJson).toString("base64");
  };

  private _signUrl = (options: {
    method: string;
    params: FetchParams & GetUploadAuthTokenParams;
    serviceName?: string;
  }) => {
    const { region } = getDefaultOption();
    const sessionToken = this.getSessionToken();
    const accessKeyId = this.getAccessKeyId();
    const secretKey = this.getSecretKey();

    if (!accessKeyId || !secretKey) {
      throw new Error("accessKeyId or secretKey is invalid");
    }

    const { params, method = "GET", serviceName = "ImageX" } = options;

    // 使用临时的一个signer来转换utc时间，因为实际上使用signer需要传入params字段
    const date = new Signer({ method: "", region: "" }, "ImageX")
      .iso8601(new Date())
      .replace(/[:\-]|\.\d{3}/g, "");

    const credentialScope = [date.substr(0, 8), region, serviceName, "request"].join("/");
    const signedHeaders = "";

    const paramsMap: any = {
      "X-Date": date,
      "X-NotSignBody": "",
      "X-Credential": accessKeyId + "/" + credentialScope,
      "X-Algorithm": "HMAC-SHA256",
      "X-SignedHeaders": signedHeaders,
      "X-SignedQueries": "",
      ...params,
    };

    const sortedQueryMap = Object.keys(paramsMap)
      .sort()
      .reduce((map, curKey) => {
        map[curKey] = paramsMap[curKey];
        return map;
      }, {});

    if (sessionToken) {
      paramsMap["X-Security-Token"] = sessionToken;
    }

    paramsMap["X-SignedQueries"] = Object.keys(sortedQueryMap).join(";");

    const signer = new Signer(
      {
        region,
        method,
        pathname: "/",
        params: paramsMap,
      },
      "ImageX"
    );

    const signature = signer.signature({ accessKeyId, secretKey }, date);

    paramsMap["X-Signature"] = signature.toString();

    return queryParamsToString(paramsMap);
  };
}

export const defaultService = new ImagexService();
