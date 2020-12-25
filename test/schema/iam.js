import Ajv from "ajv";
import { createResponseSchema } from "./response";
const ajv = new Ajv();

export const listUserReponseSchemaValidate = ajv.compile(
  createResponseSchema({
    type: "object",
    properties: {
      Limit: {
        type: "number",
      },
      Offset: {
        type: "number",
      },
      Total: {
        type: "number",
      },
      UserMetadata: {
        type: "array",
        items: {
          type: "object",
          properties: {
            UserName: {
              type: "string",
            },
            Trn: {
              type: "string",
            },
            DisplayName: {
              type: "string",
            },
          },
        },
      },
    },
    required: ["Limit", "Offset", "Total", "UserMetadata"],
  })
);
