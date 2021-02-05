import Signer from "./sign";
import fetch from "./fetch";
import { AxiosRequestConfig } from "axios";
import { packageName, getDefaultOption } from "./utils";
import FormData from "form-data";
import qs from "querystring";
import {
  OpenApiResponse,
  ServiceOptions,
  CreateAPIParams,
  FetchParams,
  ServiceOptionsBase,
} from "./types";

const defaultOptions = getDefaultOption();
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

  setSecretKey = (secretKey: string) => {
    this.options.secretKey = secretKey;
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
   * create json api
   * @param Action OpenAPI Action
   * @param createParams.Version OpenAPI Version. If not provide, will use service defaultVersion.
   * @param createParams.method http method default is POST. You can also use 'PUT'
   * @param createParams.contentType body content type. support: json urlencode form-data. default is json.
   */
  createJSONAPI(Action: string, createParams?: CreateAPIParams) {
    return this.createAPI(Action, {
      method: "POST",
      contentType: "json",
      ...createParams,
    });
  }
  /**
   * create urlencode api
   * @param Action OpenAPI Action
   * @param createParams.Version OpenAPI Version. If not provide, will use service defaultVersion.
   * @param createParams.method http method default is POST. You can also use 'PUT'
   * @param createParams.contentType body content type. support: json urlencode form-data. default is urlencode.
   */
  createUrlEncodeAPI(Action: string, createParams?: CreateAPIParams) {
    return this.createAPI(Action, {
      method: "POST",
      contentType: "urlencode",
      ...createParams,
    });
  }
  /**
   * create form-data api
   * @param Action OpenAPI Action
   * @param createParams.Version OpenAPI Version. If not provide, will use service defaultVersion.
   * @param createParams.method http method default is POST. You can also use 'PUT'
   * @param createParams.contentType body content type. support: json urlencode form-data. default is form-data.
   */
  createFormDataAPI(Action: string, createParams?: CreateAPIParams) {
    return this.createAPI(Action, {
      method: "POST",
      contentType: "form-data",
      ...createParams,
    });
  }
  /**
   * create api function
   * @param Action OpenAPI Action
   * @param createParams.Version OpenAPI Version. If not provide, will use service defaultVersion.
   * @param createParams.method http method like GET POST PUT
   * @param createParams.contentType body content type. support: json urlencode form-data. default is urlencode.
   */
  createAPI<RequstData, Result>(Action: string, createParams?: CreateAPIParams) {
    const { Version, method = "GET", contentType = "urlencode", queryKeys = [] } =
      createParams || {};
    return (
      requestData: RequstData,
      params?: FetchParams & AxiosRequestConfig,
      options?: ServiceOptionsBase
    ) => {
      const requestParams: FetchParams & AxiosRequestConfig = {
        ...params,
        method,
        Action,
        Version,
      };
      if (method === "GET") {
        requestParams.query = requestData;
      } else {
        requestParams.query = {
          ...queryKeys.reduce((res, key) => {
            return requestData[key] !== undefined ? { ...res, [key]: requestData[key] } : res;
          }, {}),
          ...(params?.query ?? {}),
        };
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
    const { accessKeyId, secretKey, sessionToken } = realOptions;
    if (!accessKeyId || !secretKey) {
      throw new Error(`[${packageName}] accessKeyId and secretKey is necessary`);
    }
    signer.addAuthorization({ accessKeyId, secretKey, sessionToken });
    let uri = `${realOptions.protocol || defaultOptions.protocol}//${realOptions.host ||
      defaultOptions.host}${requestInit.pathname}`;
    const queryString = qs.stringify(requestInit.params, undefined, undefined, {
      encodeURIComponent: v => v,
    });
    if (queryString) uri += "?" + queryString;
    return fetch(uri, {
      ...requestInit,
      params: undefined,
    });
  }
}
