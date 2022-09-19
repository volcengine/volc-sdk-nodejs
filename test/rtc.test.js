import { rtcOpenapi } from "../lib";
import { GetRecordTaskParamsSchemaValidate, StopRecordParamsSchemaValidate, StartRecordParamsSchemaValidate } from "./schema/rtc";

const rtcOpenapiService = rtcOpenapi.defaultService;

test("rtc:StartRecordParams", async () => {
  const response = await rtcOpenapiService.StartRecordParams({
    AppId : "Your_AppId",
    BusinessId : "Your_BusinessId",
    RoomId : "Your_RoomId",
    TaskId: "Your_TaskId",
    RecordMode: 0,
    FileFormatConfig: {
      FileFormat: ["HLS", "FLV"]
    },
    FileNameConfig: {
      Prefix: ["directory1", "directory2"],
      Pattern: ""
    },
    StorageConfig: {
      Type: 0,
      TosConfig: {
          UserAccountId: "Your_UserAccountId",
          Region: "Your_Region",
          Bucket: "Your_Bucket"
      }
    }
  });
  const validateResult = StartRecordParamsSchemaValidate(response);
  expect(validateResult).toBe(true);
});

test("rtc:StopRecord", async () => {
  const response = await rtcOpenapiService.StopRecord({
    AppId : "Your_AppId",
    RoomId : "Your_RoomId",
    TaskId: "Your_TaskId"
  });
  const validateResult = StopRecordParamsSchemaValidate(response);
  expect(validateResult).toBe(true);
});


test("rtc:GetRecordTask", async () => {
  const response = await rtcOpenapiService.GetRecordTask({
    AppId : "Your_AppId",
    RoomId : "Your_RoomId",
    TaskId: "Your_TaskId"
  });
  const validateResult = GetRecordTaskParamsSchemaValidate(response);
  expect(validateResult).toBe(true);
});
