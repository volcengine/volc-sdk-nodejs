import Ajv from "ajv";
import { createResponseSchema } from "./response";
const ajv = new Ajv();

export const getListPodResultReponseSchemaValidate = ajv.compile(
  createResponseSchema({
    type: "object",
    properties: {
      row: {
        type: "array",
        items: {
          type: "object",
          properties: {
            pod_id:{
              type: "string",
            },
          }
        } 
      },
      total: {
        type: "number",
      }
    }
  })
);
