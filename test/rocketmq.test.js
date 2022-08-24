const { Client } = require("../lib/services/rocketmq");

const config = {
  instanceId: "MQ_INST_72f5hg5hjj57_6m91x",
  endpoint: "http://10.249.54.252:8089",
  accessKey: "yvdsdPFBfQJuVWqepQQKwpVF",
  secretKey: "dd6WoMboq6PuS1zCjXUm0UDi",
};

const TOPIC = "FE_sdk_test";
const GROUP = "GID_FE_sdk_test";

const client = new Client(config);

describe("RocketMq producer test", () => {
  test("注册全部Topic，发送消息到存在的Topic", async () => {
    const producer = client.createProducer();
    await producer.connect();
  });
});
