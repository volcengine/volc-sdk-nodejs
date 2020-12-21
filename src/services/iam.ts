import Service from "../base/service";
interface ListPrams {
  Limit?: number;
  Offset?: number;
  Query?: string;
}
interface User {
  CreateDate: string;
  UpdateDate: string;
  Status: string;
  AccountId: number;
  UserName: string;
  Description: string;
  DisplayName: string;
  Email: string;
  MobilePhone: string;
  Trn: string;
  Source: string;
}
interface ListUserResult {
  UserMetadata: User[];
}
export class IamService extends Service {
  constructor(options?: ServiceType.Options) {
    super({
      ...options,
      defaultVersion: "2018-01-01",
      serviceName: "iam",
    });
  }
  ListUsers = this.createAPI<ListPrams, ListUserResult>("ListUsers");
  UpdateUser = this.createAPI<ListPrams, ListUserResult>("UpdateUser", {
    method: "POST",
    contentType: "urlencode",
  });
}

export const defaultService = new IamService();
