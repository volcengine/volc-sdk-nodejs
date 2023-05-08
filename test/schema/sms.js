import Ajv from "ajv";
import { createResponseSchema } from "./response";
const ajv = new Ajv();

export const SendSmsResponseSchemaValidate = ajv.compile(
  createResponseSchema({
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
          Region: {
            type: "string",
          },
          Action: {
            type: "string",
          },
          Version: {
            type: "string",
          },
          Error: {
            type: "object",
            properties: {
              CodeN: {
                type: "number",
              },
              Code: {
                type: "string",
              },
              Message: {
                type: "string",
              },
            },
            required: ["Code", "Message"],
          },
        },
        required: ["RequestId", "Service", "Region", "Action", "Version"],
      },
      Result: {
        type: "array",
        properties: {
          MessageID: {
            type: "string",
          },
        },
        required: ["MessageID"],
      },
    },
    required: ["ResponseMetadata", "Result"],
  })
);
