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
  | "closed";

export interface ProducerOptions {
  /**
   * Producer type, producer or t-producer.
   * @default "producer"
   */
  producerType?: ProducerType;
  /**
   * Topics available for producer. All topics by default
   * @default "*"
   */
  topic?: string[] | string;
  /**
   * Group ID, required when creating a t-producer
   */
  group?: string;
  /**
   * Send message sequentially.
   * @default false
   */
  sequential?: boolean;
}

export interface ProducerConnectOptions {}

export interface ProducerCloseOptions {}

export interface PublishMessageOptions {
  topic: string;
  body: string;
  tags?: string[];
  shardingKey?: string;
  keys?: string[];
  properties?: any;
}

// -------------consumer------------
export interface ConsumerOptions {
  topic?: string[];
  group?: string;
}
