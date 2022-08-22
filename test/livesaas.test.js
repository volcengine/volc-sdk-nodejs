import { livesaasOpenapi } from "../lib";
import { GetLivesaasUploadUserTokenSchemaValidate } from "./schema/livesaas";

test("live:GetLivesaasUploadUserToken", async () => {
  const livesaasService = new livesaasOpenapi.LivesaasService({
    accessKeyId: "test",
    secretKey: "test",
  });
  const response = livesaasService.GetLivesaasUploadUserToken();
  const validateResult = GetLivesaasUploadUserTokenSchemaValidate(response);
  expect(validateResult).toBe(true);
});
