interface OpenApiError {
  Code?: string;
  Message: string;
  CodeN?: number;
}
interface OpenApiResponseMetadataParams {
  RequestId?: string;
  Action?: string;
  Version?: string;
  Service?: string;
  Region?: string;
  Error?: OpenApiError;
}
interface OpenApiResponseMetadata extends OpenApiResponseMetadataParams {
  RequestId: string;
  Service: string;
}
interface OpenApiResponse<T> {
  ResponseMetadata: OpenApiResponseMetadata;
  Result?: T;
}

interface STS {
  /**
   * create time of STS. unix timestamp.
   */
  CurrentTime: string | number;
  /**
   * expire time of STS. unix timestamp.
   */
  ExpiredTime: string | number;
  AccessKeyId: string;
  SecretAccessKey: string;
  SessionToken: string;
}
declare namespace SignerType {
  interface RequestObj {
    region: string;
    method: string;
    params?: any;
    pathname?: string;
    headers?: any;
    body?: any;
  }
  interface Options {
    bodySha256?: string;
  }
  interface CredentialsBase {
    accessKeyId?: string;
    secretAccessKey?: string;
    sessionToken?: string;
  }
  interface Credentials extends CredentialsBase {
    accessKeyId: string;
    secretAccessKey: string;
  }
}
declare namespace ServiceType {
  interface OptionsBase extends SignerType.CredentialsBase {
    /**
     * openpai host default is 'cn-north-1'
     */
    region?: string;
    /**
     * openpai host default is 'open.volcengineapi.com'
     */
    host?: string;
    serviceName?: string;
    /**
     * openpai host default is 'http'
     */
    protocol?: string;
    defaultVersion?: string;
  }
  interface Options extends OptionsBase {
    serviceName: string;
  }
  interface FetchParams {
    Action: string;
    Version?: string;
    query?: any;
  }
  interface CreateAPIParams {
    Action: string;
    Version?: string;
    method: string;
    contentType: "json" | "urlencode" | "form-data";
  }
}
