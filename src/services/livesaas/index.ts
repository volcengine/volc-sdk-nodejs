import Service from "../../base/service";
import { ServiceOptionsBase } from "../../base/types";
import { LivesaasUploadAction, Domain } from "./const";

export class LivesaasService extends Service {
  constructor(options?: ServiceOptionsBase) {
    super({
      host: Domain[options?.region || "ap-singapore-1"],
      serviceName: "livesaas",
      defaultVersion: "2019-10-10",
      ...options,
    });
  }

  GetLivesaasUploadUserToken = () => {
    const policy = {
      Statement: [
        {
          Effect: "Allow",
          Action: [...LivesaasUploadAction],
          Resource: ["*"],
        },
      ],
    };
    const UserToken = this.signSts2(policy);
    return UserToken;
  };
}
