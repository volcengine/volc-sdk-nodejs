import { MQError } from "./error";
import { LogLevel } from "./logger";

export function requiredCheck<T>(obj: T, keys: Array<keyof T>): string[] {
  const fields: string[] = [];
  for (const key of keys) {
    if (obj[key] === undefined) {
      fields.push(key as string);
    }
  }
  return fields;
}

export function isMQError(error: any): error is MQError {
  return error instanceof MQError;
}

export function getLogLevel() {
  const level = Number(process.env.MQ_LOG_LEVEL);
  if (Number.isNaN(level)) {
    return LogLevel.INFO;
  }
  if (level < LogLevel.DEBUG || level > LogLevel.ERROR) {
    return LogLevel.INFO;
  }
  return level;
}

export class Resolver<R = void> {
  promise: Promise<R>;

  resolve: (data: R) => void;

  reject: (e: any) => void;

  constructor() {
    this.promise = new Promise<R>((rs, rj) => {
      this.resolve = rs;
      this.reject = rj;
    });
  }
}

export function sleep(time: number) {
  return new Promise((rs) => setTimeout(rs, time));
}
