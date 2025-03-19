import { type Response, AbstractService } from "../abstractService";
import {
  type CollectionInfo,
  CollectionVectorize,
  type CreateCollectionRequest,
  type DropCollectionRequest,
  type GetCollectionInfoRequest,
  GetCollectionInfoResponse,
  ListCollectionsResponse,
  type UpdateCollectionRequest,
} from "./types";
import { Pathname } from "./pathname";
import type {
  BackendCollectionInfo,
  BackendCreateCollectionRequest,
  BackendDropCollectionRequest,
  BackendGetCollectionInfoRequest,
  BackendUpdateCollectionRequest,
} from "./backend";
import {
  type BackendField,
  type DenseVectorFieldInfo,
  type FieldInfo,
  FieldType,
  type PrimaryKeyFieldInfo,
  type ScalarFieldInfo,
  type TextFieldInfo,
  VikingdbResponse,
} from "../types";

export class CollectionService extends AbstractService {
  isScalarField(field: FieldInfo): field is ScalarFieldInfo<any> {
    return (
      new Set([
        FieldType.Int64,
        FieldType.Float32,
        FieldType.String,
        FieldType.Boolean,
        FieldType.ListInt64,
        FieldType.ListString,
      ]).has(field.FieldType) &&
      (!("IsPrimary" in field) || !field.IsPrimary)
    );
  }

  isDenseVectorField(field: FieldInfo): field is DenseVectorFieldInfo {
    return field.FieldType === FieldType.DenseVector;
  }

  isTextField(field: FieldInfo): field is TextFieldInfo {
    return field.FieldType === FieldType.Text;
  }

  private encodeCollectionFields(fields: FieldInfo[]): BackendField[] {
    return fields.map((item) => {
      const field: BackendField = {
        field_name: item.FieldName,
        field_type: item.FieldType,
      };
      if (this.isScalarField(item)) {
        field.default_val = item.DefaultValue;
      } else if (this.isDenseVectorField(item)) {
        field.dim = item.Dim;
      } else if (this.isTextField(item)) {
        field.pipeline_name = item.PipelineName;
      }
      return field;
    }, this);
  }

  private getPrimaryKey(fields: FieldInfo[]) {
    const primaryFields = fields.filter((item) => "IsPrimary" in item && item.IsPrimary);
    if (!primaryFields.length) {
      return "__AUTO_ID__";
    }
    const [{ FieldName }] = primaryFields;
    return FieldName;
  }

  async CreateCollection({
    CollectionAliases,
    CollectionName,
    Description,
    Fields,
    Vectorize,
  }: CreateCollectionRequest): Promise<VikingdbResponse> {
    const primaryKey = this.getPrimaryKey(Fields);
    let VectorizeParams: CollectionVectorize[] = [];
    if (Vectorize) {
      if (Array.isArray(Vectorize)) {
        VectorizeParams = Vectorize;
      } else {
        VectorizeParams = [Vectorize];
      }
    }
    const response = await this.request<BackendCreateCollectionRequest>(Pathname.CreateCollection, {
      collection_name: CollectionName,
      collection_aliases: CollectionAliases,
      description: Description,
      primary_key: primaryKey,
      fields: this.encodeCollectionFields(Fields),
      ...(VectorizeParams.length > 0 ? { vectorize: VectorizeParams } : {}),
    });
    return new VikingdbResponse(response.original_request, response.request_id);
  }

  async UpdateCollection({
    CollectionName,
    Fields,
    CollectionAliases,
    Description,
  }: UpdateCollectionRequest): Promise<VikingdbResponse> {
    const response = await this.request<BackendUpdateCollectionRequest>(Pathname.UpdateCollection, {
      collection_name: CollectionName,
      collection_aliases: CollectionAliases,
      fields: this.encodeCollectionFields(Fields),
      description: Description,
    });
    return new VikingdbResponse(response.original_request, response.request_id);
  }

  private decodeCollectionInfo(data: BackendCollectionInfo): CollectionInfo {
    const primaryKeys = new Set(
      this.isString(data.primary_key) ? [data.primary_key] : data.primary_key
    );
    return {
      CollectionName: data.collection_name,
      CollectionAliases: data.collection_aliases,
      Description: data.description,
      CreateTime: data.create_time,
      IndexNames: data.index_names ?? [],
      IndexNumber: data.index_num,
      UpdatePerson: data.update_person,
      UpdateTime: data.update_time,
      Stat: { DataNumber: data.stat.data_number },
      Fields: data.fields.map((item) => {
        if (primaryKeys.has(item.field_name)) {
          const field: PrimaryKeyFieldInfo<any> = {
            FieldName: item.field_name,
            IsPrimary: true,
            FieldType: item.field_type,
          };
          return field;
        }
        if (!this.isNil(item.default_val)) {
          const field: ScalarFieldInfo<any> = {
            FieldName: item.field_name,
            FieldType: item.field_type,
            DefaultValue: item.default_val,
          };
          return field;
        }
        if (!this.isNil(item.pipeline_name)) {
          const field: TextFieldInfo = {
            FieldName: item.field_name,
            FieldType: item.field_type as FieldType.Text,
            PipelineName: item.pipeline_name,
          };
          return field;
        }
        if (!this.isNil(item.dim)) {
          const field: DenseVectorFieldInfo = {
            FieldName: item.field_name,
            FieldType: item.field_type as FieldType.DenseVector,
            Dim: item.dim,
          };
          return field;
        }
        return {
          FieldName: item.field_name,
          FieldType: item.field_type,
        };
      }, this),
    };
  }

  async GetCollectionInfo(request: GetCollectionInfoRequest): Promise<GetCollectionInfoResponse> {
    let response: Response<BackendCollectionInfo>;
    if ("CollectionName" in request) {
      response = await this.request<BackendGetCollectionInfoRequest, BackendCollectionInfo>(
        Pathname.GetCollectionInfo,
        {
          collection_name: request.CollectionName,
        }
      );
    } else {
      response = await this.request<BackendGetCollectionInfoRequest, BackendCollectionInfo>(
        Pathname.GetCollectionInfo,
        {
          collection_alias: request.CollectionAlias,
        }
      );
    }
    const { data, original_request, request_id } = response;
    const info = this.decodeCollectionInfo(data);
    return new GetCollectionInfoResponse(info, original_request, request_id);
  }

  async ListCollections(): Promise<ListCollectionsResponse> {
    const response = await this.request<NonNullable<unknown>, BackendCollectionInfo[]>(
      Pathname.ListCollections
    );
    const data = response.data.map(this.decodeCollectionInfo, this);
    return new ListCollectionsResponse(data, response.original_request, response.request_id);
  }

  async DropCollection(request: DropCollectionRequest): Promise<VikingdbResponse> {
    const response = await this.request<BackendDropCollectionRequest>(
      Pathname.DropCollection,
      this.isCollectionNameRequest(request)
        ? {
            collection_name: request.CollectionName,
          }
        : { collection_alias: request.CollectionAlias }
    );
    return new VikingdbResponse(response.original_request, response.request_id);
  }
}

export * as collection from "./types";
