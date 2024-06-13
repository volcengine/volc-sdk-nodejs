import { AbstractService } from "../abstractService";
import {
  type AllModelParams,
  type DataParams,
  EmbeddingResponse,
  type EmbeddingResult,
  type ModelParams,
} from "./types";
import { Pathname } from "./pathname";
import { type BackendEmbeddingRequest, type BackendEmbeddingResult, DataType } from "./backend";

export class EmbeddingService extends AbstractService {
  async Embedding(
    modelParams: ModelParams<never>,
    dataParams: DataParams[]
  ): Promise<EmbeddingResponse<never>>;
  async Embedding(
    modelParams: ModelParams<"ReturnDense">,
    dataParams: DataParams[]
  ): Promise<EmbeddingResponse<"SentenceDenseEmbedding">>;
  async Embedding(
    modelParams: ModelParams<"ReturnSparse">,
    dataParams: DataParams[]
  ): Promise<EmbeddingResponse<"SentenceSparseEmbedding">>;
  async Embedding(
    modelParams: ModelParams<"ReturnTokenUsage">,
    dataParams: DataParams[]
  ): Promise<EmbeddingResponse<"TokenUsage">>;
  async Embedding(
    modelParams: ModelParams<"ReturnDense" | "ReturnSparse">,
    dataParams: DataParams[]
  ): Promise<EmbeddingResponse<"SentenceDenseEmbedding" | "SentenceSparseEmbedding">>;
  async Embedding(
    modelParams: ModelParams<"ReturnDense" | "ReturnTokenUsage">,
    dataParams: DataParams[]
  ): Promise<EmbeddingResponse<"SentenceDenseEmbedding" | "TokenUsage">>;
  async Embedding(
    modelParams: ModelParams<"ReturnSparse" | "ReturnTokenUsage">,
    dataParams: DataParams[]
  ): Promise<EmbeddingResponse<"SentenceSparseEmbedding" | "TokenUsage">>;
  async Embedding(
    modelParams: ModelParams<"ReturnDense" | "ReturnSparse" | "ReturnTokenUsage">,
    dataParams: DataParams[]
  ): Promise<
    EmbeddingResponse<"SentenceDenseEmbedding" | "SentenceSparseEmbedding" | "TokenUsage">
  >;
  async Embedding(
    { ModelName, ReturnTokenUsage, ReturnSparse, ReturnDense }: AllModelParams,
    dataParams: DataParams[]
  ): Promise<EmbeddingResponse<any>> {
    const request: BackendEmbeddingRequest = {
      model: {
        model_name: ModelName,
        params: {
          return_dense: ReturnDense,
          return_sparse: ReturnSparse,
          return_token_usage: ReturnTokenUsage,
        },
      },
      data: dataParams.map((item) => {
        if (item.DataType === DataType.Text) {
          return {
            data_type: item.DataType,
            text: item.Text,
          };
        }
        if (item.DataType === DataType.Image) {
          return {
            data_type: item.DataType,
            image: item.Image,
          };
        }
        return {
          data_type: item.DataType,
          text: item.Text,
          image: item.Image,
        };
      }),
    };
    const response = await this.request<BackendEmbeddingRequest, BackendEmbeddingResult>(
      Pathname.Embedding,
      request
    );
    const { sentence_dense_embedding, sentence_sparse_embedding, token_usage } = response.data;
    const result: EmbeddingResult = {};
    if (ReturnDense && sentence_dense_embedding) {
      result.SentenceDenseEmbedding = sentence_dense_embedding;
    }
    if (ReturnSparse && sentence_sparse_embedding) {
      result.SentenceSparseEmbedding = sentence_sparse_embedding;
    }
    if (ReturnTokenUsage && token_usage) {
      result.TokenUsage = {
        TotalTokens: token_usage.total_tokens,
        CompletionTokens: token_usage.completion_tokens,
        PromptTokens: token_usage.prompt_tokens,
      };
    }
    return new EmbeddingResponse<any>(result, response.original_request, response.request_id);
  }
}

export * as embedding from "./types";
