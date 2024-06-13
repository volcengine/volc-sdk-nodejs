import { AbstractService } from "../abstractService";
import {
  type AreaRangeTypeCondition,
  type Filter,
  type GeographicalRangeTypeCondition,
  type LogicTypeCondition,
  type MustTypeCondition,
  type NumberRangeTypeCondition,
  type SearchByPrimaryKeyRequest,
  type SearchByScalarRequest,
  type SearchByTextRequest,
  type SearchByVectorRequest,
  SearchResponse,
} from "./types";
import { Pathname } from "./pathname";
import {
  type BackendFilter,
  type BackendGeographicalRangeTypeCondition,
  type BackendLogicTypeCondition,
  type BackendMustTypeCondition,
  type BackendRangeTypeCondition,
  type BackendSearchCommonRequest,
  type BackendSearchData,
  type BackendSearchRequest,
  SearchOperation,
} from "./backend";

export class SearchService extends AbstractService {
  private encodeSearchRequest(
    data: BackendSearchCommonRequest,
    rest: { CollectionName: string } | { CollectionAlias: string }
  ): BackendSearchRequest {
    return {
      ...data,
      ...(this.isCollectionNameRequest(rest)
        ? { collection_name: rest.CollectionName }
        : { collection_alias: rest.CollectionAlias }),
    };
  }

  private encodeMustTypeFilter({
    FieldName,
    Operation,
    Conditions,
  }: MustTypeCondition): BackendMustTypeCondition {
    return {
      op: Operation,
      field: FieldName,
      conditions: Conditions,
    };
  }

  private encodeRangeTypeFilter(
    filter: NumberRangeTypeCondition | AreaRangeTypeCondition
  ): BackendRangeTypeCondition {
    if ("FieldName" in filter) {
      return {
        field: filter.FieldName,
        op: filter.Operation,
        lt: filter.LessThen,
        lte: filter.LessThenEqual,
        gt: filter.GreatThen,
        gte: filter.GreatThenEqual,
      };
    } else {
      return {
        field: filter.FieldNames,
        op: filter.Operation,
        center: filter.Center,
        radius: filter.Radius,
      };
    }
  }

  private encodeGeographicalRangeTypeFilter(
    filter: GeographicalRangeTypeCondition
  ): BackendGeographicalRangeTypeCondition {
    return {
      op: filter.Operation,
      center: filter.Center,
      field: filter.FieldNames,
      radius: filter.Radius,
    };
  }

  private encodeLogicTypeFilter({
    Operation,
    Conditions,
  }: LogicTypeCondition): BackendLogicTypeCondition {
    return {
      op: Operation,
      conds: Conditions.map((filter) => this.encodeFilter(filter), this),
    };
  }

  private encodeFilter(filter: Filter): BackendFilter {
    switch (filter.Operation) {
      case SearchOperation.Must:
      case SearchOperation.MustNot:
        return this.encodeMustTypeFilter(filter);
      case SearchOperation.Range:
      case SearchOperation.RangeOut:
        return this.encodeRangeTypeFilter(filter);
      case SearchOperation.GeographicalRange:
        return this.encodeGeographicalRangeTypeFilter(filter);
      default:
        return this.encodeLogicTypeFilter(filter);
    }
  }

  private async decodeSearchData<Data extends Record<string, unknown>>(
    request: BackendSearchRequest
  ) {
    const response = await this.request<BackendSearchRequest, BackendSearchData<Data>>(
      Pathname.Search,
      request
    );

    return new SearchResponse<Data>(
      response.data.map((item) =>
        item.map(({ score, fields, ...rest }) => ({
          Score: score,
          Fields: fields,
          ...rest,
        }))
      ),
      response.original_request,
      response.request_id
    );
  }

  async SearchByVector<Data extends Record<string, unknown>>({
    IndexName,
    DenseWeight,
    Filter,
    Limit,
    OutputFields,
    Partition,
    DenseVectors,
    SparseVectors,
    ...rest
  }: SearchByVectorRequest): Promise<SearchResponse<Data>> {
    const request = this.encodeSearchRequest(
      {
        index_name: IndexName,
        search: {
          limit: Limit,
          dense_weight: DenseWeight,
          order_by_vector: {
            vectors: DenseVectors,
            sparse_vectors: SparseVectors,
          },
          partition: Partition,
          output_fields: OutputFields,
        },
      },
      rest
    );
    if (!this.isNil(Filter)) {
      request.search.filter = this.encodeFilter(Filter);
    }
    return this.decodeSearchData<Data>(request as BackendSearchRequest);
  }

  async SearchByPrimaryKeys<Data extends Record<string, unknown>>({
    IndexName,
    DenseWeight,
    Filter,
    Limit,
    Partition,
    OutputFields,
    PrimaryKeys,
    ...rest
  }: SearchByPrimaryKeyRequest): Promise<SearchResponse<Data>> {
    const request = this.encodeSearchRequest(
      {
        index_name: IndexName,
        search: {
          limit: Limit,
          dense_weight: DenseWeight,
          order_by_vector: {
            primary_keys: PrimaryKeys,
          },
          partition: Partition,
          output_fields: OutputFields,
        },
      },
      rest
    );
    if (!this.isNil(Filter)) {
      request.search.filter = this.encodeFilter(Filter);
    }
    return this.decodeSearchData<Data>(request);
  }

  async SearchByText<Data extends Record<string, unknown>>({
    DenseWeight,
    Filter,
    IndexName,
    Limit,
    OutputFields,
    Partition,
    Text,
    ...rest
  }: SearchByTextRequest): Promise<SearchResponse<Data>> {
    const request = this.encodeSearchRequest(
      {
        index_name: IndexName,
        search: {
          limit: Limit,
          dense_weight: DenseWeight,
          order_by_raw: {
            text: Text,
          },
          partition: Partition,
          output_fields: OutputFields,
        },
      },
      rest
    );
    if (!this.isNil(Filter)) {
      request.search.filter = this.encodeFilter(Filter);
    }
    return this.decodeSearchData<Data>(request);
  }

  async SearchByScalar<Data extends Record<string, unknown>>({
    Filter,
    Partition,
    OutputFields,
    Limit,
    IndexName,
    ScalarConfig,
    ...rest
  }: SearchByScalarRequest): Promise<SearchResponse<Data>> {
    const request = this.encodeSearchRequest(
      {
        index_name: IndexName,
        search: {
          limit: Limit,
          partition: Partition,
          output_fields: OutputFields,
        },
      },
      rest
    );
    if (!this.isNil(ScalarConfig)) {
      request.search.order_by_scalar = {
        order: ScalarConfig.Order,
        field_name: ScalarConfig.FieldName,
      };
    }
    if (!this.isNil(Filter)) {
      request.search.filter = this.encodeFilter(Filter);
    }
    return this.decodeSearchData(request);
  }
}

export * as search from "./types";
