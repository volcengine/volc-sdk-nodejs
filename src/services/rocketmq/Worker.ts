import { Client } from "./Client";
import * as v1 from "./ protocol/v1";
import { MQError } from "./utils/error";
import { MQAgent } from "./utils/agent";

export type WorkerType = "consumer" | "producer" | "t-producer";

export interface WorkerOptions {
  type: WorkerType;

  topic: string[];

  group: string;
}

export abstract class Worker {
  // config
  /**
   * "consumer" | "producer" | "t-producer";
   */
  protected _workerType: WorkerType;
  /**
   * Topic for this worker, default to "*". used by connect request.
   */
  protected _topic: string[];

  /**
   * consumer: required
   * t-producer: required
   * producer: allow empty. default to ""
   */
  protected _group: string;

  // running
  protected _client: Client;

  protected _clientToken: string | undefined = undefined;

  private _heartBeatTimer: NodeJS.Timeout | null = null;

  private _workerAgent = new MQAgent({ maxSockets: 1 });

  constructor(client: Client, options: WorkerOptions) {
    const { type, topic, group } = options;
    this._client = client;

    this._workerType = type;
    this._topic = topic;
    this._group = group;
  }

  protected _startHeartBeat() {
    this._heartBeatTimer = setInterval(() => {
      this._heartBeat();
    }, this._client.HEART_BEAT_CYCLE - 10000);
  }

  protected _stopHeartBeat() {
    if (this._heartBeatTimer) {
      clearInterval(this._heartBeatTimer);
    }
  }

  private async _heartBeat() {
    if (!this._clientToken) {
      return;
    }
    const requestId = this._client._createRequestId();
    try {
      await this._client._request<v1.HeartbeatReq, void>({
        method: "POST",
        path: "/v1/heartbeats",
        data: {
          requestId,
          clientToken: this._clientToken,
        },
        httpAgent: this._workerAgent,
      });
    } catch (error) {
      console.error(new MQError(`Heart beat failed, requestId: ${requestId}`));
    }
  }

  protected async _connectRequest(requestId: string, properties: Record<string, string>) {
    const res = await this._client._request<v1.OpenReq, v1.OpenResp>({
      method: "POST",
      path: "/v1/clients",
      data: {
        requestId,
        clientVersion: this._client.VERSION,
        type: this._workerType,
        topics: this._topic,
        group: this._group || "", // default to empty string
        properties: {
          //  pass the heart beat cycle
          sessionTimeoutMs: String(this._client.HEART_BEAT_CYCLE),
          ...properties,
        },
        clientToken: this._clientToken,
      },
      httpAgent: this._workerAgent,
    });
    return res;
  }

  protected async _closeRequest(requestId: string, properties: Record<string, string>) {
    const res = await this._client._request<v1.CloseReq, void>({
      method: "delete",
      path: `/v1/clients/${this._clientToken}`,
      data: {
        requestId,
        clientToken: this._clientToken as string,
        properties: properties,
      },
      httpAgent: this._workerAgent,
    });
    return res;
  }
}
