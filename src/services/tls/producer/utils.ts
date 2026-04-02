import protobuf from "protobufjs";
import path from "path";
import type { ProducerLog, ProducerLogGroup, ProducerLogGroupList } from "./types";

let logTypePromise: Promise<protobuf.Type> | null = null;
let logGroupTypePromise: Promise<protobuf.Type> | null = null;
let logGroupListTypePromise: Promise<protobuf.Type> | null = null;

function getProtoFilePath(): string {
  // 运行时位于 lib/services/tls/producer，下探一级即可找到拷贝过来的 tls.proto
  return path.join(__dirname, "..", "tls.proto");
}

async function getLogType(): Promise<protobuf.Type> {
  if (!logTypePromise) {
    logTypePromise = protobuf
      .load(getProtoFilePath())
      .then((root) => root.lookupType("pb.Log") as protobuf.Type);
  }
  return logTypePromise;
}

async function getLogGroupType(): Promise<protobuf.Type> {
  if (!logGroupTypePromise) {
    logGroupTypePromise = protobuf
      .load(getProtoFilePath())
      .then((root) => root.lookupType("pb.LogGroup") as protobuf.Type);
  }
  return logGroupTypePromise;
}

async function getLogGroupListType(): Promise<protobuf.Type> {
  if (!logGroupListTypePromise) {
    logGroupListTypePromise = protobuf
      .load(getProtoFilePath())
      .then((root) => root.lookupType("pb.LogGroupList") as protobuf.Type);
  }
  return logGroupListTypePromise;
}

/**
 * 计算单条 Log 的 protobuf 编码字节数，语义接近 Go 中的 pb.Log.Size()。
 */
export async function getLogSize(log: ProducerLog): Promise<number> {
  const type = await getLogType();
  const errMsg = type.verify(log as any);
  if (errMsg) {
    throw new Error(`[tls-node-sdk] invalid Log: ${errMsg}`);
  }
  const message = type.create(log as any);
  return type.encode(message).finish().length;
}

/**
 * 计算 LogGroup 的 protobuf 编码字节数，便于精确预估整个批次大小。
 */
export async function getLogGroupSize(logGroup: ProducerLogGroup): Promise<number> {
  const type = await getLogGroupType();
  const errMsg = type.verify(logGroup as any);
  if (errMsg) {
    throw new Error(`[tls-node-sdk] invalid LogGroup: ${errMsg}`);
  }
  const message = type.create(logGroup as any);
  return type.encode(message).finish().length;
}

export async function getLogGroupListSize(logGroupList: ProducerLogGroupList): Promise<number> {
  const type = await getLogGroupListType();
  const errMsg = type.verify(logGroupList as any);
  if (errMsg) {
    throw new Error(`[tls-node-sdk] invalid LogGroupList: ${errMsg}`);
  }
  const message = type.create(logGroupList as any);
  return type.encode(message).finish().length;
}

/**
 * 获取当前时间的毫秒时间戳。
 */
export function getTimeMs(): number {
  return Date.now();
}

/**
 * 简单的异步 sleep 工具，单位：毫秒。
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 封装 panic/recover 语义的工具函数，避免回调抛出的异常影响主流程。
 */
export function withRecover(fn: () => void): void {
  try {
    fn();
  } catch (err) {
    // 在生产环境中可以按需接入统一日志组件。
    // eslint-disable-next-line no-console
    console.error(err);
  }
}
