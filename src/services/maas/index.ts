import Service from "../../base/service";
import { MaasError, new_client_sdk_error } from "./error";
import {
  ChatReq,
  ChatResp,
  ServiceOptions,
  TokenizeReq,
  TokenizeResp,
  ClassificationReq,
  ClassificationResp,
} from "./types";

export class MaasService extends Service {
  chat = this.createAPI<ChatReq, ChatResp>("chat", {
    method: "POST",
    contentType: "json",
  });

  tokenization = this.createAPI<TokenizeReq, TokenizeResp>("tokenization", {
    method: "POST",
    contentType: "json",
  });

  classification = this.createAPI<ClassificationReq, ClassificationResp>("classification", {
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

  Chat(requestData: ChatReq): Promise<ChatResp> {
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
        return done as unknown as ChatResp;
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

        const err = (error.response.data as ChatResp)?.error;
        if (err !== undefined && err !== null) {
          throw new MaasError(err.code, err.message, err.code_n);
        } else {
          throw new_client_sdk_error(error);
        }
      });
  }

  async *StreamChat(requestData: ChatReq) {
    const response: any = await this.chat(
      { ...requestData, stream: true },
      {
        Action: "chat",
        pathname: "/api/v1/chat",
        responseType: "stream",
      }
    ).catch((error) => {
      const err = (error.response.data as ChatResp)?.error;
      if (err !== undefined && err !== null) {
        throw new MaasError(err.code, err.message, err.code_n);
      } else {
        throw new_client_sdk_error(error);
      }
    });

    let buffer = "";
    const _parse_line = (line: string): ChatResp | null => {
      if (line.length > 0) {
        const pos = line.indexOf(":");
        if (pos >= 0) {
          const field = line.substring(0, pos).trim(),
            data = line.substring(pos + 1).trim();
          if (field == "") {
            // ignore comment
            return null;
          } else if (field === "data" && data != "[DONE]") {
            const result = JSON.parse(data) as ChatResp;
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

  Tokenization(requestData: TokenizeReq): Promise<TokenizeResp> {
    return this.tokenization(
      { ...requestData },
      {
        Action: "tokenization",
        pathname: "/api/v1/tokenization",
        timeout: this.timeout,
      }
    )
      .then((done) => {
        // 200 status code
        return done as unknown as TokenizeResp;
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

        const err = (error.response.data as TokenizeResp)?.error;
        if (err !== undefined && err !== null) {
          throw new MaasError(err.code, err.message, err.code_n);
        } else {
          throw new_client_sdk_error(error);
        }
      });
  }

  Classification(requestData: ClassificationReq): Promise<ClassificationResp> {
    return this.classification(
      { ...requestData },
      {
        Action: "classification",
        pathname: "/api/v1/classification",
        timeout: this.timeout,
      }
    )
      .then((done) => {
        // 200 status code
        return done as unknown as ClassificationResp;
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

        const err = (error.response.data as ClassificationResp)?.error;
        if (err !== undefined && err !== null) {
          throw new MaasError(err.code, err.message, err.code_n);
        } else {
          throw new_client_sdk_error(error);
        }
      });
  }
}

export * from "./types";

export const defaultService = new MaasService({
  host: "maas-api.ml-platform-cn-beijing.volces.com",
  region: "cn-beijing",
});
