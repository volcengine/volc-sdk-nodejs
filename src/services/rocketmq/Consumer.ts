import * as v1 from "./ protocol/v1";
import { Worker } from "./Worker";
import { Client } from "./Client";
import {
  ConsumerStatus,
  ConsumerOptions,
  ConsumerRunOptions,
  ACKMessagesOptions,
  ConsumerSubscribeOption,
} from "./types";
import { requiredCheck, isMQError, Resolver, sleep } from "./utils/common";
import { MQError } from "./utils/error";
import { MQAgent } from "./utils/agent";

export class Consumer extends Worker {
  private _group: string;

  private _subscriptions: Record<string, string>;

  private _maxMessageNumber: number;

  private _maxWaitTimeMs: number;

  private _pollingInterval: number;

  private _consumerAgent: MQAgent;

  protected _status: ConsumerStatus;

  private _consumeResolver: Resolver | null;

  constructor(client: Client, options: ConsumerOptions) {
    if (!client) throw new MQError("Please pass the client instance of consumer");

    if (!options) throw new MQError("Please pass the options of consumer");

    const fields = requiredCheck(options, ["group"]);

    if (fields.length > 0) {
      throw new MQError(`[RocketMQ-node-sdk] ${fields.join(", ")} is necessary`);
    }

    const { group, maxMessageNumber = 10, maxWaitTimeMs = 3000, pollingInterval = 0 } = options;

    super(client, { type: "consumer" });

    this._group = group;
    this._subscriptions = {};
    this._maxMessageNumber = maxMessageNumber;
    this._maxWaitTimeMs = maxWaitTimeMs;
    this._pollingInterval = pollingInterval;
    this._consumerAgent = new MQAgent({ maxSockets: 1 });
    this._status = "initialized";
  }

  get groupId() {
    return this._client.getGroupId(this._group);
  }

  get subscriptions() {
    const subs: Record<string, string> = {};
    const topicNames = Object.keys(this._subscriptions);
    topicNames.forEach((topicName) => {
      const topicId = this._client.getTopicId(topicName);
      subs[topicId] = this._subscriptions[topicName];
    });
    return subs;
  }

  subscribe(options: ConsumerSubscribeOption) {
    if (!options) {
      throw new MQError(`[RocketMQ-node-sdk] please the subscribe option`);
    }
    const { topic, tag = "" } = options;

    if (!topic) {
      throw new MQError(`[RocketMQ-node-sdk] topic is necessary`);
    }
    this._subscriptions[topic] = tag;
  }

  connect() {
    const topicsCount = Object.keys(this._subscriptions).length;
    if (topicsCount === 0) {
      throw new MQError(`[RocketMQ-node-sdk] consumer connect failed: no topic subscribed`);
    }
    return this._connect({
      group: this.groupId,
      subscriptions: this.subscriptions,
      properties: {},
    });
  }

  close() {
    return this._close();
  }

  async run(options: ConsumerRunOptions) {
    if (!options) {
      throw new MQError("[RocketMQ-node-sdk] please pass the runner option");
    }

    const { eachMessage } = options;

    if (!options.eachMessage) {
      throw new MQError("[RocketMQ-node-sdk] eachMessage is necessary");
    }

    if (this._status !== "connected") {
      throw new MQError(
        `[RocketMQ-node-sdk] Can not run consumer when consumer's status is ${this._status}`
      );
    }

    this._status = "running";

    while (this._status === "running") {
      // When start a consumption processes, consume resolver must be created
      this._consumeResolver = new Resolver();

      await sleep(this._pollingInterval);

      let messages: v1.ConsumeMessage[] = [];
      try {
        const startTime = Date.now();
        const res = await this._pullMessageRequest();
        messages = res.messages || [];
        this._logger.debug(`Pull message succeed.`, {
          timeSpent: Date.now() - startTime,
          payload: { messageCount: messages.length },
        });
      } catch (error) {
        this._logger.error(`Pull message failed: ${error.message}`, {
          payload: isMQError(error) ? error.cause : undefined,
        });
      }

      if (messages.length === 0) {
        // No message pulled down, resolve and continue
        this._consumeResolver.resolve();
        this._consumeResolver = null;
        continue;
      }

      // consume message
      const runResult = await Promise.all(
        messages.map(async (msg) => {
          try {
            const msgResult = await eachMessage(msg);
            return { handle: msg.msgHandle, succeed: msgResult };
          } catch (error) {
            // ack filed when  error
            return { handle: msg.msgHandle, succeed: false };
          }
        })
      );

      // ack message
      try {
        const startTime = Date.now();
        await this._ackMessagesRequest({
          acks: runResult.filter((item) => item.succeed).map((item) => item.handle),
          nacks: runResult.filter((item) => !item.succeed).map((item) => item.handle),
        });
        this._logger.debug(`ACK message succeed`, { timeSpent: Date.now() - startTime });
      } catch (error) {
        this._logger.error(`ACK message failed: ${error.message}`, {
          payload: isMQError(error) ? error.cause : undefined,
        });
      }

      // After all consumption processes are completed, resolved
      this._consumeResolver.resolve();
      this._consumeResolver = null;
    }
  }

  async stop() {
    this._status = "stopping";
    if (this._consumeResolver) {
      await this._consumeResolver.promise;
    }
    this._status = "connected";
  }

  private async _pullMessageRequest() {
    const res = await this._client._request<v1.ConsumeReq, v1.ConsumeResp>({
      method: "POST",
      path: `/v1/group/${encodeURIComponent(this.groupId)}/messages`,
      data: {
        clientToken: this._clientToken as string,
        maxMessageNumber: this._maxMessageNumber,
        maxWaitTimeMs: this._maxWaitTimeMs,
      },
      httpAgent: this._consumerAgent,
    });
    return res.result;
  }

  private async _ackMessagesRequest(options: ACKMessagesOptions) {
    const { acks, nacks = [] } = options;
    const res = await this._client._request<v1.AckReq, v1.AckResp>({
      method: "DELETE",
      path: `/v1/group/${encodeURIComponent(this.groupId)}/msghandles`,
      data: {
        clientToken: this._clientToken as string,
        acks,
        nacks,
      },
      httpAgent: this._consumerAgent,
    });
    return res.result;
  }
}
