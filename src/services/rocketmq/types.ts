import http from "http";
import { Method } from "axios";
import { ConsumeMessage } from "./ protocol/v1";

// -------------client------------
/** Client config */
export interface ClientOptions {
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
}

/** Config of client's request method */
export interface ClientRequestOption<Req> {
  method: Method;
  path: string;
  data?: Req;
  httpAgent?: http.Agent;
}

// -------------producer------------

export type ProducerStatus =
  | "initialized"
  | "connecting"
  | "connectFailed"
  | "idle"
  | "running"
  | "closing"
  | "closeFailed"
  | "closed";

export interface ProducerOptions {
  /**
   * Topics available for producer. All topics by default.
   * @default "*"
   */
  topic?: string[] | string;
  /**
   * Group ID
   */
  group?: string;
}

export interface PublishMessageOptions {
  topic: string;
  shardingKey?: string;
  tags?: string;
  keys?: string[];
  body: string;
  properties?: Record<string, string>;
}

// -------------consumer------------
export type ConsumerStatus =
  | "initialized"
  | "connecting"
  | "connectFailed"
  | "idle"
  | "running"
  | "stopped"
  | "closing"
  | "closeFailed"
  | "closed";

export interface ConsumerOptions {
  /**
   * Group ID for consumer.
   */
  group: string;
  /**
   * Topic for consumer.
   */
  topic: string;
  /**
   * @default '*'
   */
  tag?: string;
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
}

export interface ConsumerRunOptions {
  eachMessage: (message: ConsumeMessage) => Promise<boolean>;
}
