import { vodOpenapi } from "../lib";
import {
  GetPlayInfoResponseSchemaValidate,
  GetUploadTokenResponseSchemaValidate,
} from "./schema/vod";

const vodOpenapiService = vodOpenapi.defaultService;
vodOpenapiService.setAccessKeyId("ak");
vodOpenapiService.setSecretKey("sk");

test("vod:GetPlayInfo", async () => {
  const response = await vodOpenapiService.GetPlayInfo({
    Vid: "v02d03g10000c6n15d1ct673l4l12si0",
  });
  const validateResult = GetPlayInfoResponseSchemaValidate(response);
  expect(validateResult).toBe(true);
});

test("vod:GetUploadToken", () => {
  const response = vodOpenapiService.GetUploadToken();
  const validateResult = GetUploadTokenResponseSchemaValidate(response);
  expect(validateResult).toBe(true);
});
