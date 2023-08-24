export type ServiceOptions = {
  host?: string;
  region?: string;
  timeout?: number;
};

export interface Model {
  name?: string;
  endpoint_id?: string;
}

export enum ChatRole {
  User = "user",
  Assistant = "assistant",
  System = "system",
}

export interface Message {
  role?: ChatRole;
  content: string;
}

export interface ChatParameters {
  temperature?: number; // Exponential scaling output probability distribution
  max_tokens?: number; // The maximum number of tokens to generate in the char completion.
  // An alternative to sampling with temperature, called nucleus sampling,
  // where the model considers the results of the tokens with top_p probability
  // mass
  top_p?: number;
  // Number between -2.0 and 2.0. Positive values penalize new tokens based on
  // their existing frequency in the text so far, decreasing the model's
  // likelihood to repeat the same line verbatim.
  presence_penalty?: number;
  frequency_penalty?: number;
  // The maximum number of tokens to generate, ignoring the number of tokens in
  // the prompt
  max_new_tokens?: number;
  // The parameter for repetition penalty, from [1.0, 2.0]
  repetition_penalty?: number;
  // Whether or not to use sampling, use greedy decoding otherwise. Default to
  // false
  do_sample?: boolean;
  // The number of highest probability vocabulary tokens to keep for
  // top-k-filtering.
  top_k?: number;
  // the minimum number of tokens to generate
  min_new_tokens?: number;
}

export type Choice = {
  index?: number;
  message: Message;
  finish_reason: string;
};

export type Usage = {
  // The number of prompt tokens
  prompt_tokens: number;
  // The number of generated tokens
  completion_tokens: number;
  // The number of all: prompt_tokens + completion_tokens
  total_tokens: number;
};

export type ChatApiError = {
  code: string;
  message: string;
  code_n: number;
};

export type ChatResult = {
  // Unified request id
  req_id: string;
  // Error if exists for the req
  error?: ChatApiError;
  // The generated result
  choice: Choice;
  // The tokens usage
  usage?: Usage;
};

export interface ChatReqParams {
  // Used model for inference
  model: Model;
  // User input prompt
  messages: Message[];
  // API specific parameters
  parameters?: ChatParameters;
  // Whether use stream mode, if set, partial message deltas will be sent as
  // data-only server-sent events as they become available
  // The stream will be terminated by a data: [DONE]
  stream?: boolean;
  // optional symmetric key to encrypt messages, the key itself is encrypted
  // with model's public key.
  crypto_token?: string;
}
