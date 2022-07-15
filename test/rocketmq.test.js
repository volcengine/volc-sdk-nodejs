const { rocketmq } = require("../lib");

try {
  const client = new rocketmq.Client({
    endpoint: "sss.qa:8000",
    accessKeyId: "ERTgFDRTYHJ",
    secretAccessKey: "KJHRTGVCSRF987fCD",
  });

  const producer = client.createProducer();
} catch (error) {
  console.error(error);
}
