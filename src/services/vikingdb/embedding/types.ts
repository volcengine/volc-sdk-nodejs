import type { DataType, ModelName } from "./backend";
import { VikingdbResponse } from "../types";

export { DataType } from "./backend";

/* Embedding start */
export interface AllModelParams {
  ModelName: ModelName;
  /**
   * 返回请求消耗的 token 数
   * @default false
   */
  ReturnTokenUsage?: boolean;
  /**
   * 返回稠密向量
   * @default true
   */
  ReturnDense?: boolean;
  /**
   * 返回稀疏向量，需要模型支持，否则报错
   */
  ReturnSparse?: boolean;
}

export type ModelParams<Key extends Exclude<keyof AllModelParams, "ModelName">> = Pick<
  Required<AllModelParams>,
  Key
> &
  Pick<AllModelParams, "ModelName">;

interface TextDataParams {
  DataType: DataType.Text;
  Text: string;
}

interface ImageDataParams {
  DataType: DataType.Image;
  /** 传入 base64 编码 */
  Image: string;
}

interface TextImageDataParams {
  DataType: DataType.TextImage;
  Text: string;
  /** 传入 base64 编码 */
  Image: string;
}

export type DataParams = TextDataParams | ImageDataParams | TextImageDataParams;

export interface EmbeddingResult {
  SentenceDenseEmbedding?: number[][];
  SentenceSparseEmbedding?: Record<string, number>[];
  TokenUsage?: {
    PromptTokens: number;
    CompletionTokens?: number;
    TotalTokens?: number;
  };
}

export class EmbeddingResponse<Key extends keyof EmbeddingResult> extends VikingdbResponse {
  constructor(
    public Result: Pick<Required<EmbeddingResult>, Key>,
    OriginalRequest: string,
    LogId: string
  ) {
    super(OriginalRequest, LogId);
  }
}
/* Embedding end */
