/* UpsertData start */
import {
  type GetPrimaryKeys,
  type PrimaryKeyFieldType,
  type PrimaryKeys,
  type ScalarFieldType2JsType,
  VikingdbResponse,
} from "../types";

interface UpsertDataCommonRequest {
  Fields: Record<string, unknown>[];
  TTL?: number;
}

interface UpsertDataByCollectionNameRequest extends UpsertDataCommonRequest {
  CollectionName: string;
}

interface UpsertDataByCollectionAliasRequest extends UpsertDataCommonRequest {
  CollectionAlias: string;
}

export type UpsertDataRequest =
  | UpsertDataByCollectionNameRequest
  | UpsertDataByCollectionAliasRequest;
/* UpsertData end */

/* DeleteData start */
interface DeleteSpecifyDataByCollectionNameRequest {
  CollectionName: string;
  PrimaryKeys: PrimaryKeys;
}

interface DeleteAllDataByCollectionNameRequest {
  CollectionName: string;
  DeleteAll: true;
}

interface DeleteSpecifyDataByCollectionAliasRequest {
  CollectionAlias: string;
  PrimaryKeys: PrimaryKeys;
}

interface DeleteAllDataByCollectionAliasRequest {
  CollectionAlias: string;
  DeleteAll: true;
}

export type DeleteDataRequest =
  | DeleteSpecifyDataByCollectionNameRequest
  | DeleteSpecifyDataByCollectionAliasRequest
  | DeleteAllDataByCollectionNameRequest
  | DeleteAllDataByCollectionAliasRequest;
/* DeleteData end */

/* FetchCollectionData start */
interface FetchCollectionDataByCollectionNameRequest {
  CollectionName: string;
  PrimaryKeys: PrimaryKeys;
}

interface FetchCollectionDataByCollectionAliasRequest {
  CollectionAlias: string;
  PrimaryKeys: PrimaryKeys;
}

export type FetchCollectionDataRequest =
  | FetchCollectionDataByCollectionAliasRequest
  | FetchCollectionDataByCollectionNameRequest;

export type FetchDataInfo<
  Data extends Record<string, any>,
  PrimaryKey extends GetPrimaryKeys<Data>
> = Data | { [Key in PrimaryKey]: ScalarFieldType2JsType[Data[PrimaryKey]] };

export class FetchCollectionDataResponse<
  Data extends Record<string, any>,
  PrimaryKey extends GetPrimaryKeys<Data>
> extends VikingdbResponse {
  constructor(
    public readonly Data: FetchDataInfo<Data, PrimaryKey>[],
    OriginalRequest: string,
    LogId: string
  ) {
    super(OriginalRequest, LogId);
  }
}
/* FetchCollectionData start */

/* FetchIndexData start */
interface FetchIndexDataCommonRequest {
  IndexName: string;
  PrimaryKeys: PrimaryKeys;
  /**
   * 子索引对应的字段
   *
   * 类型和 `partition_by` 对齐
   */
  Partition?: ScalarFieldType2JsType[PrimaryKeyFieldType];
  /**
   * 不传时返回所有标量字段
   *
   * 传空数组不返回 `fields` 字段
   */
  OutputFields?: string[];
}

interface FetchIndexDataByCollectionNameRequest extends FetchIndexDataCommonRequest {
  CollectionName: string;
}

interface FetchIndexDataByCollectionAliasRequest extends FetchIndexDataCommonRequest {
  CollectionAlias: string;
}

export type FetchIndexDataRequest =
  | FetchIndexDataByCollectionNameRequest
  | FetchIndexDataByCollectionAliasRequest;

export class FetchIndexDataResponse<
  Data extends Record<string, any>,
  PrimaryKey extends GetPrimaryKeys<Data>
> extends VikingdbResponse {
  constructor(
    public readonly Data: FetchDataInfo<Data, PrimaryKey>[],
    OriginalRequest: string,
    LogId: string
  ) {
    super(OriginalRequest, LogId);
  }
}
/* FetchIndexData end */
