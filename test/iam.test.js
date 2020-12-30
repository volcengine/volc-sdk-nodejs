import { Service } from "../lib";
import { listUserReponseSchemaValidate } from "./schema/iam";

const defaultConfig = {
  protocol: "http:",
  host: "volcengineapi-boe.byted.org",
  serviceName: "iam",
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
