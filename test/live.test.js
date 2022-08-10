import { liveOpenapi } from "../lib";
import { GetCasterPlayerUserTokenSchemaValidate } from "./schema/live";

test("live:GetCasterPlayerUserToken", async () => {
  const liveCasterService = new liveOpenapi.liveCasterService({
    accessKeyId: "test",
    secretKey: "test",
  });
  const response = liveCasterService.GetCasterPlayerUserToken();
  const validateResult = GetCasterPlayerUserTokenSchemaValidate(response);
  expect(validateResult).toBe(true);
});
