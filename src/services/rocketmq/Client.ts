import { v4 as uuidv4 } from "uuid";
import Signer from "../../base/sign";
import { sendRequest, SendRequestOptions } from "./utils/request";
import { ClientOptions, ConsumerOptions } from "./types";
import { Consumer } from "./Consumer";
import { Producer } from "./Producer";
import { MQError } from "./utils/error";
import { requiredCheck } from "./utils/common";

const SDK_VERSION = "0.0.1";
// second
const SESSION_TIMEOUT = 60;

const SERVICE_NAME = "rocketmq";

interface ClientRequestOption<Req> extends Omit<SendRequestOptions, "url" | "data"> {
  path: string;
  data: Omit<Req, "requestId">;
}

export class Client {
  private _endpoint: string;
  private _instanceId: string;
  private _accessKey: string;
  private _secretKey: string;

  constructor(options: ClientOptions) {
    if (!options) {
      throw new MQError("[RocketMQ-node-sdk] Please pass the config of client");
    }

    const fields = requiredCheck(options, ["endpoint", "instanceId", "accessKey", "secretKey"]);

    if (fields.length > 0) {
      throw new MQError(`[RocketMQ-node-sdk] ${fields.join(", ")} is necessary`);
    }

    const { endpoint, accessKey, secretKey, instanceId } = options;

    const endpointInfo = new URL(options.endpoint);

    if (endpointInfo.protocol !== "http:" || !endpointInfo.hostname) {
      throw new MQError("[RocketMQ-node-sdk] endpoint is not a correct HTTP address");
    }

    this._endpoint = endpoint;
    this._accessKey = accessKey;
    this._secretKey = secretKey;
    this._instanceId = instanceId;
  }

  get VERSION() {
    return SDK_VERSION;
  }

  get SESSION_TIMEOUT() {
    return SESSION_TIMEOUT;
  }

  createProducer() {
    return new Producer(this);
  }

  createConsumer(options: ConsumerOptions) {
    return new Consumer(this, options);
  }

  async _request<Req, Resp = void>(options: ClientRequestOption<Req>): Promise<Resp> {
    const singer = this._sign(options);
    const { headers } = options;

    const url = new URL(options.path, this._endpoint).href;

    const res = await sendRequest({
      ...options,
      url,
      headers: { ...headers, ...singer.request.headers },
      data: singer.request.body,
    });

    return res;
  }

  getTopicId(topic: string) {
    return `${this._instanceId}%${topic}`;
  }

  getGroupId(group: string) {
    return `${this._instanceId}%${group}`;
  }

  private _createRequestId() {
    const requestId = uuidv4();
    return requestId;
  }

  private _sign(options: ClientRequestOption<any>) {
    const { method, path, data } = options;

    const urlInfo = new URL(path, this._endpoint);

    const singer = new Signer(
      {
        region: "all",
        method: method as string,
        pathname: path,
        headers: { Host: urlInfo.host },
        body: { ...data, requestId: this._createRequestId() },
      },
      SERVICE_NAME
    );

    singer.addAuthorization({ accessKeyId: this._accessKey, secretKey: this._secretKey });

    return singer;
  }
}
