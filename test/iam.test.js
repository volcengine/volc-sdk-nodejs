import { iam } from "../lib";
import { reponseSchemaValidate } from "./schema/response";

if (!process.env.AccessKeyId || !process.env.SecretAccessKey) {
  throw new Error("process.env.AccessKeyId and process.env.SecretAccessKey is required");
}

const iamService = iam.defaultService;
iamService.setAccessKeyId(process.env.AccessKeyId);
iamService.setSecretAccessKey(process.env.SecretAccessKey);

test("iam:ListUsers", async () => {
  const response = await iamService.fetchOpenAPI({
    Action: "ListUsers",
    Version: "2018-01-01",
  });
  const validateResult = reponseSchemaValidate(response);
  expect(validateResult).toBe(true);
});
