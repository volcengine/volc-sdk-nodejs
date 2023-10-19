/* eslint-disable no-console */
import { maas } from "@volcengine/openapi";

// 创建一个新实例
const maasService = new maas.MaasService({
  host: "maas-api.ml-platform-cn-beijing.volces.com",
  region: "cn-beijing",
});

// 从环境变量设置 ak & sk
maasService.setAccessKeyId(process.env.VOLC_ACCESSKEY);
maasService.setSecretKey(process.env.VOLC_SECRETKEY);

const chatParams = {
  model: {
    name: "${YOUR_MODEL_NAME}",
  },
  messages: [
    {
      role: maas.ChatRole.User,
      content: "天为什么这么蓝？",
    },
    {
      role: maas.ChatRole.Assistant,
      content: "因为有你",
    },
    {
      role: maas.ChatRole.User,
      content: "花儿为什么这么香？",
    },
  ],
  parameters: {
    max_new_tokens: 1000,
    temperature: 1,
  },
};

await maasService
  .Chat(chatParams)
  .then((result) => {
    console.log(result?.choice?.message?.content || "no content");
    console.log(result?.usage || "no usage");
  })
  .catch((reason) => {
    console.error(reason);
  });

try {
  for await (const result of maasService.StreamChat(chatParams)) {
    console.log(result?.choice?.message?.content || "no content");
    // usage only appears in the last item.
    console.log(result?.usage || "no usage");
  }
} catch (ex) {
  console.error(ex);
}
