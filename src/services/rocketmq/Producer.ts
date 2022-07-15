import { v4 as uuidv4 } from "uuid";
import { Client } from "./Client";
import {
  ProducerOptions,
  ProducerStatus,
  ProducerType,
  ProducerCloseOptions,
  ProducerConnectOptions,
  PublishMessageOptions,
} from "./types";
import { MQError } from "./utils/error";
import * as v1 from "./ protocol/v1";
import { isString } from "./utils/common";

export class Producer {
  // config
  private _client: Client;

  private _producerType: ProducerType;

  private _topic: string[];

  private _group: string;

  private _sequential: boolean;

  // running
  private _status: ProducerStatus;

  private _clientToken: string | undefined = undefined;

  constructor(client: Client, options: ProducerOptions) {
    if (!client) {
      throw new MQError("Please pass the client instance of producer");
    }
    if (!options) {
      throw new MQError("Please pass the config of producer");
    }
    // Create normal producers by default.
    // Allow to send message to all topic by default.
    const { producerType = "producer", topic = "*", group, sequential = false } = options;

    if (!isString(topic) && topic.length === 0) {
      throw new MQError("Please set at least one topic for producer");
    }

    if (producerType === "t-producer" && !group) {
      throw new MQError("options.group is required when creating a t-producer");
    }

    this._client = client;
    this._producerType = producerType;
    this._topic = isString(topic) ? [topic] : topic;
    this._group = group || ""; // set empty string for normal producer group
    this._sequential = sequential;
    this._status = "initialized";
  }

  private connectable() {
    const status = this._status;
    return status === "initialized" || status === "closed" || status === "connectFailed";
  }

  private closeable() {
    const status = this._status;
    return status === "idle" || status === "running";
  }

  private publishable() {
    const status = this._status;
    return status === "idle" || status === "running";
  }

  private getRequestId() {
    const requestId = uuidv4();
    return requestId;
  }

  async connect(properties: ProducerConnectOptions = {}) {
    if (!this.connectable()) {
      return;
    }
    const requestId = this.getRequestId();
    try {
      const res = await this._client.request<v1.OpenReq, v1.OpenResp>({
        method: "POST",
        path: "/v1/clients",
        data: {
          requestId,
          clientVersion: this._client.VERSION,
          type: this._producerType,
          topics: this._topic,
          group: this._group,
          properties: properties as any,
          clientToken: this._clientToken,
        },
      });
      this._clientToken = res.clientToken;
      this._status = "idle";
    } catch (error) {
      this._status = "connectFailed";
      throw new MQError(`Producer connect failed, requestId: ${requestId}`);
    }
  }

  async publishMessage(options: PublishMessageOptions) {
    if (!this.publishable()) {
      return;
    }

    // TODO: publish message
    // console.log(options, this._sequential);
  }

  async close(properties: ProducerCloseOptions = {}) {
    if (!this.closeable()) {
      return;
    }
    const prevStatus = this._status;
    this._status = "closing";

    if (prevStatus === "running") {
      // TODO: await queue clean resolver
    }

    const requestId = this.getRequestId();
    try {
      await this._client.request<v1.CloseReq, void>({
        method: "delete",
        path: `/v1/clients/${this._clientToken}`,
        data: {
          requestId,
          clientToken: this._clientToken as string,
          properties: properties as any,
        },
      });
      this._status = "closed";
    } catch (error) {
      // Keep closing when error
      throw new MQError(`Producer close failed, requestId: ${requestId}`);
    }
  }
}
