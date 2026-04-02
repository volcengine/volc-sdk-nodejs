# TLS Node.js Producer

Node.js Producer 用于在海量数据、高并发场景下快速发送日志数据到日志服务（TLS）。它具有异步发送、高性能、失败重试、优雅关闭等特性，是火山引擎日志服务推荐的日志上报方式。

## 场景说明

Node.js SDK 支持通过以下方式写入日志：

| 写入方式 | 说明 |
| :--- | :--- |
| `PutLogs` | 不推荐。<br/>日志服务支持通过 `PutLogs` 接口同步请求的方式上传日志。如果选择使用 `PutLogs` 上传日志，建议您一次性聚合多条日志后调用一次 `PutLogs` 接口。相对于逐条上传日志的方式，日志聚合后上传可以提升吞吐率并避免触发限流。 |
| `Producer` | **推荐**。<br/>在实际生产环境中，为了提高数据写入效率，建议通过 `Producer` 方式写入日志数据。`Producer` 专为海量数据、高并发场景设计，具有异步发送、自动批量、失败重试、并发控制、优雅关闭等高级特性。 |

## 示例代码

以下是一个基本的 Producer 使用示例：

```javascript
const { tlsOpenapi } = require("@volcengine/openapi");

async function main() {
  // 1. 生成默认配置并根据实际情况覆盖
  const config = tlsOpenapi.Producer.getDefaultProducerConfig();
  config.Endpoint = process.env.VOLCENGINE_ENDPOINT || "your-tls-endpoint";
  config.Region = process.env.VOLCENGINE_REGION || "your-region";
  config.AccessKeyID = process.env.VOLCENGINE_ACCESS_KEY_ID || "your-ak";
  config.AccessKeySecret = process.env.VOLCENGINE_ACCESS_KEY_SECRET || "your-sk";
  
  // 2. 初始化并启动 Producer
  const producer = new tlsOpenapi.Producer(config);
  producer.Start();

  const topicID = "your-topic-id";
  const source = "demo-source";
  const filename = "demo.js";

  // 3. 定义发送结果回调
  const callback = {
    Success(result) {
      console.log("Log sent successfully.");
    },
    Fail(result) {
      const lastAttempt = result.Attempts[result.Attempts.length - 1];
      console.error(
        `Log failed to send. RequestId: ${lastAttempt.RequestId}, ErrorCode: ${lastAttempt.ErrorCode}, ErrorMessage: ${lastAttempt.ErrorMessage}`
      );
    },
  };

  // 4. 发送单条日志
  await producer.SendLog("", topicID, source, filename, {
    Time: Date.now(),
    Contents: [{ Key: "message", Value: "This is a single log." }],
  }, callback);

  // 5. 发送多条日志
  await producer.SendLogs("", topicID, source, filename, {
    Logs: [
      {
        Time: Date.now(),
        Contents: [{ Key: "message", Value: "Log entry 1 from a group." }],
      },
      {
        Time: Date.now(),
        Contents: [{ Key: "message", Value: "Log entry 2 from a group." }],
      },
    ],
  }, callback);

  // 6. 优雅关闭 Producer，确保所有缓存数据都被发送
  await producer.Close();
}

main().catch(console.error);
```

## Producer 配置

### Config 可配置参数

| 参数 | 类型 | 示例值 | 描述 |
| :--- | :--- | :--- | :--- |
| `TotalSizeLnBytes` | `number` | `100 * 1024 * 1024` | 单个 Producer 实例能缓存的日志大小上限，单位为字节，默认为 **100MB**。 |
| `MaxSenderCount` | `number` | `50` | 单个 Producer 能并发发送的最大请求数，默认为 **50**。可根据服务器性能调整。 |
| `MaxBlockSec` | `number` | `60` | 当 Producer 内部缓存满时，`SendLog`/`SendLogs` 方法的最大阻塞时间（秒）。**>0**：最多阻塞 `MaxBlockSec` 秒；**=0**：立即失败并抛出 `TimeoutException`；**<0**：无限等待直至可用。默认为 **60**。 |
| `MaxBatchSize` | `number` | `512 * 1024` | 当一个批次中缓存的日志大小超过此值时，该批次将被发送。默认为 **512KB**，最大为 **8MB**。 |
| `MaxBatchCount` | `number` | `4096` | 当一个批次中缓存的日志条数超过此值时，该批次将被发送。默认为 **4096**，最大为 **10000**。 |
| `LingerTime` | `number` | `2000` | 一个批次从创建开始，最长逗留时间（毫秒），超时后将被发送。默认为 **2秒**，最小为 **100毫秒**。 |
| `Retries` | `number` | `10` | 如果某个批次首次发送失败，能够对其重试的次数。默认为 **10次**。 |
| `MaxReservedAttempts`| `number` | `11` | 每个批次返回给用户的 `Result` 中保留的 `Attempt` 信息个数，默认为 **11**。该值越大，能追溯更多信息，但也会消耗更多内存。 |
| `BaseRetryBackoffMs`| `number` | `1000` | 首次重试的退避时间（毫秒），默认为 **1秒**。Producer 采用带随机抖动的指数退避算法。 |
| `MaxRetryBackoffMs` | `number` | `10 * 1000` | 重试的最大退避时间（毫秒），默认为 **10秒**。 |
| `NoRetryStatusCodeList` | `number[]`| `[400, 404]` | 配置不需要重试的 HTTP 状态码列表。当发送失败且返回码在此列表中时，将不再重试。默认包含 **400** 和 **404**。 |
| `Endpoint` | `string` | `https://tls-cn-beijing.volces.com` | TLS 服务访问地址，通常从环境变量 `VOLCENGINE_ENDPOINT` 读取。 |
| `Region` | `string` | `cn-beijing` | TLS 服务所在地域，通常从环境变量 `VOLCENGINE_REGION` 读取。 |
| `AccessKeyID` | `string` | - | 火山引擎访问密钥 ID，通常从环境变量 `VOLCENGINE_ACCESS_KEY_ID` 读取。 |
| `AccessKeySecret` | `string` | - | 火山引擎访问密钥，通常从环境变量 `VOLCENGINE_ACCESS_KEY_SECRET` 读取。 |
| `SecurityToken` | `string` | - | STS 临时访问凭证（可选），通常从环境变量 `VOLCENGINE_TOKEN` 读取。 |
