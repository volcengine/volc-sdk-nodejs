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
  if (isMQError(err)) {
    return err.cause?.response?.code === ErrorCode.ClientNotFound;
  } else {
    return false;
  }
}
