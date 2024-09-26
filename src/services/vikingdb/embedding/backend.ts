/** @link https://www.volcengine.com/docs/84313/1254554 */
export type ModelName =
  | "bge-large-zh"
  | "bge-m3"
  | "bge-large-zh-and-m3"
  | "bge-visualized-m3"
  | "doubao-embedding"
  | "doubao-embedding-and-m3";

export enum DataType {
  Text = "text",
  Image = "image",
  TextImage = "text-image",
}

interface BackendTextDataParams {
  data_type: DataType.Text;
  text: string;
}

interface BackendImageDataParams {
  data_type: DataType.Image;
  image: string;
}

interface BackendTextImageDataParams {
  data_type: DataType.TextImage;
  text: string;
  image: string;
}

type BackendDataParams =
  | BackendTextDataParams
  | BackendImageDataParams
  | BackendTextImageDataParams;

export interface BackendEmbeddingRequest {
  model: {
    model_name: ModelName;
    params?: {
      return_token_usage?: boolean;
      return_dense?: boolean;
      return_sparse?: boolean;
    };
  };
  data: BackendDataParams[];
}

export interface BackendEmbeddingResult {
  sentence_dense_embedding?: number[][];
  sentence_sparse_embedding?: Record<string, number>[];
  token_usage?: {
    prompt_tokens: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}
