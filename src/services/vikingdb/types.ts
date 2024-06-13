export type VikingdbRegion = "cn-beijing" | "cn-shanghai";

export class VikingdbResponse {
  constructor(
    /** @type string 原始请求 body string */
    public readonly OriginalRequest: string,
    /** @type string 日志 ID */
    public readonly LogId: string
  ) {}
}

export enum VikingdbErrorCode {
  ErrUnauthorized = 1000001,
  ErrNoPermission,
  ErrInvalidRequest,
  ErrCollectionExist,
  ErrCollectionNotExist,
  ErrOperationNotAllowed,
  ErrIndexExist,
  ErrIndexNotExist,
  ErrInitTbaseReader,
  ErrQueryOpFailed,
  ErrDataNotFound,
  ErrInitTbaseWriter,
  ErrDelOpFailed,
  ErrUpsertOpFailed,
  ErrTokenMismatch,
  ErrInvalidQueryVec,
  ErrInvalidPrimaryKey,
  ErrInvalidPartition,
  ErrInvalidScalarCond,
  ErrInvalidProxyService,
  ErrIndexRecall,
  ErrIndexFetchData,
  ErrIndexNotReady,
  ErrAPINotImplemented,
  ErrCalcEmbeddingFailed,
  ErrListEmbeddingModels,
  ErrInternal = 1000028,
  ErrInvalidRerank = 1000030,
  ErrUserNoOrder = 1000032,
  ErrUserOverdue,
  ErrSdk = 9999999,
}

export class VikingdbError extends Error {
  constructor(
    /** @type number 后端错误码 */
    public readonly Code: VikingdbErrorCode,
    /** @type string 后端错误信息 */
    public readonly Message: string
  ) {
    super(`[${Code}]: ${Message}`);
  }
}

export class VikingdbRequestError extends VikingdbError {
  constructor(
    /** @type number 后端错误码 */
    Code: VikingdbErrorCode,
    /** @type string 后端错误信息 */
    Message: string,
    public readonly OriginalRequest: string,
    /** @type string 请求日志 ID */
    public readonly LogId: string
  ) {
    super(Code, Message);
  }
}

/* CreateCollection start */
export enum FieldType {
  Int64 = "int64",
  Float32 = "float32",
  String = "string",
  Boolean = "bool",
  ListString = "list<string>",
  ListInt64 = "list<int64>",
  /** 稠密向量 */
  DenseVector = "vector",
  /** 稀疏向量 */
  SparseVector = "sparse_vector",
  Text = "text",
}
/** 标量字段类型 */
export type ScalarFieldType = Exclude<
  FieldType,
  FieldType.DenseVector | FieldType.SparseVector | FieldType.Text
>;

export interface ScalarFieldType2JsType {
  [FieldType.Int64]: number;
  [FieldType.Float32]: number;
  [FieldType.String]: string;
  [FieldType.Boolean]: boolean;
  [FieldType.ListString]: string[];
  [FieldType.ListInt64]: Array<number>;
}

/** 主键字段类型 */
export type PrimaryKeyFieldType = Extract<ScalarFieldType, FieldType.Int64 | FieldType.String>;

/** 标量字段信息 */
export interface ScalarFieldInfo<
  Type extends ScalarFieldType,
  Value extends ScalarFieldType2JsType[Type] = any
> {
  FieldName: string;
  FieldType: Type;
  DefaultValue?: Value;
}

/** 主键字段信息 */
export interface PrimaryKeyFieldInfo<Type extends PrimaryKeyFieldType>
  extends Omit<ScalarFieldInfo<Type, never>, "DefaultValue"> {
  IsPrimary: true;
}

/** 稠密向量字段信息 */
export interface DenseVectorFieldInfo {
  FieldName: string;
  FieldType: FieldType.DenseVector;
  /** 向量维度，需要 4 的倍数 */
  Dim: number;
}

/** 稀疏向量字段信息 */
export interface SparseVectorFieldInfo {
  FieldName: string;
  FieldType: FieldType.SparseVector;
}

export type PipelineName =
  | "text_split_bge_large_zh"
  | "text_bge_large_zh"
  | "text_split_bge_m3"
  | "text_bge_m3"
  | "text_split_bge_large_and_m3"
  | "text_bge_large_and_m3";

/** 文本字段信息 */
export interface TextFieldInfo {
  FieldName: string;
  FieldType: FieldType.Text;
  PipelineName?: PipelineName;
}

export type FieldInfo =
  | ScalarFieldInfo<ScalarFieldType>
  | PrimaryKeyFieldInfo<PrimaryKeyFieldType>
  | DenseVectorFieldInfo
  | SparseVectorFieldInfo
  | TextFieldInfo;

export interface BackendField {
  field_name: string;
  field_type: string;
  default_val?: any;
  dim?: number;
  pipeline_name?: PipelineName;
}

export type IsNever<T> = [T] extends [never] ? true : false;

export type IsUnion<T, B = T> = IsNever<T> extends true
  ? false
  : T extends B
  ? [B] extends [T]
    ? false
    : true
  : never;

export type IsPrimaryKey<
  Data extends Record<string, any>,
  PrimaryKey extends keyof Data
> = IsUnion<PrimaryKey> extends true
  ? false
  : Data[PrimaryKey] extends ScalarFieldType2JsType[PrimaryKeyFieldType]
  ? true
  : false;

export type GetPrimaryKeys<T extends Record<string, any>> = {
  [K in keyof T]: IsPrimaryKey<T, K> extends true ? K : never;
}[keyof T];

export type PrimaryKeys = Array<ScalarFieldType2JsType[PrimaryKeyFieldType]>;
