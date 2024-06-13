import type { BackendField } from "../types";

export interface BackendDropIndexRequest {
  collection_name: string;
  index_name: string;
}

export type BackendGetIndexInfoRequest = BackendDropIndexRequest;

export enum ShardPolicy {
  Custom = "custom",
  Auto = "auto",
}

export enum IndexType {
  Hnsw = "hnsw",
  HnswHybrid = "hnsw_hybrid",
  Flat = "flat",
  Ivf = "ivf",
  Diskann = "diskann",
}

export enum Distance {
  Ip = "ip",
  l2 = "l2",
  Cosine = "cosine",
}

export enum Quant {
  Int8 = "int8",
  Float = "float",
  Fix16 = "fix16",
  PQ = "pq",
}

export type IndexStatus = "INIT" | "CHANGING" | "READY";

interface HnswVector1 {
  index_type: IndexType.Hnsw;
  distance: Exclude<Distance, Distance.l2>;
  quant: Exclude<Quant, Quant.PQ>;
  hnsw_m?: number;
  hnsw_cef?: number;
  hnsw_sef?: number;
}

interface HnswVector2 {
  index_type: IndexType.Hnsw;
  distance: Distance.l2;
  quant: Exclude<Quant, Quant.Int8 | Quant.PQ>;
  hnsw_m?: number;
  hnsw_cef?: number;
  hnsw_sef?: number;
}

export type BackendHnswVector = HnswVector1 | HnswVector2;

interface HnswHybridVector1 {
  index_type: IndexType.HnswHybrid;
  distance: Exclude<Distance, Distance.l2>;
  quant: Exclude<Quant, Quant.PQ>;
}

interface HnswHybridVector2 {
  index_type: IndexType.HnswHybrid;
  distance: Distance.l2;
  quant: Exclude<Quant, Quant.Int8 | Quant.PQ>;
}

export type BackendHnswHybridVector = HnswHybridVector1 | HnswHybridVector2;

interface FlatVector1 {
  index_type: IndexType.Flat;
  distance: Exclude<Distance, Distance.l2>;
  quant: Exclude<Quant, Quant.PQ>;
}

interface FlatVector2 {
  index_type: IndexType.Flat;
  distance: Distance.l2;
  quant: Exclude<Quant, Quant.Int8 | Quant.PQ>;
}

export type BackendFlatVector = FlatVector1 | FlatVector2;

export interface BackendDiskannVector {
  index_type: IndexType.Diskann;
  distance: Distance;
  quant: Exclude<Quant, Quant.Int8 | Quant.Fix16>;
  diskann_m?: number;
  diskann_cef?: number;
  cache_ratio?: number;
  pq_code_ratio?: number;
}

export interface BackendIvfVector {
  index_type: IndexType.Ivf;
  distance: Exclude<Distance, Distance.l2>;
  quant: Quant.PQ;
}

export type BackendVectorIndex =
  | BackendHnswVector
  | BackendHnswHybridVector
  | BackendFlatVector
  | BackendDiskannVector
  | BackendIvfVector;

export interface BackendIndexInfo {
  collection_name: string;
  index_name: string;
  cpu_quota: number;
  description?: string;
  shard_policy: ShardPolicy;
  shard_count: number;
  partition_by?: string;
  partitions?: string[];
  vector_index?: BackendVectorIndex;
  scalar_index?: BackendField[];
  status: IndexStatus;
  index_cost: {
    cpu_core: number;
    mem_gb: string;
  };
  create_time: string;
  update_time: string;
  update_person: string;
}

export interface BackendListIndexesRequest {
  collection_name: string;
}

export interface BackendCreateIndexRequest
  extends Pick<
    BackendIndexInfo,
    | "collection_name"
    | "index_name"
    | "description"
    | "shard_policy"
    | "partition_by"
    | "vector_index"
  > {
  cpu_quota?: number;
  shard_count?: number;
  scalar_index?: string[];
}

export interface BackendUpdateIndexRequest
  extends Omit<BackendCreateIndexRequest, "partition_by" | "vector_index" | "shard_policy"> {
  shard_policy?: ShardPolicy;
}
