# Volcano Engine OpenAPI sdk
[中文文档](./README_zh.md)
## Module installation
```
// use npm
npm install @volcengine/openapi

// use yarn
yarn add @volcengine/openapi
```
## AKSK settings
### 1. Use api
```
// Use the default service instance. You can also create a new instance.
// `const iamService = new iam.IamService();`
const iamService = iam.defaultService;

// set aksk
iamService.setAccessKeyId(AccessKeyId);
iamService.setSecretKey(SecretKey);
// If you use sts to request, you need to set up `SessionToken` after aksk is set
iamService.setSessionToken(SessionToken);
```

### 2. Environment variables
```
VOLC_ACCESSKEY="your ak" VOLC_SECRETKEY="your sk"
```

### 3. Configuration files
Put it in `~/.volc/config` in json format, the format is:
```
{"VOLC_ACCESSKEY":"your ak","VOLC_SECRETKEY":"your sk"}
```

## Request OpenAPI
Take the ListUsers API of the iam service as an example
```
import { iam } from'@volcengine/openapi';

async main(AccessKeyId, SecretKey) {
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