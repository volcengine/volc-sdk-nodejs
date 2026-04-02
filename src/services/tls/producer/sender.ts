import type { AxiosError, AxiosRequestConfig } from "axios";
import Service from "../service";
import type { ProducerConfig } from "./config";
import { getTimeMs } from "./utils";
import { RetryQueue } from "./retry_queue";
import type { Batch } from "./batch";
import { withRecover } from "./utils";
import logger from "../logger";
import type { Attempt } from "./types";
import type { IPutLogsReq, IPutLogsResp } from "../types";

/**
 * 负责将 Batch 发送到 TLS 服务，并在失败时按照重试策略将批次重新放入重试队列。
 */
export class Sender {
  private readonly service: Service;
  private readonly retryQueue: RetryQueue;
  private readonly config: ProducerConfig;
  private readonly headers?: Record<string, string>;
  private readonly noRetryStatusCodeSet: Set<number>;
  private readonly decreaseBufferedSize: (delta: number) => void;
  private readonly putLogs: (req: IPutLogsReq, config?: AxiosRequestConfig) => Promise<IPutLogsResp>;
  private stopped = false;

  constructor(params: {
    service: Service;
    retryQueue: RetryQueue;
    config: ProducerConfig;
    headers?: Record<string, string>;
    noRetryStatusCodeList: number[];
    decreaseBufferedSize: (delta: number) => void;
  }) {
    const { service, retryQueue, config, headers, noRetryStatusCodeList, decreaseBufferedSize } = params;
    this.service = service;
    this.retryQueue = retryQueue;
    this.config = config;
    this.headers = headers;
    this.noRetryStatusCodeSet = new Set(noRetryStatusCodeList || []);
    this.decreaseBufferedSize = decreaseBufferedSize;
    this.putLogs = this.service.createPutLogsAPI("PutLogs");
  }

  stop(): void {
    this.stopped = true;
  }

  /**
   * 将一个批次发送到服务端；若失败则根据状态码和重试次数决定是否进入重试队列。
   */
  async send(batch: Batch): Promise<void> {
    logger.debug("sending batch data to server");
    if (this.stopped) return;

    // 使用 objToProtoBuffer 序列化为 protobuf Buffer
    const pbMessage = await Service.objToProtoBuffer(batch.logGroupList);

    const req: IPutLogsReq = {
      TopicId: batch.topic,
      CompressType: "lz4",
      LogGroupList: Buffer.from(pbMessage),
    };

    if (batch.shardHash) {
      req.HashKey = batch.shardHash;
    }

    try {
      const res = await this.putLogs(req, this.headers ? { headers: this.headers } : undefined);
      this.handleSuccess(batch, res);
    } catch (err) {
      this.handleFailure(batch, err as AxiosError);
    }
  }

  private handleSuccess(batch: Batch, res: IPutLogsResp): void {
    logger.debug("batch data sent successfully to server");
    // 发送成功，减少 Producer 缓冲区占用
    this.decreaseBufferedSize(batch.totalDataSize);

    batch.result.SuccessFlag = true;
    if (batch.attemptCount < batch.maxReservedAttempts) {
      const attempt: Attempt = {
        SuccessFlag: true,
        RequestId: res?.RequestID || "",
        ErrorCode: "",
        ErrorMessage: "",
        TimestampMs: getTimeMs(),
      };
      batch.result.Attempts.push(attempt);
    }

    // 执行成功回调
    for (const cb of batch.callBackList) {
      withRecover(() => cb.Success(batch.result));
    }

    batch.retryBackoffMs = 0;
  }

  private handleFailure(batch: Batch, error: AxiosError): void {
    logger.error("batch data sent failed to server", { error });

    const { noRetryStatusCodeSet, config } = this;
    const { statusCode, requestId, errorCode, errorMessage } = this.extractErrorInfo(error);

    const noRetryStatusCode =
      typeof statusCode === "number" && noRetryStatusCodeSet.has(statusCode);
    const noNeedRetry = batch.attemptCount >= batch.maxRetryTimes;

    if (this.stopped || noRetryStatusCode || noNeedRetry) {
      this.addErrorAttempt(batch, {
        requestId,
        errorCode,
        errorMessage,
      });
      this.failedCallback(batch);
      return;
    }

    // 满足重试条件，先记录一次失败尝试，再放入重试队列
    this.addErrorAttempt(batch, {
      requestId,
      errorCode,
      errorMessage,
    });

    if (batch.attemptCount === 1) {
      batch.retryBackoffMs += config.BaseRetryBackoffMs;
    } else {
      const increase = Math.random() * batch.baseIncreaseRetryBackoffMs;
      batch.retryBackoffMs += Math.floor(increase);
    }

    if (batch.retryBackoffMs > config.MaxRetryBackoffMs) {
      batch.retryBackoffMs = config.MaxRetryBackoffMs;
    }

    batch.nextRetryMs = getTimeMs() + batch.retryBackoffMs;
    this.retryQueue.add(batch);
  }

  private failedCallback(batch: Batch): void {
    // 最终失败同样需要释放内存占用
    this.decreaseBufferedSize(batch.totalDataSize);

    for (const cb of batch.callBackList) {
      withRecover(() => cb.Fail(batch.result));
    }
  }

  private addErrorAttempt(
    batch: Batch,
    info: { requestId?: string; errorCode?: string; errorMessage?: string }
  ): void {
    if (batch.attemptCount < batch.maxReservedAttempts) {
      const attempt: Attempt = {
        SuccessFlag: false,
        RequestId: info.requestId || "",
        ErrorCode: info.errorCode || "",
        ErrorMessage: info.errorMessage || "",
        TimestampMs: getTimeMs(),
      };
      batch.result.Attempts.push(attempt);
    }

    batch.result.SuccessFlag = false;
    batch.attemptCount += 1;
  }

  /**
   * 从 AxiosError 中解析状态码、RequestId、错误码与错误信息。
   */
  private extractErrorInfo(error: AxiosError): {
    statusCode?: number;
    requestId?: string;
    errorCode?: string;
    errorMessage?: string;
  } {
    const resp = error.response;
    const statusCode = resp?.status;
    let requestId: string | undefined;
    let errorCode: string | undefined;
    let errorMessage: string | undefined;

    const headers = resp?.headers || {};
    const lowerHeaders: Record<string, string> = {};
    Object.keys(headers).forEach((key) => {
      const val = (headers as any)[key];
      if (typeof val === "string") {
        lowerHeaders[key.toLowerCase()] = val;
      }
    });
    requestId =
      lowerHeaders["x-tls-requestid"] ||
      lowerHeaders["x-tls-request-id"] ||
      lowerHeaders["x-request-id"];

    const data = resp?.data as any;
    if (data) {
      if (typeof data === "string") {
        errorMessage = data;
      } else if (typeof data === "object") {
        if (data.Error) {
          errorCode = data.Error.Code || data.Error.code;
          errorMessage = data.Error.Message || data.Error.message;
          requestId = requestId || data.RequestId || data.requestId || data.RequestID;
        } else {
          errorCode = data.Code || data.code;
          errorMessage = data.Message || data.message;
          requestId = requestId || data.RequestId || data.requestId || data.RequestID;
        }
      }
    }

    if (!errorMessage) {
      errorMessage = error.message;
    }

    return { statusCode, requestId, errorCode, errorMessage };
  }
}
