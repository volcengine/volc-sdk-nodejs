import { AbstractService } from "../abstractService";
import {
  type DeleteDataRequest,
  type FetchCollectionDataRequest,
  FetchCollectionDataResponse,
  type FetchIndexDataRequest,
  FetchIndexDataResponse,
  type UpsertDataRequest,
} from "./types";
import { type GetPrimaryKeys, VikingdbResponse } from "../types";
import type {
  BackendDeleteDataRequest,
  BackendFetchCollectionDataRequest,
  BackendFetchIndexDataInfo,
  BackendFetchIndexDataRequest,
  BackendUpsertDataRequest,
} from "./backend";
import { Pathname } from "./pathname";

export class DataService extends AbstractService {
  async UpsertData({ Fields, TTL, ...rest }: UpsertDataRequest): Promise<VikingdbResponse> {
    const request: BackendUpsertDataRequest = this.isCollectionNameRequest(rest)
      ? {
          collection_name: rest.CollectionName,
          fields: Fields,
          ttl: TTL,
        }
      : {
          collection_alias: rest.CollectionAlias,
          fields: Fields,
          ttl: TTL,
        };
    const response = await this.request<BackendUpsertDataRequest>(Pathname.UpsertData, request);
    return new VikingdbResponse(response.original_request, response.request_id);
  }

  async DeleteData(request: DeleteDataRequest): Promise<VikingdbResponse> {
    let data: BackendDeleteDataRequest;
    const isDeleteAll = <T extends { DeleteAll: true }>(
      request: NonNullable<unknown>
    ): request is T => "DeleteAll" in request;
    if (this.isCollectionNameRequest(request)) {
      if (isDeleteAll(request)) {
        data = {
          collection_name: request.CollectionName,
          del_all: request.DeleteAll,
        };
      } else {
        data = {
          collection_name: request.CollectionName,
          primary_keys: request.PrimaryKeys,
        };
      }
    } else {
      if (isDeleteAll(request)) {
        data = {
          collection_alias: request.CollectionAlias,
          del_all: request.DeleteAll,
        };
      } else {
        data = {
          collection_alias: request.CollectionAlias,
          primary_keys: request.PrimaryKeys,
        };
      }
    }
    const response = await this.request<BackendDeleteDataRequest>(Pathname.DeleteData, data);
    return new VikingdbResponse(response.original_request, response.request_id);
  }

  async FetchCollectionData<
    Data extends Record<string, any>,
    PrimaryKey extends GetPrimaryKeys<Data>
  >({
    PrimaryKeys,
    ...rest
  }: FetchCollectionDataRequest): Promise<FetchCollectionDataResponse<Data, PrimaryKey>> {
    const request: BackendFetchCollectionDataRequest = this.isCollectionNameRequest(rest)
      ? {
          primary_keys: PrimaryKeys,
          collection_name: rest.CollectionName,
        }
      : { primary_keys: PrimaryKeys, collection_alias: rest.CollectionAlias };
    const response = await this.request<BackendFetchCollectionDataRequest, Data[]>(
      Pathname.FetchCollectionData,
      request
    );
    return new FetchCollectionDataResponse<Data, PrimaryKey>(
      response.data,
      response.original_request,
      response.request_id
    );
  }

  async FetchIndexData<Data extends Record<string, any>, PrimaryKey extends GetPrimaryKeys<Data>>({
    IndexName,
    PrimaryKeys,
    OutputFields,
    Partition,
    ...rest
  }: FetchIndexDataRequest): Promise<FetchIndexDataResponse<Data, PrimaryKey>> {
    let request: BackendFetchIndexDataRequest;
    if (this.isCollectionNameRequest(rest)) {
      request = {
        collection_name: rest.CollectionName,
        index_name: IndexName,
        partition: Partition,
        output_fields: OutputFields,
        primary_keys: PrimaryKeys,
      };
    } else {
      request = {
        collection_alias: rest.CollectionAlias,
        index_name: IndexName,
        partition: Partition,
        output_fields: OutputFields,
        primary_keys: PrimaryKeys,
      };
    }
    const response = await this.request<
      BackendFetchIndexDataRequest,
      BackendFetchIndexDataInfo<Data>[]
    >(Pathname.FetchIndexData, request);
    const data = response.data.map((item) => item.fields).flat();
    return new FetchIndexDataResponse<Data, PrimaryKey>(
      data,
      response.original_request,
      response.request_id
    );
  }
}

export * as data from "./types";
