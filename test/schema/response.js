import Ajv from "ajv";
import merge from "lodash.merge";
const ajv = new Ajv();

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
