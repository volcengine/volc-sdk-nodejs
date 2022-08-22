import { livesaasOpenapi } from "@volcengine/openapi";

export async function main(AccessKeyId, SecretKey) {
  debugger
  const livesaasService = new livesaasOpenapi.LivesaasService({
    accessKeyId: AccessKeyId,
    secretKey: SecretKey,
  });
  // 获得上传用户的 UserToken
  const uploadUserToken = livesaasService.GetLivesaasUploadUserToken();
}