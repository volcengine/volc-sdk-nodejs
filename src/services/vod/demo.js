import { vodOpenapi } from "@volcengine/openapi";

export async function main(AccessKeyId, SecretKey, SessionToken) {
  // 使用默认的service实例 也可以创建一个新实例 const vodOpenapiService = new vodOpenapi.VodService();
  const vodOpenapiService = vodOpenapi.defaultService;
  // 设置aksk
  vodOpenapiService.setAccessKeyId(AccessKeyId);
  vodOpenapiService.setSecretKey(SecretKey);

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
