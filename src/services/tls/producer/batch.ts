import { MAX_BATCH_COUNT, MAX_BATCH_SIZE, type ProducerConfig } from "./config";
import type { BatchLog, ProducerLogGroup, ProducerLogGroupList, CallBack, Result } from "./types";
import { getLogGroupListSize } from "./utils";

const MaxLogGroupCount = 10000;

/**
 * 单个日志批次，负责在内存中聚合日志并携带重试/回调等元信息。
 */
export class Batch {
  /** 当前批次内日志数据的总字节数（通过 protobuf 编码估算）。 */
  totalDataSize: number;
  /** 实际要发送的日志组。 */
  logGroupList: ProducerLogGroupList;
  // 当前批次内日志数量
  logCount: number;
  /** 已失败的发送次数。 */
  attemptCount: number;
  /** 当前累计的重试退避时间，毫秒。 */
  retryBackoffMs: number;
  /** 首次重试退避时间，毫秒。 */
  baseRetryBackoffMs: number;
  /** 后续重试退避时间的增量基准，毫秒。 */
  baseIncreaseRetryBackoffMs: number;
  /** 下一次重试的计划时间点，毫秒时间戳。 */
  nextRetryMs: number;
  /** 单次重试退避时间的上限，毫秒。 */
  maxRetryIntervalInMs: number;
  /** 该批次关联的回调列表。 */
  callBackList: CallBack[];
  /** 批次创建时间，用于 LingerTime 判断。 */
  createTime: number;
  /** 允许的最大重试次数。 */
  maxRetryTimes: number;
  /** 目标日志主题。 */
  topic: string;
  /** 固定分区路由键（选填）。 */
  shardHash?: string;
  /** 聚合后的发送结果。 */
  result: Result;
  /** 最多保留的 Attempt 条目数。 */
  maxReservedAttempts: number;

  constructor(params: { topic: string; shardHash?: string; config: ProducerConfig }) {
    const { topic, shardHash, config } = params;

    this.logGroupList = { LogGroups: [] };
    this.totalDataSize = 0;
    this.logCount = 0;
    this.attemptCount = 0;
    this.retryBackoffMs = 0;
    this.baseRetryBackoffMs = config.BaseRetryBackoffMs;
    this.baseIncreaseRetryBackoffMs = 1000;
    this.nextRetryMs = 0;
    this.maxRetryIntervalInMs = config.MaxRetryBackoffMs;
    this.callBackList = [];
    this.createTime = Date.now();
    this.maxRetryTimes = config.Retries;
    this.topic = topic;
    this.shardHash = shardHash;
    this.result = {
      Attempts: [],
      SuccessFlag: false,
    };
    this.maxReservedAttempts = config.MaxReservedAttempts;
  }

  /**
   * 尝试向当前批次追加一条日志。
   *
   * @param batchLog 日志内容。
   * @param callBack 该条日志对应的回调（可选）。
   * @returns 是否追加成功；若返回 false，说明需要开启新的批次。
   */
  async tryAddLog(batchLog: BatchLog, callBack?: CallBack): Promise<boolean> {
    const { Source, FileName, ContextFlow } = batchLog.Key;

    let group = this.getOrCreateTailGroup(Source, FileName, ContextFlow);

    if (group.Logs.length >= MaxLogGroupCount) {
      group = this.createGroup(Source, FileName, ContextFlow);
      this.logGroupList.LogGroups.push(group);
    }

    group.Logs.push(batchLog.Log);
    this.logCount++;
    this.totalDataSize = await getLogGroupListSize(this.logGroupList);

    if (!this.hasRoomFor(0, 0)) {
      group.Logs.pop();
      this.logCount--;

      if (
        group.Logs.length === 0 &&
        this.logGroupList.LogGroups.length > 0 &&
        this.logGroupList.LogGroups[this.logGroupList.LogGroups.length - 1] === group
      ) {
        this.logGroupList.LogGroups.pop();
      }

      return false;
    }

    if (callBack) {
      this.callBackList.push(callBack);
    }
    return true;
  }

  getOrCreateTailGroup(source: string, filename: string, contextFlow?: string): ProducerLogGroup {
    if (this.logGroupList.LogGroups.length === 0) {
      const group = this.createGroup(source, filename, contextFlow);
      this.logGroupList.LogGroups.push(group);

      return group;
    }

    const lastGroup = this.logGroupList.LogGroups[this.logGroupList.LogGroups.length - 1];
    if (
      lastGroup.Source === source &&
      lastGroup.FileName === filename &&
      lastGroup.ContextFlow == contextFlow
    ) {
      return lastGroup;
    }

    const group = this.createGroup(source, filename, contextFlow);
    this.logGroupList.LogGroups.push(group);

    return group;
  }

  createGroup(source: string, filename: string, contextFlow?: string): ProducerLogGroup {
    return {
      Source: source,
      FileName: filename,
      ContextFlow: contextFlow,
      Logs: [],
      LogTags: [],
    };
  }

  /**
   * 判断按给定 size 与数量追加日志后，是否仍然满足 Batch 大小与条数限制。
   */
  hasRoomFor(size: number, cnt: number): boolean {
    return this.totalDataSize + size <= MAX_BATCH_SIZE && this.logCount + cnt <= MAX_BATCH_COUNT;
  }

  /**
   * 判断当前批次是否已经满足发送条件：
   * - Batch 内累计大小达到或超过 MaxBatchSize；或
   * - Batch 内日志条数达到或超过 MaxBatchCount。
   */
  meetSendCondition(config: ProducerConfig): boolean {
    return this.totalDataSize >= config.MaxBatchSize || this.logCount >= config.MaxBatchCount;
  }
}
