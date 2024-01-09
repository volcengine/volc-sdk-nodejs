import { maas } from "../lib";
import {
  ChatMaasSchemaValidate,
  TokenizationMaasSchemaValidate,
  ClassificationMaasSchemaValidate,
  EmbeddingsMaasSchemaValidate,
  ChatV2MaasSchemaValidate,
  TokenizationV2MaasSchemaValidate,
  ClassificationV2MaasSchemaValidate,
  EmbeddingsV2MaasSchemaValidate,
} from "./schema/maas";

const maasService = new maas.MaasService({
  host: "maas-api.ml-platform-cn-beijing.volces.com",
  region: "cn-beijing",
});

const maasServiceV2 = new maas.MaasServiceV2({
  host: "maas-api.ml-platform-cn-beijing.volces.com",
  region: "cn-beijing",
});

// 从环境变量设置 ak & sk
maasService.setAccessKeyId(process.env.VOLC_ACCESSKEY);
maasService.setSecretKey(process.env.VOLC_SECRETKEY);

maasServiceV2.setAccessKeyId(process.env.VOLC_ACCESSKEY);
maasServiceV2.setSecretKey(process.env.VOLC_SECRETKEY);

const chatParams = {
  model: {
    name: "chatglm-130b",
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
    max_new_tokens: 1000,
    temperature: 1,
  },
};

const chatV2Params = {
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
  model: {
    name: "skylark2-pro-4k",
    version: "1.0",
  },
  text: "天空为什么这么蓝？",
};

const tokenizationV2Params = {
  text: "花儿为什么这么香？",
};

const classificationParams = {
  model: {
    name: "skylark2-pro-4k",
    version: "1.0",
  },
  query: "中国的第一个经济特区是？",
  labels: ["北京", "珠海", "深圳", "厦门", "上海"],
};

const classificationV2Params = {
  query: "花儿为什么这么香？",
  labels: ["陈述句", "疑问句", "肯定句"],
};

const embeddingsParams = {
  model: {
    name: "bge-large-zh",
  },
  input: ["天很蓝", "海很深"],
};

const embeddingsV2Params = {
  input: ["天很蓝", "海很深"],
};

const endpointId = "mse-20231201150750-qqzgd";
const vectorModelendpointId = "mse-20231114152400-l7rb8";

test("maas:Chat", async () => {
  const resp = await maasService.Chat({ ...chatParams });
  const validateResult = ChatMaasSchemaValidate(resp);
  expect(validateResult).toBe(true);
});

test("maas:ChatV2", async () => {
  const resp = await maasServiceV2.Chat(endpointId, chatV2Params);
  process.stdout.write(JSON.stringify(resp));
  const validateResult = ChatV2MaasSchemaValidate(resp);
  expect(validateResult).toBe(true);
});

test("maas:StreamChat", async () => {
  const streamGenerator = await maasService.StreamChat({ ...chatParams });
  for await (const value of streamGenerator) {
    process.stdout.write(JSON.stringify(value));
  }
});

test("maas:StreamChatV2", async () => {
  const streamGenerator = await maasServiceV2.StreamChat(endpointId, chatV2Params);
  for await (const value of streamGenerator) {
    process.stdout.write(JSON.stringify(value));
  }
});

test("maas:Tokenization", async () => {
  const resp = await maasService.Tokenization({ ...tokenizationParams });
  process.stdout.write(JSON.stringify(resp));
  const validateResult = TokenizationMaasSchemaValidate(resp);
  expect(validateResult).toBe(true);
});

test("maas:TokenizationV2", async () => {
  const resp = await maasServiceV2.Tokenization(endpointId, tokenizationV2Params);
  process.stdout.write(JSON.stringify(resp));
  const validateResult = TokenizationV2MaasSchemaValidate(resp);
  expect(validateResult).toBe(true);
});

test("maas:Classification", async () => {
  const resp = await maasService.Classification({ ...classificationParams });
  process.stdout.write(JSON.stringify(resp));
  const validateResult = ClassificationMaasSchemaValidate(resp);
  expect(validateResult).toBe(true);
});

test("maas:ClassificationV2", async () => {
  const resp = await maasServiceV2.Classification(endpointId, classificationV2Params);
  process.stdout.write(JSON.stringify(resp));
  const validateResult = ClassificationV2MaasSchemaValidate(resp);
  expect(validateResult).toBe(true);
});

test("maas:Embeddings", async () => {
  const resp = await maasService.Embeddings({ ...embeddingsParams });
  const validateResult = EmbeddingsMaasSchemaValidate(resp);
  expect(validateResult).toBe(true);
});

test("maas:EmbeddingsV2", async () => {
  const resp = await maasServiceV2.Embeddings(vectorModelendpointId, embeddingsV2Params);
  const validateResult = EmbeddingsV2MaasSchemaValidate(resp);
  expect(validateResult).toBe(true);
});
