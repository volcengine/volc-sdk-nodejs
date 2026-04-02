/**
 * TLS Producer 完整使用示例。
 *
 * 本文件演示 Producer 的各种使用场景，包括：
 *  1. 基本使用：发送单条/多条日志
 *  2. 回调处理：成功/失败回调
 *  3. 配置调优：控制并发、批量大小、延迟时间
 *  4. 内存控制：TotalSizeLnBytes、MaxBlockSec
 *  5. 重试策略：Retries、退避时间
 *  6. 关闭策略：优雅关闭 vs 强制关闭
 *  7. 动态更新凭证：ResetAccessKeyToken
 *  8. 高吞吐场景
 *  9. 错误处理
 *
 * 运行方式：
 *  1. yarn build
 *  2. node lib/services/tls/example/producer-scenarios.js
 */

const { tlsOpenapi } = require("../../../lib/index.js");

const {
  VOLCENGINE_ENDPOINT = "tls-cn-chongqing-sdv.volces.com",
  VOLCENGINE_REGION = "cn-chongqing-sdv",
  VOLCENGINE_ACCESS_KEY_ID = "",
  VOLCENGINE_ACCESS_KEY_SECRET = "",
  VOLCENGINE_TOPIC_ID = "",
} = process.env;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function createBaseConfig() {
  const cfg = tlsOpenapi.Producer.getDefaultProducerConfig();
  cfg.Endpoint = VOLCENGINE_ENDPOINT;
  cfg.Region = VOLCENGINE_REGION;
  cfg.AccessKeyID = VOLCENGINE_ACCESS_KEY_ID;
  cfg.AccessKeySecret = VOLCENGINE_ACCESS_KEY_SECRET;
  return cfg;
}

function createTestLog(index, size = 50) {
  return {
    Time: Date.now(),
    Contents: [
      { Key: "message", Value: `test log ${index}` + "x".repeat(size) },
      { Key: "index", Value: String(index) },
      { Key: "timestamp", Value: String(Date.now()) },
    ],
  };
}

function createTestLogGroup(count, size = 50) {
  return {
    Logs: Array.from({ length: count }, (_, i) => createTestLog(i, size)),
    Source: "demo-source",
    FileName: "demo-filename",
    LogTags: [],
  };
}

const log = console.log;

async function scenario1_basicUsage() {
  log("\n========== 场景 1: 基本使用 ==========\n");

  if (!VOLCENGINE_TOPIC_ID) {
    log("跳过: 未设置 VOLCENGINE_TOPIC_ID");
    return;
  }

  const cfg = createBaseConfig();
  const producer = new tlsOpenapi.Producer(cfg);
  producer.Start();

  const callback = {
    Success(result) {
      log(`[回调] 发送成功! Attempts: ${result.Attempts.length}`);
    },
    Fail(result) {
      const last = result.Attempts[result.Attempts.length - 1];
      const errorCode = last && last.ErrorCode;
      const errorMessage = last && last.ErrorMessage;
      log(`[回调] 发送失败! ErrorCode: ${errorCode}, ErrorMessage: ${errorMessage}`);
    },
  };

  log("发送单条日志...");
  await producer.SendLog(
    "",
    VOLCENGINE_TOPIC_ID,
    "demo-source",
    "demo-filename",
    createTestLog(1),
    callback
  );

  log("发送多条日志...");
  await producer.SendLogs(
    "",
    VOLCENGINE_TOPIC_ID,
    "demo-source",
    "demo-filename",
    createTestLogGroup(10),
    callback
  );

  await sleep(1000);
  await producer.Close();
  log("场景 1 完成\n");
}

async function scenario2_batchingControl() {
  log("\n========== 场景 2: 批量聚合控制 ==========\n");

  if (!VOLCENGINE_TOPIC_ID) {
    log("跳过: 未设置 VOLCENGINE_TOPIC_ID");
    return;
  }

  const cfg = createBaseConfig();
  cfg.LingerTime = 2000;
  cfg.MaxBatchSize = 1024;
  cfg.MaxBatchCount = 100;

  log(
    `配置: LingerTime=${cfg.LingerTime}ms, MaxBatchSize=${cfg.MaxBatchSize}B, MaxBatchCount=${cfg.MaxBatchCount}`
  );

  const producer = new tlsOpenapi.Producer(cfg);
  producer.Start();

  let batchCount = 0;
  const callback = {
    Success() {
      batchCount++;
      log(`[回调] 批次 ${batchCount} 发送成功`);
    },
    Fail() {
      log(`[回调] 批次发送失败`);
    },
  };

  log("快速发送 50 条日志，观察批量聚合效果...");
  const startTime = Date.now();
  for (let i = 0; i < 50; i++) {
    await producer.SendLog(
      "",
      VOLCENGINE_TOPIC_ID,
      "demo-source",
      "demo-filename",
      createTestLog(i, 100),
      callback
    );
  }

  log("等待所有批次发送完成...");
  await producer.Close();
  const elapsed = Date.now() - startTime;
  log(`总耗时: ${elapsed}ms, 发送批次: ${batchCount}`);
  log("场景 2 完成\n");
}

async function scenario3_concurrencyControl() {
  log("\n========== 场景 3: 并发控制 ==========\n");

  if (!VOLCENGINE_TOPIC_ID) {
    log("跳过: 未设置 VOLCENGINE_TOPIC_ID");
    return;
  }

  const cfg = createBaseConfig();
  cfg.MaxSenderCount = 3;
  cfg.LingerTime = 100;
  log(`配置: MaxSenderCount=${cfg.MaxSenderCount} (最大并发请求数)`);

  const producer = new tlsOpenapi.Producer(cfg);
  producer.Start();

  let activeCount = 0;
  let maxActive = 0;

  const trackingCallback = {
    Success() {
      maxActive = Math.max(maxActive, activeCount);
      activeCount--;
      log(`[并发监控] 当前活跃: ${activeCount}, 历史最大: ${maxActive}`);
    },
    Fail() {
      activeCount--;
    },
  };

  log("发送 20 个批次，监控并发数...");
  for (let i = 0; i < 20; i++) {
    activeCount++;
    await producer.SendLog(
      "",
      VOLCENGINE_TOPIC_ID,
      `source-${i % 5}`,
      `filename-${i % 5}`,
      createTestLog(i, 200),
      trackingCallback
    );
  }

  await producer.Close();
  log(`最大并发数: ${maxActive} (限制: ${cfg.MaxSenderCount})`);
  log("场景 3 完成\n");
}

async function scenario4_memoryControl() {
  log("\n========== 场景 4: 内存控制 ==========\n");

  if (!VOLCENGINE_TOPIC_ID) {
    log("跳过: 未设置 VOLCENGINE_TOPIC_ID");
    return;
  }

  const cfg = createBaseConfig();
  cfg.TotalSizeLnBytes = 5 * 1024;
  cfg.MaxBlockSec = 5;
  cfg.LingerTime = 500;
  log(`配置: TotalSizeLnBytes=${cfg.TotalSizeLnBytes}B, MaxBlockSec=${cfg.MaxBlockSec}s`);

  const producer = new tlsOpenapi.Producer(cfg);
  producer.Start();

  const callback = {
    Success() {},
    Fail() {},
  };

  log("发送大量日志，观察内存控制效果...");
  log(`初始 bufferedSize: ${producer.getBufferedSize()}B`);

  const sendPromises = [];
  let blockedCount = 0;

  for (let i = 0; i < 100; i++) {
    const start = Date.now();

    sendPromises.push(
      producer
        .SendLog(
          "",
          VOLCENGINE_TOPIC_ID,
          "demo-source",
          "demo-filename",
          createTestLog(i, 200),
          callback
        )
        .then(() => {
          const elapsed = Date.now() - start;
          if (elapsed > 100) {
            blockedCount++;
          }
        })
    );

    const afterSize = producer.getBufferedSize();
    if (i % 20 === 0) {
      log(`已发送 ${i + 1} 条, bufferedSize: ${afterSize}B`);
    }
  }

  await Promise.all(sendPromises);
  log(`发生阻塞的次数: ${blockedCount}`);
  log(`最终 bufferedSize: ${producer.getBufferedSize()}B`);

  await producer.Close();
  log("场景 4 完成\n");
}

async function scenario5_retryStrategy() {
  log("\n========== 场景 5: 重试策略 ==========\n");

  const cfg = createBaseConfig();
  cfg.Retries = 3;
  cfg.BaseRetryBackoffMs = 500;
  cfg.MaxRetryBackoffMs = 3000;
  cfg.NoRetryStatusCodeList = [400, 404];
  log(
    `配置: Retries=${cfg.Retries}, BaseRetryBackoffMs=${cfg.BaseRetryBackoffMs}ms, MaxRetryBackoffMs=${cfg.MaxRetryBackoffMs}ms`
  );
  log(`不重试的状态码: ${cfg.NoRetryStatusCodeList.join(", ")}`);

  const producer = new tlsOpenapi.Producer(cfg);
  producer.Start();

  const callback = {
    Success(result) {
      log(`[回调] 成功! 尝试次数: ${result.Attempts.length}`);
      result.Attempts.forEach((a, i) => {
        log(`  尝试 ${i + 1}: success=${a.SuccessFlag}, time=${a.TimestampMs}`);
      });
    },
    Fail(result) {
      log(`[回调] 最终失败! 尝试次数: ${result.Attempts.length}`);
      result.Attempts.forEach((a, i) => {
        log(
          `尝试 ${i + 1}: success=${a.SuccessFlag}, errorCode=${a.ErrorCode}, errorMessage=${
            a.ErrorMessage
          }`
        );
      });
    },
  };

  log("测试无效 Topic ID (预期触发失败回调)...");
  await producer.SendLog(
    "",
    "invalid-topic-id-for-test",
    "demo-source",
    "demo-filename",
    createTestLog(1),
    callback
  );

  await sleep(3000);
  await producer.Close();
  log("场景 5 完成\n");
}

async function scenario6_gracefulVsForceClose() {
  log("\n========== 场景 6: 优雅关闭 vs 强制关闭 ==========\n");

  if (!VOLCENGINE_TOPIC_ID) {
    log("跳过: 未设置 VOLCENGINE_TOPIC_ID");
    return;
  }

  log("--- 测试优雅关闭 Close() ---");
  const cfg1 = createBaseConfig();
  cfg1.LingerTime = 100;
  const producer1 = new tlsOpenapi.Producer(cfg1);
  producer1.Start();

  let successCount1 = 0;
  const callback1 = {
    Success() {
      successCount1++;
    },
    Fail() {},
  };

  for (let i = 0; i < 5; i++) {
    await producer1.SendLog(
      "",
      VOLCENGINE_TOPIC_ID,
      "demo-source",
      "demo-filename",
      createTestLog(i),
      callback1
    );
  }

  log("调用 Close()，等待所有日志发送完成...");
  const start1 = Date.now();
  await producer1.Close();
  log(`优雅关闭完成，耗时: ${Date.now() - start1}ms, 成功回调数: ${successCount1}`);

  log("\n--- 测试强制关闭 ForceClose() ---");
  const cfg2 = createBaseConfig();
  cfg2.LingerTime = 10000;
  cfg2.MaxBatchSize = 10 * 1024 * 1024;
  const producer2 = new tlsOpenapi.Producer(cfg2);
  producer2.Start();

  let successCount2 = 0;
  let failCount2 = 0;
  const callback2 = {
    Success() {
      successCount2++;
    },
    Fail() {
      failCount2++;
    },
  };

  await producer2.SendLog(
    "",
    VOLCENGINE_TOPIC_ID,
    "demo-source",
    "demo-filename",
    createTestLog(1),
    callback2
  );

  log("调用 ForceClose()，立即丢弃未发送数据...");
  const start2 = Date.now();
  await producer2.ForceClose();
  log(
    `强制关闭完成，耗时: ${
      Date.now() - start2
    }ms, 成功回调: ${successCount2}, 失败回调: ${failCount2}`
  );

  log("场景 6 完成\n");
}

async function scenario7_dynamicCredentialUpdate() {
  log("\n========== 场景 7: 动态更新凭证 ==========\n");

  const cfg = createBaseConfig();
  const producer = new tlsOpenapi.Producer(cfg);
  producer.Start();

  log("模拟 AK/SK 轮转场景...");
  log("当前凭证已加载");

  log("调用 ResetAccessKeyToken 更新凭证...");
  producer.ResetAccessKeyToken("new-access-key-id", "new-access-key-secret", "new-security-token");
  log("凭证已更新 (注意: 实际使用时请使用有效的凭证)");

  await producer.Close();
  log("场景 7 完成\n");
}

async function scenario8_highThroughput() {
  log("\n========== 场景 8: 高吞吐场景 ==========\n");

  if (!VOLCENGINE_TOPIC_ID) {
    log("跳过: 未设置 VOLCENGINE_TOPIC_ID");
    return;
  }

  const cfg = createBaseConfig();
  cfg.MaxSenderCount = 20;
  cfg.LingerTime = 100;
  cfg.MaxBatchSize = 512 * 1024;
  cfg.MaxBatchCount = 4096;
  cfg.TotalSizeLnBytes = 100 * 1024 * 1024;
  log(`高吞吐配置: MaxSenderCount=${cfg.MaxSenderCount}, LingerTime=${cfg.LingerTime}ms`);

  const producer = new tlsOpenapi.Producer(cfg);
  producer.Start();

  let successCount = 0;
  let failCount = 0;
  const callback = {
    Success() {
      successCount++;
    },
    Fail() {
      failCount++;
    },
  };

  const totalLogs = 1000;
  log(`发送 ${totalLogs} 条日志...`);
  const startTime = Date.now();

  const promises = [];
  for (let i = 0; i < totalLogs; i++) {
    promises.push(
      producer.SendLog(
        "",
        VOLCENGINE_TOPIC_ID,
        "demo-source",
        "demo-filename",
        createTestLog(i, 100),
        callback
      )
    );
  }

  await Promise.all(promises);
  await producer.Close();

  const elapsed = Date.now() - startTime;
  const throughput = (totalLogs / elapsed) * 1000;

  log(`总耗时: ${elapsed}ms`);
  log(`成功: ${successCount}, 失败: ${failCount}`);
  log(`吞吐量: ${throughput.toFixed(1)} logs/s`);
  log("场景 8 完成\n");
}

async function scenario9_errorHandling() {
  log("\n========== 场景 9: 错误处理 ==========\n");

  const cfg = createBaseConfig();
  cfg.MaxBatchSize = 100;
  cfg.TotalSizeLnBytes = 200;

  const producer = new tlsOpenapi.Producer(cfg);
  producer.Start();

  log("--- 测试日志超过 MaxBatchSize ---");
  try {
    const largeLog = {
      Time: Date.now(),
      Contents: [{ Key: "message", Value: "x".repeat(200) }],
    };
    await producer.SendLog("", "topic", "source", "file", largeLog);
  } catch (err) {
    log(`捕获异常: ${err.message}`);
  }

  log("\n--- 测试日志超过 TotalSizeLnBytes ---");
  try {
    const hugeLog = {
      Time: Date.now(),
      Contents: [{ Key: "message", Value: "x".repeat(300) }],
    };
    await producer.SendLog("", "topic", "source", "file", hugeLog);
  } catch (err) {
    log(`捕获异常: ${err.message}`);
  }

  log("\n--- 测试未启动就发送 ---");
  const producer2 = new tlsOpenapi.Producer(cfg);
  try {
    await producer2.SendLog("", "topic", "source", "file", createTestLog(1));
  } catch (err) {
    log(`捕获异常: ${err.message}`);
  }

  log("\n--- 测试关闭后发送 ---");
  producer2.Start();
  await producer2.Close();
  try {
    await producer2.SendLog("", "topic", "source", "file", createTestLog(1));
  } catch (err) {
    log(`捕获异常: ${err.message}`);
  }

  await producer.Close();
  log("场景 9 完成\n");
}

async function scenario10_lingerTimeEffect() {
  log("\n========== 场景 10: LingerTime 效果演示 ==========\n");

  if (!VOLCENGINE_TOPIC_ID) {
    log("跳过: 未设置 VOLCENGINE_TOPIC_ID");
    return;
  }

  log("--- 低延迟模式 (LingerTime=100ms) ---");
  const cfg1 = createBaseConfig();
  cfg1.LingerTime = 100;
  cfg1.MaxBatchSize = 10 * 1024 * 1024;

  const producer1 = new tlsOpenapi.Producer(cfg1);
  producer1.Start();

  const start1 = Date.now();
  await producer1.SendLog(
    "",
    VOLCENGINE_TOPIC_ID,
    "demo-source",
    "demo-filename",
    createTestLog(1)
  );
  await new Promise((resolve) => {
    const cb = {
      Success: () => resolve(undefined),
      Fail: () => resolve(undefined),
    };
    producer1.SendLog(
      "",
      VOLCENGINE_TOPIC_ID,
      "demo-source",
      "demo-filename",
      createTestLog(2),
      cb
    );
  });
  log(`低延迟模式耗时: ${Date.now() - start1}ms`);
  await producer1.Close();

  log("\n--- 高吞吐模式 (LingerTime=2000ms) ---");
  const cfg2 = createBaseConfig();
  cfg2.LingerTime = 2000;
  cfg2.MaxBatchSize = 10 * 1024 * 1024;

  const producer2 = new tlsOpenapi.Producer(cfg2);
  producer2.Start();

  const start2 = Date.now();
  await new Promise((resolve) => {
    const cb = {
      Success: () => resolve(undefined),
      Fail: () => resolve(undefined),
    };
    producer2.SendLog(
      "",
      VOLCENGINE_TOPIC_ID,
      "demo-source",
      "demo-filename",
      createTestLog(1),
      cb
    );
  });
  log(`高吞吐模式耗时: ${Date.now() - start2}ms (等待 LingerTime)`);
  await producer2.Close();

  log("场景 10 完成\n");
}

async function main() {
  log("========================================");
  log("  TLS Producer 使用场景演示");
  log("========================================");

  if (!VOLCENGINE_ACCESS_KEY_ID || !VOLCENGINE_ACCESS_KEY_SECRET) {
    log("\n警告: 未设置访问凭证，部分场景将跳过");
    log("请设置环境变量:");
    log("  VOLCENGINE_ACCESS_KEY_ID");
    log("  VOLCENGINE_ACCESS_KEY_SECRET");
    log("  VOLCENGINE_TOPIC_ID");
  }

  try {
    await scenario1_basicUsage();
    await scenario2_batchingControl();
    await scenario3_concurrencyControl();
    await scenario4_memoryControl();
    await scenario5_retryStrategy();
    await scenario6_gracefulVsForceClose();
    await scenario7_dynamicCredentialUpdate();
    await scenario8_highThroughput();
    await scenario9_errorHandling();
    await scenario10_lingerTimeEffect();

    log("\n========================================");
    log("  所有场景演示完成!");
    log("========================================\n");
  } catch (err) {
    console.error("运行出错:", err);
    process.exit(1);
  }
}

module.exports = { main };

if (require.main === module) {
  void main();
}
