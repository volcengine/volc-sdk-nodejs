import { AbstractService } from "../abstractService";
import { type ScalarFieldType, VikingdbResponse } from "../types";
import {
  type CreateIndexRequest,
  type DiskannVector,
  type DropIndexRequest,
  type GetIndexInfoRequest,
  GetIndexInfoResponse,
  type HnswVector,
  type IndexInfo,
  type ListIndexesRequest,
  ListIndexesResponse,
  type ShardConfig,
  type UpdateIndexRequest,
  type VectorIndex,
} from "./types";
import { Pathname } from "./pathname";
import {
  type BackendCreateIndexRequest,
  type BackendDiskannVector,
  type BackendDropIndexRequest,
  type BackendGetIndexInfoRequest,
  type BackendHnswVector,
  type BackendIndexInfo,
  type BackendListIndexesRequest,
  type BackendUpdateIndexRequest,
  type BackendVectorIndex,
  IndexType,
  ShardPolicy,
} from "./backend";

export class IndexService extends AbstractService {
  async DropIndex({ CollectionName, IndexName }: DropIndexRequest): Promise<VikingdbResponse> {
    const response = await this.request<BackendDropIndexRequest>(Pathname.DropIndex, {
      collection_name: CollectionName,
      index_name: IndexName,
    });
    return new VikingdbResponse(response.original_request, response.request_id);
  }

  private decodeVectorIndex(data: BackendIndexInfo["vector_index"]): VectorIndex | undefined {
    if (!data) {
      return undefined;
    }
    const record: VectorIndex = {
      IndexType: data.index_type,
      Distance: data.distance,
      Quant: data.quant,
    } as VectorIndex;
    if (data.index_type === IndexType.Hnsw) {
      Object.assign(record, {
        HnswCef: data.hnsw_cef,
        HnswM: data.hnsw_m,
        HnswSef: data.hnsw_sef,
      } satisfies Pick<HnswVector, "HnswM" | "HnswSef" | "HnswCef">);
    } else if (data.index_type === IndexType.Diskann) {
      Object.assign(record, {
        CacheRatio: data.cache_ratio,
        DiskannCef: data.diskann_cef,
        DiskannM: data.diskann_m,
        PqCodeRatio: data.pq_code_ratio,
      } satisfies Pick<DiskannVector, "CacheRatio" | "DiskannCef" | "DiskannM" | "PqCodeRatio">);
    }
    return record;
  }

  private decodeIndexInfo(data: BackendIndexInfo): IndexInfo {
    const info: IndexInfo = {
      CollectionName: data.collection_name,
      IndexName: data.index_name,
      CpuQuota: data.cpu_quota,
      CreateTime: data.create_time,
      UpdateTime: data.update_time,
      UpdatePerson: data.update_person,
      ShardPolicy: data.shard_policy,
      Status: data.status,
      IndexCost: {
        CpuCore: data.index_cost.cpu_core,
        MemoryGb: data.index_cost.mem_gb,
      },
      Description: data.description,
      ShardCount: data.shard_count,
      ScalarIndex: data.scalar_index?.map((item) => ({
        FieldName: item.field_name,
        FieldType: item.field_type as ScalarFieldType,
        DefaultValue: item.default_val,
      })),
      VectorIndex: this.decodeVectorIndex(data.vector_index),
    };
    if (data.partition_by) {
      info.PartitionBy = data.partition_by;
      info.Partitions = data.partitions ?? [];
    }
    return info;
  }

  async GetIndexInfo({
    CollectionName,
    IndexName,
  }: GetIndexInfoRequest): Promise<GetIndexInfoResponse> {
    const response = await this.request<BackendGetIndexInfoRequest, BackendIndexInfo>(
      Pathname.GetIndexInfo,
      {
        collection_name: CollectionName,
        index_name: IndexName,
      }
    );
    const { data, request_id, original_request } = response;
    const info = this.decodeIndexInfo(data);

    return new GetIndexInfoResponse(info, original_request, request_id);
  }

  async ListIndexes({ CollectionName }: ListIndexesRequest): Promise<ListIndexesResponse> {
    const response = await this.request<BackendListIndexesRequest, BackendIndexInfo[]>(
      Pathname.ListIndexes,
      {
        collection_name: CollectionName,
      }
    );
    const infos = response.data.map(this.decodeIndexInfo, this);
    return new ListIndexesResponse(infos, response.original_request, response.request_id);
  }

  private encodeShardConfig(
    shardConfig: ShardConfig
  ): Pick<BackendCreateIndexRequest, "shard_count" | "shard_policy"> {
    const data: ReturnType<typeof this.encodeShardConfig> = {
      shard_policy: shardConfig.ShardPolicy,
    };
    if (shardConfig.ShardPolicy === ShardPolicy.Custom) {
      data.shard_count = shardConfig.ShardCount;
    }
    return data;
  }

  async CreateIndex({
    CollectionName,
    CpuQuota,
    Description,
    IndexName,
    PartitionBy,
    ScalarIndexes,
    ShardConfig,
    VectorIndex,
  }: CreateIndexRequest): Promise<VikingdbResponse> {
    const data: BackendCreateIndexRequest = {
      collection_name: CollectionName,
      index_name: IndexName,
      description: Description,
      cpu_quota: CpuQuota,
      partition_by: PartitionBy,
      scalar_index: ScalarIndexes,
      ...this.encodeShardConfig(ShardConfig),
    };
    if (VectorIndex) {
      const vectorIndex: BackendVectorIndex = {
        index_type: VectorIndex.IndexType,
        distance: VectorIndex.Distance,
        quant: VectorIndex.Quant,
      } as BackendVectorIndex;
      if (VectorIndex.IndexType === IndexType.Hnsw) {
        Object.assign(vectorIndex, {
          hnsw_m: VectorIndex.HnswM,
          hnsw_cef: VectorIndex.HnswCef,
          hnsw_sef: VectorIndex.HnswSef,
        } satisfies Pick<BackendHnswVector, "hnsw_cef" | "hnsw_m" | "hnsw_sef">);
      } else if (VectorIndex.IndexType === IndexType.Diskann) {
        Object.assign(vectorIndex, {
          diskann_cef: VectorIndex.DiskannCef,
          cache_ratio: VectorIndex.CacheRatio,
          diskann_m: VectorIndex.DiskannM,
          pq_code_ratio: VectorIndex.PqCodeRatio,
        } satisfies Pick<BackendDiskannVector, "diskann_cef" | "diskann_m" | "cache_ratio" | "pq_code_ratio">);
      }
      data.vector_index = vectorIndex;
    }
    const response = await this.request<BackendCreateIndexRequest>(Pathname.CreateIndex, data);

    return new VikingdbResponse(response.original_request, response.request_id);
  }

  async UpdateIndex({
    CollectionName,
    ShardConfig,
    CpuQuota,
    Description,
    IndexName,
    ScalarIndexes,
  }: UpdateIndexRequest): Promise<VikingdbResponse> {
    const request: BackendUpdateIndexRequest = {
      collection_name: CollectionName,
      index_name: IndexName,
      description: Description,
      cpu_quota: CpuQuota,
      scalar_index: ScalarIndexes,
    };
    if (ShardConfig) {
      Object.assign(request, this.encodeShardConfig(ShardConfig));
    }
    const response = await this.request<BackendUpdateIndexRequest>(Pathname.UpdateIndex, request);
    return new VikingdbResponse(response.original_request, response.request_id);
  }
}

export * as index from "./types";
