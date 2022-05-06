const { tlsOpenapi } = require("@volcengine/openapi");
export async function main(AccessKeyId, SecretKey, SessionToken) {
  const tlsOpenapiService = tlsOpenapi.defaultService;
  // tls的openApi需要设置host
  tlsOpenapiService.setHost("your host");
  // 指定host对应的region，如不设置默认region为 cn-north-1
  tlsOpenapiService.setRegion("your region");
  // 设置aksk
  tlsOpenapiService.setSecretKey(SecretKey);
  tlsOpenapiService.setAccessKeyId(AccessKeyId);
  // 设置协议版本，如不设置则默认是https
  tlsOpenapiService.setProtocol("http:");
  // 设置openApi版本，如不设置默认为0.2.0
  tlsOpenapiService.setVersion("0.2.0");

  if (SessionToken) {
    // 使用sts请求时 设置SessionToken
    tlsOpenapiService.setSessionToken(SessionToken);
  }

  // 获取项目列表
  tlsOpenapiService.DescribeProjects({
    PageNumber: 0,
    PageSize: 10,
    ProjectName: "项目名称",
    ProjectId: "项目ID",
  });
}
