export type ServiceOptions = {
  host?: string;
  region?: string;
  timeout?: number;
};

export interface Model {
  // Unified model name in model db
  name?: string;

  // Use specific endpoint id for inference, if set, parameters `name` and
  // `version` will be ignored.
  endpoint_id?: string;

  // Use specific model version for inference, optional.
  version?: string;
}

export enum ChatRole {
  User = "user",
  Assistant = "assistant",
  System = "system",
  Function = "function",
}

export interface FunctionCall {
  // The name of the function to call.
  name: string;

  // The arguments to call the function with, generated by model, formatted as json, may not valid,
  // the caller should validate the arguments before calling the function.
  arguments: string;
}

export interface Reference {
  // url
  url: string;

  // the index of url
  idx: number;

  // the logo of url
  logo_url: string;

  // the url be used for pc
  pc_url: string;

  // the topic of url
  site_name: string;
}

export interface Message {
  // The role of the author of this message. One of system, user, assistant or function.
  role: ChatRole;

  // The real content of the message, may be empty for assistant message with function call.
  content: string;

  // If the role is `function`, is the name of the function which generate the content.
  name?: string;

  // The name and arguments of a function call generated by model.
  function_call?: FunctionCall;

  // url reference for searching, optional
  references?: Reference[];
}

export interface Error {
  code: string;
  code_n: number;
  message: string;
}

export interface Parameters {
  // Exponential scaling output probability distribution
  temperature?: number;

  // The maximum number of tokens to generate in the char completion.
  max_tokens?: number;

  // An alternative to sampling with temperature, called nucleus sampling,
  // where the model considers the results of the tokens with top_p probability
  // mass
  top_p?: number;

  // Number between -2.0 and 2.0. Positive values penalize new tokens based
  // on whether they appear in the text so far, increasing the model's
  // likelihood to talk about new topics.
  presence_penalty?: number;

  // Number between -2.0 and 2.0. Positive values penalize new tokens based on
  // their existing frequency in the text so far, decreasing the model's
  // likelihood to repeat the same line verbatim.
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

  // the maximum number of prompt tokens, if prompt tokens length over this
  // limit, it will be truncated as prompt[-max_prompt_tokens:]
  max_prompt_tokens?: number;
}

export interface Choice {
  index?: number;
  message: Message;
  finish_reason: string;
  logprobs?: number;
}

export interface Usage {
  // The number of prompt tokens
  prompt_tokens: number;

  // The number of generated tokens
  completion_tokens: number;

  // The number of all: prompt_tokens + completion_tokens
  total_tokens: number;
}

export interface FunctionType {
  // The name of the function.
  name: string;

  // A description of the function, used by the model to choose when and how to call the function.
  description: string;

  // The parameters of the function, described as Json Schema.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parameters: any;

  // The examples of the function parameters, as the above json schema describes.
  examples: string[];
}

export interface ChatReq {
  // Used model for inference
  model: Model;

  // User input prompt
  messages: Message[];

  // API specific parameters
  parameters?: Parameters;

  // Whether use stream mode, if set, partial message deltas will be sent as
  // data-only server-sent events as they become available
  // The stream will be terminated by a data: [DONE]
  stream?: boolean;

  // Unified request id
  req_id?: string;

  // optional symmetric key to encrypt messages, the key itself is encrypted
  // with model's public key.
  crypto_token?: string;

  // optional list of functions the model may generate json inputs for.
  functions?: FunctionType[];

  // list of plugins the model may call.
  plugins?: string[];

  // extra info
  extra?: { [key: string]: string };
}

export interface ChatResp {
  // Unified request id
  req_id: string;

  // Error if exists for the req
  error?: Error;

  // The generated result
  choice?: Choice;

  // The tokens usage
  usage?: Usage;

  // extra info
  extra?: { [key: string]: string };
}
