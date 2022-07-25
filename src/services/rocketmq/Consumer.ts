import * as v1 from "./ protocol/v1";
import { Worker } from "./Worker";
import { Client } from "./Client";
import { ConsumerOptions, ConsumerStatus, ConsumerRunOptions } from "./types";
import { MQError } from "./utils/error";
import { isString } from "./utils/common";

export class Consumer extends Worker {
  //config
  private _maxMessageNumber: number;

  private _maxWaitTimeMs: number;

  // running
  private _status: ConsumerStatus;

  constructor(client: Client, options: ConsumerOptions) {
    if (!client) {
      throw new MQError("Please pass the client instance of consumer");
    }
    if (!options) {
      throw new MQError("Please pass the options of consumer");
    }
    const { topic = "*", group, maxMessageNumber = 10, maxWaitTimeMs = 3000 } = options;

    super(client, {
      type: "consumer",
      topic: isString(topic) ? [topic] : topic,
      group,
    });

    this._maxMessageNumber = maxMessageNumber;
    this._maxWaitTimeMs = maxWaitTimeMs;
    this._status = "initialized";
  }

  async connect(): Promise<void> {
    const requestId = this._client._createRequestId();
    try {
      const res = await this._connectRequest(requestId, {});
      this._clientToken = res.clientToken;
      this._status = "idle";
      this._startHeartBeat();
    } catch (error) {
      this._status = "connectFailed";
      throw new MQError(`Consumer connect failed, requestId: ${requestId}`);
    }
  }

  async close(): Promise<void> {
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

  async run(options: ConsumerRunOptions) {
    const { eachMessage } = options;

    this._status = "running";

    while (this._status === "running") {
      console.log(this._maxMessageNumber, this._maxWaitTimeMs, eachMessage);
    }
  }

  stop() {
    this._status = "stopped";
  }

  private async _pullMessageRequest() {
    const requestId = this._client._createRequestId();
  }
}
