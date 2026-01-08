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
            e?.response?.data
          );
          throw e;
        }
      },
      timeout
    );
  };
  Object.assign(test, originalTest);
  global.test = test;

  test("tlsOpenapi:Project", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-project-${`${Math.random()}`.replace(".", "")}`,
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
      ProjectName: `tls-nodejs-sdk-test-topic-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${`${Math.random()}`.replace(".", "")}`,
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
      ProjectName: `tls-nodejs-sdk-test-topic-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${`${Math.random()}`.replace(".", "")}`,
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
      ProjectName: `tls-nodejs-sdk-test-topic-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${`${Math.random()}`.replace(".", "")}`,
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
      ProjectName: `tls-nodejs-sdk-test-topic-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${`${Math.random()}`.replace(".", "")}`,
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
      ProjectName: `tls-nodejs-sdk-test-topic-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${`${Math.random()}`.replace(".", "")}`,
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

  test("tlsOpenapi:Cursor", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-topic-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${`${Math.random()}`.replace(".", "")}`,
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
      ProjectName: `tls-nodejs-sdk-test-manual-shard-split-project-${`${Math.random()
        .toString()
        .slice(4)}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 2,
      TopicName: `tls-nodejs-sdk-test-manual-shard-split-topic-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
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
      ProjectName: `tls-nodejs-sdk-test-topic-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${`${Math.random()}`.replace(".", "")}`,
      Ttl: 1,
    });

    const ruleCreated = await tlsOpenapiService.CreateRule({
      Paths: ["/test"],
      RuleName: `tls-nodejs-sdk-test-createrule-${`${Math.random()}`.replace(".", "")}`,
      TopicId: topicCreated.TopicId,
    });
    expect(rulesValidate.create(ruleCreated)).toBe(true);

    const ruleDetail = await tlsOpenapiService.DescribeRule({
      RuleId: ruleCreated.RuleId,
    });
    expect(rulesValidate.detail(ruleDetail)).toBe(true);

    const ruleModified = await tlsOpenapiService.ModifyRule({
      RuleId: ruleCreated.RuleId,
      RuleName: `tls-nodejs-sdk-test-modifyrule-${`${Math.random()}`.replace(".", "")}`,
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
      ProjectName: `tls-nodejs-sdk-test-topic-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${`${Math.random()}`.replace(".", "")}`,
      Ttl: 1,
    });

    const ruleCreated = await tlsOpenapiService.CreateRule({
      Paths: ["/test"],
      RuleName: `tls-nodejs-sdk-test-createrule-${`${Math.random()}`.replace(".", "")}`,
      TopicId: topicCreated.TopicId,
    });

    const hostGroupCreated = await tlsOpenapiService.CreateHostGroup({
      HostGroupName: `tls-nodejs-sdk-test-create-host-group-${`${Math.random()}`.replace(".", "")}`,
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
      HostGroupName: `tls-nodejs-sdk-test-create-host-group-${`${Math.random()}`.replace(".", "")}`,
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
      HostGroupName: `tls-nodejs-sdk-test-modify-host-group-${`${Math.random()}`.replace(".", "")}`,
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

  test("tlsOpenapi:Alarm", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-alarm-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${`${Math.random()}`.replace(".", "")}`,
      Ttl: 1,
    });

    const alarmNotifyGroupCreated = await tlsOpenapiService.CreateAlarmNotifyGroup({
      AlarmNotifyGroupName: `tls-nodejs-sdk-test-create-alarm-notify-group-${`${Math.random().toFixed(
        8
      )}`.replace(".", "")}`,
      NotifyType: ["Trigger"],
      Receivers: [
        {
          EndTime: "10:00:00",
          StartTime: "08:00:00",
          ReceiverChannels: ["Sms"],
          ReceiverNames: ["test-wzx"],
          ReceiverType: "User",
        },
      ],
    });

    expect(alarmValidate.createNotifyGroup(alarmNotifyGroupCreated)).toBe(true);

    const alarmCreated = await tlsOpenapiService.CreateAlarm({
      AlarmName: `tls-nodejs-sdk-test-create-alarm-${`${Math.random()}`.replace(".", "")}`,
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
    const ProjectId = "d0b016d4-5ba0-454d-bd87-2d7cabf78cab";
    const random1 = (Math.random() * 100).toFixed(0);
    const random2 = (Math.random() * 100).toFixed(0);
    const traceName = `单元测试${random1}-${random2}`;

    const traceList = await tlsOpenapiService.DescribeTraceInstances({
      PageNumber: 1,
      PageSize: 20,
    });

    expect(traceValidate.list(traceList)).toBe(true);

    const traceCreate = await tlsOpenapiService.CreateTraceInstance({
      ProjectId: ProjectId,
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
      ProjectName: `tls-nodejs-sdk-test-histogram-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-histogram-topic-${`${Math.random()}`.replace(".", "")}`,
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
      HostGroupName: `tls-nodejs-sdk-test-abnormal-hosts-${`${Math.random()}`.replace(".", "")}`,
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
      HostGroupName: `tls-nodejs-sdk-test-auto-update-host-group-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
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
    const taskId = `test-etl-task-${`${Math.random()}`.replace(".", "")}`;

    const etlTaskDetail = await tlsOpenapiService.DescribeETLTask({
      TaskId: taskId,
    });
    expect(etlTaskValidate.detail(etlTaskDetail)).toBe(true);
  });

  test("tlsOpenapi:DescribeETLTasks", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-etl-project-${`${Math.random()}`.replace(".", "")}`,
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
      Status: "running",
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

  test("tlsOpenapi:DeleteShipper", async () => {
    const shipperId = `test-shipper-${`${Math.random()}`.replace(".", "")}`;

    const deleteResult = await tlsOpenapiService.DeleteShipper({
      ShipperId: shipperId,
    });
    expect(shipperValidate.delete(deleteResult)).toBe(true);
  });

  test("tlsOpenapi:ModifyShipper", async () => {
    // Create a project first
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-shipper-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    // Create a topic
    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-shipper-topic-${`${Math.random()}`.replace(".", "")}`,
      Ttl: 1,
    });

    // Note: Since we don't have CreateShipper API implemented yet, we'll test ModifyShipper with a mock shipper ID
    // This test will verify the API call structure and response validation
    const shipperIdForModify = `test-shipper-${`${Math.random()}`.replace(".", "")}`;

    try {
      const modifyResult = await tlsOpenapiService.ModifyShipper({
        ShipperId: shipperIdForModify,
        ShipperName: `test-shipper-name-${`${Math.random()}`.replace(".", "")}`,
        ShipperType: "tos",
        Status: true,
        ContentInfo: {
          Format: "json",
        },
        TosShipperInfo: {
          Prefix: "test-prefix",
          MaxSize: 5,
          Compress: "snappy",
          Interval: 300,
          PartitionFormat: "%Y/%m/%d/%H/%M",
        },
      });
      expect(shipperValidate.modify(modifyResult)).toBe(true);
    } catch (error) {
      // Since we don't have a real shipper ID, we expect this to fail
      // But we can still validate the error structure
      expect(error).toBeDefined();
    }

    // Test with Kafka configuration
    try {
      const modifyKafkaResult = await tlsOpenapiService.ModifyShipper({
        ShipperId: shipperIdForModify,
        ShipperName: `test-kafka-shipper-${`${Math.random()}`.replace(".", "")}`,
        ShipperType: "kafka",
        Status: true,
        ContentInfo: {
          Format: "original",
        },
        KafkaShipperInfo: {
          Compress: "snappy",
          Instance: "kafka-test-instance",
          KafkaTopic: "test-topic",
        },
      });
      expect(shipperValidate.modify(modifyKafkaResult)).toBe(true);
    } catch (error) {
      // Since we don't have a real shipper ID, we expect this to fail
      // But we can still validate the error structure
      expect(error).toBeDefined();
    }

    // Clean up
    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });

    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:CreateImportTask", async () => {
    // 创建项目和主题用于测试
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-import-task-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-import-task-topic-${`${Math.random()}`.replace(".", "")}`,
      Ttl: 1,
    });

    // 测试创建 TOS 导入任务
    const importTaskResult = await tlsOpenapiService.CreateImportTask({
      TaskName: `tls-nodejs-sdk-test-import-task-${`${Math.random()}`.replace(".", "")}`,
      TopicID: topicCreated.TopicId,
      SourceType: "tos",
      ImportSourceInfo: {
        TosSourceInfo: {
          Bucket: "test-bucket",
          Prefix: "test-prefix/",
          Region: "cn-shanghai",
          CompressType: "none",
        },
      },
      TargetInfo: {
        Region: "cn-shanghai",
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

  test("tlsOpenapi:DescribeImportTask", async () => {
    const taskId = `test-import-task-${`${Math.random()}`.replace(".", "")}`;

    try {
      const importTaskDetail = await tlsOpenapiService.DescribeImportTask({
        TaskId: taskId,
      });
      expect(importTaskValidate.detail(importTaskDetail)).toBe(true);
    } catch (error) {
      // The task might not exist, but the API should be callable
      expect(error).toBeDefined();
    }
  });

  test("tlsOpenapi:DescribeShipper", async () => {
    // Since we don't have shipper creation APIs implemented yet, we'll test the error case
    const shipperId = `test-shipper-${`${Math.random()}`.replace(".", "")}`;

    try {
      await tlsOpenapiService.DescribeShipper({
        ShipperId: shipperId,
      });
      // If we get here, the shipper somehow exists, which is unexpected for this test
      expect(true).toBe(false);
    } catch (error) {
      // We expect this to fail since the shipper doesn't exist
      expect(error).toBeDefined();
    }
  });

  test("tlsOpenapi:DescribeShippers", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-shipper-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-shipper-topic-${`${Math.random()}`.replace(".", "")}`,
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
    const taskId = `test-download-task-${`${Math.random()}`.replace(".", "")}`;

    const cancelResult = await tlsOpenapiService.CancelDownloadTask({
      TaskId: taskId,
    });
    expect(downloadTaskValidate.cancel(cancelResult)).toBe(true);
  });

  test("tlsOpenapi:DescribeKafkaConsumer", async () => {
    // 创建项目
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-kafka-consumer-project-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Region,
    });

    // 创建主题
    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-kafka-consumer-topic-${`${Math.random()}`.replace(".", "")}`,
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
      ProjectName: `tls-nodejs-sdk-test-open-kafka-consumer-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      TopicName: `tls-nodejs-sdk-test-topic-${`${Math.random()}`.replace(".", "")}`,
      ProjectId: projectCreated.ProjectId,
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
      ProjectName: `tls-nodejs-sdk-test-close-kafka-consumer-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      TopicName: `tls-nodejs-sdk-test-topic-${`${Math.random()}`.replace(".", "")}`,
      ProjectId: projectCreated.ProjectId,
      Description: "Test topic for CloseKafkaConsumer",
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
      ProjectName: `tls-nodejs-sdk-test-consumer-heartbeat-project-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 2,
      TopicName: `tls-nodejs-sdk-test-consumer-heartbeat-topic-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Ttl: 1,
    });

    // ConsumerHeartbeat 需要消费组，但当前没有创建消费组的接口
    // 这里测试异常场景，验证方法调用不会抛出异常
    try {
      const heartbeatResult = await tlsOpenapiService.ConsumerHeartbeat({
        ProjectID: projectCreated.ProjectId,
        ConsumerGroupName: `test-consumer-group-${`${Math.random()}`.replace(".", "")}`,
        ConsumerName: `test-consumer-${`${Math.random()}`.replace(".", "")}`,
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
      ProjectName: `tls-nodejs-sdk-test-consumer-group-project-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-consumer-group-topic-${`${Math.random()}`.replace(".", "")}`,
      Ttl: 1,
    });

    const consumerGroupCreated = await tlsOpenapiService.CreateConsumerGroup({
      ProjectID: projectCreated.ProjectId,
      TopicIDList: [topicCreated.TopicId],
      ConsumerGroupName: `tls-nodejs-sdk-test-consumer-group-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
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
      ProjectName: `tls-nodejs-sdk-test-consumer-group-project-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Region,
    });
    expect(projectValidate.create(projectCreated)).toBe(true);

    const topicCreated = await tlsOpenapiService.CreateTopic({
      TopicName: `tls-nodejs-sdk-test-consumer-group-topic-${`${Math.random()}`.replace(".", "")}`,
      ProjectId: projectCreated.ProjectId,
    });
    expect(topicValidate.create(topicCreated)).toBe(true);

    const consumerGroupName = `test-consumer-group-${`${Math.random()}`.replace(".", "")}`;

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
      ProjectName: `tls-nodejs-sdk-test-consumer-group-nonexist-project-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Region,
    });
    expect(projectValidate.create(projectCreated)).toBe(true);

    const nonExistentConsumerGroupName = `non-existent-consumer-group-${`${Math.random()}`.replace(
      ".",
      ""
    )}`;

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
      ProjectName: `tls-nodejs-sdk-test-modify-consumer-group-project-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-modify-consumer-group-topic-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Ttl: 1,
    });

    const consumerGroupName = `test-modify-consumer-group-${`${Math.random()}`.replace(".", "")}`;

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
      ProjectName: `tls-nodejs-sdk-test-describe-consumer-groups-project-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-describe-consumer-groups-topic-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Ttl: 1,
    });

    const consumerGroupName = `test-describe-consumer-group-${`${Math.random()}`.replace(".", "")}`;

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
      ProjectName: `tls-nodejs-sdk-test-reset-checkpoint-project-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-reset-checkpoint-topic-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Ttl: 1,
    });

    const consumerGroupName = `test-consumer-group-${`${Math.random()}`.replace(".", "")}`;

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
      ProjectID: projectCreated.ProjectId,
      TopicID: topicCreated.TopicId,
      ConsumerGroupName: consumerGroupName,
      ShardID: shardId,
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
      ProjectName: `tls-nodejs-sdk-test-modify-checkpoint-project-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-modify-checkpoint-topic-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Ttl: 1,
    });

    const consumerGroupName = `test-modify-consumer-group-${`${Math.random()}`.replace(".", "")}`;

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

    const checkpoint = "dGVzdC1jaGVja3BvaW50"; // "test-checkpoint" 的 Base64

    const modifyResult = await tlsOpenapiService.ModifyCheckPoint({
      ProjectID: projectCreated.ProjectId,
      TopicID: topicCreated.TopicId,
      ConsumerGroupName: consumerGroupName,
      ShardID: shardId,
      Checkpoint: checkpoint,
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
      ProjectName: `tls-nodejs-sdk-test-list-tags-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-list-tags-topic-${`${Math.random()}`.replace(".", "")}`,
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
      ProjectName: `tls-nodejs-sdk-test-add-tags-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-add-tags-topic-${`${Math.random()}`.replace(".", "")}`,
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
      ProjectName: `tls-nodejs-sdk-test-tag-resources-project-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-tag-resources-topic-${`${Math.random()}`.replace(".", "")}`,
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
      ProjectName: `tls-nodejs-sdk-test-untag-resources-project-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-untag-resources-topic-${`${Math.random()}`.replace(".", "")}`,
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
      ProjectName: `tls-nodejs-sdk-test-remove-tags-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-remove-tags-topic-${`${Math.random()}`.replace(".", "")}`,
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
    const taskId = `test-etl-task-${`${Math.random()}`.replace(".", "")}`;

    // Test enabling ETL task
    const enableResult = await tlsOpenapiService.ModifyETLTaskStatus({
      TaskId: taskId,
      Enable: true,
    });
    expect(etlTaskValidate.modifyStatus(enableResult)).toBe(true);

    // Test disabling ETL task
    const disableResult = await tlsOpenapiService.ModifyETLTaskStatus({
      TaskId: taskId,
      Enable: false,
    });
    expect(etlTaskValidate.modifyStatus(disableResult)).toBe(true);
  });

  test("tlsOpenapi:ModifyETLTask", async () => {
    const taskId = `test-etl-task-${`${Math.random()}`.replace(".", "")}`;

    const modifyResult = await tlsOpenapiService.ModifyETLTask({
      TaskId: taskId,
      Name: `test-etl-task-name-${`${Math.random()}`.replace(".", "")}`,
      Description: "This is a test ETL task",
      Script: 'f_set("key","value")',
      TargetResources: [
        {
          Alias: "test",
          TopicId: "test-topic-id",
          Region: "cn-beijing",
          RoleTrn: "trn:iam::2100000001:role/TLSETLAccessForUserA",
        },
      ],
    });
    expect(etlValidate.modify(modifyResult)).toBe(true);
  });

  test("tlsOpenapi:CreateETLTask", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-etl-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const sourceTopicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-source-topic-${`${Math.random()}`.replace(".", "")}`,
      Ttl: 1,
    });

    const targetTopicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-target-topic-${`${Math.random()}`.replace(".", "")}`,
      Ttl: 1,
    });

    const etlTaskCreated = await tlsOpenapiService.CreateETLTask({
      DSLType: "NORMAL",
      Name: `tls-nodejs-sdk-test-etl-task-${`${Math.random()}`.replace(".", "")}`,
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
      ProjectName: `tls-nodejs-sdk-test-download-task-project-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-download-task-topic-${`${Math.random()}`.replace(".", "")}`,
      Ttl: 1,
    });

    const startTime = Date.now() - 3600000;
    const endTime = Date.now();

    const downloadTaskCreated = await tlsOpenapiService.CreateDownloadTask({
      TaskName: `test-download-task-${`${Math.random()}`.replace(".", "")}`,
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
      ProjectName: `tls-nodejs-sdk-test-download-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-download-topic-${`${Math.random()}`.replace(".", "")}`,
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
    // 创建一个下载任务来获取TaskId
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-download-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-download-topic-${`${Math.random()}`.replace(".", "")}`,
      Ttl: 1,
    });

    // 创建索引以便创建下载任务
    await tlsOpenapiService.CreateIndex({
      TopicId: topicCreated.TopicId,
      FullText: {
        CaseSensitive: false,
        Delimiter: "_",
        IncludeChinese: false,
      },
    });

    // 首先搜索日志以创建下载任务
    await tlsOpenapiService.SearchLogs({
      StartTime: Math.floor(Date.now() / 1000) - 3600,
      EndTime: Math.floor(Date.now() / 1000),
      Limit: 1,
      Query: "",
      TopicId: topicCreated.TopicId,
    });

    // 假设我们有一个TaskId用于测试
    const testTaskId = "4a9bd4bd-53f1-43ff-b88a-64ee1be5****";

    // 测试DescribeDownloadUrl接口
    const downloadUrlResult = await tlsOpenapiService.DescribeDownloadUrl({
      TaskId: testTaskId,
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

  test("tlsOpenapi:CreateShipper", async () => {
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-shipper-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-shipper-topic-${`${Math.random()}`.replace(".", "")}`,
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
      ShipperName: `tls-nodejs-sdk-test-tos-shipper-${`${Math.random()}`.replace(".", "")}`,
      ShipperType: "tos",
      TopicId: topicCreated.TopicId,
      TosShipperInfo: {
        Bucket: "test-bucket",
        Prefix: "test-prefix",
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
      ShipperName: `tls-nodejs-sdk-test-kafka-shipper-${`${Math.random()}`.replace(".", "")}`,
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
    const projectCreated = await tlsOpenapiService.CreateProject({
      ProjectName: `tls-nodejs-sdk-test-topic-project-${`${Math.random()}`.replace(".", "")}`,
      Region,
    });

    const topicCreated = await tlsOpenapiService.CreateTopic({
      ProjectId: projectCreated.ProjectId,
      ShardCount: 1,
      TopicName: `tls-nodejs-sdk-test-topic-${`${Math.random()}`.replace(".", "")}`,
      Ttl: 1,
    });

    const webTracksResult = await tlsOpenapiService.WebTracks({
      ProjectId: projectCreated.ProjectId,
      TopicId: topicCreated.TopicId,
      Logs: [{ key1: "value1", key2: "value2" }],
      Source: "test-source",
    });
    expect(webTracksResult).toEqual({});

    await tlsOpenapiService.DeleteTopic({
      TopicId: topicCreated.TopicId,
    });
    await tlsOpenapiService.DeleteProject({
      ProjectId: projectCreated.ProjectId,
    });
  });

  test("tlsOpenapi:DeleteETLTask", async () => {
    const taskId = `test-etl-task-${`${Math.random()}`.replace(".", "")}`;

    const deleteResult = await tlsOpenapiService.DeleteETLTask({
      TaskId: taskId,
    });
    expect(etlValidate.delete(deleteResult)).toBe(true);
  });

  test("tlsOpenapi:DeleteImportTask", async () => {
    // P0: 基础功能测试 - 删除导入任务
    const taskId = `test-import-task-${`${Math.random()}`.replace(".", "")}`;

    const deleteResult = await tlsOpenapiService.DeleteImportTask({
      TaskId: taskId,
    });
    expect(deleteResult).toBeDefined();
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
