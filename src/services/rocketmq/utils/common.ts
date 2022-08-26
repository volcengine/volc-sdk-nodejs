import { isMQError } from "./error";
import { ErrorCode } from "../ protocol/errors";

export function sleep(time: number) {
  return new Promise((rs) => setTimeout(rs, time));
}

export function requiredCheck<T>(obj: T, keys: Array<keyof T>): string[] {
  const fields: string[] = [];
  for (const key of keys) {
    if (obj[key] === undefined) {
      fields.push(key as string);
    }
  }
  return fields;
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

export function isNeedReconnectError(err: any): boolean {
  if (isMQError(err) && err.type === "REQUEST_ERROR") {
    const cause = err.cause;
    // 两种情况需要重连
    // 1. 没有状态码， 说明有网络问题
    // 2. 有状态码，但是code是ClientNotFound 说明token已经失效
    return !cause?.status || cause?.response?.code === ErrorCode.ClientNotFound;
  } else {
    return false;
  }
}
