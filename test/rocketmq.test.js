const { Client } = require("../lib/services/rocketmq");

const instanceId = process.env.MQ_INSTANCE_ID;
const endpoint = process.env.MQ_ENDPOINT;
const accessKey = process.env.MQ_ACCESS_KEY;
const secretKey = process.env.MQ_SECRET_KEY;

const topic = process.env.MQ_TOPIC;
const group = process.env.MQ_GROUP;

const client = new Client({
  instanceId,
  endpoint,
  accessKey,
  secretKey,
});

describe("RocketMQ producer test", () => {
  test("连接并关闭", async () => {
    const producer = client.createProducer();
    await producer.connect();
    await producer.close();
  });
});
