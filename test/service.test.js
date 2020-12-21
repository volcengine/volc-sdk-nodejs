import Service from "../lib/base/service";
import { reponseSchemaValidate } from "./schema/response";

if (!process.env.AccessKeyId || !process.env.SecretAccessKey) {
  throw new Error("process.env.AccessKeyId and process.env.SecretAccessKey is required");
}

const iamService = new Service({
  protocol: "http:",
  host: "volcengineapi-boe.byted.org",
  serviceName: "iam",
  accessKeyId: process.env.AccessKeyId,
  secretAccessKey: process.env.SecretAccessKey,
});
test("fetchOpenAPI", async () => {
  const response = await iamService.fetchOpenAPI({
    Action: "ListUsers",
    Version: "2018-01-01",
  });
  const validateResult = reponseSchemaValidate(response);
  expect(validateResult).toBe(true);
});
test("default params", async () => {
  const service = new Service({
    serviceName: "iam",
    accessKeyId: process.env.AccessKeyId,
    secretAccessKey: process.env.SecretAccessKey,
  });
  let error;
  try {
    const response = await service.fetchOpenAPI({
      Action: "ListUsers",
      Version: "2018-01-01",
    });
    const validateResult = reponseSchemaValidate(response);
    expect(validateResult).toBe(true);
  } catch (e) {
    error = e;
  }
  expect(error).toBe(undefined);
});

test("without accessKeyId", async () => {
  const service = new Service({
    serviceName: "iam",
  });
  let error;
  try {
    await service.fetchOpenAPI({
      Action: "ListUsers",
      Version: "2018-01-01",
    });
  } catch (e) {
    error = e;
  }
  expect(error).toBeInstanceOf(Error);
});
