import { sms } from "../lib";
import { SendSmsResponseSchemaValidate } from "./schema/sms";

const accessKey = "xxx";
const secretKey = "xxx";

test("sms:Send", async () => {
  const smsService = sms.defaultService;
  smsService.setAccessKeyId(accessKey);
  smsService.setSecretKey(secretKey);
  const response = await smsService.Send({
    SmsAccount: "7384ed01",
    Sign: "xxxx",
    TemplateID: "SPT_1baef3f6",
    PhoneNumbers: "186110xxxx",
    TemplateParam: JSON.stringify({ content: "Hello World" }),
    Tag: "tag",
  });
  const validateResult = SendSmsResponseSchemaValidate(response);
  expect(validateResult).toBe(true);
});

test("sms:BatchSend", async () => {
  const smsService = sms.defaultService;
  smsService.setAccessKeyId(accessKey);
  smsService.setSecretKey(secretKey);
  const response = await smsService.BatchSend({
    SmsAccount: "7384ed01",
    Sign: "xxxx",
    TemplateID: "SPT_1baef3f6",
    Tag: "tag",
    Messages: [
      {
        PhoneNumber: "186110xxx",
        TemplateParam: JSON.stringify({ content: "Hello World" }),
      },
    ],
  });
  const validateResult = SendSmsResponseSchemaValidate(response);
  expect(validateResult).toBe(true);
});
