import { liveOpenapi } from "@volcengine/openapi";

export async function main(AccessKeyId, SecretKey) {
  const liveCasterService = new liveOpenapi.liveCasterService({
    accessKeyId: AccessKeyId,
    secretKey: SecretKey,
  });
  // 获得导播预览组件的 UserToken
  const playerUserToken = liveCasterService.GetCasterPlayerUserToken();
}
