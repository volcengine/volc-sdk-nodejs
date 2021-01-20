import Ajv from "ajv";
import { createResponseSchema } from "./response";
const ajv = new Ajv();

export const getDirectEditResultReponseSchemaValidate = ajv.compile(
  createResponseSchema({
    type: "array",
    items: {
      type: "object",
      properties: {
        ReqId: {
          type: "string",
        },
        EditParam: {
          type: "object",
        },
        CallbackUri: {
          type: "string",
        },
        CallbackArgs: {
          type: "string",
        },
        Priority: {
          type: "number",
        },
        Status: {
          type: "string",
        },
        Message: {
          type: "string",
        },
        OutputVid: {
          type: "string",
        },
        SubVid: {
          type: "array",
          items: { type: "string" }
        },
        TaskId: {
          type: "string",
        },
      },
    },
  })
);
