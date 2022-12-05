import Service from "../../base/service";
import { ServiceOptions } from "../../base/types";

interface AssumeRoleParams {
  RoleTrn: string;
  RoleSessionName: string;
  DurationSeconds?: number;
  Policy?: string;
}

interface AssumeRoleResult {
  Credentials: {
    CurrentTime: string;
    ExpiredTime: string;
    AccessKeyId: string;
    SecretAccessKey: string;
    SessionToken: string;
  };
  AssumedRoleUser: {
    Trn: string;
    AssumedRoleId: string;
  };
}

export class StsService extends Service {
  constructor(options?: ServiceOptions) {
    super({
      ...options,
      defaultVersion: "2018-01-01",
      serviceName: "sts",
    });
  }

  AssumeRole = this.createAPI<AssumeRoleParams, AssumeRoleResult>("AssumeRole");
}

export const defaultService = new StsService();
