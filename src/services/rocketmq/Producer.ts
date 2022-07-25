import { Client } from "./Client";
import { ProducerOptions, ProducerStatus, ProducerType, PublishMessageOptions } from "./types";
import { MQError } from "./utils/error";
import * as v1 from "./ protocol/v1";
import { isString, Queue, Resolver } from "./utils/common";
import { Worker } from "./Worker";

// const CLOSEABLE_STATUS: ProducerStatus[] = ["idle", "running"];

// const CONNECTABLE_STATUS: ProducerStatus[] = ["initialized", "connectFailed", "closed"];

export interface MessageQueueItem {
  messageOptions: PublishMessageOptions;
  resolver: Resolver<v1.SendResult>;
}

export class Producer extends Worker {
  // config
  private _producerType: ProducerType;

  private _order: boolean;

  // running
  private _status: ProducerStatus;

  private _messageQueue = new Queue<MessageQueueItem>();

  private _closeResolver: Resolver | null = null;

  constructor(client: Client, options: ProducerOptions) {
    if (!client) {
      throw new MQError("Please pass the client instance of producer");
    }
    if (!options) {
      throw new MQError("Please pass the config of producer");
    }
    // Create normal producers by default.
    // Allow to send message to all topic by default.
    const { producerType = "producer", topic = "*", group, order = false } = options;

    if (!isString(topic) && topic.length === 0) {
      throw new MQError("Please set at least one topic for producer");
    }

    if (producerType === "t-producer" && !group) {
      throw new MQError("options.group is required when creating a t-producer");
    }

    super(client, {
      type: producerType,
      topic: isString(topic) ? [topic] : topic,
      group: group || "", // Empty group for normal producer by default
    });

    this._producerType = producerType;
    this._order = order;
    this._status = "initialized";
  }

  async connect() {
    const requestId = this._client._createRequestId();
    try {
      const res = await this._connectRequest(requestId, {
        order: String(this._order), // order type
      });
      this._clientToken = res.clientToken;
      this._status = "idle";
      this._startHeartBeat();
    } catch (error) {
      this._status = "connectFailed";
      throw new MQError(`Producer connect failed, requestId: ${requestId}`);
    }
  }

  async close(): Promise<void> {
    const prevStatus = this._status;
    // Set the status to closing to prevent sending new messages
    this._status = "closing";
    // Wait for all messages in the queue to be sent successfully
    if (prevStatus === "running") {
      this._closeResolver = new Resolver();
      await this._closeResolver.promise;
    }
    // Only after all messages be sent successfully can stop the hear beat
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
    if (this._order) {
      return this._publishMessageRequest(options);
    }

    const resolver = new Resolver<v1.SendResult>();
    this._messageQueue.add({ messageOptions: options, resolver });

    if (this._status !== "running") {
      this._startSend();
    }

    return resolver.promise;
  }

  private async _startSend() {
    this._status = "running";

    while (this._messageQueue.count > 0) {
      const currentMessage = this._messageQueue.peek();
      if (!currentMessage) {
        continue;
      }
      try {
        const res = await this._publishMessageRequest(currentMessage.messageOptions);
        currentMessage.resolver.resolve(res);
      } catch (error) {
        currentMessage.resolver.reject(error);
      }
      this._messageQueue.remove();
    }

    this._status = "idle";

    if (this._closeResolver) {
      this._closeResolver.resolve();
      this._closeResolver = null;
    }
  }

  private async _publishMessageRequest(options: PublishMessageOptions): Promise<v1.SendResult> {
    const { topic, body, tags = [], shardingKey = "", keys = [], properties = {} } = options;
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
