import type { Log, LogGroup, LogGroupList } from "../types";

/**
 * 单次日志发送尝试信息。
 */
export interface Attempt {
  /** 本次尝试是否成功。 */
  SuccessFlag: boolean;
  /** TLS 返回的请求 ID，例如响应头 x-tls-requestid。 */
  RequestId: string;
  /** TLS 返回的错误码。 */
  ErrorCode: string;
  /** 错误信息，通常来自响应体的 Message 字段或底层异常。 */
  ErrorMessage: string;
  /** 本次尝试的时间戳，单位为毫秒。 */
  TimestampMs: number;
}

/**
 * 日志发送结果聚合结构。
 */
export interface Result {
  /** 发送过程中所有尝试记录，按时间顺序追加。 */
  Attempts: Attempt[];
  /** 是否至少有一次发送成功。 */
  SuccessFlag: boolean;
}

/**
 * Producer 回调接口。
 *
 * 注意：回调实现内部不应执行阻塞操作，应尽快返回，避免影响后续发送。
 */
export interface CallBack {
  /**
   * 批次最终发送成功时触发。
   * @param result 发送结果，包含所有尝试信息。
   */
  Success(result: Result): void;

  /**
   * 批次最终失败且不再重试时触发。
   * @param result 发送结果，包含所有尝试信息。
   */
  Fail(result: Result): void;
}

/**
 * 内部使用：批次聚合 Key，用于区分不同的日志流。
 */
export interface BatchKey {
  Topic: string;
  Source: string;
  ShardHash: string;
  FileName: string;
  ContextFlow?: string;
  CallBackFun?: CallBack;
}

/**
 * 内部使用：单条待聚合日志。
 */
export interface BatchLog {
  Key: BatchKey;
  Log: Log;
}

/**
 * 对应 tls.proto 中的 Log 定义，方便对外暴露类型别名。
 */
export type ProducerLog = Log;

/**
 * 对应 tls.proto 中的 LogGroup 定义，方便对外暴露类型别名。
 */
export type ProducerLogGroup = LogGroup;

/**
 * 对应 tls.proto 中的 LogGroupList 定义，方便对外暴露类型别名。
 */
export type ProducerLogGroupList = LogGroupList;
