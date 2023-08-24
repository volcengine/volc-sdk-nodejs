export class MaasError extends Error {
  code: string;
  code_n: number;
  msg: string;

  constructor(code: string, message: string, code_n: number) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);

    this.msg = message;
    this.code = code;
    this.code_n = code_n;
  }

  toString() {
    return (
      "Detailed exception information is listed below.\n" +
      `code_n: ${this.code_n}\n` +
      `code: ${this.code}\n` +
      `message: ${this.message}`
    );
  }
}

export function new_client_sdk_error(message) {
  return new MaasError("ClientSDKRequestError", String(message), 1709701);
}
