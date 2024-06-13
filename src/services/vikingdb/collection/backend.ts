import type { BackendField } from "../types";

export interface BackendCreateCollectionRequest {
  collection_name: string;
  collection_aliases?: string[];
  description?: string;
  primary_key: string;
  fields: BackendField[];
}

export interface BackendCollectionInfo {
  collection_name: string;
  description?: string;
  collection_aliases?: string[];
  primary_key: string | string[];
  fields: BackendField[];
  stat: {
    data_number: number;
  };
  index_names?: string[];
  index_num: number;
  create_time: string;
  update_time: string;
  update_person: string;
}

export interface BackendGetCollectionInfoRequest {
  collection_name?: string;
  collection_alias?: string;
}

export type BackendUpdateCollectionRequest = Omit<BackendCreateCollectionRequest, "primary_key">;
export interface BackendDropCollectionRequest {
  collection_name?: string;
  collection_alias?: string;
}
