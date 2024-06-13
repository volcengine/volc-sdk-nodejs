/* DropIndex start */
import { type ScalarFieldInfo, type ScalarFieldType, VikingdbResponse } from "../types";
import { Distance, type IndexStatus, IndexType, Quant, ShardPolicy } from "./backend";

export { Distance, IndexType, Quant, ShardPolicy } from "./backend";

export interface DropIndexRequest {
  CollectionName: string;
  IndexName: string;
}
/* DropIndex end */

/* GetIndexInfo start */
export type GetIndexInfoRequest = DropIndexRequest;

interface HnswVector1 {
  IndexType: IndexType.Hnsw;
  Distance: Exclude<Distance, Distance.l2>;
  Quant: Exclude<Quant, Quant.PQ>;
  HnswM?: number;
  HnswCef?: number;
  HnswSef?: number;
}

interface HnswVector2 {
  IndexType: IndexType.Hnsw;
  Distance: Distance.l2;
  Quant: Exclude<Quant, Quant.Int8 | Quant.PQ>;
  HnswM?: number;
  HnswCef?: number;
  HnswSef?: number;
}

export type HnswVector = HnswVector1 | HnswVector2;

interface HnswHybridVector1 {
  IndexType: IndexType.HnswHybrid;
  Distance: Exclude<Distance, Distance.l2>;
  Quant: Exclude<Quant, Quant.PQ>;
}

interface HnswHybridVector2 {
  IndexType: IndexType.HnswHybrid;
  Distance: Distance.l2;
  Quant: Exclude<Quant, Quant.Int8 | Quant.PQ>;
}

export type HnswHybridVector = HnswHybridVector1 | HnswHybridVector2;

interface FlatVector1 {
  IndexType: IndexType.Flat;
  Distance: Exclude<Distance, Distance.l2>;
  Quant: Exclude<Quant, Quant.PQ>;
}

interface FlatVector2 {
  IndexType: IndexType.Flat;
  Distance: Distance.l2;
  Quant: Exclude<Quant, Quant.Int8 | Quant.PQ>;
}

export type FlatVector = FlatVector1 | FlatVector2;

export interface DiskannVector {
  IndexType: IndexType.Diskann;
  Distance: Distance;
  Quant: Exclude<Quant, Quant.Int8 | Quant.Fix16>;
  DiskannM?: number;
  DiskannCef?: number;
  CacheRatio?: number;
  PqCodeRatio?: number;
}

export interface IvfVector {
  IndexType: IndexType.Ivf;
  Distance: Exclude<Distance, Distance.l2>;
  Quant: Quant.PQ;
}

export type VectorIndex = HnswVector | HnswHybridVector | FlatVector | DiskannVector | IvfVector;

export interface IndexInfo {
  CollectionName: string;
  IndexName: string;
  CpuQuota: number;
  Description?: string;
  ShardPolicy: ShardPolicy;
  ShardCount: number;
  PartitionBy?: string;
  Partitions?: string[];
  VectorIndex?: VectorIndex;
  ScalarIndex?: ScalarFieldInfo<ScalarFieldType>[];
  Status: IndexStatus;
  IndexCost: {
    CpuCore: number;
    MemoryGb: string;
  };
  CreateTime: string;
  UpdateTime: string;
  UpdatePerson: string;
}

export class GetIndexInfoResponse extends VikingdbResponse {
  constructor(public readonly IndexInfo: IndexInfo, OriginalRequest: string, LogId: string) {
    super(OriginalRequest, LogId);
  }
}
/* GetIndexInfo end */

/* ListIndexes start */
export interface ListIndexesRequest {
  CollectionName: string;
}
export class ListIndexesResponse extends VikingdbResponse {
  constructor(public readonly ListIndexes: IndexInfo[], OriginalRequest: string, LogId: string) {
    super(OriginalRequest, LogId);
  }
}
/* ListIndexes end */

/* CreateIndex start */
export type ShardConfig =
  | {
      ShardPolicy: ShardPolicy.Custom;
      ShardCount: number;
    }
  | {
      ShardPolicy: ShardPolicy.Auto;
    };

export interface CreateIndexRequest {
  CollectionName: string;
  IndexName: string;
  Description?: string;
  CpuQuota?: number;
  ShardConfig: ShardConfig;
  VectorIndex?: VectorIndex;
  PartitionBy?: string;
  /** 标量过滤字段 */
  ScalarIndexes?: string[];
}
/* CreateIndex end */

/* UpdateIndex start */
export interface UpdateIndexRequest
  extends Omit<CreateIndexRequest, "VectorIndex" | "PartitionBy" | "ShardConfig"> {
  ShardConfig?: ShardConfig;
}
/* UpdateIndex end */
