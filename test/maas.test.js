import { maas } from "../lib";
import {
  ChatMaasSchemaValidate,
  TokenizationMaasSchemaValidate,
  ClassificationMaasSchemaValidate,
} from "./schema/maas";

const maasService = new maas.MaasService({
  host: "maas-api.ml-platform-cn-beijing.volces.com",
  region: "cn-beijing",
});

// 从环境变量设置 ak & sk
maasService.setAccessKeyId(process.env.VOLC_ACCESSKEY);
maasService.setSecretKey(process.env.VOLC_SECRETKEY);

const requestParams = {
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

const tokenizationParams = {
  model: {
    name: "skylark-lite",
    version: "2.0",
  },
  text: "天空为什么这么蓝？",
};

const classificationParams = {
  model: {
    name: "skylark-lite",
    version: "2.0",
  },
  query: "中国的第一个经济特区是？",
  labels: ["北京", "珠海", "深圳", "厦门", "上海"],
};

test("maas:Chat", async () => {
  const resp = await maasService.Chat({ ...requestParams });
  const validateResult = ChatMaasSchemaValidate(resp);
  expect(validateResult).toBe(true);
});

test("maas:StreamChat", async () => {
  const streamGenerator = await maasService.StreamChat({ ...requestParams });
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

test("maas:Classification", async () => {
  const resp = await maasService.Classification({ ...classificationParams });
  process.stdout.write(JSON.stringify(resp));
  const validateResult = ClassificationMaasSchemaValidate(resp);
  expect(validateResult).toBe(true);
});
