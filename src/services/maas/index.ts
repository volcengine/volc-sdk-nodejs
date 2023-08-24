import Service from "../../base/service";
import { MaasError, new_client_sdk_error } from "./error";
import { ChatReqParams, ChatResult, ServiceOptions, ChatRole, ChatParameters } from "./types";

export class MaasService extends Service {
  chat = this.createAPI<ChatReqParams, ChatResult>("chat", {
    method: "POST",
    contentType: "json",
  });
  timeout: number;

  constructor(options?: ServiceOptions) {
    super({
      ...options,
      serviceName: "ml_maas",
    });

    this.timeout = options?.timeout || 60_000; // default timeout is 60s
  }

  Chat(requestData: ChatReqParams): Promise<ChatResult> {
    return this.chat(
      { ...requestData, stream: false },
      {
        Action: "chat",
        pathname: "/api/v1/chat",
        timeout: this.timeout,
      }
    )
      .then((done) => {
        // 200 status code
        return done as unknown as ChatResult;
      })
      .then((result) => {
        if (result.error != null && result.error != undefined) {
          const err = result.error;
          throw new MaasError(err.code, err.message, err.code_n);
        }
        return result;
      })
      .catch((error) => {
        if (error instanceof MaasError) {
          throw error;
        }

        const err = (error.response.data as ChatResult)?.error;
        if (err !== undefined && err !== null) {
          throw new MaasError(err.code, err.message, err.code_n);
        } else {
          throw new_client_sdk_error(error);
        }
      });
  }

  async *StreamChat(requestData: ChatReqParams) {
    const response: any = await this.chat(
      { ...requestData, stream: true },
      {
        Action: "chat",
        pathname: "/api/v1/chat",
        responseType: "stream",
      }
    ).catch((error) => {
      const err = (error.response.data as ChatResult)?.error;
      if (err !== undefined && err !== null) {
        throw new MaasError(err.code, err.message, err.code_n);
      } else {
        throw new_client_sdk_error(error);
      }
    });

    let buffer = "";
    const _parse_line = (line: string): ChatResult | null => {
      if (line.length > 0) {
        const pos = line.indexOf(":");
        if (pos >= 0) {
          const field = line.substring(0, pos).trim(),
            data = line.substring(pos + 1).trim();
          if (field == "") {
            // ignore comment
            return null;
          } else if (field === "data" && data != "[DONE]") {
            const result = JSON.parse(data) as ChatResult;
            if (result.error !== undefined && result.error !== null) {
              const err = result.error;
              throw new MaasError(err.code, err.message, err.code_n);
            }
            return result;
          }
        }
      }
      return null;
    };

    for await (const chunk of response) {
      buffer += chunk;

      do {
        const pos = buffer.indexOf("\n");
        if (pos >= 0) {
          const line = buffer.substring(0, pos).trim();
          buffer = buffer.substring(pos + 1);
          const result = _parse_line(line);
          if (result !== null) {
            yield result;
          }
        }
      } while (buffer.includes("\n"));
    }

    if (buffer.length > 0) {
      const result = _parse_line(buffer);
      if (result !== null) {
        yield result;
      }
    }
  }
}

export { ChatReqParams, ChatResult, ServiceOptions, ChatRole, ChatParameters };

export const defaultService = new MaasService({
  host: "maas-api.ml-platform-cn-beijing.volces.com",
  region: "cn-beijing",
});
