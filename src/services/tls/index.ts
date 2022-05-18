import Base from "./service";
import {
  IAlarmNoticeGroupCreateReq,
  IAlarmNoticeGroupCreateResp,
  IAlarmNoticeGroupDeleteReq,
  IAlarmNoticeGroupDeleteResp,
  IAlarmNoticeGroupDescribeResp,
  IAlarmNoticeGroupModifyReq,
  IAlarmNoticeGroupModifyResp,
  IAlarmPolicyCreateReq,
  IAlarmPolicyCreateResp,
  IAlarmPolicyDeleteReq,
  IAlarmPolicyDeleteResp,
  IAlarmPolicyDescribeResp,
  IAlarmPolicyModifyReq,
  IAlarmPolicyModifyResp,
  IDescribeAlarmsReq,
  IDescribeHostGroupReq,
  IDescribeHostGroupRulesReq,
  IDescribeHostGroupsReq,
  IDescribeHostsReq,
  IDescribeIndexReq,
  IDescribeNotifyGroupReq,
  IDescribeProjectReq,
  IDescribeProjectsReq,
  IDescribeRuleReq,
  IDescribeRulesReq,
  IDescribeShardsReq,
  IDescribeTopicReq,
  IDescribeTopicsReq,
  IEsclientResult,
  IHostDeleteReq,
  IHostDeleteResp,
  IHostDescribeAllResp,
  IHostGroupCreateReq,
  IHostGroupCreateResp,
  IHostGroupDeleteReq,
  IHostGroupDeleteResp,
  IHostGroupDescribeAllResp,
  IHostGroupDescribeHostGroupRulesResp,
  IHostGroupDescribeResp,
  IHostGroupModifyReq,
  IHostGroupModifyResp,
  IIndexCreateReq,
  IIndexCreateResp,
  IIndexDeleteReq,
  IIndexDeleteResp,
  IIndexDescribeIndexResp,
  IIndexModifyReq,
  IIndexModifyResp,
  IIndexSearchLogsReq,
  IProjectCreateReq,
  IProjectCreateResp,
  IProjectDeleteReq,
  IProjectDeleteResp,
  IProjectDescribeProjectsResp,
  IProjectDescribeResp,
  IProjectModifyReq,
  IProjectModifyResp,
  IRuleBindRuleReq,
  IRuleBindRuleResp,
  IRuleCreateReq,
  IRuleCreateResp,
  IRuleDeleteReq,
  IRuleDeleteResp,
  IRuleDescribeAllResp,
  IRuleDescribeResp,
  IRuleModifyReq,
  IRuleModifyResp,
  IRuleUnbindRuleReq,
  IRuleUnbindRuleResp,
  IShardDescribeShardsResp,
  ITopicCreateReq,
  ITopicCreateResp,
  ITopicDeleteReq,
  ITopicDeleteResp,
  ITopicDescribeResp,
  ITopicDescribeTopicsResp,
  ITopicModifyReq,
  ITopicModifyResp,
  TlsServiceOptions,
} from "./types";

const SERVICE = "TLS";
// const REGION = "cn-beijing";
const VERSION = "0.2.0";
const PROTOCOL = "https:";

export class TlsService extends Base {
  constructor(options?: TlsServiceOptions) {
    super({
      version: VERSION,
      serviceName: SERVICE,
      protocol: PROTOCOL,
      // region: REGION,
      ...options,
    });
  }

  DescribeProjects = this.createAPI<IDescribeProjectsReq, IProjectDescribeProjectsResp>(
    "DescribeProjects",
    {
      method: "GET",
    }
  );

  DescribeProject = this.createAPI<IDescribeProjectReq, IProjectDescribeResp>("DescribeProject", {
    method: "GET",
  });

  CreateProject = this.createAPI<IProjectCreateReq, IProjectCreateResp>("CreateProject", {
    method: "POST",
  });

  ModifyProject = this.createAPI<IProjectModifyReq, IProjectModifyResp>("ModifyProject", {
    method: "PUT",
  });

  DeleteProject = this.createAPI<IProjectDeleteReq, IProjectDeleteResp>("DeleteProject", {
    method: "DELETE",
  });

  // log topic related interface
  // 日志主题相关接口
  DescribeTopics = this.createAPI<IDescribeTopicsReq, ITopicDescribeTopicsResp>("DescribeTopics", {
    method: "GET",
  });

  DescribeTopic = this.createAPI<IDescribeTopicReq, ITopicDescribeResp>("DescribeTopic", {
    method: "GET",
  });

  CreateTopic = this.createAPI<ITopicCreateReq, ITopicCreateResp>("CreateTopic", {
    method: "POST",
  });

  ModifyTopic = this.createAPI<ITopicModifyReq, ITopicModifyResp>("ModifyTopic", {
    method: "PUT",
  });

  DeleteTopic = this.createAPI<ITopicDeleteReq, ITopicDeleteResp>("DeleteTopic", {
    method: "DELETE",
  });

  // index related interface
  // 索引相关接口
  DescribeIndex = this.createAPI<IDescribeIndexReq, IIndexDescribeIndexResp>("DescribeIndex", {
    method: "GET",
  });

  CreateIndex = this.createAPI<IIndexCreateReq, IIndexCreateResp>("CreateIndex", {
    method: "POST",
  });

  ModifyIndex = this.createAPI<IIndexModifyReq, IIndexModifyResp>("ModifyIndex", {
    method: "PUT",
  });

  DeleteIndex = this.createAPI<IIndexDeleteReq, IIndexDeleteResp>("DeleteIndex", {
    method: "DELETE",
  });

  // topic partition related interface
  // 主题分区相关接口
  DescribeShards = this.createAPI<IDescribeShardsReq, IShardDescribeShardsResp>("DescribeShards", {
    method: "GET",
  });

  // collection and configuration related interfaces
  // 采集配置相关接口
  CreateRule = this.createAPI<IRuleCreateReq, IRuleCreateResp>("CreateRule", {
    method: "POST",
  });

  DeleteRule = this.createAPI<IRuleDeleteReq, IRuleDeleteResp>("DeleteRule", {
    method: "DELETE",
  });

  ModifyRule = this.createAPI<IRuleModifyReq, IRuleModifyResp>("ModifyRule", {
    method: "PUT",
  });

  DescribeRule = this.createAPI<IDescribeRuleReq, IRuleDescribeResp>("DescribeRule", {
    method: "GET",
  });

  DescribeRules = this.createAPI<IDescribeRulesReq, IRuleDescribeAllResp>("DescribeRules", {
    method: "GET",
  });

  // collect and configure binding/unbinding host groups
  // 采集配置绑定/解绑机器组
  ApplyRuleToHostGroups = this.createAPI<IRuleBindRuleReq, IRuleBindRuleResp>(
    "ApplyRuleToHostGroups",
    {
      method: "PUT",
    }
  );

  DeleteRuleFromHostGroups = this.createAPI<IRuleUnbindRuleReq, IRuleUnbindRuleResp>(
    "DeleteRuleFromHostGroups",
    {
      method: "PUT",
    }
  );

  // host group
  // 机器组
  CreateHostGroup = this.createAPI<IHostGroupCreateReq, IHostGroupCreateResp>("CreateHostGroup", {
    method: "POST",
  });

  DeleteHostGroup = this.createAPI<IHostGroupDeleteReq, IHostGroupDeleteResp>("DeleteHostGroup", {
    method: "DELETE",
  });

  ModifyHostGroup = this.createAPI<IHostGroupModifyReq, IHostGroupModifyResp>("ModifyHostGroup", {
    method: "PUT",
  });

  DescribeHostGroup = this.createAPI<IDescribeHostGroupReq, IHostGroupDescribeResp>(
    "DescribeHostGroup",
    {
      method: "GET",
    }
  );

  DescribeHostGroups = this.createAPI<IDescribeHostGroupsReq, IHostGroupDescribeAllResp>(
    "DescribeHostGroups",
    {
      method: "GET",
    }
  );

  DescribeHosts = this.createAPI<IDescribeHostsReq, IHostDescribeAllResp>("DescribeHosts", {
    method: "GET",
  });

  DeleteHost = this.createAPI<IHostDeleteReq, IHostDeleteResp>("DeleteHost", {
    method: "DELETE",
  });

  DescribeHostGroupRules = this.createAPI<
    IDescribeHostGroupRulesReq,
    IHostGroupDescribeHostGroupRulesResp
  >("DescribeHostGroupRules", {
    method: "GET",
  });

  // alarm
  // 告警
  CreateAlarm = this.createAPI<IAlarmPolicyCreateReq, IAlarmPolicyCreateResp>("CreateAlarm", {
    method: "POST",
  });

  DeleteAlarm = this.createAPI<IAlarmPolicyDeleteReq, IAlarmPolicyDeleteResp>("DeleteAlarm", {
    method: "DELETE",
  });

  DescribeAlarms = this.createAPI<IDescribeAlarmsReq, IAlarmPolicyDescribeResp>("DescribeAlarms", {
    method: "GET",
  });

  ModifyAlarm = this.createAPI<IAlarmPolicyModifyReq, IAlarmPolicyModifyResp>("ModifyAlarm", {
    method: "PUT",
  });

  CreateAlarmNotifyGroup = this.createAPI<IAlarmNoticeGroupCreateReq, IAlarmNoticeGroupCreateResp>(
    "CreateAlarmNotifyGroup",
    {
      method: "POST",
    }
  );

  DeleteAlarmNotifyGroup = this.createAPI<IAlarmNoticeGroupDeleteReq, IAlarmNoticeGroupDeleteResp>(
    "DeleteAlarmNotifyGroup",
    {
      method: "DELETE",
    }
  );

  ModifyAlarmNotifyGroup = this.createAPI<IAlarmNoticeGroupModifyReq, IAlarmNoticeGroupModifyResp>(
    "ModifyAlarmNotifyGroup",
    {
      method: "PUT",
    }
  );

  DescribeAlarmNotifyGroups = this.createAPI<
    IDescribeNotifyGroupReq,
    IAlarmNoticeGroupDescribeResp
  >("DescribeAlarmNotifyGroups", {
    method: "GET",
  });

  PutLogs = this.createPutLogsAPI("PutLogs");

  SearchLogs = this.createAPI<IIndexSearchLogsReq, IEsclientResult>("SearchLogs", {
    method: "POST",
  });
}
export const defaultService = new TlsService();
