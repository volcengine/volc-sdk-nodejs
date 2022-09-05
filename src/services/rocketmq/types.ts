import { ConsumeMessage } from "./protocol/v1";
import { MessageProperties } from "./Producer";

/** Client  */
export interface ClientOptions {
  endpoint: string;
  instanceId: string;
  accessKey: string;
  secretKey: string;
}

export type WorkerStatus =
  | "initialized"
  | "connecting"
  | "connectFailed"
  | "connected"
  | "closing"
  | "closeFailed"
  | "closed";

/** producer */
export interface PublishMessageOptions {
  topic: string;
  shardingKey?: string;
  tag?: string;
  keys?: string[];
  body: string;
  messageProperties?: MessageProperties;
}

export interface ConsumerOptions {
  /**
   * Group ID for consumer.
   */
  group: string;
  /**
   * Limit number of messages per poll.
   * @default 10
   */
  maxMessageNumber?: number;
  /**
   * Duration for waiting message.
   * @default 3000
   */
  maxWaitTimeMs?: number;
  /**
   * Polling request interval (MS).
   * @default 0
   */
  pollingInterval?: number;
}

export interface ConsumerSubscribeOption {
  topic: string;
  tag?: string;
}

export interface ConsumerRunOptions {
  eachMessage: (message: ConsumeMessage) => Promise<boolean>;
}

export interface ACKMessagesOptions {
  acks: string[];
  nacks?: string[];
}
