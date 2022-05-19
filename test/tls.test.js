import { tlsOpenapi } from "../lib";
import {
  alarmValidate,
  hostGroupValidate,
  indexValidate,
  logsValidate,
  projectValidate,
  ruleHostGroupValidate,
  rulesValidate,
  shardsValidate,
  topicValidate,
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
});
