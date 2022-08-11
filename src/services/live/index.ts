import Service from "../../base/service";
import { ServiceOptionsBase } from "../../base/types";
import { CasterPlayerAction } from "./const";

export class LiveCasterService extends Service {
  constructor(options?: ServiceOptionsBase) {
    super({
      host: "live.volcengineapi.com",
      serviceName: "live",
      defaultVersion: "2018-01-01",
      ...options,
    });
  }

  GetCasterPlayerUserToken = () => {
    const policy = {
      Statement: [
        {
          Effect: "Allow",
          Action: [...CasterPlayerAction],
          Resource: ["*"],
        },
      ],
    };
    const UserToken = this.signSts2(policy);
    return UserToken;
  };
}
