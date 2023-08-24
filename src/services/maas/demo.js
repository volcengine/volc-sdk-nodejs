/* eslint-disable no-console */
import { MaasService, ChatRole } from "./index";

// 创建一个新实例 const maasOpenApiService = new maas.MaasService();
const maas = new MaasService({
  host: "maas-api.ml-platform-cn-beijing.volces.com",
  region: "cn-beijing",
  serviceName: "ml_maas",
});

// 从环境变量设置 ak & sk
maas.setAccessKeyId(process.env.VOLC_ACCESSKEY);
maas.setSecretKey(process.env.VOLC_SECRETKEY);

const chatParams = {
  model: {
    name: "${YOUR_MODEL_NAME}",
  },
  messages: [
    {
      role: ChatRole.User,
      content: "天为什么这么蓝？",
    },
    {
      role: ChatRole.Assistant,
      content: "因为有你",
    },
    {
      role: ChatRole.User,
      content: "花儿为什么这么香？",
    },
  ],
  parameters: {
    max_new_tokens: 1000,
    temperature: 1,
  },
};

await maas
  .Chat(chatParams)
  .then((result) => {
    console.log(result?.choice?.message?.content || "no content");
    console.log(result?.usage || "no usage");
  })
  .catch((reason) => {
    console.error(reason);
  });

try {
  for await (const result of maas.StreamChat(chatParams)) {
    console.log(result?.choice?.message?.content || "no content");
    // usage only appears in the last item.
    console.log(result?.usage || "no usage");
  }
} catch (ex) {
  console.error(ex);
}
