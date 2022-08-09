import { Client } from "./Client";
import { ProducerOptions, ProducerStatus, PublishMessageOptions } from "./types";
import { MQError } from "./utils/error";
import * as v1 from "./ protocol/v1";
import { isString, Resolver } from "./utils/common";
import { Worker } from "./Worker";

export interface MessageQueueItem {
  messageOptions: PublishMessageOptions;
  resolver: Resolver<v1.SendResult>;
}

export class Producer extends Worker {
  private _status: ProducerStatus;

  constructor(client: Client, options: ProducerOptions) {
    if (!client) {
      throw new MQError("Please pass the client instance of producer");
    }
    if (!options) {
      throw new MQError("Please pass the config of producer");
    }
    // Allow to send message to all topic by default.
    const { topic = "*", group } = options;

    if (!isString(topic) && topic.length === 0) {
      throw new MQError("Please set at least one topic for producer");
    }

    super(client, {
      type: "producer",
      topic: isString(topic) ? [topic] : topic,
      group: group || "", // Empty group for normal producer by default
    });

    this._status = "initialized";
  }

  async connect() {
    const requestId = this._client._createRequestId();
    try {
      const res = await this._connectRequest(requestId, {});
      this._clientToken = res.clientToken;
      this._status = "idle";
      this._startHeartBeat();
    } catch (error) {
      this._status = "connectFailed";
      throw new MQError(`Producer connect failed, requestId: ${requestId}`);
    }
  }

  async close(): Promise<void> {
    // Set the status to closing to prevent sending new messages
    this._status = "closing";
    this._stopHeartBeat();

    const requestId = this._client._createRequestId();
    try {
      await this._closeRequest(requestId, {});
      this._status = "closed";
    } catch (error) {
      this._status = "connectFailed";
      throw new MQError(`Producer close failed, requestId: ${requestId}`);
    }
  }

  async publishMessage(options: PublishMessageOptions): Promise<v1.SendResult> {
    return this._publishMessageRequest(options);
  }

  private async _publishMessageRequest(options: PublishMessageOptions): Promise<v1.SendResult> {
    const { topic, body, tags, shardingKey = "", keys, properties = {} } = options;
    const requestId = this._client._createRequestId();
    try {
      const res = await this._client._request<v1.SendReq, v1.SendResp>({
        method: "POST",
        path: "/v1/messages",
        data: {
          requestId,
          clientToken: this._clientToken as string,
          message: { topic, body, tags, shardingKey, keys, properties },
        },
      });
      return res.result;
    } catch (error) {
      throw new MQError(`Publish message failed, requestId: ${requestId}`);
    }
  }
}
