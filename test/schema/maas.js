import Ajv from "ajv";
const ajv = new Ajv();

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
