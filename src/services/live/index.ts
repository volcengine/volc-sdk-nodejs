import Service from "../../base/service";
import { ServiceOptionsBase } from "../../base/types";
import { CasterAction } from "./const";

export class LiveCasterService extends Service {
  constructor(options?: ServiceOptionsBase) {
    super({
      host: "live.volcengineapi.com",
      serviceName: "live",
      defaultVersion: "2018-01-01",
      ...options,
    });
  }

  GetCasterUserToken = () => {
    const policy = {
      Statement: [
        {
          Effect: "Allow",
          Action: [...CasterAction],
          Resource: ["*"],
        },
      ],
    };
    const UserToken = this.signSts2(policy);
    return UserToken;
  };
}
