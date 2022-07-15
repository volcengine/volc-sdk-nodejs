export type ErrorType = "NORMAL_ERROR" | "REQUEST_ERROR";

export interface MQErrorConfig {
  type?: ErrorType;
  payload?: any;
}

export class MQError extends Error {
  type: ErrorType;
  payload: any;

  constructor(message: string, config?: MQErrorConfig) {
    super(`[rocketmq-node-sdk] ${message}`);
    const { type = "NORMAL_ERROR", payload } = config || {};
    this.type = type;
    this.payload = payload;
  }
}
