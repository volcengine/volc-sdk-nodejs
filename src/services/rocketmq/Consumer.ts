import * as v1 from "./protocol/v1";
import { Worker } from "./Worker";
import { Client } from "./Client";
import {
  ConsumerOptions,
  ConsumerRunOptions,
  ACKMessagesOptions,
  ConsumerSubscribeOption,
} from "./types";
import { requiredCheck, sleep } from "./utils/common";
import { isMQError, MQError } from "./utils/error";
import { isNeedReconnectError } from "./utils/common";
import { MQAgent } from "./utils/agent";

export class Consumer extends Worker {
  /**
   * 消费组
   */
  private _group: string;
  /**
   * 订阅的Topic和tag
   */
  private _subscriptions: Record<string, string>;
  /**
   * 单次拉取消息最大数量
   */
  private _maxMessageNumber: number;
  /**
   * 单次拉取消息最大等待时长
   */
  private _maxWaitTimeMs: number;
  /**
   * 轮询间隔
   */
  private _pollingInterval: number;

  private _consumerAgent: MQAgent;

  /**
   * 是否正在轮询
   */
  private _running: boolean;

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
    this._running = false;
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

    if (!options.eachMessage) {
      throw new MQError("[RocketMQ-node-sdk] eachMessage is necessary");
    }

    if (this._workerStatus !== "connected") {
      throw new MQError(
        `[RocketMQ-node-sdk] Can not run consumer when consumer's status is ${this._workerStatus}`
      );
    }

    if (this._running) {
      throw new MQError("[RocketMQ-node-sdk] Consumer is already running");
    }

    this._running = true;

    while (this._running) {
      if (this._pollingInterval) {
        await sleep(this._pollingInterval);
      }

      try {
        const startTime = Date.now();
        const messages = await this._consume(options);
        this._logger.debug("Consume messages succeed.", {
          timeSpent: Date.now() - startTime,
          payload: { messagesCount: messages?.length },
        });
      } catch (error) {
        if (isNeedReconnectError(error)) {
          this._logger.debug(`Lost connection when consuming message: ${error.message}`);
          this._reconnect(); // 开始重新连接
          await this._waitReconnectIfNecessary(); // 等待重连成功后才进入下一次轮询
          continue;
        }
        this._logger.error(`Consume messages failed: ${error.message}`, {
          payload: isMQError(error) ? error.cause : undefined,
        });
      }
    }
  }

  async stop() {
    this._running = false;
  }

  private async _consume(options: ConsumerRunOptions) {
    const { eachMessage } = options;

    const res = await this._pullMessageRequest();
    const messages = res.messages || [];

    if (messages.length > 0) {
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
      await this._ackMessagesRequest({
        acks: runResult.filter((item) => item.succeed).map((item) => item.handle),
        nacks: runResult.filter((item) => !item.succeed).map((item) => item.handle),
      });
    }

    return messages;
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
