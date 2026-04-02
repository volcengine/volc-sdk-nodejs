import { getDefaultOption } from "../utils";

/**
 * Producer 配置结构。
 */
export interface ProducerConfig {
  /** 单个 Producer 实例能缓存的日志总大小上限，单位：字节，默认 100 * 1024 * 1024。 */
  TotalSizeLnBytes: number;
  /** 单个 Producer 能并发发送的最大请求数，默认 50。 */
  MaxSenderCount: number;
  /**
   * 当缓冲区可用空间不足时，SendLog/SendLogs 的最大阻塞时间（秒）。
   * > 0：最多阻塞 MaxBlockSec 秒；
   * = 0：立即失败并抛出 TimeoutException；
   * < 0：无限等待直到有可用空间。
   */
  MaxBlockSec: number;
  /** 单个 Batch 中缓存的日志大小上限，单位：字节，默认 512 * 1024。 */
  MaxBatchSize: number;
  /** 单个 Batch 中缓存的最大日志条数，默认 4096。 */
  MaxBatchCount: number;
  /** 一个 Batch 从创建到达到可发送状态的逗留时间，单位：毫秒，默认 2000。 */
  LingerTime: number;
  /** 如果首次发送失败，对同一批次允许的最大重试次数，默认 10。 */
  Retries: number;
  /** 每个 Batch 返回给用户最多保留的 Attempt 条数，默认 11。 */
  MaxReservedAttempts: number;
  /** 首次重试的退避时间，单位：毫秒，默认 1000。 */
  BaseRetryBackoffMs: number;
  /** 重试的最大退避时间，单位：毫秒，默认 10 * 1000。 */
  MaxRetryBackoffMs: number;
  /** 是否开启固定分区路由，默认 true。 */
  AdjustShardHashFlag: boolean;
  /** 日志主题的分区数，默认 2。 */
  ShardCount: number;
  /** 不需要重试的 HTTP 状态码列表，默认 [400, 404]。 */
  NoRetryStatusCodeList: number[];

  /** TLS 服务访问 Endpoint，例如 https://tls-cn-beijing.volces.com。 */
  Endpoint?: string;
  /** TLS 服务 Region，例如 cn-beijing。 */
  Region?: string;
  /** 火山引擎访问密钥 AccessKeyID。 */
  AccessKeyID?: string;
  /** 火山引擎访问密钥 AccessKeySecret。 */
  AccessKeySecret?: string;
  /** STS 临时访问凭证 SecurityToken。 */
  SecurityToken?: string;

  /**
   * 自定义请求 Header（可选），会透传到最终 HTTP 请求。
   *
   * 典型用途：
   * - 匿名身份鉴权：x-tls-anonymous-identity
   * - 链路追踪/灰度/自定义 User-Agent 等
   */
  Headers?: Record<string, string>;
}

/**
 * 单个 Batch 的最大字节数硬上限，单位：字节。
 */
export const MAX_BATCH_SIZE = 8 * 1024 * 1024; // 8 MB

/**
 * 单个 Batch 的最大日志条数硬上限。
 */
export const MAX_BATCH_COUNT = 32768;

/** TimeoutException 文本 */
export const TIMEOUT_EXCEPTION = "TimeoutException";

/**
 * 根据环境变量和默认值生成一份 Producer 配置。
 */
export function getDefaultProducerConfig(): ProducerConfig {
  const defaults = getDefaultOption();
  return {
    TotalSizeLnBytes: 100 * 1024 * 1024,
    MaxSenderCount: 50,
    MaxBlockSec: 60,
    MaxBatchSize: 512 * 1024,
    MaxBatchCount: 4096,
    LingerTime: 2000,
    Retries: 10,
    MaxReservedAttempts: 11,
    BaseRetryBackoffMs: 1000,
    MaxRetryBackoffMs: 10 * 1000,
    AdjustShardHashFlag: true,
    ShardCount: 2,
    NoRetryStatusCodeList: [400, 404],
    Endpoint: defaults.host,
    Region: defaults.region,
    AccessKeyID: defaults.accessKeyId,
    AccessKeySecret: defaults.secretKey,
    SecurityToken: "",
  };
}

function validateNumberField(
  val: number | undefined,
  min: number,
  max: number,
  defaultVal: number
): number {
  if (typeof val !== "number" || Number.isNaN(val)) return defaultVal;
  if (val < min || val > max) return defaultVal;
  return val;
}

/**
 * 将用户传入的配置与默认值合并，并做边界校验与修正。
 */
export function validateProducerConfig(config?: ProducerConfig): ProducerConfig {
  const base = getDefaultProducerConfig();
  const merged: ProducerConfig = {
    ...base,
    ...config,
  };

  merged.MaxReservedAttempts = validateNumberField(
    merged.MaxReservedAttempts,
    0,
    Number.MAX_SAFE_INTEGER,
    base.MaxReservedAttempts as number
  );

  merged.MaxBatchCount = validateNumberField(
    merged.MaxBatchCount,
    0,
    MAX_BATCH_COUNT,
    base.MaxBatchCount
  );

  merged.MaxBatchSize = validateNumberField(
    merged.MaxBatchSize,
    0,
    MAX_BATCH_SIZE,
    base.MaxBatchSize
  );

  merged.MaxSenderCount = validateNumberField(
    merged.MaxSenderCount,
    0,
    Number.MAX_SAFE_INTEGER,
    base.MaxSenderCount as number
  );

  merged.BaseRetryBackoffMs = validateNumberField(
    merged.BaseRetryBackoffMs,
    0,
    Number.MAX_SAFE_INTEGER,
    base.BaseRetryBackoffMs as number
  );

  merged.MaxRetryBackoffMs = validateNumberField(
    merged.MaxRetryBackoffMs,
    0,
    Number.MAX_SAFE_INTEGER,
    base.MaxRetryBackoffMs as number
  );

  merged.TotalSizeLnBytes = validateNumberField(
    merged.TotalSizeLnBytes,
    0,
    Number.MAX_SAFE_INTEGER,
    base.TotalSizeLnBytes as number
  );

  merged.LingerTime = validateNumberField(
    merged.LingerTime,
    100,
    Number.MAX_SAFE_INTEGER,
    base.LingerTime as number
  );

  if (!Array.isArray(merged.NoRetryStatusCodeList) || merged.NoRetryStatusCodeList.length === 0) {
    merged.NoRetryStatusCodeList = [400, 404];
  }

  return merged;
}
