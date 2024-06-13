import type { PrimaryKeyFieldType, PrimaryKeys, ScalarFieldType2JsType } from "../types";

interface BackendUpsertDataCommonRequest {
  fields: Record<string, unknown>[];
  ttl?: number;
}

interface BackendUpsertDataByCollectionNameRequest extends BackendUpsertDataCommonRequest {
  collection_name: string;
}

interface BackendUpsertDataByCollectionAliasRequest extends BackendUpsertDataCommonRequest {
  collection_alias: string;
}

export type BackendUpsertDataRequest =
  | BackendUpsertDataByCollectionNameRequest
  | BackendUpsertDataByCollectionAliasRequest;

interface BackendDeleteSpecifyDataByCollectionNameRequest {
  collection_name: string;
  primary_keys: PrimaryKeys;
}

interface BackendDeleteAllDataByCollectionNameRequest {
  collection_name: string;
  del_all: true;
}

interface BackendDeleteSpecifyDataByCollectionAliasRequest {
  collection_alias: string;
  primary_keys: PrimaryKeys;
}

interface BackendDeleteAllDataByCollectionAliasRequest {
  collection_alias: string;
  del_all: true;
}

export type BackendDeleteDataRequest =
  | BackendDeleteSpecifyDataByCollectionNameRequest
  | BackendDeleteSpecifyDataByCollectionAliasRequest
  | BackendDeleteAllDataByCollectionNameRequest
  | BackendDeleteAllDataByCollectionAliasRequest;

interface BackendFetchCollectionDataByCollectionNameRequest {
  collection_name: string;
  primary_keys: PrimaryKeys;
}

interface BackendFetchCollectionDataByCollectionAliasRequest {
  collection_alias: string;
  primary_keys: PrimaryKeys;
}

export type BackendFetchCollectionDataRequest =
  | BackendFetchCollectionDataByCollectionAliasRequest
  | BackendFetchCollectionDataByCollectionNameRequest;

interface BackendFetchIndexDataCommonRequest {
  index_name: string;
  primary_keys: PrimaryKeys;
  partition?: ScalarFieldType2JsType[PrimaryKeyFieldType];
  output_fields?: string[];
}

interface BackendFetchIndexDataByCollectionNameRequest extends BackendFetchIndexDataCommonRequest {
  collection_name: string;
}

interface BackendFetchIndexDataByCollectionAliasRequest extends BackendFetchIndexDataCommonRequest {
  collection_alias: string;
}

export type BackendFetchIndexDataRequest =
  | BackendFetchIndexDataByCollectionNameRequest
  | BackendFetchIndexDataByCollectionAliasRequest;

export interface BackendFetchIndexDataInfo<T extends Record<string, any>> {
  fields: T[];
}
