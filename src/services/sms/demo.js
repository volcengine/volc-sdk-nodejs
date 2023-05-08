import { sms } from "@volcengine/openapi";

export async function main(AccessKeyId, SecretKey) {
  const smsService = sms.defaultService;
  smsService.setAccessKeyId(AccessKeyId);
  smsService.setSecretKey(SecretKey);

  // 发送单条测试短信
  await smsService.Send({
    SmsAccount: "7384exxx",
    Sign: "测试签名",
    TemplateID: "SPT_1000000",
    PhoneNumbers: "186xxxxxxxx",
    TemplateParam: JSON.stringify({ content: "Hello World" }),
    Tag: "tag",
  });
}
main();
