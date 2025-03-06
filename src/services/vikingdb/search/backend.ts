export enum SearchOperation {
  Must = "must",
  MustNot = "must_not",
  Range = "range",
  RangeOut = "range_out",
  /** 地理距离筛选 */
  GeographicalRange = "georange",
  And = "and",
  Or = "or",
}

export interface BackendMustTypeCondition {
  op: Extract<SearchOperation, SearchOperation.Must | SearchOperation.MustNot>;
  field: string;
  conds: Array<number | string | boolean>;
}

export interface BackendRangeTypeCondition {
  op: Extract<SearchOperation, SearchOperation.Range | SearchOperation.RangeOut>;
  field: string | [string, string];
  gt?: number;
  lt?: number;
  gte?: number;
  lte?: number;
  center?: [number, number];
  radius?: number;
}

export interface BackendGeographicalRangeTypeCondition {
  op: SearchOperation.GeographicalRange;
  field: [string, string];
  center: [number, number];
  radius: number;
}

export interface BackendLogicTypeCondition {
  op: Extract<SearchOperation, SearchOperation.And | SearchOperation.Or>;
  // eslint-disable-next-line no-use-before-define
  conds: BackendFilter[];
}

export type BackendFilter =
  | BackendMustTypeCondition
  | BackendRangeTypeCondition
  | BackendGeographicalRangeTypeCondition
  | BackendLogicTypeCondition;

export interface BackendSearchCommonRequest {
  index_name: string;
  search: {
    limit?: number;
    partition?: unknown;
    order_by_vector?: {
      vectors?: number[][];
      primary_keys?: Array<string | number>;
      sparse_vectors?: Record<string, number>[];
    };
    dense_weight?: number;
    order_by_raw?: {
      text: string;
    };
    filter?: BackendFilter;
    output_fields?: string[];
    order_by_scalar?: {
      order: "asc" | "desc";
      field_name: string;
    };
    primary_key_in?: Array<string | number>;
    primary_key_not_in?: Array<string | number>;
  };
}

interface BackendSearchByCollectionNameRequest extends BackendSearchCommonRequest {
  collection_name: string;
}

interface BackendSearchByCollectionAliasRequest extends BackendSearchCommonRequest {
  collection_alias: string;
}

export type BackendSearchRequest =
  | BackendSearchByCollectionNameRequest
  | BackendSearchByCollectionAliasRequest;

export type BackendSearchData<Data extends Record<string, unknown>> = {
  score: number;
  fields?: Data;
  [key: string]: unknown;
}[][];

export interface BackendSearchAggCommonRequest {
  index_name: string;
  search?: {
    partition?: unknown;
    filter?: BackendFilter;
  };
  agg: {
    op: string;
    field?: string;
    cond?: Record<string, unknown>;
  };
}

interface BackendSearchAggByCollectionNameRequest extends BackendSearchAggCommonRequest {
  collection_name: string;
}

interface BackendSearchAggByCollectionAliasRequest extends BackendSearchAggCommonRequest {
  collection_alias: string;
}

export type BackendSearchAggRequest =
  | BackendSearchAggByCollectionNameRequest
  | BackendSearchAggByCollectionAliasRequest;

export type BackendSearchAggResponse = {
  agg_op: string;
  group_by_field?: string;
  agg_result?: Record<string, unknown>;
};
