# 火山引擎OpenAPI sdk
## 模块安装
```
// 使用npm
npm install @volcengine/openapi

// 使用yarn 
yarn add @volcengine/openapi
```

## AKSK设置
使用api设置aksk
```
// 使用默认的service实例。你也可以创建一个新实例。
// `const iamService = new iam.IamService();`
const iamService = iam.defaultService;

// 设置aksk
iamService.setAccessKeyId(AccessKeyId);
iamService.setSecretAccessKey(SecretAccessKey);
// 如果使用sts进行请求，设置完成aksk之后还需要设置一下`SessionToken`
iamService.setSessionToken(SessionToken);
```

使用环境变量设置AK SK
```
VOLC_ACCESSKEY="your ak" VOLC_SECRETKEY="your sk"
```

## 接口调用
以调用iam服务的ListUsers API为例
```
import { iam } from '@volcengine/openapi';

async main(AccessKeyId, SecretAccessKey) {
  // 使用默认的service实例。你也可以创建一个新实例。
  // `const iamService = new iam.IamService();`
  const iamService = iam.defaultService;

  // 设置aksk
  iamService.setAccessKeyId(AccessKeyId);
  iamService.setSecretAccessKey(SecretAccessKey);
  
  // 请求预定义的OpenAPI
  const usersResponse = await iamService.ListUsers({
    Limit: 10,
    Offset: 0,
  });
}
```
