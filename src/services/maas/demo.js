import { maas } from "@volcengine/openapi";

export async function main(AccessKeyId, SecretKey) {
  // 使用默认的 service实例 也可以创建一个新实例 const maasOpenApiService = new maas.MaasService();
  const maasOpenApiService = new maas.MaasService({
    host: "maas-api.ml-platform-cn-beijing.volces.com",
    region: "cn-beijing",
  });
  // 设置aksk
  maasOpenApiService.setAccessKeyId(AccessKeyId);
  maasOpenApiService.setSecretKey(SecretKey);

  const chatParams = {
    model: {
      name: "chatglm-6b",
    },
    messages: [
      {
        role: "user",
        content: "天为什么这么蓝？",
      },
      {
        role: "assistant",
        content: "因为有你",
      },
      {
        role: "user",
        content: "花儿为什么这么香？",
      },
    ],
    parameters: {
      // 这里的参数仅为示例，具体可用的参数请参考具体模型的 API 说明
      max_new_tokens: 1000,
      temperature: 1,
    },
  };

  await maasOpenApiService.Chat(chatParams);

  const response = await maasOpenApiService.StreamChat(chatParams);
  response.pipe(process.stdout);
  response.on("end", function () {});
}
