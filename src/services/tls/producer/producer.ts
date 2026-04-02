import Service from "../service";
import { TIMEOUT_EXCEPTION, validateProducerConfig, getDefaultProducerConfig } from "./config";
import { RetryQueue } from "./retry_queue";
import { Sender } from "./sender";
import { ThreadPool } from "./thread_pool";
import { Dispatcher } from "./dispatcher";
import { getLogSize, sleep } from "./utils";
import logger from "../logger";
import type { ProducerConfig } from "./config";
import type { CallBack, BatchLog, ProducerLog, ProducerLogGroup } from "./types";

const SERVICE = "TLS";
// TODO: Golang sdk 使用 0.3.0，确认参数是否一致
const VERSION = "0.2.0";
const PROTOCOL = "https:";

/**
 * TLS Producer 核心实现。
 *
 * - 支持异步发送与批量聚合；
 * - 支持 TotalSizeLnBytes 与 MaxBlockSec 控制阻塞策略；
 * - 支持 MaxSenderCount 控制并发度；
 * - 支持 Retries、指数退避与 NoRetryStatusCodeList；
 * - 支持优雅关闭（Close）与强制关闭（ForceClose）。
 */
export class Producer {
  private readonly config: ProducerConfig;
  private readonly service: Service;
  private readonly retryQueue: RetryQueue;
  private readonly sender: Sender;
  private readonly threadPool: ThreadPool;
  private readonly dispatcher: Dispatcher;

  /** 当前 Producer 已缓存日志估算大小总和，单位字节。 */
  private bufferedSize = 0;
  private started = false;
  private closed = false;
  private closingPromise: Promise<void> | null = null;

  constructor(config?: ProducerConfig) {
    // 校验并合并配置
    this.config = validateProducerConfig(config ?? getDefaultProducerConfig());

    // 创建 TLS Service 实例
    this.service = new Service({
      version: VERSION,
      serviceName: SERVICE,
      protocol: PROTOCOL,
      host: this.config.Endpoint,
      region: this.config.Region,
      accessKeyId: this.config.AccessKeyID,
      secretKey: this.config.AccessKeySecret,
      sessionToken: this.config.SecurityToken,
    });

    this.retryQueue = new RetryQueue();

    this.sender = new Sender({
      service: this.service,
      retryQueue: this.retryQueue,
      config: this.config,
      headers: this.config.Headers,
      noRetryStatusCodeList: this.config.NoRetryStatusCodeList,
      decreaseBufferedSize: (delta) => {
        this.bufferedSize -= delta;
        if (this.bufferedSize < 0) this.bufferedSize = 0;
      },
    });

    this.threadPool = new ThreadPool(this.sender, this.config.MaxSenderCount);

    this.dispatcher = new Dispatcher({
      config: this.config,
      retryQueue: this.retryQueue,
      threadPool: this.threadPool,
      callbacks: {
        increaseBufferedSize: (delta) => {
          this.bufferedSize += delta;
        },
      },
    });
  }

  /** 获取一份带默认值的 Producer 配置，方便调用方自定义修改。 */
  static getDefaultProducerConfig(): ProducerConfig {
    return getDefaultProducerConfig();
  }

  /** 启动内部调度与重试逻辑，必须在第一次发送前调用。 */
  Start(): void {
    if (this.started) return;
    this.started = true;
    this.dispatcher.start();
  }

  /**
   * 发送单条日志。
   *
   * @param shardHash 分区路由键，可为空字符串。
   * @param topic 日志主题 ID。
   * @param source 日志来源标识。
   * @param filename 日志文件名标识。
   * @param log 日志内容。
   * @param callBack 发送结果回调。
   */
  async SendLog(
    shardHash: string,
    topic: string,
    source: string,
    filename: string,
    log: ProducerLog,
    callBack?: CallBack
  ): Promise<void> {
    this.ensureStarted();
    await this.waitTime();

    const batchLog: BatchLog = {
      Key: {
        Topic: topic,
        Source: source,
        ShardHash: shardHash || "",
        FileName: filename,
        ContextFlow: undefined,
        CallBackFun: callBack,
      },
      Log: { ...log },
    };

    await this.putToDispatcher(batchLog);
  }

  /**
   * 发送一组日志。
   *
   * @param shardHash 分区路由键，可为空字符串。
   * @param topic 日志主题 ID。
   * @param source 日志来源标识。
   * @param filename 日志文件名标识。
   * @param logGroup 日志组。
   * @param callBack 发送结果回调。
   */
  async SendLogs(
    shardHash: string,
    topic: string,
    source: string,
    filename: string,
    logGroup: ProducerLogGroup,
    callBack?: CallBack
  ): Promise<void> {
    this.ensureStarted();
    await this.waitTime();

    const { Logs = [], ContextFlow } = logGroup;
    for (const log of Logs) {
      const batchLog: BatchLog = {
        Key: {
          Topic: topic,
          Source: source,
          ShardHash: shardHash || "",
          FileName: filename,
          ContextFlow,
          CallBackFun: callBack,
        },
        Log: { ...log },
      };
      await this.putToDispatcher(batchLog);
    }
  }

  /**
   * 动态重置访问密钥与安全令牌，便于轮转 AK/SK 或使用 STS。
   */
  ResetAccessKeyToken(accessKeyID: string, accessKeySecret: string, securityToken: string): void {
    this.config.AccessKeyID = accessKeyID;
    this.config.AccessKeySecret = accessKeySecret;
    this.config.SecurityToken = securityToken;

    this.service.setAccessKeyId(accessKeyID);
    this.service.setSecretKey(accessKeySecret);
    this.service.setSessionToken(securityToken);
  }

  /**
   * 优雅关闭：拒绝新写入，尽可能发送所有在缓冲区与重试队列中的数据后返回。
   */
  async Close(): Promise<void> {
    if (this.closed) return this.closingPromise ?? Promise.resolve();
    this.closed = true;

    if (!this.closingPromise) {
      this.closingPromise = (async () => {
        await this.dispatcher.closeGracefully();
        await this.threadPool.stopGracefully();
        this.sender.stop();
      })();
    }

    return this.closingPromise;
  }

  /**
   * 强制关闭：立即停止调度与重试，丢弃未发送的数据。
   */
  async ForceClose(): Promise<void> {
    if (this.closed) return this.closingPromise ?? Promise.resolve();
    this.closed = true;
    this.sender.stop();
    this.dispatcher.closeForce();
    this.threadPool.stopForce();
  }

  /** 当前 Producer 缓存中的日志数据估算大小。 */
  getBufferedSize(): number {
    return this.bufferedSize;
  }

  private ensureStarted(): void {
    if (!this.started) {
      throw new Error("Producer has not been started, please call Start() first.");
    }
  }

  /**
   * 根据 TotalSizeLnBytes 与 MaxBlockSec 控制等待/失败策略。
   */
  private async waitTime(): Promise<void> {
    const { MaxBlockSec, TotalSizeLnBytes } = this.config;

    // 最多阻塞 MaxBlockSec 秒
    // TODO：看后续是否需要控制精准时间，如需可以考虑使用 performance.now() 处理
    if (MaxBlockSec > 0) {
      for (let i = 0; i < MaxBlockSec; i++) {
        if (this.bufferedSize <= TotalSizeLnBytes) {
          return;
        }

        logger.debug(
          `wait for produce memory, bufferedSize: ${this.bufferedSize}, TotalSizeLnBytes: ${TotalSizeLnBytes}`
        );
        await sleep(1000);
      }

      throw new Error(TIMEOUT_EXCEPTION);
    }

    // 立即失败并抛出 TimeoutException
    if (MaxBlockSec === 0) {
      if (this.bufferedSize > TotalSizeLnBytes) {
        throw new Error(TIMEOUT_EXCEPTION);
      }
      return;
    }

    // 无限等待直到有可用空间
    while (this.bufferedSize > TotalSizeLnBytes) {
      await sleep(1000);
    }
  }

  private async putToDispatcher(batchLog: BatchLog): Promise<void> {
    if (this.closed) {
      throw new Error("the producer is closed");
    }

    const logSize = await getLogSize(batchLog.Log);

    // 检查当前日志是否超过单条日志最大上限
    if (logSize > this.config.MaxBatchSize) {
      throw new Error(
        `the log size ${logSize} is larger than the max batch size ${this.config.MaxBatchSize}`
      );
    }

    // 检查当前日志是否超过 producer 总大小上限
    if (logSize > this.config.TotalSizeLnBytes) {
      throw new Error(
        `the log size ${logSize} is larger than the total size ${this.config.TotalSizeLnBytes}`
      );
    }

    // 若用户未设置时间戳，则自动填充当前毫秒时间戳。
    if (!batchLog.Log.Time) {
      batchLog.Log.Time = Date.now();
    }

    await this.dispatcher.handleLog(batchLog, logSize);
  }
}

export type { ProducerConfig } from "./config";
export type { Attempt, Result, CallBack } from "./types";
