import Service from "../../../base/service";
import { createDebug } from "../../../base/utils";
import {
  ChatReq,
  ChatResp,
  ClassificationReq,
  ClassificationResp,
  EmbeddingsReq,
  EmbeddingsResp,
  ServiceOptions,
  TokenizeReq,
  TokenizeResp,
} from "./types";
import { MaasError, new_client_sdk_error } from "../error";

const debug = createDebug("maas");
export class MaasServiceV2 extends Service {
  timeout: number;
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
  embeddings = this.createAPI<EmbeddingsReq, EmbeddingsResp>("embeddings", {
    method: "POST",
    contentType: "json",
  });
  constructor(options?: ServiceOptions) {
    super({
      ...options,
      serviceName: "ml_maas",
    });
    this.timeout = options?.timeout || 60000; // default timeout is 60s
  }
  Chat(endpointId: string, reqData: ChatReq): Promise<ChatResp> {
    return this.chat(
      { ...reqData, stream: false },
      {
        Action: "chat",
        pathname: `/api/v2/endpoint/${endpointId}/chat`,
        timeout: this.timeout,
      }
    )
      .then((done) => {
        // 200 status code
        return done as unknown as ChatResp;
      })
      .then((result) => {
        debug("chat result. result: %j", result);
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
  async *StreamChat(endpointId: string, reqData: ChatReq) {
    const response: any = await this.chat(
      { ...reqData, stream: true },
      {
        Action: "chat",
        pathname: `/api/v2/endpoint/${endpointId}/chat`,
        responseType: "stream",
        timeout: this.timeout,
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
          // [field]:[data]
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
      let pos = buffer.indexOf("\n");
      while (pos > -1) {
        const line = buffer.substring(0, pos).trim();
        buffer = buffer.substring(pos + 1);
        const result = _parse_line(line);
        if (result !== null) {
          yield result;
        }
        pos = buffer.indexOf("\n");
      }
    }

    if (buffer.length > 0) {
      const result = _parse_line(buffer);
      if (result !== null) {
        yield result;
      }
    }
  }
  Tokenization(endpointId: string, reqData: TokenizeReq): Promise<TokenizeResp> {
    return this.tokenization(reqData, {
      Action: "tokenization",
      pathname: `/api/v2/endpoint/${endpointId}/tokenization`,
      timeout: this.timeout,
    })
      .then((done) => {
        // 200 status code
        return done as unknown as TokenizeResp;
      })
      .then((result) => {
        debug("tokenization result. result: %j", result);
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
  Classification(endpointId: string, reqData: ClassificationReq): Promise<ClassificationResp> {
    return this.classification(reqData, {
      Action: "classification",
      pathname: `/api/v2/endpoint/${endpointId}/classification`,
      timeout: this.timeout,
    })
      .then((done) => {
        // 200 status code
        return done as unknown as ClassificationResp;
      })
      .then((result) => {
        debug("classification result. result: %j", result);
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
  Embeddings(endpointId: string, reqData: EmbeddingsReq): Promise<EmbeddingsResp> {
    return this.embeddings(reqData, {
      Action: "embeddings",
      pathname: `/api/v2/endpoint/${endpointId}/embeddings`,
      timeout: this.timeout,
    })
      .then((done) => {
        // 200 status code
        return done as unknown as EmbeddingsResp;
      })
      .then((result) => {
        debug("embeddings result. result: %j", result);
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
        const err = (error.response.data as EmbeddingsResp)?.error;
        if (err !== undefined && err !== null) {
          throw new MaasError(err.code, err.message, err.code_n);
        } else {
          throw new_client_sdk_error(error);
        }
      });
  }
}
