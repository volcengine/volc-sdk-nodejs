import fs from "fs";
import axios, { AxiosRequestConfig } from "axios";
import { promisify } from "util";
import get from "lodash.get";
import dayjs from "dayjs";
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

const BizName = "ImageX";
const DateFormat = "YYYY-MM-DD HH:mm:ss.SSS";

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
  return `${BizName} API ${params.Action} error, reqId: ${params.RequestId}, CodeN: ${
    params.Error?.CodeN || "-"
  }, Code: ${params.Error?.Code || "-"}, ErrMessage: ${params.Error?.Message}`;
}

const formatUploadErrMsg = (res: UploadPutResult) => {
  return `uri ${res.uri} upload error, ${Object.entries(res.putErr || {})
    .map(([k, v]) => `${k}: ${v || "-"}`)
    .join(", ")}`;
};

const handleErrorResponse = (error, action) => {
  // 2xx but error
  if (error.message?.includes("ImageX API")) {
    throw new Error(error.message);
  }
  let errorMessage;
  if (error.response) {
    // not 2xx
    const isJsonType = typeof error.response.data === "object";
    const errStatus = get(error, "response.status", "-");
    const errStatusText = get(error, "response.statusText", "-");
    errorMessage = `${action} response error. errStatus: ${errStatus}, errMsg: ${errStatusText}, ${
      isJsonType ? JSON.stringify(error.response.data) : error.response.data
    }, reqId: ${get(error, "response.headers.x-tt-logid", "-")}`;
  } else if (error.request) {
    // request but no response
    errorMessage = `The ${action} request was made but no response was received. errCode: ${error.code}, errMsg:  ${error.message}`;
  } else {
    errorMessage = `Error happened in setting up the ${action} request. errCode: ${error.code}, errMsg: ${error.message}`;
  }
  throw new Error(errorMessage);
};

class Logger {
  public name: string;
  public startTime: number;
  constructor(config) {
    this.name = config.name;
    this.startTime = dayjs().valueOf(); // ms
  }
  print = (params: { identifier: string; endTime?: number; extra?: string }) => {
    const { identifier, endTime, extra } = params || {};
    const msgList: Array<string | number> = [
      `[${BizName}:${this.name}] unique_id:${identifier} ${endTime ? "end" : "start"}`,
      dayjs(endTime ?? this.startTime).format(DateFormat),
    ];
    if (endTime) {
      msgList.push(`duration: ${endTime - this.startTime}ms`);
    }
    if (extra) {
      msgList.push(extra);
    }

    console.log(msgList.join(", ")); // eslint-disable-line
  };
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
      ApplyParams: ApplyImageUploadQuery & { requestOptions?: AxiosRequestConfig };
      CommitParams?: CommitImageUploadQuery &
        CommitImageUploadBody & { requestOptions?: AxiosRequestConfig };
      SkipCommit?: boolean;
      ShowDuration?: boolean;
      ContentTypes?: string[];
    },
    files: string[] | NodeJS.ReadableStream[] | ArrayBuffer[] | ArrayBufferView[]
  ): Promise<OpenApiResponse<CommitImageUploadRes["Result"]>> => {
    // 1. apply
    if (!files.length || files.length > 10) {
      throw Error(`files num ${files.length} is invalid, the range is [1, 10]`);
    }
    if ((params.ContentTypes?.length || 0) > files.length) {
      throw Error(
        `ContentTypes num ${
          params.ContentTypes?.length || 0
        } is invalid and cannot be greater than files num`
      );
    }

    const applyFinalParams = {
      ...params.ApplyParams,
      UploadNum: files.length,
    };
    delete applyFinalParams.requestOptions;
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

    let logIdentifier = "";
    if (params.ShowDuration) {
      logIdentifier = `${
        originalApplyStoreKeys?.length
          ? originalApplyStoreKeys?.join(", ")
          : Math.floor(Math.random() * 1000000)
      }`;
    }

    let applyLogger: Logger | undefined;
    if (params.ShowDuration) {
      applyLogger = new Logger({ name: "ApplyImageUpload" });
      applyLogger.print({ identifier: logIdentifier });
    }

    let applyRes;
    try {
      applyRes = await this.ApplyImageUpload(applyFinalParams, {
        Action: "ApplyImageUpload",
        ...(params.ApplyParams?.requestOptions || {}),
      });
      if (applyRes.ResponseMetadata?.Error) {
        throw new Error(formatApiErrMsg(applyRes.ResponseMetadata));
      }
    } catch (error) {
      handleErrorResponse(error, "ApplyImageUpload");
    } finally {
      if (params.ShowDuration && applyLogger) {
        applyLogger.print({ endTime: dayjs().valueOf(), identifier: logIdentifier });
      }
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
    let putLogger: Logger | undefined;
    if (params.ShowDuration) {
      putLogger = new Logger({ name: "DoUpload" });
      putLogger.print({ identifier: logIdentifier });
    }
    // 2. upload
    // 记录上传任务的执行结果
    const uploadTaskResults = await this.DoUpload(
      files,
      uploadHosts[0],
      newStoreInfos.length ? newStoreInfos : storeInfos,
      params.ContentTypes
    );
    if (params.ShowDuration && putLogger) {
      putLogger.print({ endTime: dayjs().valueOf(), identifier: logIdentifier });
    }
    // 没有一个文件上传成功 则抛错
    if (!uploadTaskResults.filter((item) => item.success).length) {
      throw Error(
        `All files have failed to upload.\n${uploadTaskResults.map(formatUploadErrMsg).join("\n")}`
      );
    }

    // 跳过 commmit 阶段, uploadTaskResults 包含成功和失败两种结果
    // 此时模拟CommitImageUpload接口的返回
    if (params.SkipCommit) {
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

    let commitLogger: Logger | undefined;
    if (params.ShowDuration) {
      commitLogger = new Logger({ name: "CommitImageUpload" });
      commitLogger.print({ identifier: logIdentifier });
    }
    // 3. commit
    const commitParams = {
      ServiceId: params.ApplyParams.ServiceId,
      SessionKey: uploadAddr.SessionKey,
      SuccessOids: uploadTaskResults.filter((item) => item.success).map((item) => item.uri),
      ...params.CommitParams,
    };
    delete commitParams.requestOptions;

    let commitRes;
    try {
      commitRes = await this.CommitImageUpload(commitParams, {
        Action: "CommitImageUpload",
        ...(params.CommitParams?.requestOptions || {}),
      });
      if (commitRes.ResponseMetadata?.Error) {
        throw new Error(formatApiErrMsg(commitRes.ResponseMetadata));
      }
    } catch (error) {
      handleErrorResponse(error, "CommitImageUpload");
    } finally {
      if (params.ShowDuration && commitLogger) {
        commitLogger.print({ endTime: dayjs().valueOf(), identifier: logIdentifier });
      }
    }
    // 补充上传失败文件的失败原因
    commitRes.Result?.Results?.forEach((commitItem) => {
      if (commitItem.UriStatus === 2001) {
        const uploadErr = uploadTaskResults.find((item) => item.uri === commitItem.Uri);
        (commitItem as any).PutError = uploadErr?.putErr;
      }
    });
    return commitRes;
  };

  DoUpload = async (
    files: string[] | NodeJS.ReadableStream[] | ArrayBuffer[] | ArrayBufferView[],
    uploadHost: string,
    storeInfos: ApplyImageUploadRes["Result"]["UploadAddress"]["StoreInfos"],
    fileContentTypes?: string[]
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
          contentType: fileContentTypes?.[i],
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
    contentType?: string;
  }): Promise<UploadPutResult> => {
    const { uploadHost, oid, auth, file, contentType } = params;
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
    const headers = {
      "Content-CRC32": "Ignore",
      Authorization: auth,
    };
    if (contentType) {
      headers["Specified-Content-Type"] = contentType;
    }
    try {
      await axios(`http://${uploadHost}/${getEncodedUri(oid)}`, {
        method: "post",
        headers,
        data: fileCopy,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });
      return { uri: oid, success: true };
    } catch (error) {
      const errorItem: UploadPutResult = {
        uri: oid,
        success: false,
      };
      if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        // 服务器响应分为网关和具体服务
        const isJsonType = typeof get(error, "response.data") === "object";
        errorItem.putErr = {
          errStatus: isJsonType
            ? get(error, "response.data.error.code", "-")
            : get(error, "response.status", "-"),
          errCodeN: get(error, "response.data.error.error_code", "-"),
          errMsg: isJsonType
            ? get(error, "response.data.error.message", "-")
            : get(error, "response.statusText", "-"),
          errCode: get(error, "response.data.error.error", "-"),
          reqId: get(error, "response.headers.x-tt-logid", "-"),
        };
      } else if (error.request) {
        // console.log(error.request);
        errorItem.putErr = {
          errMsg: `The put request was made but no response was received: ${error.message}`,
          errCode: error.code,
        };
      } else {
        // console.log("Error", error.message);
        errorItem.putErr = {
          errMsg: `Error happened in setting up the put request: ${error.message}`,
          errCode: error.code,
        };
      }
      return errorItem;
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
