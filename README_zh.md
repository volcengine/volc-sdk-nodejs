# 火山引擎 OpenAPI node sdk

## 环境要求:

- Node.js >= 12

## 安装

```shell
npm install -S @volcengine/openapi
```

## 基本用法

### 1. 配置 OpenAPI 服务的 AK&SK

提供三种设置方式

#### 1. 使用 API 设置 AK&SK

```
// 使用默认的service实例。你也可以创建一个新实例。
// `const iamService = new iam.IamService();`
const iamService = iam.defaultService;

// 设置aksk
iamService.setAccessKeyId(AccessKeyId);
iamService.setSecretKey(SecretKey);
// 如果使用sts进行请求，设置完成aksk之后还需要设置一下`SessionToken`
iamService.setSessionToken(SessionToken);
```

#### 2. 使用环境变量设置 AK&SK

```
VOLC_ACCESSKEY="your ak" VOLC_SECRETKEY="your sk"
```

#### 3. 使用配置文件

以json格式放在`~/.volc/config`中，格式为：

```
{"VOLC_ACCESSKEY":"your ak","VOLC_SECRETKEY":"your sk"}
```

## 2. 接口调用

以调用`iam`服务的`ListUsers` API为例

```
import { iam } from '@volcengine/openapi';

async main(AccessKeyId, SecretKey) {
  // 使用默认的service实例。你也可以创建一个新实例。
  // `const iamService = new iam.IamService();`
  const iamService = iam.defaultService;

  // 设置aksk
  iamService.setAccessKeyId(AccessKeyId);
  iamService.setSecretKey(SecretKey);
  
  // 请求预定义的OpenAPI
  const usersResponse = await iamService.ListUsers({
    Limit: 10,
    Offset: 0,
  });
}
```

## OpenAPI 签名方法

### Header 方式
```ts
import {Signer} from '@volcengine/openapi';

// 请求数据
const openApiRequestData: RequestObj = {
    region: 'cn-north-1',
    method: 'GET',
    // [可选] http request url query
    params: {},
    // http request headers
    headers: {},
    // [可选] http request body
    body: "",
}

const signer = new Signer(openApiRequestData, "iam");

// 签名
signer.addAuthorization({accessKeyId, secretKey, sessionToken});

// 打印签名后的 headers
console.log(openApiRequestData.headers);
```

### Query 方式

```ts
import {Signer} from '@volcengine/openapi';

// 请求数据
const openApiRequestData: RequestObj = {
    method: "POST",
    region: "cn-north-1",
    params: {
        Action: "AssumeRole",
        Version: "2018-01-01",
        RoleTrn: "trn:iam::200:role/STSRole",
        RoleSessionName: "test",
    },
}

const credentials: Credentials = {
    accessKeyId: VOLC_ACCESSKEY,
    secretKey: VOLC_SECRETKEY,
    sessionToken: "",
}

const signer = new Signer(openApiRequestData, "sts");

// 最终经过加签的 HTTP Query Params
const signedQueryString = signer.getSignUrl(credentials);
```