import { liveOpenapi } from "@volcengine/openapi";

export async function main(AccessKeyId, SecretKey) {
  const liveCasterService = new liveOpenapi.liveCasterService({
    accessKeyId: AccessKeyId,
    secretKey: SecretKey,
  });
  // 获得导播的 UserToken
  const userToken = liveCasterService.GetCasterUserToken();
}
