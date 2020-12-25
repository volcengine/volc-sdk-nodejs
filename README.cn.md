# 火山引擎OpenAPI sdk
## 功能使用
以iam为例
```
import { iam } from '@volcengine/openapi';

async main() {
  // 使用默认的service实例 也可以创建一个新实例 const iamService = new iam.IamService();
  const iamService = iam.defaultService;

  // 设置aksk
  iamService.setAccessKeyId(AccessKeyId);
  iamService.setSecretAccessKey(SecretAccessKey);

  // 使用sts请求时 设置SessionToken
  iamService.setSessionToken(SessionToken);
  
  // 请求预定义的OpenAPI
  const usersResponse = await iamService.ListUsers({
    Limit: 10,
    Offset: 0,
  });
  
  // 自定义OpenAPI请求
  const usersResponse = await iamService.fetchOpenAPI({
    Action: "ListUsers",
    Version: "2018-01-01",
    query: {
      Limit: 10,
      Offset: 0,
    },
  });
}
main()
```
