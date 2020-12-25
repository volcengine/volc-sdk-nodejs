import { Service } from "../lib";
import { listUserReponseSchemaValidate } from "./schema/iam";

if (!process.env.AccessKeyId || !process.env.SecretAccessKey) {
  throw new Error("process.env.AccessKeyId and process.env.SecretAccessKey is required");
}

const defaultConfig = {
  protocol: "http:",
  host: "volcengineapi-boe.byted.org",
  serviceName: "iam",
  accessKeyId: process.env.AccessKeyId,
  secretAccessKey: process.env.SecretAccessKey,
  defaultVersion: "2018-01-01",
};
const iamService = new Service(defaultConfig);

test("iam:ListUsers", async () => {
  const response = await iamService.fetchOpenAPI({
    Action: "ListUsers",
    Version: "2018-01-01",
  });
  const validateResult = listUserReponseSchemaValidate(response);
  expect(validateResult).toBe(true);
});
