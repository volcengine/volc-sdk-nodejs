import { Client } from "./Client";
import * as v1 from "./ protocol/v1";
import { MQAgent } from "./utils/agent";
import { getLogLevel, isMQError } from "./utils/common";
import Logger from "./utils/logger";
import { MQError } from "./utils/error";
import { ProducerStatus, ConsumerStatus } from "./types";

export type WorkerType = "consumer" | "producer";

export type WorkerStatus = ProducerStatus | ConsumerStatus;

export interface WorkerOptions {
  type: WorkerType;
}

export type ConnectOptions = Pick<v1.OpenReq, "subscriptions" | "group" | "properties">;

const connectableStatus: WorkerStatus[] = ["initialized", "closed", "connectFailed"];

const closeableStatus: WorkerStatus[] = ["connected", "closeFailed"];

export abstract class Worker {
  protected _workerType: WorkerType;

  protected _status: WorkerStatus;

  protected _client: Client;

  protected _clientToken: string | undefined = undefined;

  protected _logger: Logger;

  private _sessionTimeout: number;

  private _heartBeatTimer: NodeJS.Timeout | null = null;

  private _workerAgent: MQAgent;

  constructor(client: Client, options: WorkerOptions) {
    const { type } = options;

    this._client = client;
    this._workerType = type;
    this._workerAgent = new MQAgent({ maxSockets: 1 });
    this._sessionTimeout = this._client.SESSION_TIMEOUT;
    this._logger = new Logger({
      namespace: this._workerType,
      logLevel: getLogLevel(),
    });
  }

  protected _startHeartBeat() {
    this._stopHeartBeat();
    const interval = (this._sessionTimeout / 2) * 1000;
    this._heartBeatTimer = setInterval(() => this._heartBeat(), interval);
  }

  protected _stopHeartBeat() {
    if (this._heartBeatTimer) {
      clearInterval(this._heartBeatTimer);
      this._heartBeatTimer = null;
    }
  }

  protected async _connect(options: ConnectOptions) {
    if (!connectableStatus.includes(this._status)) {
      throw new MQError(
        `[RocketMQ-node-sdk] Can not connect when ${this._workerType}'s status is ${this._status}`
      );
    }

    const { subscriptions, group, properties } = options;

    try {
      this._status = "connecting";
      const res = await this._client._request<v1.OpenReq, v1.OpenResp>({
        method: "POST",
        path: "/v1/clients",
        data: {
          type: this._workerType,
          clientVersion: this._client.VERSION,
          clientToken: this._clientToken, // It may be a reconnection request.
          subscriptions,
          group,
          properties: {
            ...properties,
            session_timeout: String(this._sessionTimeout),
          },
        },
        httpAgent: this._workerAgent,
      });

      this._clientToken = res.result.clientToken;
      this._startHeartBeat();
      this._status = "connected";

      this._logger.info("Connect succeed.", {
        payload: {
          clientToken: this._clientToken,
          subscriptions,
          group,
          properties,
        },
      });
    } catch (error) {
      this._status = "connectFailed";

      const msg = `Connect failed: ${error.message}`;
      this._logger.error(msg, {
        payload: isMQError(error) ? error.cause : undefined,
      });

      throw new MQError(`[RocketMQ-node-sdk] ${msg}`);
    }
  }

  protected async _close() {
    if (!closeableStatus.includes(this._status)) {
      throw new MQError(
        `[RocketMQ-node-sdk] Can not close when ${this._workerType}'s status is ${this._status}`
      );
    }
    try {
      this._status = "closing";
      await this._client._request<v1.CloseReq, void>({
        method: "delete",
        path: `/v1/clients/${this._clientToken}`,
        data: {
          clientToken: this._clientToken as string,
          properties: {},
        },
        httpAgent: this._workerAgent,
      });

      this._clientToken = undefined;
      this._stopHeartBeat();
      this._status = "closed";

      this._logger.info("Close succeed.", { payload: { clientToken: this._clientToken } });
    } catch (error) {
      this._status = "closeFailed";

      const msg = `Close failed: ${error.message}`;
      this._logger.error(msg, { payload: isMQError(error) ? error.cause : undefined });

      throw new MQError(`[RocketMQ-node-sdk] ${msg}`);
    }
  }

  protected _reconnect() {}

  private async _heartBeat() {
    if (!this._clientToken) {
      return;
    }
    try {
      await this._client._request<v1.HeartbeatReq, void>({
        method: "POST",
        path: "/v1/heartbeats",
        data: { clientToken: this._clientToken },
        httpAgent: this._workerAgent,
        timeout: (this._sessionTimeout / 2) * 1000,
      });
      this._logger.debug(`Heart beat succeed`, {
        payload: { clientToken: this._clientToken },
      });
    } catch (error) {
      this._logger.error(`Heart beat failed: ${error.message}`, {
        payload: isMQError(error) ? error.cause : undefined,
      });
      // TODO: 重链接逻辑
      /**
       * if(404) reconnect, define a status named 'reconnecting' ?
       */
    }
  }
}
