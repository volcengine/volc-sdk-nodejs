import Ajv from "ajv";
import merge from "lodash.merge";
const ajv = new Ajv();

const responseErrorSchema = {
  additionalProperties: true,
  properties: {
    ResponseMetadata: {
      additionalProperties: true,
      properties: {
        RequestId: {
          type: "string",
        },
        Service: {
          type: "string",
        },
        Error: {
          properties: {
            Code: {
              type: "string",
            },
            Message: {
              type: "string",
            },
            CodeN: {
              type: "number",
            },
          },
          type: "object",
        },
      },
      type: "object",
      required: ["RequestId", "Service"],
    },
  },
  required: ["ResponseMetadata"],
  type: "object",
};
export const responseErrorSchemaValidate = ajv.compile(responseErrorSchema);
export const reponseSchema = {
  type: "object",
  properties: {
    ResponseMetadata: {
      type: "object",
      properties: {
        RequestId: {
          type: "string",
        },
        Service: {
          type: "string",
        },
      },
      required: ["RequestId", "Service"],
    },
    Result: {
      type: "object",
    },
  },
  required: ["ResponseMetadata"],
};
export function createResponseSchema(resultSchema) {
  return merge({}, reponseSchema, {
    type: "object",
    properties: {
      Result: resultSchema,
    },
    required: ["ResponseMetadata", "Result"],
  });
}

export const reponseSchemaValidate = ajv.compile(reponseSchema);
