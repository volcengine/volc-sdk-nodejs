const { tlsOpenapi } = require("@volcengine/openapi");

// Producer 使用示例
async function main() {
  // 生成默认配置并根据实际情况覆盖 TLS Endpoint/Region/AK/SK
  const config = tlsOpenapi.Producer.getDefaultProducerConfig();
  config.Endpoint = process.env.VOLCENGINE_ENDPOINT || "https://tls-cn-beijing.volces.com";
  config.Region = process.env.VOLCENGINE_REGION || "cn-beijing";
  config.AccessKeyID = process.env.VOLCENGINE_ACCESS_KEY_ID || "your-access-key-id";
  config.AccessKeySecret = process.env.VOLCENGINE_ACCESS_KEY_SECRET || "your-access-key-secret";

  // 初始化并启动 Producer
  const producer = new tlsOpenapi.Producer(config);
  producer.Start();

  const topicID = "your-topic-id";
  const source = "your-log-source";
  const filename = "your-log-filename";

  // 定义回调
  const callback = {
    Success(result) {
      // 批次最终发送成功
      // eslint-disable-next-line no-console
      console.log("producer success", result.SuccessFlag);
    },
    Fail(result) {
      // 批次最终失败，可根据 Attempts 中的信息进行告警或重试
      const last = result.Attempts[result.Attempts.length - 1];
      // eslint-disable-next-line no-console
      console.error("producer fail", last && last.ErrorCode, last && last.ErrorMessage);
    },
  };

  // 发送单条日志
  await producer.SendLog(
    "",
    topicID,
    source,
    filename,
    {
      Time: Date.now(),
      Contents: [
        { Key: "key1", Value: "value1" },
        { Key: "key2", Value: "value2" },
      ],
    },
    callback
  );

  // 发送多条日志
  await producer.SendLogs(
    "",
    topicID,
    source,
    filename,
    {
      Source: source,
      FileName: filename,
      Logs: [
        {
          Time: Date.now(),
          Contents: [
            { Key: "key1", Value: "value1-1" },
            { Key: "key2", Value: "value2-1" },
          ],
        },
        {
          Time: Date.now(),
          Contents: [
            { Key: "key1", Value: "value1-2" },
            { Key: "key2", Value: "value2-2" },
          ],
        },
      ],
    },
    callback
  );

  // 优雅关闭 Producer，等待缓冲区与重试队列中的数据全部发送完成
  await producer.Close();
}

module.exports = { main };
