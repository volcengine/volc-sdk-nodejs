# Volcano Engine OpenAPI sdk
## Module installation
```
// use npm
npm install @volcengine/openapi

// use yarn
yarn add @volcengine/openapi
```
## AKSK setting and request OpenAPI
Take the ListUsers API of the iam service as an example
```
import { iam } from'@volcengine/openapi';

async main(AccessKeyId, SecretAccessKey) {
   // Using the default service instance. You can also create a new instance 
   // `const iamService = new iam.IamService();`
   const iamService = iam.defaultService;

   // set aksk
   iamService.setAccessKeyId(AccessKeyId);
   iamService.setSecretAccessKey(SecretAccessKey);
  
   // request OpenAPI
   const usersResponse = await iamService.ListUsers({
     Limit: 10,
     Offset: 0,
   });
}
```

If you use sts to request, you need to set up `SessionToken` after aksk is set
```
iamService.setSessionToken(SessionToken);
```