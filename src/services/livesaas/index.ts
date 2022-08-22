import Service from "../../base/service";
import { ServiceOptionsBase } from "../../base/types";
import { LivesaasUploadAction } from "./const";

export class LivesaasService extends Service {
  constructor(options?: ServiceOptionsBase) {
    super({
      host: "livesaas.volcengineapi.com",
      serviceName: "livesaas",
      defaultVersion: "2018-01-01",
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
