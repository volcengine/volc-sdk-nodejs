const { tlsOpenapi } = require("../../../lib");
const { getDefaultOption } = require("../../../lib/base/utils");

async function main(AccessKeyId, SecretKey, SessionToken) {
  const tlsOpenapiService = tlsOpenapi.defaultService;
  const defaultOption = getDefaultOption();

  tlsOpenapiService.setHost("tls-cn-chongqing-sdv.volces.com");
  tlsOpenapiService.setRegion("cn-chongqing-sdv");
  tlsOpenapiService.setAccessKeyId(AccessKeyId ?? defaultOption.accessKeyId);
  tlsOpenapiService.setSecretKey(SecretKey ?? defaultOption.secretKey);

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

main();
