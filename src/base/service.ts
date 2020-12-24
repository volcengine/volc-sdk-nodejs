import Signer from "./sign";
import fetch from "./fetch";
import { AxiosRequestConfig } from "axios";
import { packageName } from "./utils";
import FormData from "form-data";
import {
  OpenApiResponse,
  ServiceOptions,
  CreateAPIParams,
  FetchParams,
  ServiceOptionsBase,
} from "./types";

const defaultOptions = {
  host: "open.volcengineapi.com",
  region: "cn-north-1",
  protocol: "https:",
};
export default class Service {
  constructor(options: ServiceOptions) {
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  private options: ServiceOptions;

  setAccessKeyId = (accessKeyId: string) => {
    this.options.accessKeyId = accessKeyId;
  };

  setSecretAccessKey = (secretAccessKey: string) => {
    this.options.secretAccessKey = secretAccessKey;
  };

  setSessionToken = (sessionToken: string) => {
    this.options.sessionToken = sessionToken;
  };

  setRegion = (region: string) => {
    this.options.region = region;
  };

  setHost = (host: string) => {
    this.options.host = host;
  };
  /**
   * create api function
   * @param Action OpenAPI Action
   * @param createParams.Version OpenAPI Version. If not provide, will use service defaultVersion.
   * @param createParams.method http method like GET POST PUT
   * @param createParams.contentType body content type. support: json urlencode form-data
   */
  createAPI<RequstData, Result>(Action: string, createParams?: CreateAPIParams) {
    const { Version, method = "GET", contentType } = createParams || {};
    return (
      requestData: RequstData,
      params?: FetchParams & AxiosRequestConfig,
      options?: ServiceOptionsBase
    ) => {
      const requestParams = {
        ...params,
        method,
        Action,
        Version,
      };
      if (method === "GET") {
        requestParams.query = requestData;
      } else {
        switch (contentType) {
          case "json": {
            requestParams.headers = {
              ...requestParams.headers,
              "content-type": "application-json",
            };
            requestParams.data = requestData;
            break;
          }
          case "urlencode": {
            const body = new URLSearchParams();
            Object.keys(requestData).forEach(key => {
              body.append(key, requestData[key]);
            });
            requestParams.data = body;
            break;
          }
          case "form-data": {
            const body = new FormData();
            Object.keys(requestData).forEach(key => {
              body.append(key, requestData[key]);
            });
            requestParams.headers = {
              ...requestParams.headers,
              "content-type": "application/form-data",
            };
            requestParams.data = body;
            break;
          }
          default: {
            throw new Error(`contentType ${contentType} is not support`);
          }
        }
      }
      return this.fetchOpenAPI<Result>(requestParams, options);
    };
  }
  fetchOpenAPI<Result>(
    params: FetchParams & AxiosRequestConfig,
    options?: ServiceOptionsBase
  ): Promise<OpenApiResponse<Result>> {
    const realOptions = {
      ...this.options,
      ...options,
    };
    const requestInit: any = {
      pathname: "/",
      ...params,
      params: {
        ...params.query,
        Action: params.Action,
        Version: params.Version || realOptions.defaultVersion,
      },
      region: realOptions.region || defaultOptions.region,
      method: params.method || "GET",
    };
    if (requestInit.data) {
      requestInit.body = requestInit.data;
    }
    const signer = new Signer(requestInit, realOptions.serviceName);
    const { accessKeyId, secretAccessKey, sessionToken } = realOptions;
    if (!accessKeyId || !secretAccessKey) {
      throw new Error(`[${packageName}] accessKeyId and secretAccessKey is necessary`);
    }
    signer.addAuthorization({ accessKeyId, secretAccessKey, sessionToken });
    const uri = `${realOptions.protocol || defaultOptions.protocol}//${realOptions.host ||
      defaultOptions.host}${requestInit.pathname}`;
    return fetch(uri, requestInit);
  }
}
