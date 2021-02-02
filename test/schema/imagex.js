import Ajv from "ajv";
import { createResponseSchema } from "./response";
const ajv = new Ajv();

export const previewImageUploadFileReponseSchemaValidate = ajv.compile(
  createResponseSchema({
    type: "object",
    properties: {
      ServiceId: {
        type: "string",
      },
      FileName: {
        type: "string",
      },
      StoreUri: {
        type: "string",
      },
      ImageURL: {
        type: "string",
      },
      ImageFormat: {
        type: "string",
      },
      ImageSize: {
        type: "number",
      },
      ImageWidth: {
        type: "number",
      },
      ImageHeight: {
        type: "number",
      },
      ImageFrames: {
        type: "number",
      },
      ImageDuration: {
        type: "number",
      },
    },
    required: ["ServiceId", "FileName", "StoreUri", "ImageURL", "ImageFormat", "ImageSize", "ImageWidth", "ImageHeight"],
  })
);

export const uploadImagesReponseSchemaValidate = ajv.compile(
  createResponseSchema({
    type: 'object',
    properties: {
      Results: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            Uri: {
              type: 'string',
            }
          },
          required: ['Uri'],
        }
      },
      RequestId: {
        type: 'string',
      },
      PluginResult: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            FileName: {
              type: 'string',
            },
            ImageUri: {
              type: "string",
            },
            ImageFormat: {
              type: "string",
            },
            ImageSize: {
              type: "number",
            },
            ImageWidth: {
              type: "number",
            },
            ImageHeight: {
              type: "number",
            },
            ImageMd5: {
              type: "string",
            },
            FrameCnt: {
              type: "number",
            },
            Duration: {
              type: "number",
            },
          },
          required: ['FileName', 'ImageUri', 'ImageFormat', 'ImageSize', 'ImageWidth', 'ImageHeight', 'ImageMd5'],
        }
      }
    },
    required: ['Results', 'RequestId', 'PluginResult'],
  })
);
