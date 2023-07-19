# Volcano Engine OpenAPI node sdk

[中文文档](./README_zh.md)

## Requirements:

- Node.js >= 12

## Installation
```shell
npm install -S @volcengine/openapi
```

## Basic Usage

### 1. Setting OpenAPI service's AK&SK

Available in three settings

#### 1. Use API to set AK&SK
```ts
// Use the default service instance. You can also create a new instance.
// `const iamService = new iam.IamService();`
const iamService = iam.defaultService;

// set aksk
iamService.setAccessKeyId(AccessKeyId);
iamService.setSecretKey(SecretKey);
// If you use sts to request, you need to set up `SessionToken` after aksk is set
iamService.setSessionToken(SessionToken);
```

#### 2. Use environment variables to set AK & SK
```shell
VOLC_ACCESSKEY="your ak" VOLC_SECRETKEY="your sk"
```

#### 3. Use configuration file
Put it in `~/.volc/config` in json format, the format is:
```
{"VOLC_ACCESSKEY":"your ak","VOLC_SECRETKEY":"your sk"}
```

## Request OpenAPI

Take the ListUsers API of the iam service as an example

```ts
import { iam } from'@volcengine/openapi';

async function main(AccessKeyId, SecretKey) {
   // Use the default service instance. You can also create a new instance.
   // `const iamService = new iam.IamService();`
   const iamService = iam.defaultService;

   // set aksk
   iamService.setAccessKeyId(AccessKeyId);
   iamService.setSecretKey(SecretKey);
  
   // Request OpenAPI
   const usersResponse = await iamService.ListUsers({
     Limit: 10,
     Offset: 0,
   });
}
```

## OpenAPI signature method

### By HTTP Header

```ts
import {Signer} from '@volcengine/openapi';

// http request data
const openApiRequestData: RequestObj = {
    region: 'cn-north-1',
    method: 'GET',
    // [optional] http request url query
    params: {},
    // http request headers
    headers: {},
    // [optional] http request body
    body: "",
}

const signer = new Signer(openApiRequestData, "iam");

// sign
signer.addAuthorization({accessKeyId, secretKey, sessionToken});

// Print signed headers
console.log(openApiRequestData.headers);
```

### By HTTP Query 

```ts
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

const signedQueryString = signer.getSignUrl(credentials);
```