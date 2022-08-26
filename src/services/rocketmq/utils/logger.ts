import dayjs from "dayjs";

export type LogType = "ERROR" | "INFO" | "WARN" | "DEBUG";

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LoggerConfig {
  namespace: string;
}

export interface LogParams {
  timeSpent?: number;
  payload?: Record<string, any>;
}

export interface FormatConfig {
  logType: LogType;
}

export default class Logger {
  private _namespace: string;
  private _logLevel: LogLevel;

  constructor(config: LoggerConfig) {
    const { namespace } = config;

    this._namespace = namespace;
    this._logLevel = this.getLogLevel();
  }

  error(msg: string, params: LogParams = {}) {
    if (LogLevel.ERROR < this._logLevel) return;

    const logMsg = this._formatLog(msg, params, { logType: "ERROR" });
    this._print(logMsg);
  }

  warn(msg: string, params: LogParams = {}) {
    if (LogLevel.WARN < this._logLevel) return;

    const logMsg = this._formatLog(msg, params, { logType: "WARN" });
    this._print(logMsg);
  }

  info(msg: string, params: LogParams = {}) {
    if (LogLevel.INFO < this._logLevel) return;

    const logMsg = this._formatLog(msg, params, { logType: "INFO" });
    this._print(logMsg);
  }

  debug(msg: string, params: LogParams = {}) {
    if (LogLevel.DEBUG < this._logLevel) return;

    const logMsg = this._formatLog(msg, params, { logType: "DEBUG" });
    this._print(logMsg);
  }

  private _formatLog(msg: string, params: LogParams, config: FormatConfig) {
    const { logType } = config;
    const { timeSpent, payload } = params;

    const timeNow = dayjs().format("YYYY-MM-DD HH:mm:ss");

    const msgList: string[] = [timeNow, logType, `[${this._namespace}]`];

    if (msg) msgList.push(msg);
    if (timeSpent !== undefined) msgList.push(`${timeSpent}ms`);
    if (payload) msgList.push(JSON.stringify(payload));

    return msgList.join("\t");
  }

  private _print(msg) {
    console.log(msg); // eslint-disable-line
  }

  private getLogLevel() {
    const level = Number(process.env.MQ_LOG_LEVEL);
    if (Number.isNaN(level)) {
      return LogLevel.INFO;
    }
    if (level < LogLevel.DEBUG || level > LogLevel.ERROR) {
      return LogLevel.INFO;
    }
    return level;
  }
}
