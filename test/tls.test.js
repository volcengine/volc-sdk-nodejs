import { tlsOpenapi } from "../lib";
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
  indexValidate,
  logsValidate,
  logContextValidate,
  histogramV1Validate,
  projectValidate,
  ruleHostGroupValidate,
  rulesValidate,
  shardsValidate,
  topicValidate,
  traceValidate,
  downloadUrlValidate,
} from "./schema/tls";

const tlsOpenapiService = tlsOpenapi.defaultService;

process.env.TLS_HOST && tlsOpenapiService.setHost(process.env.TLS_HOST);

const Region = process.env.Region;
//
//process.env.VOLC_ACCESSKEY && tlsOpenapiService.setAccessKeyId(process.env.VOLC_ACCESSKEY);
//process.env.VOLC_SECRETKEY && tlsOpenapiService.setSecretKey(process.env.VOLC_SECRETKEY);

const commonQuery = {
  PageNumber: 1,
  PageSize: 10,
};

describe("tlsOpenapi test", () => {
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

    // 搜索日志需要先创建主题索引
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

    // Test DescribeLogContext - we need to get a valid ContextFlow and PackageOffset from SearchLogs result
    if (searchLogsResult.Logs && searchLogsResult.Logs.length > 0) {
      const firstLog = searchLogsResult.Logs[0];
      // Extract ContextFlow and PackageOffset from the log data
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

    // 测试 ConsumeLogs 接口
    const shardsList = await tlsOpenapiService.DescribeShards({
      TopicId: topicCreated.TopicId,
      PageNumber: 1,
      PageSize: 20,
    });
    expect(shardsList.Shards.length).toBeGreaterThan(0);

    const shardId = shardsList.Shards[0].ShardId;

    // 消费日志
    const consumeLogsResult = await tlsOpenapiService.ConsumeLogs(
      {
        Cursor: "begin", // 从开始位置消费
        LogGroupCount: 10,
      },
      {
        params: {
          TopicId: topicCreated.TopicId,
          ShardId: shardId,
        },
      }
    );
    expect(logsValidate.consume(consumeLogsResult)).toBe(true);

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
      ProjectName: `tls-nodejs-sdk-test-manual-shard-split-project-${`${Math.random()}`.replace(
        ".",
        ""
      )}`,
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

    const now = Date.now();
    const startTime = now - 3600 * 1000; // 1小时前
    const endTime = now;

    const histogramResult = await tlsOpenapiService.DescribeHistogramV1({
      TopicId: topicCreated.TopicId,
      Query: "error",
      StartTime: startTime,
      EndTime: endTime,
      Interval: 60000, // 1分钟间隔
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

  test("tlsOpenapi:CancelDownloadTask", async () => {
    const taskId = `test-download-task-${`${Math.random()}`.replace(".", "")}`;

    const cancelResult = await tlsOpenapiService.CancelDownloadTask({
      TaskId: taskId,
    });
    expect(downloadTaskValidate.cancel(cancelResult)).toBe(true);
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
});
