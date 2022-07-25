import http from "http";
import { Method } from "axios";

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
export type ProducerType = "producer" | "t-producer";

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
   * Producer type, producer or t-producer.
   * @default "producer"
   */
  producerType?: ProducerType;
  /**
   * Topics available for producer. All topics by default.
   * @default "*"
   */
  topic?: string[] | string;
  /**
   * Group ID, required when creating a t-producer.
   */
  group?: string;
  /**
   * Send message sequentially.
   * @default false
   */
  order?: boolean;
}

export interface PublishMessageOptions {
  topic: string;
  body: string;
  tags?: string[];
  shardingKey?: string;
  keys?: string[];
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
  topic?: string | string[];
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
  eachMessage: () => Promise<boolean>;
}
