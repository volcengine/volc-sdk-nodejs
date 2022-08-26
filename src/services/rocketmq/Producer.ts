import { Client } from "./Client";
import { PublishMessageOptions } from "./types";
import { MQError } from "./utils/error";
import * as v1 from "./ protocol/v1";
import { isMQError } from "./utils/common";
import { MQAgent } from "./utils/agent";
import { Worker } from "./Worker";

export class MessageProperties {
  properties: Record<string, string>;
  constructor() {
    this.properties = {};
  }

  delayAfter(second: number) {
    this.properties["__DELAY_AFTER"] = String(second);
  }

  delayAt(timeStamp: number) {
    this.properties["__DELAY_AT"] = String(timeStamp);
  }

  putProperty(key: string, value: string) {
    this.properties[key] = value;
  }
}

export class Producer extends Worker {
  private _producerAgent: MQAgent;

  constructor(client: Client) {
    if (!client) throw new MQError("Please pass the client instance of producer");

    super(client, { type: "producer" });

    this._producerAgent = new MQAgent({ maxSockets: 1 });
  }

  connect() {
    return this._connect({ properties: {} });
  }

  close() {
    return this._close();
  }

  async publishMessage(options: PublishMessageOptions): Promise<v1.SendResult> {
    if (!options) {
      throw new MQError(`[RocketMQ-node-sdk] please pass the message option`);
    }

    if (!options.topic) {
      throw new MQError(`[RocketMQ-node-sdk] topic can not be empty`);
    }

    if (!options.body) {
      throw new MQError(`[RocketMQ-node-sdk] body can not be empty`);
    }

    if (this._workerStatus !== "connected") {
      throw new MQError(
        `[RocketMQ-node-sdk] Can not publish message when producer's status is ${this._workerStatus}`
      );
    }

    try {
      const startTime = Date.now();
      const res = await this._publishMessageRequest(options);
      this._logger.debug(`Publish message succeed.`, {
        timeSpent: Date.now() - startTime,
        payload: options,
      });
      return res;
    } catch (error) {
      const msg = `Producer publish message failed: ${error.message}`;
      this._logger.error(msg, { payload: isMQError(error) ? error.cause : undefined });

      throw new MQError(msg);
    }
  }

  private async _publishMessageRequest(options: PublishMessageOptions): Promise<v1.SendResult> {
    const { topic, body, tag, shardingKey = "", keys, messageProperties } = options;

    const res = await this._client._request<v1.SendReq, v1.SendResp>({
      method: "POST",
      path: "/v1/messages",
      data: {
        clientToken: this._clientToken as string,
        message: {
          topic: this._client.getTopicId(topic),
          body,
          tag,
          shardingKey,
          keys,
          properties: messageProperties?.properties || {},
        },
      },
      httpAgent: this._producerAgent,
    });

    return res.result;
  }
}
