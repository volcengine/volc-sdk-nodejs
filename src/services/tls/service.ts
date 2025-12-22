import axios, { AxiosRequestConfig } from "axios";
import Signer from "../../base/sign";
import protobuf from "protobufjs";
import LZ4 from "./lz4";
import zlib from "zlib";
import crypto from "crypto";
import path from "path";
import { getDefaultOption } from "./utils";
import {
  IPutLogsReq,
  IPutLogsResp,
  LogGroupList,
  Protocol,
  TlsCreateAPIParams,
  TlsServiceOptions,
} from "./types";

const TIMEOUT = 100000;

const defaultOptions = getDefaultOption();

export default class Service {
  constructor(options: TlsServiceOptions) {
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  private options: TlsServiceOptions;

  setRegion = (region: string) => {
    this.options.region = region;
  };

  setHost = (host: string) => (this.options.host = host);

  setVersion = (version: string) => (this.options.version = version);

  setProtocol = (protocol: Protocol) => (this.options.protocol = protocol);

  setAccessKeyId = (accessKeyId: string) => (this.options.accessKeyId = accessKeyId);

  setSecretKey = (secretKey: string) => (this.options.secretKey = secretKey);

  setSessionToken = (sessionToken: string) => (this.options.sessionToken = sessionToken);

  static async fetch<Result>(uri: string, requestObj: any): Promise<Result> {
    const res = await axios({
      url: uri,
      timeout: TIMEOUT,
      ...requestObj,
    });
    return res?.data;
  }

  /**
   * transfer json to protobuf buffer
   */
  static async objToProtoBuffer(obj: LogGroupList) {
    const root = await protobuf.load(path.join(__dirname, "./tls.proto"));
    const type = root.lookupType("pb.LogGroupList");
    const errMsg = type.verify(obj);
    if (errMsg) throw new Error(errMsg);
    const message = type.create(obj);
    return type.encode(message).finish();
  }

  // protobuf buffer compress
  static LZ4Compress(input) {
    let output = Buffer.alloc(LZ4.encodeBound(input.length));
    const compressedSize = LZ4.encodeBlock(input, output);
    if (!compressedSize) {
      throw new Error("no need to compress");
    }
    output = output.slice(0, compressedSize);
    return output;
  }

  createAPI<RequestData, Result>(Path: string, createParams?: TlsCreateAPIParams) {
    const { method = "GET", version: versionFromParam } = createParams || {};
    return async (requestData: RequestData, config?: AxiosRequestConfig) => {
      const {
        accessKeyId,
        secretKey,
        sessionToken,
        host,
        protocol,
        version: versionFromOptions,
        serviceName,
        region,
      } = this.options;

      const version = versionFromParam || versionFromOptions;

      if (!accessKeyId || !secretKey || !host)
        throw new Error(`[tls-node-sdk] host and accessKeyId and secretKey is necessary`);
      const requestObj: any = {
        region,
        method,
        pathname: `/${Path}`,
        ...config,
        headers: {
          ...config?.headers,
          "x-tls-apiversion": version,
        },
      };
      if (method === "GET") {
        requestObj.params = requestData;
      } else {
        requestObj.headers["content-type"] = "application/json";
        requestObj.body = requestData;
        requestObj.data = requestData;
      }
      const signer = new Signer(requestObj, serviceName as string);
      signer.addAuthorization({ accessKeyId, secretKey, sessionToken });
      return Service.fetch<Result>(`${protocol}//${host}/${Path}`.trim(), requestObj);
    };
  }

  createPutLogsAPI(Path: string) {
    return async (requestData: IPutLogsReq, config?: AxiosRequestConfig): Promise<IPutLogsResp> => {
      const { LogGroupList, CompressType, TopicId, HashKey, ContentMD5 } = requestData;
      if (!LogGroupList) throw new Error(`LogGroupList is necessary`);

      // transfer json to compressed protobuf buffer
      const pbMessage = LogGroupList;
      let compressFailed = false;
      let output = pbMessage;
      if (CompressType === "lz4") {
        try {
          output = Service.LZ4Compress(pbMessage);
        } catch (err) {
          compressFailed = true;
        }
      } else if (CompressType === "zlib") {
        try {
          output = zlib.deflateSync(pbMessage);
        } catch (err) {
          compressFailed = true;
        }
      }

      const { accessKeyId, secretKey, sessionToken, host, version, protocol, serviceName, region } =
        this.options;
      if (!accessKeyId || !secretKey || !host || !region) {
        const missingParams: string[] = [];
        if (!accessKeyId) missingParams.push("accessKeyId");
        if (!secretKey) missingParams.push("secretKey");
        if (!host) missingParams.push("host");
        if (!region) missingParams.push("region");
        throw new Error(`[tls-node-sdk] ${missingParams.join(" and ")} is necessary`);
      }

      const bodyRawSize = pbMessage.length;
      const headers: any = {
        ...config?.headers,
        "x-tls-apiversion": version,
        "Content-Type": "application/x-protobuf",
        "x-tls-bodyrawsize": String(bodyRawSize),
        "Content-MD5": ContentMD5 || crypto.createHash("md5").update(output).digest("hex"),
      };

      if (!compressFailed && CompressType) {
        headers["x-tls-compresstype"] = CompressType;
      }

      if (HashKey && typeof HashKey === "string") {
        const normalizedHashKey = HashKey.trim();
        if (/^[0-9a-fA-F]{32}$/.test(normalizedHashKey)) {
          headers["x-tls-hashkey"] = normalizedHashKey;
        }
      }

      const requestObj: any = {
        region,
        method: "POST",
        pathname: `/${Path}`,
        ...config,
        headers,
      };
      requestObj.body = output;
      requestObj.data = output;
      requestObj.params = {
        TopicId,
      };
      const signer = new Signer(requestObj, serviceName as string);
      signer.addAuthorization({ accessKeyId, secretKey, sessionToken });
      return Service.fetch(`${protocol}//${host}/${Path}`.trim(), requestObj);
    };
  }
}
