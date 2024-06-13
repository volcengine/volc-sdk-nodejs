import {
  VikingdbError,
  VikingdbErrorCode,
  type VikingdbRegion,
  VikingdbRequestError,
} from "./types";
import Signer from "../../base/sign";
import type { RequestObj } from "../../base/types";
import axios, { type AxiosError } from "axios";

interface BackendResponse<T> {
  code: VikingdbErrorCode;
  request_id: string;
  data: T;
  message: string;
}

export interface Response<T> extends BackendResponse<T> {
  original_request: string;
}

export abstract class AbstractService {
  private region2Url: Record<VikingdbRegion, string> = {
    "cn-beijing": "https://api-vikingdb.volces.com",
    "cn-shanghai": "https://api-vikingdb.mlp.cn-shanghai.volces.com",
  };

  private get basename() {
    return this.region2Url[this.region];
  }

  constructor(
    private ak: string,
    private sk: string,
    private region: VikingdbRegion,
    private sessionToken?: string
  ) {}

  private sign(pathname: string, body: string) {
    const requestObj: RequestObj = {
      region: this.region,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      pathname,
      body,
    };
    const signer = new Signer(requestObj, "air");
    signer.addAuthorization({
      accessKeyId: this.ak,
      secretKey: this.sk,
      sessionToken: this.sessionToken,
    });
    return requestObj.headers;
  }

  protected async request<T extends NonNullable<unknown>, R = void>(
    pathname: string,
    data: T = {} as T
  ): Promise<Response<R>> {
    const body = this.encode(data);
    const headers = this.sign(pathname, body);
    try {
      const response = await axios({
        baseURL: this.basename,
        url: pathname,
        method: "POST",
        data: body,
        timeout: 30 * 1000,
        headers,
      });
      const result: BackendResponse<R> = response.data;
      return {
        ...result,
        original_request: body,
      };
    } catch (e) {
      const error: AxiosError = e;
      if (error.isAxiosError && error.response) {
        const result: BackendResponse<R> = error.response.data;
        // 业务错误
        throw new VikingdbRequestError(result.code, result.message, body, result.request_id);
      }
      throw new VikingdbError(VikingdbErrorCode.ErrSdk, error.message);
    }
  }

  protected encode(value: unknown): string {
    return JSON.stringify(value);
  }

  protected decode<T>(input: string): T {
    return JSON.parse(input);
  }

  protected isString(value: unknown): value is string {
    return typeof value === "string";
  }

  protected isNil(value: unknown): value is null | undefined {
    return value == null;
  }

  protected isCollectionNameRequest<T extends { CollectionName: string }>(
    request: NonNullable<unknown>
  ): request is T {
    return "CollectionName" in request;
  }
}
