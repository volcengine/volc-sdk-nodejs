/* eslint-disable no-console */
import { maas } from "@volcengine/openapi";
// 创建一个新实例
const maasService = new maas.MaasServiceV2({
  host: "maas-api.ml-platform-cn-beijing.volces.com",
  region: "cn-beijing",
});

// 从环境变量设置 ak & sk
maasService.setAccessKeyId(process.env.VOLC_ACCESSKEY);
maasService.setSecretKey(process.env.VOLC_SECRETKEY);

const endpointId = "${YOUR_ENDPOINT_ID}";
const chatParams = {
  parameters: {
    max_new_tokens: 1000,
    min_new_tokens: 1,
    temperature: 0.7,
    top_p: 0.9,
    top_k: 0,
    max_prompt_tokens: 4000,
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
};
const tokenizationParams = {
  text: "花儿为什么这么香？",
};
const classificationParams = {
  query: "花儿为什么这么香？",
  labels: ["陈述句", "疑问句", "肯定句"],
};
const embeddingsParams = {
  input: ["天很蓝", "海很深"],
};

await maasService
  .Chat(endpointId, chatParams)
  .then((result) => {
    console.log(result?.choice?.message?.content || "no content");
    console.log(result?.usage || "no usage");
  })
  .catch((reason) => {
    console.error(reason);
  });

await maasService
  .Tokenization(endpointId, tokenizationParams)
  .then((result) => {
    console.log(result?.total_tokens || "no total_tokens");
    console.log(result?.tokens || "no tokens");
  })
  .catch((reason) => {
    console.error(reason);
  });

await maasService
  .Classification(endpointId, classificationParams)
  .Classification.then((result) => {
    console.log(result?.label || "no label");
    console.log(result?.label_logprobos || "no label_logprobos");
  })
  .catch((reason) => {
    console.error(reason);
  });

await maasService
  .Embeddings(endpointId, embeddingsParams)
  .then((result) => {
    console.log(result?.object || "no object");
    console.log(result?.data || "no data");
  })
  .catch((reason) => {
    console.error(reason);
  });
