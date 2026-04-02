export enum LogLevel {
  Debug,
  Info,
  Warn,
  Error,
}

export interface LoggerConfig {
  LogLevel?: LogLevel;
  IsJsonType?: boolean;
}

const DEFAULT_LOGGER_CONFIG: Required<LoggerConfig> = {
  LogLevel: LogLevel.Info,
  IsJsonType: false,
};

/**
 * logfmt 格式中单个 key=value 片段的格式化。
 *
 * 规则说明：
 * - 对于字符串，如果包含空格或等号，使用 JSON 字符串（带引号）包裹；
 * - 对于其他类型，直接使用 String(value)；
 * - 最终拼接为 `key=value` 形式。
 */
function formatLogfmtPair(key: string, value: unknown): string {
  let rendered: string;

  if (typeof value === "string") {
    if (/\s|=/.test(value)) {
      rendered = JSON.stringify(value);
    } else {
      rendered = value;
    }
  } else {
    rendered = String(value);
  }

  return `${key}=${rendered}`;
}

/**
 * 将日志对象转换为 logfmt 字符串。
 */
function toLogfmt(record: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const key of Object.keys(record)) {
    const value = record[key];
    parts.push(formatLogfmtPair(key, value));
  }
  return parts.join(" ");
}

export class Logger {
  private readonly config: LoggerConfig;
  private readonly currentLevel: LogLevel;
  private readonly logger = console;

  constructor(config?: LoggerConfig) {
    const merged: LoggerConfig = {
      ...DEFAULT_LOGGER_CONFIG,
      ...(config || {}),
    };

    this.currentLevel = merged.LogLevel || LogLevel.Info;
    this.config = merged;
  }

  debug(msg: string, fields?: Record<string, unknown>): void {
    this.log(LogLevel.Debug, msg, fields);
  }

  info(msg: string, fields?: Record<string, unknown>): void {
    this.log(LogLevel.Info, msg, fields);
  }

  warn(msg: string, fields?: Record<string, unknown>): void {
    this.log(LogLevel.Warn, msg, fields);
  }

  error(msg: string, fields?: Record<string, unknown>): void {
    this.log(LogLevel.Error, msg, fields);
  }

  /**
   * 内部统一日志输出实现：根据级别做过滤，并选择 JSON 或 logfmt 格式打印。
   */
  private log(level: LogLevel, msg: string, fields?: Record<string, unknown>): void {
    // 级别过滤：当前日志级别数值小于配置级别则丢弃。
    if (level < this.currentLevel) {
      return;
    }

    const now = new Date().toISOString();

    // 基础字段：time / level / msg
    const record: Record<string, unknown> = {
      time: now,
      level,
      msg,
    };

    // 附加字段：用户传入的键值对，避免覆盖基础字段。
    if (fields) {
      for (const key of Object.keys(fields)) {
        if (key === "time" || key === "level" || key === "msg") {
          continue;
        }
        record[key] = fields[key];
      }
    }

    if (this.config.IsJsonType) {
      this.printJson(record, level);
    } else {
      this.printLogfmt(record, level);
    }
  }

  /**
   * JSON 输出：序列化为单行 JSON 字符串。
   */
  private printJson(record: Record<string, unknown>, level: LogLevel): void {
    const line = JSON.stringify(record);

    switch (level) {
      case LogLevel.Debug:
        this.logger.debug(line);
        break;
      case LogLevel.Info:
        this.logger.info(line);
        break;
      case LogLevel.Warn:
        this.logger.warn(line);
        break;
      case LogLevel.Error:
      default:
        this.logger.error(line);
        break;
    }
  }

  /**
   * logfmt 输出：key=value key2=value2 ...
   */
  private printLogfmt(record: Record<string, unknown>, level: LogLevel): void {
    const line = toLogfmt(record);

    switch (level) {
      case LogLevel.Debug:
        this.logger.debug(line);
        break;
      case LogLevel.Info:
        this.logger.info(line);
        break;
      case LogLevel.Warn:
        this.logger.warn(line);
        break;
      case LogLevel.Error:
      default:
        this.logger.error(line);
        break;
    }
  }
}

export default new Logger();
