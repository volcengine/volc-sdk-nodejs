import { defaultService, TlsService } from "../../../lib/services/tls";

const { tlsOpenapi } = require("@volcengine/openapi");
export async function main(AccessKeyId, SecretKey, SessionToken) {
  const tlsOpenapiService = tlsOpenapi.defaultService;
  const TlsService = tlsOpenapi.TlsService;
  // tls的openApi需要设置host
  tlsOpenapiService.setHost("your host");
  // 指定host对应的region，如不设置默认region为 cn-north-1
  tlsOpenapiService.setRegion("your region");
  // 设置aksk
  tlsOpenapiService.setSecretKey(SecretKey);
  tlsOpenapiService.setAccessKeyId(AccessKeyId);
  // 设置协议版本，如不设置则默认是https
  tlsOpenapiService.setProtocol("http:");
  // 设置openApi版本，如不设置默认为0.2.0
  tlsOpenapiService.setVersion("0.2.0");

  if (SessionToken) {
    // 使用sts请求时 设置SessionToken
    tlsOpenapiService.setSessionToken(SessionToken);
  }

  // 获取项目列表
  tlsOpenapiService.DescribeProjects({
    PageNumber: 0,
    PageSize: 10,
    ProjectName: "项目名称",
    ProjectId: "项目ID",
  });

  // 获取项目详情
  tlsOpenapiService.DescribeProject({
    ProjectId: "项目ID",
  });

  // 创建项目
  tlsOpenapiService.CreateProject({
    Description: "描述",
    ProjectName: "项目名称",
    Region: "地域",
  });

  // 修改项目
  tlsOpenapiService.ModifyProject({
    Description: "描述",
    ProjectId: "项目ID",
    ProjectName: "项目名称",
  });

  // 删除项目
  tlsOpenapiService.DeleteProject({
    ProjectId: "项目ID",
  });

  // 获取日志主题列表
  tlsOpenapiService.DescribeTopics({
    PageNumber: 0,
    PageSize: 10,
    TopicName: "主题名称",
    TopicId: "主题ID",
    ProjectId: "项目ID",
  });

  // 获取日志主题详情
  tlsOpenapiService.DescribeTopic({
    TopicId: "主题ID",
  });

  // 创建日志主题
  tlsOpenapiService.CreateTopic({
    Description: "描述",
    ProjectId: "项目ID",
    ShardCount: "日志分区个数",
    TopicName: "主题名称",
    Ttl: 1, // 数据保存时间，单位天
  });

  // 修改日志主题
  tlsOpenapiService.ModifyTopic({
    Description: "描述",
    TopicId: "主题ID",
    TopicName: "主题名称",
    Ttl: 1,
  });

  // 删除日志主题
  tlsOpenapiService.DeleteTopic({
    TopicId: "主题ID",
  });

  // 获取主题索引
  tlsOpenapiService.DescribeIndex({
    TopicId: "主题ID",
  });

  // 创建主题索引
  tlsOpenapiService.CreateIndex({
    FullText,
    KeyValue,
    TopicId: "主题ID",
  });

  // 修改主题索引
  tlsOpenapiService.ModifyIndex({
    FullText,
    KeyValue,
    TopicId: "主题ID",
  });

  // 删除主题索引
  tlsOpenapiService.DeleteIndex({
    TopicId: "主题ID",
  });

  // 获取主题分区列表
  tlsOpenapiService.DescribeShards({
    TopicId: "主题ID",
    PageNumber: 0,
    PageSize: 10,
  });

  // 创建采集配置
  tlsOpenapiService.CreateRule({
    ContainerRule,
    ExcludePaths,
    ExtractRule,
    InputType,
    LogSample,
  });

  // 删除采集配置
  tlsOpenapiService.DeleteRule({
    RuleId: "规则ID",
  });

  // 修改采集配置
  tlsOpenapiService.ModifyRule({});

  // 获取采集配置
  tlsOpenapiService.DescribeRule({
    RuleId: "规则ID",
  });

  // 获取采集配置列表
  tlsOpenapiService.DescribeRules({
    ProjectId: "项目ID",
    RuleId: "规则ID",
    RuleName: "规则名称",
    TopicId: "主题ID",
    TopicName: "主题名",
    PageNumber: 0,
    PageSize: 10,
  });

  // 采集配置绑定机器组
  tlsOpenapiService.ApplyRuleToHostGroups({
    HostGroupIds: ["机器组ID"],
    RuleId: "采集配置ID",
  });

  // 采集配置解绑机器组
  tlsOpenapiService.DeleteRuleFromHostGroups({
    HostGroupIds: ["机器组ID"],
    RuleId: "采集配置ID",
  });

  // 创建机器组
  tlsOpenapiService.CreateHostGroup({
    AutoUpdate: true,
    HostGroupName: "机器组名称",
    HostGroupType: "机器组类型",
    HostIdentifier: "机器组标识",
    HostIpList: ["机器IP"],
    UpdateEndTime: "自动升级结束时间",
    UpdateStartTime: "自动升级开始时间",
  });

  // 删除机器组
  tlsOpenapiService.DeleteHostGroup({
    HostGroupId: "机器组ID",
  });

  // 修改机器组
  tlsOpenapiService.ModifyHostGroup({
    AutoUpdate: true,
    HostGroupName: "机器组名称",
    HostGroupType: "机器组类型",
    HostIdentifier: "机器组标识",
    HostIpList: ["机器IP"],
    UpdateEndTime: "自动升级结束时间",
    UpdateStartTime: "自动升级开始时间",
  });

  // 获取机器组信息
  tlsOpenapiService.DescribeHostGroup({
    HostGroupId: "机器组ID",
  });

  // 获取机器组列表
  tlsOpenapiService.DescribeHostGroups({
    HostGroupId: "机器组ID",
    HostGroupName: "机器组名称",
    AutoUpdate: true,
    PageNumber: 0,
    PageSize: 10,
  });

  // 获取机器列表
  tlsOpenapiService.DescribeHosts({
    HostGroupId: "机器组ID",
    Ip: "机器IP",
    HeartbeatStatus: 0,
    PageNumber: 1,
    PageSize: 10,
  });

  // 删除机器
  tlsOpenapiService.DeleteHost({
    HostGroupId: "机器组ID",
    Ip: "机器IP",
  });

  // 获取机器组采集配置列表
  tlsOpenapiService.DescribeHostGroupRules({
    HostGroupId: "机器组ID",
    PageNumber: 1,
    PageSize: 10,
  });

  // 创建告警策略
  tlsOpenapiService.CreateAlarm(data);

  // 删除告警策略
  tlsOpenapiService.DeleteAlarm({
    AlarmId: "告警策略ID",
  });

  // 获取告警策略列表
  tlsOpenapiService.DescribeAlarms(data);

  // 修改告警策略
  tlsOpenapiService.ModifyAlarm(data);

  // 创建告警通知组
  tlsOpenapiService.CreateAlarmNotifyGroup(data);

  // 删除告警通知组
  tlsOpenapiService.DeleteAlarmNotifyGroup({
    AlarmNotifyGroupId: "告警通知组ID",
  });

  // 修改告警通知组
  tlsOpenapiService.ModifyAlarmNotifyGroup(data);

  // 获取告警通知组列表
  tlsOpenapiService.DescribeAlarmNotifyGroups({
    AlarmNotifyGroupName: "告警通知组名称",
    AlarmNotifyGroupId: "告警通知组Id",
    ReceiverName: "接收用户名",
    PageNumber: 1,
    PageSize: 10,
  });

  // 搜索日志
  tlsOpenapiService.SearchLogs(data);

  // 上传日志
  // 如果是上传的json对象，则需要调用 TlsService.objToProtoBuffer换成buffer
  (async () => {
    const LogGroupList = await TlsService.objToProtoBuffer({
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
    defaultService.PutLogs({
      LogGroupList,
      CompressType: "lz4",
      TopicId: "your topicId",
    });
  })();
}
