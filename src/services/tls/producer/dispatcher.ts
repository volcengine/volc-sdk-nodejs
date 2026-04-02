import type { ProducerConfig } from "./config";
import type { BatchLog } from "./types";
import { Batch } from "./batch";
import { RetryQueue } from "./retry_queue";
import type { ThreadPool } from "./thread_pool";
import { getTimeMs } from "./utils";

const KEY_DELIMITER = "|";

interface DispatcherCallbacks {
  /** 新日志进入缓存时，增加 Producer 层面的内存计数。 */
  increaseBufferedSize: (delta: number) => void;
}

/**
 * 负责根据 Topic/ShardHash/Source/FileName/ContextFlow 维度聚合日志，
 * 并在满足批量条件或超时、重试到期时将批次提交给线程池发送。
 */
export class Dispatcher {
  private readonly config: ProducerConfig;
  private readonly retryQueue: RetryQueue;
  private readonly threadPool: ThreadPool;
  private readonly callbacks: DispatcherCallbacks;

  private readonly logGroupData = new Map<string, Batch>();
  private timer: NodeJS.Timeout | null = null;
  private closed = false;
  private forceClosed = false;

  constructor(params: {
    config: ProducerConfig;
    retryQueue: RetryQueue;
    threadPool: ThreadPool;
    callbacks: DispatcherCallbacks;
  }) {
    const { config, retryQueue, threadPool, callbacks } = params;
    this.config = config;
    this.retryQueue = retryQueue;
    this.threadPool = threadPool;
    this.callbacks = callbacks;
  }

  /** 启动定时检查逻辑，用于处理 LingerTime 与重试到期。 */
  start(): void {
    if (this.timer) return;
    const interval = Math.max(200, Math.min(this.config.LingerTime, 1000));
    this.timer = setInterval(() => {
      this.tick();
    }, interval);
  }

  /**
   * 新日志进入 Dispatcher 进行聚合。
   * @param batchLog 日志及其聚合 key。
   * @param logSize 日志的 protobuf 编码大小。
   */
  async handleLog(batchLog: BatchLog, logSize: number): Promise<void> {
    if (this.closed || this.forceClosed) {
      throw new Error("the producer is closed");
    }

    const key = this.getKeyString(batchLog);

    const batch = this.getOrCreateBatch(key, batchLog);
    const added = await batch.tryAddLog(batchLog, batchLog.Key.CallBackFun);

    if (added) {
      this.callbacks.increaseBufferedSize(logSize);
      if (batch.meetSendCondition(this.config)) {
        this.innerSendToServer(key, batch);
      }
      return;
    }

    this.innerSendToServer(key, batch);

    const newBatch = new Batch({
      topic: batchLog.Key.Topic,
      shardHash: batchLog.Key.ShardHash || undefined,
      config: this.config,
    });
    this.logGroupData.set(key, newBatch);
    await newBatch.tryAddLog(batchLog, batchLog.Key.CallBackFun);
    this.callbacks.increaseBufferedSize(logSize);

    if (newBatch.meetSendCondition(this.config)) {
      this.innerSendToServer(key, newBatch);
    }
  }

  // 获取或创建批次，若不存在则创建新批次
  getOrCreateBatch = (key: string, batchLog: BatchLog): Batch => {
    if (this.logGroupData.has(key)) {
      return this.logGroupData.get(key) as Batch;
    }

    const batch = new Batch({
      topic: batchLog.Key.Topic,
      shardHash: batchLog.Key.ShardHash || undefined,
      config: this.config,
    });

    this.logGroupData.set(key, batch);
    return batch;
  };

  /**
   * 优雅关闭：
   * - 停止定时器；
   * - 将 logGroupData 中的所有批次提交线程池；
   * - 将重试队列中的所有批次提交线程池。
   */
  async closeGracefully(): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    // 将聚合中的批次全部发送
    for (const [key, batch] of this.logGroupData.entries()) {
      this.innerSendToServer(key, batch);
    }
    this.logGroupData.clear();

    // 将重试队列中的所有批次全部发送
    const retryBatches = this.retryQueue.getRetryBatches(true);
    for (const batch of retryBatches) {
      this.threadPool.submit(batch);
    }
  }

  /** 强制关闭：丢弃所有待发送与待重试的数据。 */
  closeForce(): void {
    if (this.forceClosed) return;
    this.forceClosed = true;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.logGroupData.clear();
    this.retryQueue.clear();
  }

  private tick(): void {
    if (this.closed || this.forceClosed) return;

    const now = getTimeMs();

    // 处理因 LingerTime 超时需要发送的批次
    for (const [key, batch] of this.logGroupData.entries()) {
      const age = now - batch.createTime;
      if (age >= this.config.LingerTime) {
        this.innerSendToServer(key, batch);
      }
    }

    // 处理到期的重试批次
    const retryBatches = this.retryQueue.getRetryBatches(false);
    for (const batch of retryBatches) {
      this.threadPool.submit(batch);
    }
  }

  private innerSendToServer(key: string, batch: Batch): void {
    this.threadPool.submit(batch);
    this.logGroupData.delete(key);
  }

  private getKeyString(batchLog: BatchLog): string {
    const key = batchLog.Key;
    return [key.Topic, key.ShardHash || "", key.Source, key.FileName, key.ContextFlow || ""].join(
      KEY_DELIMITER
    );
  }
}
