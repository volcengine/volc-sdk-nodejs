import { Client } from "./Client";
import * as v1 from "./protocol/v1";
import { MQAgent } from "./utils/agent";
import Logger from "./utils/logger";
import { MQError, isMQError } from "./utils/error";
import { WorkerStatus } from "./types";
import { Resolver, sleep } from "./utils/common";

export type WorkerType = "consumer" | "producer";

export interface WorkerOptions {
  type: WorkerType;
}

export type ConnectOptions = Pick<v1.OpenReq, "subscriptions" | "group" | "properties">;

const connectableStatus: WorkerStatus[] = ["initialized", "closed", "connectFailed"];

const closeableStatus: WorkerStatus[] = ["connected", "closeFailed"];

export abstract class Worker {
  protected _workerType: WorkerType;

  protected _workerStatus: WorkerStatus;

  protected _client: Client;

  protected _clientToken: string | undefined = undefined;

  protected _logger: Logger;

  private _heartBeatTimer: NodeJS.Timeout | null = null;

  private _workerAgent: MQAgent;
  /**
   * 保存链接时的选项，用于重连
   */
  private _connectOption: ConnectOptions | null = null;

  /**
   * 重连成功或者失败时的resolver
   */
  private _reconnectResolver: Resolver | null;

  constructor(client: Client, options: WorkerOptions) {
    const { type } = options;

    this._client = client;
    this._workerType = type;
    this._workerAgent = new MQAgent({ maxSockets: 1 });

    this._logger = new Logger({ namespace: this._workerType });

    this._workerStatus = "initialized";
  }

  protected _startHeartBeat() {
    this._stopHeartBeat();
    const interval = (this._client.SESSION_TIMEOUT * 1000) / 2;
    this._heartBeatTimer = setInterval(() => this._heartBeat(), interval);
  }

  protected _stopHeartBeat() {
    if (this._heartBeatTimer) {
      clearInterval(this._heartBeatTimer);
      this._heartBeatTimer = null;
    }
  }

  protected async _connect(options: ConnectOptions) {
    if (!connectableStatus.includes(this._workerStatus)) {
      throw new MQError(
        `[RocketMQ-node-sdk] Can not connect when ${this._workerType}'s status is ${this._workerStatus}`
      );
    }

    // 保存option 以便重连时使用
    this._connectOption = options;

    try {
      this._workerStatus = "connecting";

      const res = await this._connectRequest(options);

      this._clientToken = res.result.clientToken;
      this._startHeartBeat();
      this._workerStatus = "connected";

      this._logger.info("Connect succeed.", {
        payload: { clientToken: this._clientToken, ...options },
      });
    } catch (error) {
      this._workerStatus = "connectFailed";

      const msg = `Connect failed: ${error.message}`;
      this._logger.error(msg, { payload: isMQError(error) ? error.cause : undefined });

      throw new MQError(`[RocketMQ-node-sdk] ${msg}`);
    }
  }

  protected async _close() {
    if (!closeableStatus.includes(this._workerStatus)) {
      throw new MQError(
        `[RocketMQ-node-sdk] Can not close when ${this._workerType}'s status is ${this._workerStatus}`
      );
    }

    try {
      this._workerStatus = "closing";

      await this._closeRequest();

      this._clientToken = undefined;
      this._connectOption = null;
      this._stopHeartBeat();
      this._workerStatus = "closed";

      this._logger.info("Close succeed.", {
        payload: { clientToken: this._clientToken },
      });
    } catch (error) {
      this._workerStatus = "closeFailed";
      const msg = `Close failed: ${error.message}`;

      this._logger.error(msg, { payload: isMQError(error) ? error.cause : undefined });

      throw new MQError(`[RocketMQ-node-sdk] ${msg}`);
    }
  }

  protected async _reconnect() {
    // 如果有_reconnectResolver，说明正在重连，不需要执行后续重连逻辑
    if (this._reconnectResolver) return;

    this._reconnectResolver = new Resolver();

    // 开始不断尝试重连
    // 仅仅在 connected状态才不断尝试重连，防止关闭后循环依然在执行
    while (this._workerStatus === "connected") {
      try {
        this._logger.info("Reconnecting.", { payload: { prevClientToken: this._clientToken } });

        const res = await this._connectRequest(this._connectOption as ConnectOptions);
        this._clientToken = res.result.clientToken;

        this._logger.info("Reconnect succeed.", { payload: { clientToken: this._clientToken } });

        break;
      } catch (error) {
        this._logger.error(`Reconnect Failed: ${error.message}`, {
          payload: isMQError(error) ? error.cause : undefined,
        });
      }

      await sleep(10000); // 10秒重试一次
    }

    // 重连后要解决
    this._reconnectResolver?.resolve();
    this._reconnectResolver = null;
  }

  protected _waitReconnectIfNecessary() {
    if (this._reconnectResolver) {
      return this._reconnectResolver.promise;
    }
    return Promise.resolve();
  }

  private async _heartBeat() {
    try {
      await this._heartBeatRequest();
      this._logger.debug("Heart beat succeed.", { payload: { clientToken: this._clientToken } });
    } catch (error) {
      this._logger.error(`Heart beat failed: ${error.message}`, {
        payload: isMQError(error) ? error.cause : undefined,
      });
    }
  }

  private _connectRequest(options: ConnectOptions) {
    const { subscriptions, group, properties } = options;

    return this._client._request<v1.OpenReq, v1.OpenResp>({
      method: "POST",
      path: "/v1/clients",
      data: {
        type: this._workerType,
        clientVersion: this._client.VERSION,
        clientToken: this._clientToken, // It is may be a reconnection request.
        subscriptions,
        group,
        properties: {
          ...properties,
          session_timeout: String(this._client.SESSION_TIMEOUT),
        },
      },
      httpAgent: this._workerAgent,
    });
  }

  private _closeRequest() {
    return this._client._request<v1.CloseReq, void>({
      method: "delete",
      path: `/v1/clients/${this._clientToken}`,
      data: {
        clientToken: this._clientToken as string,
        properties: {},
      },
      httpAgent: this._workerAgent,
    });
  }

  private _heartBeatRequest() {
    if (!this._clientToken) {
      return;
    }
    return this._client._request<v1.HeartbeatReq, void>({
      method: "POST",
      path: "/v1/heartbeats",
      data: { clientToken: this._clientToken },
      httpAgent: this._workerAgent,
    });
  }
}
