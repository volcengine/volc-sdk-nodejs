import { imagex } from "@volcengine/openapi";
import path from 'path';

export async function main(AccessKeyId, SecretKey, SessionToken) {
  // 使用默认的service实例 也可以创建一个新实例 const imagexService = new imagex.imagexService();
  const imagexService = imagex.defaultService;
  // 设置aksk
  imagexService.setAccessKeyId(AccessKeyId);
  imagexService.setSecretKey(SecretKey);
  if (SessionToken) {
    // 使用sts请求时 设置SessionToken
    imagexService.setSessionToken(SessionToken);
  }

  // 请求预定义的OpenAPI
  await imagexService.PreviewImageUploadFile({
    ServiceId: 'your service id',
    StoreUri: 'image StoreUri',
  });

  await imagexService.UploadImages({
    serviceId: 'your service id',
    files: [path.resolve(__dirname, 'xxx1.png'), path.resolve(__dirname, 'xxx2.png')],
    fileKeys: ['key1', 'key2']
  });

  // 自定义OpenAPI请求
  await imagexService.fetchOpenAPI({
    Action: "PreviewImageUploadFile",
    Version: "2018-01-01",
    query: {
      ServiceId: 'your service id',
      StoreUri: 'image StoreUri',
    }
  });

  // 生成临时上传密钥
  imagexService.GetUploadAuth();

  //获取上传图片的签名URL
  imagexService.GetUploadAuthToken({
    ServiceId: "your service id",
    // 默认900 (15min)
    "X-Expires": "60",
  });
}
