import Service from "../../base/service";
import { ServiceOptions, OpenApiResponse } from "../../base/types";
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
} from "./types";
import { SecurityToken2 } from "../../base/types";

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
    { method: "POST", contentType: "json", queryKeys: ["ServiceId"] }
  );
  UpdateImageUploadFiles = this.createAPI<
    UpdateImageUploadFilesParams,
    UpdateImageUploadFilesResult
  >("UpdateImageUploadFiles", { method: "POST", contentType: "json", queryKeys: ["ServiceId"] });
  PreviewImageUploadFile = this.createAPI<
    PreviewImageUploadFileParams,
    PreviewImageUploadFileResult
  >("PreviewImageUploadFile");
  DeleteImageUploadFiles = this.createAPI<
    DeleteImageUploadFilesParams,
    DeleteImageUploadFilesResult
  >("DeleteImageUploadFiles", { method: "POST", contentType: "json", queryKeys: ["ServiceId"] });

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
}

export const defaultService = new ImagexService();
