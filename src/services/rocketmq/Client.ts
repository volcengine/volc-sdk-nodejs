import { v4 as uuidv4 } from "uuid";
import { sendRequest, SendRequestOptions } from "./utils/request";
import { ClientOptions, ProducerOptions, ConsumerOptions } from "./types";
import { Consumer } from "./Consumer";
import { Producer } from "./Producer";
import { MQError } from "./utils/error";

const SDK_VERSION = "0.0.1";

const HEART_BEAT_CYCLE = 30000;

interface RequestOption<Req> extends Omit<SendRequestOptions<Req>, "url"> {
  path: string;
}

export class Client {
  private _endpoint: string;
  private _accessKeyId: string;
  private _secretAccessKey: string;

  constructor(options: ClientOptions) {
    const { endpoint, accessKeyId, secretAccessKey } = options || {};
    if (!endpoint || !accessKeyId || !secretAccessKey) {
      throw new MQError("Endpoint, accessKeyId and secretAccessKey is necessary");
    }

    this._endpoint = endpoint;
    this._accessKeyId = accessKeyId;
    this._secretAccessKey = secretAccessKey;
  }

  get VERSION() {
    return SDK_VERSION;
  }

  get HEART_BEAT_CYCLE() {
    return HEART_BEAT_CYCLE;
  }

  createProducer(options: ProducerOptions) {
    if (!options) {
      throw new MQError("Please pass the options of producer");
    }
    return new Producer(this, options);
  }

  createConsumer(options: ConsumerOptions) {
    if (!options) {
      throw new MQError("Please pass the options of consumer");
    }
    return new Consumer(this, options);
  }

  async _request<Req, Resp = void>(options: RequestOption<Req>): Promise<Resp> {
    const { path, headers = {} } = options;
    const url = `${this._endpoint}/${path}`;
    const auth = this._sign();

    const res = await sendRequest({
      ...options,
      url,
      headers: { ...headers, "X-Auth": auth },
    });

    return res;
  }

  _sign(): string {
    // TODO: 改成真实签名
    return this._endpoint + this._accessKeyId + this._secretAccessKey;
  }

  _createRequestId() {
    const requestId = uuidv4();
    return requestId;
  }
}
