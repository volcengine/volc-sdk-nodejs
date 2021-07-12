import Service from "../../base/service";
import { ServiceOptions, OpenApiResponse, FetchParams } from "../../base/types";
import fs from "fs";
import axios, { ResponseType, AxiosPromise } from "axios";
import {
  ApplyImageUploadParams,
  ApplyImageUploadResult,
  CommitImageUploadParams,
  CommitImageUploadResult,
  UpdateImageUploadFilesParams,
  UpdateImageUploadFilesResult,
  PreviewImageUploadFileParams,
  PreviewImageUploadFileResult,
  DeleteImageUploadFilesParams,
  DeleteImageUploadFilesResult,
  UploadImagesOption,
  GetUploadAuthParams,
  GetUploadAuthTokenParams,
} from "./types";
import { SecurityToken2 } from "../../base/types";
import Signer, { queryParamsToString } from "../../base/sign";
import { getDefaultOption } from "../../base/utils";

const defaultUploadAuthParams: GetUploadAuthParams = {
  serviceIds: [],
  storeKeys: [],
  expire: 60 * 60 * 1000,
};

export class ImagexService extends Service {
  constructor(options?: ServiceOptions) {
    super({
      ...options,
      defaultVersion: "2018-08-01",
      serviceName: "imagex",
    });
  }

  ApplyImageUpload = this.createAPI<ApplyImageUploadParams, ApplyImageUploadResult>(
    "ApplyImageUpload"
  );
  CommitImageUpload = this.createAPI<CommitImageUploadParams, CommitImageUploadResult>(
    "CommitImageUpload",
    {
      method: "POST",
      contentType: "json",
      queryKeys: ["ServiceId"],
    }
  );
  UpdateImageUploadFiles = this.createAPI<
    UpdateImageUploadFilesParams,
    UpdateImageUploadFilesResult
  >("UpdateImageUploadFiles", {
    method: "POST",
    contentType: "json",
    queryKeys: ["ServiceId"],
  });
  PreviewImageUploadFile = this.createAPI<
    PreviewImageUploadFileParams,
    PreviewImageUploadFileResult
  >("PreviewImageUploadFile");
  DeleteImageUploadFiles = this.createAPI<
    DeleteImageUploadFilesParams,
    DeleteImageUploadFilesResult
  >("DeleteImageUploadFiles", {
    method: "POST",
    contentType: "json",
    queryKeys: ["ServiceId"],
  });

  UploadImages = async (
    option: UploadImagesOption
  ): Promise<OpenApiResponse<CommitImageUploadResult>> => {
    const query = {
      ServiceId: option.serviceId,
      UploadNum: option.files.length,
    };
    if (option.fileKeys && option.fileKeys.length > 0) {
      query["StoreKeys"] = option.fileKeys;
    }

    const applyRes = await this.ApplyImageUpload(query);
    const reqId = applyRes.Result?.RequestId;
    const address = applyRes.Result?.UploadAddress;
    const uploadHosts = address?.UploadHosts ?? [];
    const storeInfos = address?.StoreInfos ?? [];
    if (uploadHosts.length === 0) {
      throw Error(`no upload host found, reqId: ${reqId}`);
    }
    if (address?.StoreInfos.length !== option.files.length) {
      throw Error(
        `store info len ${address?.StoreInfos.length} != upload num ${option.files.length}, reqId: ${reqId}`
      );
    }

    const sessionKey = address["SessionKey"];
    const host = uploadHosts[0];
    await this.DoUpload(option.files, host, storeInfos);

    const commitQuery = {
      ServiceId: option.serviceId,
      SessionKey: sessionKey,
    };
    const commitRes = await this.CommitImageUpload(commitQuery);
    return commitRes;
  };

  DoUpload = async (
    files: string[] | NodeJS.ReadableStream[] | ArrayBuffer[] | ArrayBufferView[],
    uploadHost: string,
    storeInfos: any[]
  ) => {
    const promiseArray: AxiosPromise<ResponseType>[] = [];
    for (let i = 0; i < files.length; i++) {
      const oid = storeInfos[i]["StoreUri"];
      const auth = storeInfos[i]["Auth"];
      let file = files[i];
      if (Object.prototype.toString.call(file) === "[object String]") {
        file = fs.createReadStream(file as string);
      }
      promiseArray.push(
        axios(`http://${uploadHost}/${oid}`, {
          method: "post",
          headers: {
            "Content-CRC32": "Ignore",
            Authorization: auth,
          },
          data: file,
        })
      );
    }
    await Promise.all(promiseArray);
  };

  GetUploadAuth = (options?: GetUploadAuthParams): SecurityToken2 => {
    const { serviceIds, storeKeys, expire } = options ?? defaultUploadAuthParams;
    const serviceIdPolicy = serviceIds?.length
      ? serviceIds.map((serviceId) => `trn:ImageX:*:*:ServiceId/${serviceId}`)
      : ["trn:ImageX:*:*:ServiceId/*"];
    const storeKeysPolicy = storeKeys?.length
      ? storeKeys.map((storeKey) => `trn:ImageX:*:*:StoreKeys/${storeKey}`)
      : ["trn:ImageX:*:*:StoreKeys/*"];
    const policy = {
      Statement: [
        {
          Effect: "Allow",
          Action: ["ImageX:ApplyImageUpload", "ImageX:CommitImageUpload"],
          Resource: [...serviceIdPolicy, ...storeKeysPolicy],
        },
      ],
    };
    return this.signSts2(policy, expire ?? 60 * 60 * 1000);
  };

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
