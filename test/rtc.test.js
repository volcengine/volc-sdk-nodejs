import { rtcOpenapi } from "../lib";
import { ListRoomsReponseSchemaValidate, ListIndicatorsReponseSchemaValidate } from "./schema/rtc";

const rtcOpenapiService = rtcOpenapi.defaultService;

test("rtc:ListRooms", async () => {
  const response = await rtcOpenapiService.ListRooms({
    AppId: "6110e5394f69bb00ca885806",
  });
  const validateResult = ListRoomsReponseSchemaValidate(response);
  expect(validateResult).toBe(true);
});

test("rtc:ListIndicators", async () => {
  const response = await rtcOpenapiService.ListIndicators({
    AppId: "6110e5394f69bb00ca885806",
    StartTime: "2021-07-24T08:00:00+08:00",
    EndTime: "2021-07-28T08:00:00+08:00",
    Indicator: "NetworkTransDelay",
    OS: "mac",
    Network: "wifi",
  });
  const validateResult = ListIndicatorsReponseSchemaValidate(response);
  expect(validateResult).toBe(true);
});
