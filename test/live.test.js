import { liveOpenapi } from "../lib";
import { GetCasterUserTokenSchemaValidate } from "./schema/live";

const liveCasterService = liveOpenapi.LiveCasterService;

test("live:GetCasterUserToken", async () => {
  const response = await liveCasterService.GetCasterUserToken();
  const validateResult = GetCasterUserTokenSchemaValidate(response);
  expect(validateResult).toBe(true);
});
