import Ajv from "ajv";
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
  return {
    ...resultSchema,
    properties: {
      ...resultSchema.properties,
      Result: resultSchema,
    },
  };
}

export const reponseSchemaValidate = ajv.compile(reponseSchema);
