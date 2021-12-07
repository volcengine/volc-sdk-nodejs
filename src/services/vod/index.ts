import Service from "../../base/service";
import { ServiceOptions } from "../../base/types";
import { GetPlayInfoParams, GetPlayInfoResult } from "./types";
import { SecurityToken2 } from "../../base/types";

export class VodService extends Service {
  constructor(options?: ServiceOptions) {
    super({
      ...options,
      defaultVersion: "2018-01-01",
      serviceName: "vod",
    });
  }

  GetPlayInfo = this.createAPI<GetPlayInfoParams, GetPlayInfoResult>("GetPlayInfo", {
    method: "GET",
    contentType: "json",
    Version: "2020-08-01",
  });

  GetUploadToken = (expire?: number): SecurityToken2 => {
    const policy = {
      Statement: [
        {
          Effect: "Allow",
          Action: ["Vod:ApplyUploadInfo", "Vod:CommitUploadInfo"],
          Resource: [],
        },
      ],
    };
    return this.signSts2(policy, expire ?? 60 * 60 * 1000);
  };
}

export const defaultService = new VodService();
