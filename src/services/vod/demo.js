import { vodOpenapi } from "@volcengine/openapi";

export async function main(AccessKeyId, SecretKey, SessionToken) {
  // 使用默认的service实例 也可以创建一个新实例 const vodOpenapiService = new vodOpenapi.VodService();
  const vodOpenapiService = vodOpenapi.defaultService;
  // 强烈建议不要把 AccessKey ID 和 AccessKey Secret 保存到工程代码里，否则可能导致 AccessKey 泄露，威胁您账号下所有资源的安全。
  // 本示例通过从环境变量中读取 AccessKey ID 和 AccessKey Secret，来实现 API 访问的身份验证。运行代码示例前，请配置环境变量 VOLC_ACCESSKEY 和 VOLC_SECRETKEY
  // vodOpenapiService.setAccessKeyId(AccessKeyId);
  // vodOpenapiService.setSecretKey(SecretKey);

  if (SessionToken) {
    // 使用sts请求时 设置SessionToken
    vodOpenapiService.setSessionToken(SessionToken);
  }

  // 获取播放信息
  await vodOpenapiService.GetPlayInfo({
    Vid: "your video id",
  });

  // 获取上传token
  await vodOpenapiService.GetUploadToken();
}
