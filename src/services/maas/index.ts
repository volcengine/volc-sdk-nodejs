import Service from "../../base/service";
import { ServiceOptions } from "../../base/types";
import { ChatReqParams, ChatResult } from "./types";

export class MaasService extends Service {
  constructor(options?: ServiceOptions) {
    super({
      ...options,
      serviceName: "ml_maas",
    });
  }

  Chat = async (requestData, params, options) => {
    const APIChat = this.createAPI<ChatReqParams, ChatResult>("Chat", {
      method: "POST",
      contentType: "json",
    });
    return await APIChat(
      { ...requestData, stream: false },
      { ...params, pathname: "/api/v1/chat" },
      options
    );
  };

  StreamChat = async (requestData, params, options) => {
    const APIChat = this.createAPI<ChatReqParams, ChatResult>("Chat", {
      method: "POST",
      contentType: "json",
    });
    return await APIChat(
      { ...requestData, stream: true },
      { ...params, pathname: "/api/v1/chat", responseType: "stream" },
      options
    );
  };
}

export const defaultService = new MaasService({
  host: "maas-api.ml-platform-cn-beijing.volces.com",
  region: "cn-beijing",
  serviceName: "ml_maas",
});
