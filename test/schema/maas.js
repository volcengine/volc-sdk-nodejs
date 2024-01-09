import Ajv from "ajv";
const ajv = new Ajv({ unicodeRegExp: true, strictTypes: false });

export const ChatMaasSchemaValidate = ajv.compile({
  type: "object",
  properties: {
    req_id: {
      type: "string",
    },
    error: {
      type: "object",
      properties: {
        code: {
          type: "string",
        },
        message: {
          type: "string",
        },
        code_n: {
          type: "number",
        },
      },
      required: ["code", "message"],
    },
    choice: {
      type: "object",
      properties: {
        message: {
          type: "object",
          properties: {
            role: {
              type: "string",
            },
            content: {
              type: "string",
            },
          },
        },
        finish_reason: {
          type: "string",
        },
      },
    },
    usage: {
      type: "object",
      properties: {
        prompt_tokens: {
          type: "number",
        },
        completion_tokens: {
          type: "number",
        },
        total_tokens: {
          type: "number",
        },
      },
    },
  },
  required: ["req_id", "choice", "usage"],
});

export const TokenizationMaasSchemaValidate = ajv.compile({
  type: "object",
  properties: {
    req_id: {
      type: "string",
    },
    error: {
      type: "object",
      properties: {
        code: {
          type: "string",
        },
        message: {
          type: "string",
        },
        code_n: {
          type: "number",
        },
      },
      required: ["code", "message"],
    },
    total_tokens: {
      type: "number",
    },
    tokens: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["req_id", "total_tokens", "tokens"],
});

export const ClassificationMaasSchemaValidate = ajv.compile({
  type: "object",
  additionalProperties: true, // 允许额外的属性
  properties: {
    req_id: {
      type: "string",
    },
    error: {
      type: "object",
      properties: {
        code: {
          type: "string",
        },
        message: {
          type: "string",
        },
        code_n: {
          type: "number",
        },
      },
      required: ["code", "message"],
    },
    label: {
      type: "string",
    },
    label_logprobos: {
      type: "object",
      patternProperties: {
        "^[a-zA-Z]+$": {
          type: "string",
          properties: {
            req_id: {
              type: "string",
            },
            tokens: {
              type: "array",
              items: { type: "string" },
            },
            token_logprobos: {
              type: "array",
              items: { type: "number" },
            },
          },
          required: ["req_id", "tokens", "token_logprobos"],
        },
      },
    },
  },
  required: ["req_id", "label", "label_logprobos"],
});

export const EmbeddingsMaasSchemaValidate = ajv.compile({
  type: "object",
  properties: {
    usage: {
      type: "object",
      properties: {
        prompt_tokens: { type: "number" },
        total_tokens: { type: "number" },
      },
      required: ["prompt_tokens", "total_tokens"],
    },
    object: { type: "string" },
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          index: { type: "number" },
          embedding: {
            type: "array",
            items: { type: "number" },
          },
          object: { type: "string" },
        },
        required: ["index", "embedding", "object"],
      },
    },
  },
  required: ["usage", "object", "data"],
});

export const ChatV2MaasSchemaValidate = ajv.compile({
  type: "object",
  properties: {
    req_id: {
      type: "string",
    },
    error: {
      type: "object",
      properties: {
        code: {
          type: "string",
        },
        message: {
          type: "string",
        },
        code_n: {
          type: "number",
        },
      },
      required: ["code", "message"],
    },
    choices: {
      type: "array",
      items: {
        type: "object",
        properties: {
          message: {
            type: "object",
            properties: {
              role: {
                type: "string",
              },
              content: {
                type: "string",
              },
            },
          },
          finish_reason: {
            type: "string",
          },
        },
      },
    },
    usage: {
      type: "object",
      properties: {
        prompt_tokens: {
          type: "number",
        },
        completion_tokens: {
          type: "number",
        },
        total_tokens: {
          type: "number",
        },
      },
    },
  },
  required: ["choices"],
});

export const TokenizationV2MaasSchemaValidate = ajv.compile({
  type: "object",
  properties: {
    req_id: {
      type: "string",
    },
    error: {
      type: "object",
      properties: {
        code: {
          type: "string",
        },
        message: {
          type: "string",
        },
        code_n: {
          type: "number",
        },
      },
      required: ["code", "message"],
    },
    total_tokens: {
      type: "number",
    },
    tokens: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["total_tokens", "tokens"],
});

export const ClassificationV2MaasSchemaValidate = ajv.compile({
  type: "object",
  properties: {
    label: {
      type: "string",
    },
    label_logprobos: {
      type: "object",
      patternProperties: {
        ".*": {
          type: "object",
          properties: {
            tokens: { type: "array" },
            token_logprobs: { type: "array" },
          },
        },
      },
      additionalProperties: false,
    },
    usage: {
      type: "object",
      properties: {
        prompt_tokens: {
          type: "number",
        },
        completion_tokens: {
          type: "number",
        },
        total_tokens: {
          type: "number",
        },
      },
    },
  },
  required: ["label", "label_logprobos"],
});

export const EmbeddingsV2MaasSchemaValidate = ajv.compile({
  type: "object",
  properties: {
    usage: {
      type: "object",
      properties: {
        prompt_tokens: { type: "number" },
        total_tokens: { type: "number" },
      },
      required: ["prompt_tokens", "total_tokens"],
    },
    object: { type: "string" },
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          index: { type: "number" },
          embedding: {
            type: "array",
            items: { type: "number" },
          },
          object: { type: "string" },
        },
        required: ["index", "embedding", "object"],
      },
    },
  },
  required: ["usage", "object", "data"],
});
