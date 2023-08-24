import { maas } from "../lib";
import { ChatMaasSchemaValidate } from "./schema/maas";

const maasService = new maas.MaasService({
  host: "maas-api.ml-platform-cn-beijing.volces.com",
  region: "cn-beijing",
});

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
