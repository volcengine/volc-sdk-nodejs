import Ajv from "ajv";
import { createResponseSchema } from "./response";
const ajv = new Ajv();

export const ListRoomsReponseSchemaValidate = ajv.compile(
  createResponseSchema({
    type: "object",
    properties: {
      Total: {
        type: "number",
      },
      ActiveNum: {
        type: "number",
      },
      InactiveNum: {
        type: "number",
      },
      Offset: {
        type: "number",
      },
      Limit: {
        type: "number",
      },
      Rooms: {
        type: "array",
        items: {
          type: "object",
          properties: {
            RoomId: {
              type: "string",
            },
            AppId: {
              type: "string",
            },
            UserNum: {
              type: "number",
            },
            StreamNum: {
              type: "number",
            },
            State: {
              type: "number",
            },
            CreatedAt: {
              type: "string",
            },
            UpdatedAt: {
              type: "string",
            },
          },
        },
      },
    },
    required: ["Total", "ActiveNum", "InactiveNum", "Offset", "Limit", "Rooms"],
  })
);

export const ListIndicatorsReponseSchemaValidate = ajv.compile(
  createResponseSchema({
    type: "object",
    properties: {
      Indicators: {
        type: "array",
        items: {
          type: "object",
          properties: {
            Name: {
              type: "string",
            },
            Unit: {
              type: "string",
            },
            Data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  TimeStamp: {
                    type: "string",
                  },
                  Value: {
                    type: "number",
                  },
                },
              },
            },
          },
        },
      },
    },
    required: ["Indicators"],
  })
);

export const StartRecordParamsSchemaValidate = ajv.compile(
  createResponseSchema({
    type: "string",
  })
);
export const StopRecordParamsSchemaValidate = ajv.compile(
  createResponseSchema({
    type: "string",
  })
);

export const GetRecordTaskParamsSchemaValidate = ajv.compile(
  createResponseSchema({
    type: "object",
    properties: {
      StartTime: {
        type: "number",
      },
      EndTime: {
        type: "number",
      },
      Status: {
        type: "number",
      },
      StopReason: {
        type: "string",
      },
      RecordFileList: {
        type: "array",
        items: {
          type: "object",
          properties: {
            Vid: {
              type: "string",
            },
            Duration: {
              type: "number",
            },
            Size: {
              type: "number",
            },
            StreamList: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  UserId: {
                    type: "string",
                  },
                  StreamType: {
                    type: "number",
                  },
                }
              }
            },
          },
        },
      },
    },
    required: ["StartTime", "EndTime", "Status", "StopReason", "RecordFileList"],
  })
);