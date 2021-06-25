import { i18nOpenapi } from "@volcengine/openapi";

async function main(AccessKeyId, SecretKey, SessionToken) {
  // 使用默认的service实例 也可以创建一个新实例 const i18nOpenapiService = new i18nOpenapi.i18nOpenapiService();
  const i18nOpenapiService = i18nOpenapi.defaultService;
  // 设置aksk
  i18nOpenapiService.setAccessKeyId(AccessKeyId);
  i18nOpenapiService.setSecretKey(SecretKey);

  if (SessionToken) {
    // 使用sts请求时 设置SessionToken
    i18nOpenapiService.setSessionToken(SessionToken);
  }

  // 获取项目列表
  await i18nOpenapiService.Projects();

  // 获取空间详情
  await i18nOpenapiService.ProjectNamespaceDetail({
    projectId: 111,
    namespaceId: 222,
  });

  // 创建空间
  await i18nOpenapiService.ProjectNamespaceDetail({
    projectId: 111,
    name: "空间名称",
    description: "空间描述",
  });
}
