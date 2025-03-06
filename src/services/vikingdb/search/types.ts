import type { BackendFilter, BackendSearchAggResponse, SearchOperation } from "./backend";
import { VikingdbResponse } from "../types";

export { SearchOperation } from "./backend";

/** 支持字段类型为 int64、bool、string、list<string>、list<int64> */
export interface MustTypeCondition {
  Operation: Extract<SearchOperation, SearchOperation.Must | SearchOperation.MustNot>;
  FieldName: string;
  Conditions: Array<number | string | boolean>;
}

/** 支持字段类型为 int64、float32 */
export interface NumberRangeTypeCondition {
  Operation: Extract<SearchOperation, SearchOperation.Range | SearchOperation.RangeOut>;
  FieldName: string;
  GreatThen?: number;
  LessThen?: number;
  GreatThenEqual?: number;
  LessThenEqual?: number;
}

export interface AreaRangeTypeCondition {
  Operation: Extract<SearchOperation, SearchOperation.Range | SearchOperation.RangeOut>;
  /** 横坐标、纵坐标 */
  FieldNames: [string, string];
  /** 横坐标、纵坐标 */
  Center: [number, number];
  /** 半径 */
  Radius: number;
}

export interface GeographicalRangeTypeCondition {
  Operation: SearchOperation.GeographicalRange;
  /** 经度、纬度 */
  FieldNames: [string, string];
  /** 经度值、纬度值 */
  Center: [number, number];
  /** 半径 */
  Radius: number;
}

export interface LogicTypeCondition {
  Operation: Extract<SearchOperation, SearchOperation.And | SearchOperation.Or>;
  // eslint-disable-next-line no-use-before-define
  Conditions: Filter[];
}

export type Filter =
  | MustTypeCondition
  | NumberRangeTypeCondition
  | AreaRangeTypeCondition
  | GeographicalRangeTypeCondition
  | LogicTypeCondition;

interface SearchCommonRequest {
  IndexName: string;
  Limit: number;
  DenseWeight?: number;
  /**
   * 不传时返回所有标量字段，不返回向量字段
   *
   * 为空时不返回字段
   *
   * 格式错误 sdk 报错
   */
  OutputFields?: string[];
  /**
   * 子索引名称，类型与索引配置中的 `PartitionBy` 的类型一致
   */
  Partition?: string | number;
  Filter?: Filter;
}

/**
 * `score` 为检索排名
 *
 * `fields` 为这条数据的键值对
 *
 * 拓展字段中可能还会有其它内部字段，如：
 * - 主键字段，key 为定义的字段名
 */
interface SearchData<Data extends Record<string, unknown>> {
  Score: number;
  Fields?: Data;
  [key: string]: unknown;
}

export class SearchResponse<Data extends Record<string, unknown>> extends VikingdbResponse {
  constructor(public Data: SearchData<Data>[][], OriginalRequest: string, LogId: string) {
    super(OriginalRequest, LogId);
  }
}

/* SearchByVector start */
interface SearchByVectorCommonRequest extends SearchCommonRequest {
  DenseVectors: number[][];
  /** 当索引为混合检索时 */
  SparseVectors?: Record<string, number>[];
  PrimaryKeyIn?: Array<string | number>;
  PrimaryKeyNotIn?: Array<string | number>;
}

interface SearchByVectorByCollectionNameRequest extends SearchByVectorCommonRequest {
  CollectionName: string;
}

interface SearchByVectorByCollectionAliasRequest extends SearchByVectorCommonRequest {
  CollectionAlias: string;
}

export type SearchByVectorRequest =
  | SearchByVectorByCollectionNameRequest
  | SearchByVectorByCollectionAliasRequest;
/* SearchByVector end */

/* SearchByPrimaryKey start */
interface SearchByPrimaryKeyCommonRequest extends SearchCommonRequest {
  PrimaryKeys: Array<number | string>;
}

interface SearchByPrimaryKeyByCollectionNameRequest extends SearchByPrimaryKeyCommonRequest {
  CollectionName: string;
}

interface SearchByPrimaryKeyByCollectionAliasRequest extends SearchByPrimaryKeyCommonRequest {
  CollectionAlias: string;
}

export type SearchByPrimaryKeyRequest =
  | SearchByPrimaryKeyByCollectionNameRequest
  | SearchByPrimaryKeyByCollectionAliasRequest;
/* SearchByPrimaryKey end */

/* SearchByText start */
interface SearchByTextCommonRequest extends SearchCommonRequest {
  Text: string;
}

interface SearchByTextByCollectionNameRequest extends SearchByTextCommonRequest {
  CollectionName: string;
}

interface SearchByTextByCollectionAliasRequest extends SearchByTextCommonRequest {
  CollectionAlias: string;
}

export type SearchByTextRequest =
  | SearchByTextByCollectionNameRequest
  | SearchByTextByCollectionAliasRequest;
/* SearchByText end */

/* SearchByScalar start */
interface SearchByScalarCommonRequest extends Omit<SearchCommonRequest, "DenseWeight"> {
  ScalarConfig?: {
    Order: "asc" | "desc";
    FieldName: string;
  };
}

interface SearchByScalarByCollectionNameRequest extends SearchByScalarCommonRequest {
  CollectionName: string;
}

interface SearchByScalarByCollectionAliasRequest extends SearchByScalarCommonRequest {
  CollectionAlias: string;
}

export type SearchByScalarRequest =
  | SearchByScalarByCollectionNameRequest
  | SearchByScalarByCollectionAliasRequest;
/* SearchByScalar end */

/* SearchAgg start*/

interface SearchAggCommonRequest extends SearchCommonRequest {
  Search: {
    partition?: unknown;
    filter?: BackendFilter;
  };
  Agg: {
    op: string;
    field?: string;
    cond?: Record<string, unknown>;
  };
}
interface SearchAggByCollectionNameRequest extends SearchAggCommonRequest {
  CollectionName: string;
}

interface SearchAggByCollectionAliasRequest extends SearchAggCommonRequest {
  CollectionAlias: string;
}

export type SearchAggRequest = SearchAggByCollectionNameRequest | SearchAggByCollectionAliasRequest;

export class SearchAggResponse extends VikingdbResponse {
  constructor(public Data: BackendSearchAggResponse, OriginalRequest: string, LogId: string) {
    super(OriginalRequest, LogId);
  }
}
/* SearchAgg end*/
