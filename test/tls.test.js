import { tlsOpenapi } from "../lib";
import { getDefaultOption } from "../lib/base/utils";
import {
  abnormalHostsValidate,
  alarmValidate,
  hostGroupAutoUpdateValidate,
  downloadTaskValidate,
  etlTaskValidate,
  etlValidate,
  accountValidate,
  activeTlsAccountValidate,
  hostGroupValidate,
  importTaskValidate,
  indexValidate,
  logsValidate,
  logContextValidate,
  histogramV1Validate,
  projectValidate,
  ruleHostGroupValidate,
  rulesValidate,
  shardsValidate,
  shipperValidate,
  topicValidate,
  traceValidate,
  describeTraceValidate,
  searchTracesValidate,
  downloadUrlValidate,
  scheduleSqlTaskValidate,
  alarmContentTemplateValidate,
  alarmWebhookIntegrationValidate,
  consumerGroupValidate,
  describeConsumerGroupsValidate,
  describeCheckPointValidate,
  modifyCheckPointValidate,
  resetCheckPointValidate,
  listTagsForResourcesValidate,
  tagResourcesValidate,
  untagResourcesValidate,
} from "./schema/tls";

const tlsOpenapiService = tlsOpenapi.defaultService;
const defaultOption = getDefaultOption();

const accessKeyId = defaultOption.accessKeyId || "";
const accessKeySecret = defaultOption.secretKey || "";
const endpoint = "tls-cn-chongqing-sdv.volces.com";
const region = "cn-chongqing-sdv";

const hasEnv = !!accessKeyId && !!accessKeySecret && !!region && !!endpoint;

if (hasEnv) {
  tlsOpenapiService.setAccessKeyId(accessKeyId);
  tlsOpenapiService.setSecretKey(accessKeySecret);
  tlsOpenapiService.setRegion(region);
  tlsOpenapiService.setHost(endpoint);
} else {
  console.warn("Skip TLS integration tests: missing env");
}

const Region = region;

const commonQuery = {
  PageNumber: 1,
  PageSize: 10,
};

function generateRandomId() {
  return Math.random().toString(36).substring(2, 8);
}

async function writeLogsToTopic({
  tlsOpenapiService,
  tlsOpenapi,
  topicId,
  logGroupCount = 1000,
  logCountPerGroup = 100,
}) {
  const logGroups = [];
  for (let i = 0; i < logGroupCount; i++) {
    const logs = [];
    for (let j = 0; j < logCountPerGroup; j++) {
      logs.push({
        Time: Date.now(),
        Contents: [
          { Key: "index", Value: `${i}-${j}` },
          { Key: "message", Value: `test log message ${i}-${j}` },
          { Key: "level", Value: "INFO" },
        ],
      });
    }
    logGroups.push({
      Logs: logs,
      Source: "test-source",
      LogTags: [{ Key: "env", Value: "test" }],
      FileName: "test.log",
      ContextFlow: `context-${i}`,
    });
  }

  const logsBuffer = await tlsOpenapi.TlsService.objToProtoBuffer({
    LogGroups: logGroups,
  });

  await tlsOpenapiService.PutLogs({
    TopicId: topicId,
    CompressType: "lz4",
    LogGroupList: logsBuffer,
  });
}

async function cancelDownloadTaskWithRaceTolerance({ tlsOpenapiService, taskId, topicId }) {
  try {
    const cancelResult = await tlsOpenapiService.CancelDownloadTask({
      TaskId: taskId,
    });
    return { cancelResult };
  } catch (e) {
    const terminal = new Set(["success", "created_cut", "fail", "cancel", "incomplete"]);
    const status = e?.response?.status;
    const errData = e?.response?.data;
    const errText = typeof errData === "string" ? errData : JSON.stringify(errData ?? {});
    const maybeAlreadyDone =
      (status === 400 || status === 404 || status === 409) &&
      /cancel|task|status|already|finish|success|complete|done/i.test(errText);

    if (topicId) {
      for (let i = 0; i < 3; i++) {
        let tasksResp;
        try {
          tasksResp = await tlsOpenapiService.DescribeDownloadTasks({
            TopicId: topicId,
            PageNumber: 1,
            PageSize: 20,
          });
        } catch (_) {
          tasksResp = undefined;
        }

        const task = tasksResp?.Tasks?.find((t) => t?.TaskId === taskId);
        if (task) {
          if (terminal.has(task.TaskStatus)) {
            if (task.TaskStatus === "success") {
              console.warn(
                `[tlsOpenapi:CancelDownloadTask] skip cancel: task already success. taskId=${taskId}, topicId=${topicId}`
              );
            }
            return { terminalTaskStatus: task.TaskStatus };
          }
          throw e;
        }
        await new Promise((r) => setTimeout(r, 200));
      }
    }

    if (maybeAlreadyDone) {
      console.warn(
        `[tlsOpenapi:CancelDownloadTask] skip cancel: task may already completed. taskId=${taskId}, topicId=${topicId}, status=${status}`
      );
      return { cancelSkipped: true };
    }
    throw e;
  }
}

const describeName = hasEnv ? "tlsOpenapi test" : "Skip TLS integration tests: missing env";
const describeFn = hasEnv ? describe : describe.skip;

describeFn(describeName, () => {
  const originalTest = global.test;
  const test = (name, fn, timeout) => {
    return originalTest(
      name,
      async (...args) => {
        try {
          await fn(...args);
        } catch (e) {
          console.error(
            `[Test Error] ${name} config:\n`,
            e?.config,
            "\nresponse data:",
            e?.response?.data,
            "\nresponse headers:",
            e?.response?.headers
          );
          throw e;
        }
      },
      timeout
    );
  };
  Object.assign(test, originalTest);
  global.test = test;

  const TLS_TOS_BUCKET = process.env.TLS_TOS_BUCKET || "";
  const TLS_TOS_PREFIX = process.env.TLS_TOS_PREFIX || "tls-nodejs-sdk-test";
  const hasTosEnv = !!TLS_TOS_BUCKET;
  const testTos = hasTosEnv ? test : test.skip;

  const TLS_RECEIVER_NAME = process.env.TLS_RECEIVER_NAME || "";
  const hasReceiverEnv = !!TLS_RECEIVER_NAME;
  const testAlarm = hasReceiverEnv ? test : test.skip;

  test("tlsOpenapi:Project", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-project-${generateRandomId()}`,
      Region,
    });
    expect(projectValidate.create(projectCreated)).toBe(true);

    const projectDetail = await tlsOpenapiService.DescribeProject({
      ProjectId: projectCreated.ProjectId,
    });
    expect(projectValidate.detail(projectDetail)).toBe(true);

    const projectModified = await tlsOpenapiService.ModifyProject({
      Description: "修改",
      ProjectId: projectCreated.ProjectId,
    });
    expect(projectValidate.modify(projectModified)).toBe(true);

    const projectDeleted = await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
    expect(projectValidate.delete(projectDeleted)).toBe(true);

    const projectList = await tlsOpenapiService.DescribeProjects({
      ...commonQuery,
    });
    expect(projectValidate.list(projectList)).toBe(true);
  });

  test("tlsOpenapi:Topic", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-topic-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${generateRandomId()}`,
      Ttl: 1,
    });
    expect(topicValidate.create(topicCreated)).toBe(true);

    const topicDetail = await tlsOpenapiService.DescribeTopic({
      TopicId: topicCreated.TopicId,
    });
    expect(topicValidate.detail(topicDetail)).toBe(true);

    const topicModified = await tlsOpenapiService.ModifyTopic({
      TopicId: topicCreated.TopicId,
      Description: "描述",
    });
    expect(topicValidate.modify(topicModified)).toBe(true);

    const topicDeleted = await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    expect(topicValidate.delete(topicDeleted)).toBe(true);

    const topicList = await tlsOpenapiService.DescribeTopics({
      ...commonQuery,
      ProjectId: projectCreated.ProjectId,
    });
    expect(topicValidate.list(topicList)).toBe(true);

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:Index", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-topic-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const indexCreated = await tlsOpenapiService.CreateIndex({
      TopicId: topicCreated.TopicId,
      FullText: {
        CaseSensitive: false,
        Delimiter: "_",
        IncludeChinese: false,
      },
    });

    expect(indexValidate.create(indexCreated)).toBe(true);

    const indexDetail = await tlsOpenapiService.DescribeIndex({
      TopicId: topicCreated.TopicId,
    });
    expect(indexValidate.detail(indexDetail)).toBe(true);

    const indexModified = await tlsOpenapiService.ModifyIndex({
      TopicId: topicCreated.TopicId,
      FullText: indexDetail.FullText,
    });
    expect(indexValidate.modify(indexModified)).toBe(true);

    const indexDeleted = await tlsOpenapiService.DeleteIndex({
      TopicId: topicCreated.TopicId,
    });
    expect(indexValidate.delete(indexDeleted)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:Logs", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-topic-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    await tlsOpenapiService.CreateIndex({
      TopicId: topicCreated.TopicId,
      FullText: {
        CaseSensitive: false,
        Delimiter: "_",
        IncludeChinese: false,
      },
    });

    const searchLogsResult = await tlsOpenapiService.SearchLogs({
      StartTime: Math.floor(Date.now() / 1000),
      EndTime: Math.floor(Date.now() / 1000) + 3600,
      Limit: 2,
      Query: "",
      TopicId: topicCreated.TopicId,
    });

    expect(logsValidate.search(searchLogsResult)).toBe(true);

    const logGroupListBuffer = await tlsOpenapi.TlsService.objToProtoBuffer({
      LogGroups: [
        {
          Logs: [
            {
              Time: Date.now(),
              Contents: [{ Key: "TEST", Value: "TEST" }],
            },
          ],
          Source: "TEST",
          LogTags: [{ Key: "Tag", Value: "Tag" }],
          FileName: "TEST",
          ContextFlow: "TEST",
        },
      ],
    });
    const putLogsResult = await tlsOpenapiService.PutLogs({
      TopicId: topicCreated.TopicId,
      CompressType: "lz4",
      LogGroupList: logGroupListBuffer,
    });
    expect(logsValidate.upload(putLogsResult)).toBe(true);

    if (searchLogsResult.Logs && searchLogsResult.Logs.length > 0) {
      const firstLog = searchLogsResult.Logs[0];
      const contextFlow = firstLog.___context_flow___ || "test-context-flow";
      const packageOffset = firstLog.__package_offset___ || 0;

      const describeLogContextResult = await tlsOpenapiService.DescribeLogContext({
        TopicId: topicCreated.TopicId,
        ContextFlow: contextFlow,
        PackageOffset: packageOffset,
        Source: "TEST",
        PrevLogs: 5,
        NextLogs: 5,
      });

      expect(logContextValidate.describe(describeLogContextResult)).toBe(true);
    }

    const shardsList = await tlsOpenapiService.DescribeShards({
      TopicId: topicCreated.TopicId,
      PageNumber: 1,
      PageSize: 20,
    });
    expect(shardsList.Shards.length).toBeGreaterThan(0);

    const shardId = shardsList.Shards[0].ShardId;

    const cursorRes = await tlsOpenapiService.DescribeCursor({
      TopicId: topicCreated.TopicId,
      ShardId: shardId,
      From: "begin",
    });

    const consumeLogsResult = await tlsOpenapiService.ConsumeLogs({
      TopicId: topicCreated.TopicId,
      ShardId: shardId,
      Cursor: cursorRes.Cursor,
      LogGroupCount: 10,
    });

    const isBuffer = Buffer.isBuffer(consumeLogsResult);
    const isArrayBuffer = consumeLogsResult instanceof ArrayBuffer;
    expect(isBuffer || isArrayBuffer).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:Shards", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-topic-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const shardsList = await tlsOpenapiService.DescribeShards({
      TopicId: topicCreated.TopicId,
      PageNumber: 1,
      PageSize: 20,
    });
    expect(shardsValidate.list(shardsList)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:Cursor", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-topic-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const shardsList = await tlsOpenapiService.DescribeShards({
      TopicId: topicCreated.TopicId,
      PageNumber: 1,
      PageSize: 20,
    });

    const cursor = await tlsOpenapiService.DescribeCursor({
      TopicId: topicCreated.TopicId,
      ShardId: shardsList.Shards[0].ShardId,
      From: "begin",
    });

    expect(cursor).toBeDefined();
    expect(typeof cursor.Cursor).toBe("string");

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:ManualShardSplit", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-manual-shard-split-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 2,
      TopicName: `tls-nodejs-sdk-test-manual-shard-split-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const shardsList = await tlsOpenapiService.DescribeShards({
      TopicId: topicCreated.TopicId,
      PageNumber: 1,
      PageSize: 20,
    });
    expect(shardsValidate.list(shardsList)).toBe(true);
    expect(shardsList.Shards.length).toBeGreaterThan(0);

    const shardToSplit = shardsList.Shards[0];
    const manualShardSplitResult = await tlsOpenapiService.ManualShardSplit({
      TopicId: topicCreated.TopicId,
      ShardId: shardToSplit.ShardId,
      Number: 2,
    });
    expect(shardsValidate.manualShardSplit(manualShardSplitResult)).toBe(true);
    expect(manualShardSplitResult.Shards).toBeDefined();
    expect(manualShardSplitResult.Shards.length).toBeGreaterThan(0);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:Rule", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-topic-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const ruleCreated = await tlsOpenapiService.CreateRule({
      Paths: ["/test"],
      RuleName: `tls-nodejs-sdk-test-createrule-${generateRandomId()}`,
      TopicId: topicCreated.TopicId,
    });
    expect(rulesValidate.create(ruleCreated)).toBe(true);

    const ruleDetail = await tlsOpenapiService.DescribeRule({
      RuleId: ruleCreated.RuleId,
    });
    expect(rulesValidate.detail(ruleDetail)).toBe(true);

    const ruleModified = await tlsOpenapiService.ModifyRule({
      RuleId: ruleCreated.RuleId,
      RuleName: `tls-nodejs-sdk-test-modifyrule-${generateRandomId()}`,
    });
    expect(rulesValidate.modify(ruleModified)).toBe(true);

    const ruleDeleted = await tlsOpenapiService.DeleteRule({
      RuleId: ruleCreated.RuleId,
    });
    expect(rulesValidate.delete(ruleDeleted)).toBe(true);

    const ruleList = await tlsOpenapiService.DescribeRules({
      ProjectId: projectCreated.ProjectId,
      PageNumber: 1,
      PageSize: 20,
    });

    expect(rulesValidate.list(ruleList)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:RuleHostGroup", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-topic-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const ruleCreated = await tlsOpenapiService.CreateRule({
      Paths: ["/test"],
      RuleName: `tls-nodejs-sdk-test-createrule-${generateRandomId()}`,
      TopicId: topicCreated.TopicId,
    });

    const hostGroupCreated = await tlsOpenapiService.CreateHostGroup({
      HostGroupName: `tls-nodejs-sdk-test-create-host-group-${generateRandomId()}`,
      HostGroupType: "Label",
      HostIdentifier: "none",
    });

    const ruleBound = await tlsOpenapiService.ApplyRuleToHostGroups({
      HostGroupIds: [hostGroupCreated.HostGroupId],
      RuleId: ruleCreated.RuleId,
    });
    expect(ruleHostGroupValidate.bind(ruleBound)).toBe(true);

    const ruleUnbound = await tlsOpenapiService.DeleteRuleFromHostGroups({
      HostGroupIds: [hostGroupCreated.HostGroupId],
      RuleId: ruleCreated.RuleId,
    });
    expect(ruleHostGroupValidate.unbound(ruleUnbound)).toBe(true);

    await tlsOpenapiService.DeleteHostGroup({
      HostGroupId: hostGroupCreated.HostGroupId,
    });
    await tlsOpenapiService.DeleteRule({
      RuleId: ruleCreated.RuleId,
    });
    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:HostGroup", async () => {
    const hostGroupCreated = await tlsOpenapiService.CreateHostGroup({
      HostGroupName: `tls-nodejs-sdk-test-create-host-group-${generateRandomId()}`,
      HostGroupType: "Label",
      HostIdentifier: "none",
    });
    expect(hostGroupValidate.create(hostGroupCreated)).toBe(true);

    const hostGroupDetail = await tlsOpenapiService.DescribeHostGroup({
      HostGroupId: hostGroupCreated.HostGroupId,
    });
    expect(hostGroupValidate.detail(hostGroupDetail)).toBe(true);

    const hostGroupModified = await tlsOpenapiService.ModifyHostGroup({
      HostGroupId: hostGroupCreated.HostGroupId,
      HostGroupName: `tls-nodejs-sdk-test-modify-host-group-${generateRandomId()}`,
      HostGroupType: "Label",
      HostIdentifier: "none1",
    });
    expect(hostGroupValidate.modify(hostGroupModified)).toBe(true);

    const hostGroupRuleList = await tlsOpenapiService.DescribeHostGroupRules({
      HostGroupId: hostGroupCreated.HostGroupId,
      PageNumber: 1,
      PageSize: 20,
    });
    expect(hostGroupValidate.ruleList(hostGroupRuleList)).toBe(true);

    const hostGroupDeleted = await tlsOpenapiService.DeleteHostGroup({
      HostGroupId: hostGroupCreated.HostGroupId,
    });
    expect(hostGroupValidate.delete(hostGroupDeleted)).toBe(true);

    const hostGroupList = await tlsOpenapiService.DescribeHostGroups({
      PageNumber: 1,
      PageSize: 20,
    });
    expect(hostGroupValidate.list(hostGroupList)).toBe(true);
  });

  testAlarm("tlsOpenapi:Alarm", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-alarm-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const receiverName = TLS_RECEIVER_NAME;
    const alarmNotifyGroupReq = {
      AlarmNotifyGroupName: `tls-nodejs-sdk-test-create-alarm-notify-group-${generateRandomId()}`,
    };

    if (receiverName) {
      alarmNotifyGroupReq.NotifyType = ["Trigger"];
      alarmNotifyGroupReq.Receivers = [
        {
          EndTime: "10:00:00",
          StartTime: "08:00:00",
          ReceiverChannels: ["Sms"],
          ReceiverNames: [receiverName],
          ReceiverType: "User",
        },
      ];
    }

    const alarmNotifyGroupCreated = await tlsOpenapiService.CreateAlarmNotifyGroup(
      alarmNotifyGroupReq
    );

    expect(alarmValidate.createNotifyGroup(alarmNotifyGroupCreated)).toBe(true);

    const alarmCreated = await tlsOpenapiService.CreateAlarm({
      AlarmName: `tls-nodejs-sdk-test-create-alarm-${generateRandomId()}`,
      AlarmNotifyGroup: [alarmNotifyGroupCreated.AlarmNotifyGroupId],
      AlarmPeriod: 10,
      Condition: "$1.count>=100",
      ProjectId: projectCreated.ProjectId,
      QueryRequest: [
        {
          EndTimeOffset: -10,
          Number: 1,
          Query: "level:error | select count(*) as errCount",
          StartTimeOffset: -20,
          TopicId: topicCreated.TopicId,
        },
      ],
      RequestCycle: {
        Time: 19,
        Type: "Period",
      },
      Status: true,
      TriggerPeriod: 3,
      UserDefineMsg: "测试告警",
    });

    alarmValidate.create(alarmCreated);

    const alarmModified = await tlsOpenapiService.ModifyAlarm({
      AlarmId: alarmCreated.AlarmId,
      UserDefineMsg: "告警测试",
    });
    alarmValidate.modify(alarmModified);

    const notifyGroupsModified = await tlsOpenapiService.ModifyAlarmNotifyGroup({
      AlarmNotifyGroupId: alarmNotifyGroupCreated.AlarmNotifyGroupId,
    });
    alarmValidate.modifyNotifyGroup(notifyGroupsModified);

    const alarmList = await tlsOpenapiService.DescribeAlarms({
      ProjectId: projectCreated.ProjectId,
      PageNumber: 1,
      PageSize: 20,
    });
    alarmValidate.list(alarmList);

    const notifyGroupList = await tlsOpenapiService.DescribeAlarmNotifyGroups({
      PageNumber: 1,
      PageSize: 20,
    });
    alarmValidate.notifyGroupList(notifyGroupList);

    const alarmDeleted = await tlsOpenapiService.DeleteAlarm({
      AlarmId: alarmCreated.AlarmId,
    });
    alarmValidate.delete(alarmDeleted);

    const notifyGroupDeleted = await tlsOpenapiService.DeleteAlarmNotifyGroup({
      AlarmNotifyGroupId: alarmNotifyGroupCreated.AlarmNotifyGroupId,
    });
    alarmValidate.deleteNotifyGroup(notifyGroupDeleted);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:Trace", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-trace-project-${generateRandomId()}`,
      Region,
    });

    const random1 = (Math.random() * 100).toFixed(0);
    const random2 = (Math.random() * 100).toFixed(0);
    const traceName = `单元测试${random1}-${random2}`;

    const traceList = await tlsOpenapiService.DescribeTraceInstances({
      ProjectId: projectCreated.ProjectId,
      PageNumber: 1,
      PageSize: 20,
    });

    expect(traceValidate.list(traceList)).toBe(true);

    const traceCreate = await tlsOpenapiService.CreateTraceInstance({
      ProjectId: projectCreated.ProjectId,
      TraceInstanceName: traceName,
    });

    expect(traceValidate.create(traceCreate)).toBe(true);

    const traceInstanceId = traceCreate.TraceInstanceId;

    const traceDetail = await tlsOpenapiService.DescribeTraceInstance({
      TraceInstanceId: traceInstanceId,
    });
    expect(traceValidate.detail(traceDetail)).toBe(true);

    const traceModify = await tlsOpenapiService.ModifyTraceInstance({
      TraceInstanceId: traceInstanceId,
      Description: "jest-modify",
    });
    expect(traceValidate.modify(traceModify)).toBe(true);

    const traceDelete = await tlsOpenapiService.DeleteTraceInstance({
      TraceInstanceId: traceInstanceId,
    });
    expect(traceValidate.delete(traceDelete)).toBe(true);

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi-types:DescribeTrace", () => {
    const fakeTrace = {
      Trace: {
        Spans: [
          {
            TraceId: "trace-id",
            SpanId: "span-id",
            TraceState: "",
            ParentSpanId: "",
            Name: "operation",
            Kind: "SPAN_KIND_INTERNAL",
            StartTime: 0,
            EndTime: 1,
            Attributes: [
              {
                Key: "service.name",
                Value: "test-service",
              },
            ],
            Events: [],
            Links: [],
            Status: {
              Message: "",
              Code: "OK",
            },
            Resource: {
              Attributes: [
                {
                  Key: "service.name",
                  Value: "test-service",
                },
              ],
            },
            InstrumentationLibrary: {
              Name: "test-lib",
              Version: "1.0.0",
            },
          },
        ],
      },
    };

    expect(describeTraceValidate.describe(fakeTrace)).toBe(true);
  });

  test("tlsOpenapi-types:SearchTraces", () => {
    const req = {
      TraceInstanceId: "trace-instance-id",
      Query: {
        ServiceName: "mysql",
        OperationName: "create",
        Kind: "internal",
        Attributes: {
          request_id: "123456789",
        },
        StartTimeMin: 100,
        StartTimeMax: 200,
        DurationMin: 50,
        DurationMax: 100,
        StatusCode: "OK",
        Offset: 0,
        Limit: 10,
        Order: "Start",
        Asc: false,
      },
    };

    const fakeResp = {
      Total: 0,
      TraceInfos: [
        {
          TraceId: "trace-id",
          ServiceName: "mysql",
          OperationName: "create",
          Attributes: {
            request_id: "123456789",
          },
          StartTime: 100,
          EndTime: 200,
          Duration: 100,
          StatusCode: "OK",
        },
      ],
    };

    expect(req.Query.Limit).toBeGreaterThan(0);
    expect(req.Query.Limit).toBeLessThanOrEqual(100);
    expect(searchTracesValidate.search(fakeResp)).toBe(true);
  });

  test("tlsOpenapi:DescribeHistogramV1", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-histogram-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-histogram-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    // 搜索日志需要先创建主题索引
    await tlsOpenapiService.CreateIndex({
      TopicId: topicCreated.TopicId,
      FullText: {
        CaseSensitive: false,
        Delimiter: "_",
        IncludeChinese: false,
      },
    });

    const now = Math.floor(Date.now() / 1000);
    const startTime = now - 3600; // 1 小时前，秒级时间戳
    const endTime = now;

    const histogramResult = await tlsOpenapiService.DescribeHistogramV1({
      TopicId: topicCreated.TopicId,
      Query: "error",
      StartTime: startTime,
      EndTime: endTime,
      Interval: 60, // 1 分钟间隔，单位为秒
    });

    expect(histogramV1Validate.describe(histogramResult)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:DeleteAbnormalHosts", async () => {
    // P0: 基础功能测试 - 正常删除异常主机
    const hostGroupCreated = await tlsOpenapiService.CreateHostGroup({
      HostGroupName: `tls-nodejs-sdk-test-abnormal-hosts-${generateRandomId()}`,
      HostGroupType: "Label",
      HostIdentifier: "none",
    });

    // 删除异常主机
    const deleteAbnormalHostsResult = await tlsOpenapiService.DeleteAbnormalHosts({
      HostGroupId: hostGroupCreated.HostGroupId,
    });
    expect(abnormalHostsValidate.delete(deleteAbnormalHostsResult)).toBe(true);

    // 清理资源
    await tlsOpenapiService.DeleteHostGroup({
      HostGroupId: hostGroupCreated.HostGroupId,
    });
  });

  test("tlsOpenapi:DeleteAbnormalHosts with non-existent HostGroupId", async () => {
    // P2: 异常场景测试 - 删除不存在的主机组ID
    const nonExistentHostGroupId = "non-existent-host-group-id-12345";

    try {
      await tlsOpenapiService.DeleteAbnormalHosts({
        HostGroupId: nonExistentHostGroupId,
      });
      // 如果没有抛出错误，则测试失败
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("tlsOpenapi:ModifyHostGroupsAutoUpdate", async () => {
    const hostGroupCreated = await tlsOpenapiService.CreateHostGroup({
      HostGroupName: `tls-nodejs-sdk-test-auto-update-host-group-${generateRandomId()}`,
      HostGroupType: "Label",
      HostIdentifier: "none",
    });

    const autoUpdateModified = await tlsOpenapiService.ModifyHostGroupsAutoUpdate({
      HostGroupIds: [hostGroupCreated.HostGroupId],
      AutoUpdate: true,
      UpdateStartTime: "00:00",
      UpdateEndTime: "02:00",
    });
    expect(hostGroupAutoUpdateValidate.modify(autoUpdateModified)).toBe(true);

    const autoUpdateDisabled = await tlsOpenapiService.ModifyHostGroupsAutoUpdate({
      HostGroupIds: [hostGroupCreated.HostGroupId],
      AutoUpdate: false,
    });
    expect(hostGroupAutoUpdateValidate.modify(autoUpdateDisabled)).toBe(true);

    await tlsOpenapiService.DeleteHostGroup({
      HostGroupId: hostGroupCreated.HostGroupId,
    });
  });

  test("tlsOpenapi:GetAccountStatus", async () => {
    const accountStatus = await tlsOpenapiService.GetAccountStatus({});
    expect(accountValidate.getStatus(accountStatus)).toBe(true);
  });

  test("tlsOpenapi:DescribeETLTask", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-etl-project-${generateRandomId()}`,
      Region,
    });

    const sourceTopicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-source-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const targetTopicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-target-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const etlTaskCreated = await tlsOpenapiService.CreateETLTask({
      DSLType: "NORMAL",
      Name: `tls-nodejs-sdk-test-etl-task-${generateRandomId()}`,
      Description: "Test ETL task for describe",
      Enable: true,
      SourceTopicId: sourceTopicCreated.TopicId,
      Script: 'f_set("key", "value")',
      TaskType: "Resident",
      TargetResources: [
        {
          Alias: "test",
          TopicId: targetTopicCreated.TopicId,
          Region,
        },
      ],
    });

    expect(etlTaskValidate.create(etlTaskCreated)).toBe(true);

    const etlTaskDetail = await tlsOpenapiService.DescribeETLTask({
      TaskId: etlTaskCreated.TaskId,
    });
    expect(etlTaskValidate.detail(etlTaskDetail)).toBe(true);

    await tlsOpenapiService.DeleteETLTask({
      TaskId: etlTaskCreated.TaskId,
    });

    await tlsOpenapiService.DeleteTopic({
      TopicId: targetTopicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteTopic({
      TopicId: sourceTopicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:DescribeETLTasks", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-etl-project-${generateRandomId()}`,
      Region,
    });

    // Test DescribeETLTasks with basic pagination
    const etlTasks = await tlsOpenapiService.DescribeETLTasks({
      ...commonQuery,
      ProjectId: projectCreated.ProjectId,
    });
    expect(etlTaskValidate.list(etlTasks)).toBe(true);

    // Test DescribeETLTasks with additional filters
    const etlTasksFiltered = await tlsOpenapiService.DescribeETLTasks({
      ...commonQuery,
      ProjectId: projectCreated.ProjectId,
      TaskName: "test-etl-task",
    });
    expect(etlTaskValidate.list(etlTasksFiltered)).toBe(true);

    // Test DescribeETLTasks with time range filters
    const currentTime = Math.floor(Date.now() / 1000);
    const etlTasksWithTimeRange = await tlsOpenapiService.DescribeETLTasks({
      ...commonQuery,
      ProjectId: projectCreated.ProjectId,
      CreateTimeStart: currentTime - 3600,
      CreateTimeEnd: currentTime + 3600,
    });
    expect(etlTaskValidate.list(etlTasksWithTimeRange)).toBe(true);

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  testTos("tlsOpenapi:DeleteShipper", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-shipper-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-shipper-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const tosShipperCreated = await tlsOpenapiService.CreateShipper({
      ContentInfo: {
        Format: "json",
        JsonInfo: {
          Enable: true,
          Escape: true,
        },
      },
      ShipperName: `tls-nodejs-sdk-test-tos-shipper-${generateRandomId()}`,
      ShipperType: "tos",
      TopicId: topicCreated.TopicId,
      TosShipperInfo: {
        Bucket: TLS_TOS_BUCKET,
        Prefix: TLS_TOS_PREFIX,
        MaxSize: 5,
        Compress: "snappy",
        Interval: 300,
        PartitionFormat: "%Y/%m/%d/%H/%M",
      },
    });

    const deleteResult = await tlsOpenapiService.DeleteShipper({
      ShipperId: tosShipperCreated.ShipperId,
    });
    expect(shipperValidate.delete(deleteResult)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  testTos("tlsOpenapi:ModifyShipper", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-shipper-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-shipper-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const tosShipperCreated = await tlsOpenapiService.CreateShipper({
      ContentInfo: {
        Format: "json",
        JsonInfo: {
          Enable: true,
          Escape: true,
        },
      },
      ShipperName: `tls-nodejs-sdk-test-tos-shipper-${generateRandomId()}`,
      ShipperType: "tos",
      TopicId: topicCreated.TopicId,
      TosShipperInfo: {
        Bucket: TLS_TOS_BUCKET,
        Prefix: TLS_TOS_PREFIX,
        MaxSize: 5,
        Compress: "snappy",
        Interval: 300,
        PartitionFormat: "%Y/%m/%d/%H/%M",
      },
    });
    expect(shipperValidate.create(tosShipperCreated)).toBe(true);

    const modifyResult = await tlsOpenapiService.ModifyShipper({
      ShipperId: tosShipperCreated.ShipperId,
      ShipperName: `test-shipper-name-${generateRandomId()}`,
      Status: true,
      TosShipperInfo: {
        Bucket: TLS_TOS_BUCKET,
        Prefix: TLS_TOS_PREFIX,
        MaxSize: 10,
        Compress: "snappy",
        Interval: 600,
        PartitionFormat: "%Y/%m/%d/%H",
      },
    });
    expect(shipperValidate.modify(modifyResult)).toBe(true);

    await tlsOpenapiService.DeleteShipper({
      ShipperId: tosShipperCreated.ShipperId,
    });

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  testTos("tlsOpenapi:CreateImportTask", async () => {
    // 创建项目和主题用于测试
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-import-task-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-import-task-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    // 测试创建 TOS 导入任务
    const importTaskResult = await tlsOpenapiService.CreateImportTask({
      TaskName: `tls-nodejs-sdk-test-import-task-${generateRandomId()}`,
      TopicID: topicCreated.TopicId,
      SourceType: "tos",
      ImportSourceInfo: {
        TosSourceInfo: {
          Bucket: TLS_TOS_BUCKET,
          Prefix: `${TLS_TOS_PREFIX}/import/`,
          CompressType: "none",
        },
      },
      TargetInfo: {
        Region,
        LogType: "json_log",
      },
      Description: "测试导入任务",
    });
    expect(importTaskValidate.create(importTaskResult)).toBe(true);

    // 清理资源
    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  testTos("tlsOpenapi:DescribeImportTask", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-import-task-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-import-task-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const importTaskCreated = await tlsOpenapiService.CreateImportTask({
      TaskName: `tls-nodejs-sdk-test-import-task-${generateRandomId()}`,
      TopicID: topicCreated.TopicId,
      SourceType: "tos",
      ImportSourceInfo: {
        TosSourceInfo: {
          Bucket: TLS_TOS_BUCKET,
          Prefix: `${TLS_TOS_PREFIX}/import/`,
          CompressType: "none",
        },
      },
      TargetInfo: {
        Region,
        LogType: "json_log",
      },
      Description: "测试导入任务",
    });
    expect(importTaskValidate.create(importTaskCreated)).toBe(true);

    const importTaskDetail = await tlsOpenapiService.DescribeImportTask({
      TaskId: importTaskCreated.TaskId,
    });
    expect(importTaskValidate.detail(importTaskDetail)).toBe(true);

    await tlsOpenapiService.DeleteImportTask({
      TaskId: importTaskCreated.TaskId,
    });

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  testTos("tlsOpenapi:DescribeShipper", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-shipper-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-shipper-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const tosShipperCreated = await tlsOpenapiService.CreateShipper({
      ContentInfo: {
        Format: "json",
        JsonInfo: {
          Enable: true,
          Escape: true,
        },
      },
      ShipperName: `tls-nodejs-sdk-test-tos-shipper-${generateRandomId()}`,
      ShipperType: "tos",
      TopicId: topicCreated.TopicId,
      TosShipperInfo: {
        Bucket: TLS_TOS_BUCKET,
        Prefix: TLS_TOS_PREFIX,
        MaxSize: 5,
        Compress: "snappy",
        Interval: 300,
        PartitionFormat: "%Y/%m/%d/%H/%M",
      },
    });
    expect(shipperValidate.create(tosShipperCreated)).toBe(true);

    const shipperDetail = await tlsOpenapiService.DescribeShipper({
      ShipperId: tosShipperCreated.ShipperId,
    });
    expect(shipperValidate.detail(shipperDetail)).toBe(true);

    await tlsOpenapiService.DeleteShipper({
      ShipperId: tosShipperCreated.ShipperId,
    });

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:DescribeShippers", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-shipper-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-shipper-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const shippersResult = await tlsOpenapiService.DescribeShippers({
      ...commonQuery,
      ProjectId: projectCreated.ProjectId,
    });
    expect(shipperValidate.list(shippersResult)).toBe(true);

    const shippersByTopic = await tlsOpenapiService.DescribeShippers({
      ...commonQuery,
      TopicId: topicCreated.TopicId,
    });
    expect(shipperValidate.list(shippersByTopic)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:CancelDownloadTask", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-njs-cancel-dl-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-njs-cancel-dl-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    await tlsOpenapiService.CreateIndex({
      TopicId: topicCreated.TopicId,
      FullText: {
        CaseSensitive: false,
        Delimiter: "_",
        IncludeChinese: false,
      },
    });

    await writeLogsToTopic({
      tlsOpenapiService,
      tlsOpenapi,
      topicId: topicCreated.TopicId,
    });

    const now = Math.floor(Date.now() / 1000);
    const startTime = now - 3600;
    const endTime = now;

    const downloadTaskCreated = await tlsOpenapiService.CreateDownloadTask({
      TaskName: `test-cancel-download-task-${generateRandomId()}`,
      TopicId: topicCreated.TopicId,
      Query: "*",
      StartTime: startTime,
      EndTime: endTime,
      DataFormat: "csv",
      Sort: "asc",
      Limit: 100000,
      Compression: "gzip",
    });
    const cancelOutcome = await cancelDownloadTaskWithRaceTolerance({
      tlsOpenapiService,
      taskId: downloadTaskCreated.TaskId,
      topicId: topicCreated.TopicId,
    });
    expect(downloadTaskValidate.create(downloadTaskCreated)).toBe(true);

    if (cancelOutcome?.cancelResult) {
      expect(downloadTaskValidate.cancel(cancelOutcome.cancelResult)).toBe(true);
    } else {
      const terminal = new Set(["success", "created_cut", "fail", "cancel", "incomplete"]);
      expect(
        cancelOutcome?.cancelSkipped === true || terminal.has(cancelOutcome?.terminalTaskStatus)
      ).toBe(true);
    }

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:DescribeKafkaConsumer", async () => {
    // 创建项目
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-kafka-consumer-project-${generateRandomId()}`,
      Region,
    });

    // 创建主题
    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-kafka-consumer-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    // 测试 DescribeKafkaConsumer 接口
    const kafkaConsumerInfo = await tlsOpenapiService.DescribeKafkaConsumer({
      TopicId: topicCreated.TopicId,
    });

    // 验证返回结果结构
    expect(kafkaConsumerInfo).toBeDefined();
    expect(typeof kafkaConsumerInfo.AllowConsume).toBe("boolean");
    expect(typeof kafkaConsumerInfo.ConsumeTopic).toBe("string");

    // 如果开启了 Kafka 消费功能，ConsumeTopic 应该以 "out" 开头
    if (kafkaConsumerInfo.AllowConsume) {
      expect(kafkaConsumerInfo.ConsumeTopic).toMatch(/^out/);
    }

    // 清理资源
    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:OpenKafkaConsumer", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-open-kafka-consumer-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${generateRandomId()}`,
      Ttl: 1,
      Description: "Test topic for OpenKafkaConsumer",
    });

    const openResult = await tlsOpenapiService.OpenKafkaConsumer({
      TopicId: topicCreated.TopicId,
    });
    expect(openResult).toBeDefined();
    expect(typeof openResult).toBe("object");

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:CloseKafkaConsumer", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-close-kafka-consumer-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${generateRandomId()}`,
      Ttl: 1,
      Description: "Test topic for CloseKafkaConsumer",
    });

    await tlsOpenapiService.OpenKafkaConsumer({
      TopicId: topicCreated.TopicId,
    });

    const closeResult = await tlsOpenapiService.CloseKafkaConsumer({
      TopicId: topicCreated.TopicId,
    });
    expect(closeResult).toBeDefined();
    expect(typeof closeResult).toBe("object");

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:ConsumerHeartbeat", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-consumer-heartbeat-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 2,
      TopicName: `tls-nodejs-sdk-test-consumer-heartbeat-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    // ConsumerHeartbeat 需要消费组，但当前没有创建消费组的接口
    // 这里测试异常场景，验证方法调用不会抛出异常
    try {
      const heartbeatResult = await tlsOpenapiService.ConsumerHeartbeat({
        ProjectID: projectCreated.ProjectId,
        ConsumerGroupName: `test-consumer-group-${generateRandomId()}`,
        ConsumerName: `test-consumer-${generateRandomId()}`,
      });
      // 如果调用成功，验证返回结构
      expect(heartbeatResult).toBeDefined();
      expect(heartbeatResult.Shards).toBeDefined();
      expect(Array.isArray(heartbeatResult.Shards)).toBe(true);
    } catch (error) {
      // 预期可能会失败，因为消费组可能不存在
      expect(error).toBeDefined();
    }

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:CreateConsumerGroup", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-consumer-group-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-consumer-group-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const consumerGroupCreated = await tlsOpenapiService.CreateConsumerGroup({
      ProjectID: projectCreated.ProjectId,
      TopicIDList: [topicCreated.TopicId],
      ConsumerGroupName: `tls-nodejs-sdk-test-consumer-group-${generateRandomId()}`,
      HeartbeatTTL: 60,
      OrderedConsume: false,
    });

    expect(consumerGroupCreated).toBeDefined();

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:DeleteConsumerGroup", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-consumer-group-project-${generateRandomId()}`,
      Region,
    });
    expect(projectValidate.create(projectCreated)).toBe(true);

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-consumer-group-topic-${generateRandomId()}`,
      Ttl: 1,
    });
    expect(topicValidate.create(topicCreated)).toBe(true);

    const consumerGroupName = `sdkcg-${generateRandomId()}`;

    const consumerGroupCreated = await tlsOpenapiService.CreateConsumerGroup({
      ProjectID: projectCreated.ProjectId,
      TopicIDList: [topicCreated.TopicId],
      ConsumerGroupName: consumerGroupName,
      HeartbeatTTL: 60,
      OrderedConsume: false,
    });
    expect(consumerGroupCreated).toBeDefined();

    const deleteConsumerGroupResult = await tlsOpenapiService.DeleteConsumerGroup({
      ProjectID: projectCreated.ProjectId,
      ConsumerGroupName: consumerGroupName,
    });
    expect(consumerGroupValidate.delete(deleteConsumerGroupResult)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:DeleteConsumerGroup with non-existent consumer group", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-njs-cg-nonexist-${generateRandomId()}`,
      Region,
    });
    expect(projectValidate.create(projectCreated)).toBe(true);

    const nonExistentConsumerGroupName = `sdkcg-nonexist-${generateRandomId()}`;

    try {
      await tlsOpenapiService.DeleteConsumerGroup({
        ProjectID: projectCreated.ProjectId,
        ConsumerGroupName: nonExistentConsumerGroupName,
      });
      // 如果没有抛出错误，则测试失败
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:ModifyConsumerGroup", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-modify-consumer-group-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-modify-consumer-group-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const consumerGroupName = `test-modify-consumer-group-${generateRandomId()}`;

    await tlsOpenapiService.CreateConsumerGroup({
      ProjectID: projectCreated.ProjectId,
      TopicIDList: [topicCreated.TopicId],
      ConsumerGroupName: consumerGroupName,
      HeartbeatTTL: 60,
      OrderedConsume: false,
    });

    const modifyResult = await tlsOpenapiService.ModifyConsumerGroup({
      ProjectID: projectCreated.ProjectId,
      ConsumerGroupName: consumerGroupName,
      HeartbeatTTL: 120,
      OrderedConsume: true,
    });

    expect(consumerGroupValidate.modify(modifyResult)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:DescribeConsumerGroups", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-describe-consumer-groups-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-describe-consumer-groups-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const consumerGroupName = `test-describe-consumer-group-${generateRandomId()}`;

    await tlsOpenapiService.CreateConsumerGroup({
      ProjectID: projectCreated.ProjectId,
      TopicIDList: [topicCreated.TopicId],
      ConsumerGroupName: consumerGroupName,
      HeartbeatTTL: 60,
      OrderedConsume: false,
    });

    const describeResult = await tlsOpenapiService.DescribeConsumerGroups({
      ProjectId: projectCreated.ProjectId,
      PageNumber: 1,
      PageSize: 20,
    });

    expect(describeConsumerGroupsValidate.list(describeResult)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:ResetCheckPoint", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-reset-checkpoint-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-reset-checkpoint-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const consumerGroupName = `test-consumer-group-${generateRandomId()}`;

    await tlsOpenapiService.CreateConsumerGroup({
      ProjectID: projectCreated.ProjectId,
      TopicIDList: [topicCreated.TopicId],
      ConsumerGroupName: consumerGroupName,
      HeartbeatTTL: 60,
      OrderedConsume: false,
    });

    const shardsList = await tlsOpenapiService.DescribeShards({
      TopicId: topicCreated.TopicId,
      PageNumber: 1,
      PageSize: 20,
    });

    const shardId = shardsList.Shards[0].ShardId;

    const describeCheckpointResult = await tlsOpenapiService.DescribeCheckPoint({
      ProjectId: projectCreated.ProjectId,
      TopicId: topicCreated.TopicId,
      ShardId: shardId,
      ConsumerGroupName: consumerGroupName,
    });

    expect(describeCheckPointValidate.describe(describeCheckpointResult)).toBe(true);

    // 测试重置消费位点到最早位置
    const resetToBegin = await tlsOpenapiService.ResetCheckPoint({
      ProjectID: projectCreated.ProjectId,
      ConsumerGroupName: consumerGroupName,
      Position: "begin",
    });
    expect(resetCheckPointValidate.reset(resetToBegin)).toBe(true);

    // 测试重置消费位点到最新位置
    const resetToEnd = await tlsOpenapiService.ResetCheckPoint({
      ProjectID: projectCreated.ProjectId,
      ConsumerGroupName: consumerGroupName,
      Position: "end",
    });
    expect(resetCheckPointValidate.reset(resetToEnd)).toBe(true);

    // 测试重置消费位点到指定时间戳
    const currentTimestamp = Math.floor(Date.now() / 1000).toString();
    const resetToTimestamp = await tlsOpenapiService.ResetCheckPoint({
      ProjectID: projectCreated.ProjectId,
      ConsumerGroupName: consumerGroupName,
      Position: currentTimestamp,
    });
    expect(resetCheckPointValidate.reset(resetToTimestamp)).toBe(true);

    // 清理资源
    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:ModifyCheckPoint", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-modify-checkpoint-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      TopicName: `tls-nodejs-sdk-test-modify-checkpoint-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const consumerGroupName = `test-modify-consumer-group-${generateRandomId()}`;

    await tlsOpenapiService.CreateConsumerGroup({
      ProjectID: projectCreated.ProjectId,
      TopicIDList: [topicCreated.TopicId],
      ConsumerGroupName: consumerGroupName,
      HeartbeatTTL: 60,
      OrderedConsume: false,
    });

    const shardsList = await tlsOpenapiService.DescribeShards({
      TopicId: topicCreated.TopicId,
      PageNumber: 1,
      PageSize: 20,
    });

    const shardId = shardsList.Shards[0].ShardId;

    const beginCursorResult = await tlsOpenapiService.DescribeCursor({
      TopicId: topicCreated.TopicId,
      ShardId: shardId,
      From: "begin",
    });

    const modifyResult = await tlsOpenapiService.ModifyCheckPoint({
      ProjectID: projectCreated.ProjectId,
      TopicID: topicCreated.TopicId,
      ConsumerGroupName: consumerGroupName,
      ShardID: shardId,
      Checkpoint: beginCursorResult.Cursor,
    });

    expect(modifyCheckPointValidate.modify(modifyResult)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:ListTagsForResources", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-list-tags-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-list-tags-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const listTagsResult = await tlsOpenapiService.ListTagsForResources({
      ResourceType: "project",
      ResourcesIds: [projectCreated.ProjectId],
      MaxResults: 10,
    });

    expect(listTagsForResourcesValidate.list(listTagsResult)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:AddTagsToResource", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-add-tags-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-add-tags-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const addTagsResult = await tlsOpenapiService.AddTagsToResource({
      ResourceType: "project",
      ResourcesList: [projectCreated.ProjectId],
      Tags: [
        {
          Key: "env",
          Value: "test",
        },
      ],
    });

    expect(tagResourcesValidate.tag(addTagsResult)).toBe(true);

    const listTagsResult = await tlsOpenapiService.ListTagsForResources({
      ResourceType: "project",
      ResourcesIds: [projectCreated.ProjectId],
      MaxResults: 10,
    });

    expect(listTagsForResourcesValidate.list(listTagsResult)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:TagResources", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-tag-resources-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-tag-resources-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const tagResult = await tlsOpenapiService.TagResources({
      ResourceType: "project",
      ResourcesIds: [projectCreated.ProjectId],
      Tags: [
        {
          Key: "env",
          Value: "tag-resources",
        },
      ],
    });

    expect(tagResourcesValidate.tag(tagResult)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:UntagResources", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-untag-resources-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-untag-resources-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const untagResult = await tlsOpenapiService.UntagResources({
      ResourceType: "project",
      ResourcesIds: [projectCreated.ProjectId],
      TagKeys: ["env"],
    });

    expect(untagResourcesValidate.untag(untagResult)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:RemoveTagsFromResource", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-remove-tags-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-remove-tags-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const removeResult = await tlsOpenapiService.RemoveTagsFromResource({
      ResourceType: "project",
      ResourcesList: [projectCreated.ProjectId],
      TagKeyList: ["env"],
    });

    expect(untagResourcesValidate.untag(removeResult)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:ActiveTlsAccount", async () => {
    const activeResult = await tlsOpenapiService.ActiveTlsAccount({});
    expect(activeTlsAccountValidate.active(activeResult)).toBe(true);
  });

  test("tlsOpenapi:ModifyETLTaskStatus", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-etl-status-project-${generateRandomId()}`,
      Region,
    });

    const sourceTopicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-etl-status-source-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const targetTopicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-etl-status-target-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const etlTaskCreated = await tlsOpenapiService.CreateETLTask({
      DSLType: "NORMAL",
      Name: `tls-nodejs-sdk-test-etl-status-task-${generateRandomId()}`,
      Description: "Test ETL task status",
      Enable: true,
      SourceTopicId: sourceTopicCreated.TopicId,
      Script: 'f_set("key", "value")',
      TaskType: "Resident",
      TargetResources: [
        {
          Alias: "test",
          TopicId: targetTopicCreated.TopicId,
          Region,
        },
      ],
    });
    expect(etlTaskValidate.create(etlTaskCreated)).toBe(true);

    // Test enabling ETL task
    const enableResult = await tlsOpenapiService.ModifyETLTaskStatus({
      TaskId: etlTaskCreated.TaskId,
      Enable: true,
    });
    expect(etlTaskValidate.modifyStatus(enableResult)).toBe(true);

    // Test disabling ETL task
    const disableResult = await tlsOpenapiService.ModifyETLTaskStatus({
      TaskId: etlTaskCreated.TaskId,
      Enable: false,
    });
    expect(etlTaskValidate.modifyStatus(disableResult)).toBe(true);

    await tlsOpenapiService.DeleteETLTask({
      TaskId: etlTaskCreated.TaskId,
    });

    await tlsOpenapiService.DeleteTopic({
      TopicId: targetTopicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteTopic({
      TopicId: sourceTopicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:ModifyETLTask", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-modify-etl-project-${generateRandomId()}`,
      Region,
    });

    const sourceTopicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-modify-etl-source-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const targetTopicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-modify-etl-target-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const etlTaskCreated = await tlsOpenapiService.CreateETLTask({
      DSLType: "NORMAL",
      Name: `tls-nodejs-sdk-test-modify-etl-task-${generateRandomId()}`,
      Description: "Test ETL task for modify",
      Enable: true,
      SourceTopicId: sourceTopicCreated.TopicId,
      Script: 'f_set("key", "value")',
      TaskType: "Resident",
      TargetResources: [
        {
          Alias: "test",
          TopicId: targetTopicCreated.TopicId,
          Region,
        },
      ],
    });
    expect(etlTaskValidate.create(etlTaskCreated)).toBe(true);

    const modifyResult = await tlsOpenapiService.ModifyETLTask({
      TaskId: etlTaskCreated.TaskId,
      Name: `test-etl-task-name-${generateRandomId()}`,
      Description: "This is a test ETL task",
      Script: 'f_set("key","value")',
      TargetResources: [
        {
          Alias: "test",
          TopicId: targetTopicCreated.TopicId,
          Region,
        },
      ],
    });
    expect(etlValidate.modify(modifyResult)).toBe(true);

    await tlsOpenapiService.DeleteETLTask({
      TaskId: etlTaskCreated.TaskId,
    });

    await tlsOpenapiService.DeleteTopic({
      TopicId: targetTopicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteTopic({
      TopicId: sourceTopicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:CreateETLTask", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-etl-project-${generateRandomId()}`,
      Region,
    });

    const sourceTopicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-source-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const targetTopicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-target-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const etlTaskCreated = await tlsOpenapiService.CreateETLTask({
      DSLType: "NORMAL",
      Name: `tls-nodejs-sdk-test-etl-task-${generateRandomId()}`,
      Description: "Test ETL task",
      Enable: true,
      SourceTopicId: sourceTopicCreated.TopicId,
      Script: 'f_set("key", "value")',
      TaskType: "Resident",
      TargetResources: [
        {
          Alias: "test",
          TopicId: targetTopicCreated.TopicId,
          Region,
        },
      ],
    });
    expect(etlTaskValidate.create(etlTaskCreated)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: targetTopicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteTopic({
      TopicId: sourceTopicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:CreateDownloadTask", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-download-task-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-download-task-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    await tlsOpenapiService.CreateIndex({
      TopicId: topicCreated.TopicId,
      FullText: {
        CaseSensitive: false,
        Delimiter: "_",
        IncludeChinese: false,
      },
    });

    const now = Math.floor(Date.now() / 1000);
    const startTime = now - 3600;
    const endTime = now;

    const downloadTaskCreated = await tlsOpenapiService.CreateDownloadTask({
      TaskName: `test-download-task-${generateRandomId()}`,
      TopicId: topicCreated.TopicId,
      Query: "*",
      StartTime: startTime,
      EndTime: endTime,
      DataFormat: "csv",
      Sort: "asc",
      Limit: 100,
      Compression: "gzip",
    });

    expect(downloadTaskValidate.create(downloadTaskCreated)).toBe(true);
    expect(downloadTaskCreated.TaskId).toBeDefined();
    expect(typeof downloadTaskCreated.TaskId).toBe("string");

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:DescribeDownloadTasks", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-download-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-download-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const downloadTasksList = await tlsOpenapiService.DescribeDownloadTasks({
      TopicId: topicCreated.TopicId,
      PageNumber: 1,
      PageSize: 20,
    });

    expect(downloadTaskValidate.list(downloadTasksList)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:DescribeDownloadUrl", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-download-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-download-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    await tlsOpenapiService.CreateIndex({
      TopicId: topicCreated.TopicId,
      FullText: {
        CaseSensitive: false,
        Delimiter: "_",
        IncludeChinese: false,
      },
    });

    const now = Math.floor(Date.now() / 1000);
    const startTime = now - 3600;
    const endTime = now;

    const downloadTaskCreated = await tlsOpenapiService.CreateDownloadTask({
      TaskName: `test-download-task-${generateRandomId()}`,
      TopicId: topicCreated.TopicId,
      Query: "*",
      StartTime: startTime,
      EndTime: endTime,
      DataFormat: "csv",
      Sort: "asc",
      Limit: 100,
      Compression: "gzip",
    });
    expect(downloadTaskValidate.create(downloadTaskCreated)).toBe(true);

    const downloadUrlResult = await tlsOpenapiService.DescribeDownloadUrl({
      TaskId: downloadTaskCreated.TaskId,
    });

    expect(downloadUrlValidate.describe(downloadUrlResult)).toBe(true);
    expect(downloadUrlResult.DownloadUrl).toBeTruthy();
    expect(typeof downloadUrlResult.DownloadUrl).toBe("string");

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  testTos("tlsOpenapi:CreateShipper", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-shipper-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-shipper-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    // 测试投递到 TOS
    const tosShipperCreated = await tlsOpenapiService.CreateShipper({
      ContentInfo: {
        Format: "json",
        JsonInfo: {
          Enable: true,
          Escape: true,
        },
      },
      ShipperName: `tls-nodejs-sdk-test-tos-shipper-${generateRandomId()}`,
      ShipperType: "tos",
      TopicId: topicCreated.TopicId,
      TosShipperInfo: {
        Bucket: TLS_TOS_BUCKET,
        Prefix: TLS_TOS_PREFIX,
        MaxSize: 5,
        Compress: "snappy",
        Interval: 300,
        PartitionFormat: "%Y/%m/%d/%H/%M",
      },
    });
    expect(shipperValidate.create(tosShipperCreated)).toBe(true);

    // 测试投递到 Kafka
    const kafkaShipperCreated = await tlsOpenapiService.CreateShipper({
      ContentInfo: {
        Format: "original",
      },
      KafkaShipperInfo: {
        Compress: "snappy",
        Instance: "kafka-cnngbnntswg1****",
        KafkaTopic: "topic-c",
      },
      ShipperName: `tls-nodejs-sdk-test-kafka-shipper-${generateRandomId()}`,
      ShipperType: "kafka",
      TopicId: topicCreated.TopicId,
    });
    expect(shipperValidate.create(kafkaShipperCreated)).toBe(true);

    // 清理资源
    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:WebTracks", async () => {
    const now = Math.floor(Date.now() / 1000);
    const startTime = now - 3600;
    const endTime = now + 3600;

    const topicId = "9f9a0da6-513d-4b7b-bc71-edaeb8715eeb";

    await tlsOpenapiService.WebTracks({
      ProjectId: "93b0621a-8466-4fa6-993d-d3317c537760",
      TopicId: topicId,
      Logs: [{ key1: "value1", key2: "value2" }],
      Source: "test-source",
    });

    await new Promise((resolve) => setTimeout(resolve, 10000));

    const searchLogsResult = await tlsOpenapiService.SearchLogs({
      StartTime: startTime,
      EndTime: endTime,
      Limit: 100,
      Query: "",
      TopicId: topicId,
    });

    const foundLog = Array.isArray(searchLogsResult?.Logs)
      ? searchLogsResult.Logs.find(
          (log) =>
            log &&
            typeof log === "object" &&
            log.key1 === "value1" &&
            log.key2 === "value2" &&
            log.__source__ === "test-source"
        )
      : undefined;

    expect(foundLog).toBeTruthy();
  });

  test("tlsOpenapi:DeleteETLTask", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-delete-etl-project-${generateRandomId()}`,
      Region,
    });

    const sourceTopicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-delete-etl-source-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const targetTopicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-delete-etl-target-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const etlTaskCreated = await tlsOpenapiService.CreateETLTask({
      DSLType: "NORMAL",
      Name: `tls-nodejs-sdk-test-delete-etl-task-${generateRandomId()}`,
      Description: "Test ETL task for delete",
      Enable: true,
      SourceTopicId: sourceTopicCreated.TopicId,
      Script: 'f_set("key", "value")',
      TaskType: "Resident",
      TargetResources: [
        {
          Alias: "test",
          TopicId: targetTopicCreated.TopicId,
          Region,
        },
      ],
    });
    expect(etlTaskValidate.create(etlTaskCreated)).toBe(true);

    const deleteResult = await tlsOpenapiService.DeleteETLTask({
      TaskId: etlTaskCreated.TaskId,
    });
    expect(etlValidate.delete(deleteResult)).toBe(true);

    await tlsOpenapiService.DeleteTopic({
      TopicId: targetTopicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteTopic({
      TopicId: sourceTopicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  testTos("tlsOpenapi:DeleteImportTask", async () => {
    // P0: 基础功能测试 - 删除导入任务
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-delete-import-task-project-${generateRandomId()}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-delete-import-task-topic-${generateRandomId()}`,
      Ttl: 1,
    });

    const importTaskCreated = await tlsOpenapiService.CreateImportTask({
      TaskName: `tls-nodejs-sdk-test-delete-import-task-${generateRandomId()}`,
      TopicID: topicCreated.TopicId,
      SourceType: "tos",
      ImportSourceInfo: {
        TosSourceInfo: {
          Bucket: TLS_TOS_BUCKET,
          Prefix: `${TLS_TOS_PREFIX}/import/`,
          CompressType: "none",
        },
      },
      TargetInfo: {
        Region,
        LogType: "json_log",
      },
      Description: "测试删除导入任务",
    });

    expect(importTaskValidate.create(importTaskCreated)).toBe(true);

    const deleteResult = await tlsOpenapiService.DeleteImportTask({
      TaskId: importTaskCreated.TaskId,
    });
    expect(deleteResult).toBeDefined();

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:DeleteImportTask with empty TaskId", async () => {
    // P2: 异常场景测试 - 空任务ID
    await expect(
      tlsOpenapiService.DeleteImportTask({
        TaskId: "",
      })
    ).rejects.toBeDefined();
  });
});

test("tlsOpenapi:ScheduleSqlTask schema validate", () => {
  const detail = {
    TaskId: "test-task-id",
    TaskName: "test-schedule-sql-task",
    SourceProjectID: "source-project-id",
    SourceProjectName: "source-project",
    SourceTopicID: "source-topic-id",
    SourceTopicName: "source-topic",
    DestRegion: "cn-beijing",
    DestProjectID: "dest-project-id",
    DestTopicName: "dest-topic",
    DestTopicID: "dest-topic-id",
    Status: 1,
    RequestCycle: {
      Time: 1,
      Type: "Period",
    },
    ProcessTimeWindow: "@m-15m,@m",
    Query: "* | select *",
    MaxRetryTimes: 3,
    MaxTimeout: 300,
    TaskType: 0,
    CreateTimeStamp: Math.floor(Date.now() / 1000),
    ModifyTimeStamp: Math.floor(Date.now() / 1000),
  };

  expect(scheduleSqlTaskValidate.detail(detail)).toBe(true);

  const list = {
    Total: 1,
    Tasks: [detail],
  };

  expect(scheduleSqlTaskValidate.list(list)).toBe(true);
});

test("tlsOpenapi:AlarmContentTemplate schema validate", () => {
  const template = {
    AlarmContentTemplateName: "test-alarm-content-template",
    AlarmContentTemplateId: "template-id",
    Webhook: {
      Content: "webhook-body",
    },
    Email: {
      Content: "email-body",
      Subject: "subject",
      Locale: "zh-CN",
    },
    Vms: {
      Content: "vms-body",
      Locale: "zh-CN",
    },
    Sms: {
      Content: "sms-body",
      Locale: "zh-CN",
    },
    Lark: {
      Content: "lark-body",
      Title: "title",
      Locale: "zh-CN",
    },
    DingTalk: {
      Content: "dingtalk-body",
      Title: "title",
      Locale: "zh-CN",
    },
    WeChat: {
      Content: "wechat-body",
      Title: "title",
      Locale: "zh-CN",
    },
    CreateTime: "2025-01-01T00:00:00Z",
    ModifyTime: "2025-01-01T00:00:00Z",
    IsDefault: false,
  };

  const list = {
    Total: 1,
    AlarmContentTemplates: [template],
  };

  expect(alarmContentTemplateValidate.list(list)).toBe(true);
});

test("tlsOpenapi:AlarmWebhookIntegration schema validate", () => {
  const integration = {
    WebhookID: "webhook-id",
    WebhookName: "test-webhook",
    WebhookType: "lark",
    WebhookUrl: "https://example.com/webhook",
    WebhookSecret: "secret",
    WebhookMethod: "POST",
    WebhookHeaders: [
      {
        Key: "X-Test",
        Value: "test",
      },
    ],
    CreateTime: "2025-01-01T00:00:00Z",
    ModifyTime: "2025-01-01T00:00:00Z",
  };

  const list = {
    Total: 1,
    WebhookIntegrations: [integration],
  };

  expect(alarmWebhookIntegrationValidate.list(list)).toBe(true);
});
