import Signer from "./sign";
import fetch from "./fetch";
import { RequestInit } from "node-fetch";
import qs from "querystring";
import { packageName } from "./utils";
import FormData from "form-data";

const defaultOptions = {
  host: "open.volcengineapi.com",
  region: "cn-north-1",
  protocol: "https:",
};
export default class Service {
  constructor(options: ServiceType.Options) {
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  private options: ServiceType.Options;

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
  createAPI<RequstData, Result>(Action: string, createParams?: ServiceType.CreateAPIParams) {
    const { Version, method = "GET", contentType } = createParams || {};
    return (
      requestData: RequstData,
      params?: ServiceType.FetchParams & RequestInit,
      options?: ServiceType.OptionsBase
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
            requestParams.body = JSON.stringify(requestData);
            break;
          }
          case "urlencode": {
            const body = new URLSearchParams();
            Object.keys(requestData).forEach(key => {
              body.append(key, requestData[key]);
            });
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
    params: ServiceType.FetchParams & RequestInit,
    options?: ServiceType.OptionsBase
  ): Promise<OpenApiResponse<Result>> {
    const realOptions = {
      ...this.options,
      ...options,
    };
    const requestInit = {
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
    const signer = new Signer(requestInit, realOptions.serviceName);
    const { accessKeyId, secretAccessKey, sessionToken } = realOptions;
    if (!accessKeyId || !secretAccessKey) {
      throw new Error(`[${packageName}] accessKeyId and secretAccessKey is necessary`);
    }
    signer.addAuthorization({ accessKeyId, secretAccessKey, sessionToken });
    let uri = `${realOptions.protocol || defaultOptions.protocol}//${realOptions.host ||
      defaultOptions.host}${requestInit.pathname}`;
    const queryString = qs.stringify(requestInit.params, undefined, undefined, {
      encodeURIComponent: v => v,
    });
    if (queryString) uri += "?" + queryString;
    return fetch(uri, requestInit);
  }
}
