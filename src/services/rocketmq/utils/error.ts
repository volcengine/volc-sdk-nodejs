import { ErrorCode } from "../ protocol/errors";

export type ErrorType = "NORMAL_ERROR" | "REQUEST_ERROR";

export interface MQErrorConfig {
  type?: ErrorType;
  cause?: any;
}

export class MQError extends Error {
  type: ErrorType;

  cause: any;

  constructor(e: any, config?: MQErrorConfig) {
    const { type = "NORMAL_ERROR", cause } = config || {};
    super(e);

    this.type = type;
    this.cause = cause;
  }
}

export function isMQError(error: any): error is MQError {
  return error instanceof MQError;
}

export function isNeedReconnectError(err: any): boolean {
  if (isMQError(err)) {
    return err.cause?.response?.code === ErrorCode.ClientNotFound;
  } else {
    return false;
  }
}
