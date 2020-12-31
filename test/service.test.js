import Service from "../lib/base/service";
import { reponseSchemaValidate } from "./schema/response";
import _get from "lodash.get";

const defaultConfig = {
  serviceName: "iam",
  defaultVersion: "2018-01-01",
};
const iamService = new Service(defaultConfig);

test("get open api", async () => {
  const response = await iamService.createAPI("ListUsers", {
    method: "GET",
  })({
    Limit: 5,
  });
  const validateResult = reponseSchemaValidate(response);
  expect(validateResult).toBe(true);
  expect(_get(response, "ResponseMetadata.Error")).toBe(undefined);
  expect(_get(response, "Result.Limit")).toBe(5);
});
test("post json open api", async () => {
  const response = await iamService.createAPI("ListUsers", {
    method: "POST",
    contentType: "json",
  })({
    Limit: 5,
  });
  const validateResult = reponseSchemaValidate(response);
  expect(validateResult).toBe(true);
  expect(_get(response, "ResponseMetadata.Error")).toBe(undefined);
});

test("post urlencode open api", async () => {
  const response = await iamService.createAPI("ListUsers", {
    method: "POST",
    contentType: "urlencode",
  })({
    Limit: 5,
  });
  const validateResult = reponseSchemaValidate(response);
  expect(validateResult).toBe(true);
  expect(_get(response, "ResponseMetadata.Error")).toBe(undefined);
});

test("post form-data open api", async () => {
  const response = await iamService.createAPI("ListUsers", {
    method: "POST",
    contentType: "form-data",
  })({
    Limit: 5,
  });
  const validateResult = reponseSchemaValidate(response);
  expect(validateResult).toBe(true);
  expect(_get(response, "ResponseMetadata.Error")).toBe(undefined);
});

test("default params check without accessKeyId", async () => {
  const service = new Service({
    serviceName: "iam",
  });
  service.setAccessKeyId("");
  service.setSecretKey("");
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
