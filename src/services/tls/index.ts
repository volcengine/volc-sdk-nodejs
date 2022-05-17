import Base from "./service";
import {
  IAlarm_notice_groupCreateReq,
  IAlarm_notice_groupCreateResp,
  IAlarm_notice_groupDeleteReq,
  IAlarm_notice_groupDeleteResp,
  IAlarm_notice_groupDescribeResp,
  IAlarm_notice_groupModifyReq,
  IAlarm_notice_groupModifyResp,
  IAlarm_policyCreateReq,
  IAlarm_policyCreateResp,
  IAlarm_policyDeleteReq,
  IAlarm_policyDeleteResp,
  IAlarm_policyDescribeResp,
  IAlarm_policyModifyReq,
  IAlarm_policyModifyResp,
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
  IHost_groupCreateReq,
  IHost_groupCreateResp,
  IHost_groupDeleteReq,
  IHost_groupDeleteResp,
  IHost_groupDescribeAllResp,
  IHost_groupDescribeHostGroupRulesResp,
  IHost_groupDescribeResp,
  IHost_groupModifyReq,
  IHost_groupModifyResp,
  IHostDeleteReq,
  IHostDeleteResp,
  IHostDescribeAllResp,
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
  CreateHostGroup = this.createAPI<IHost_groupCreateReq, IHost_groupCreateResp>("CreateHostGroup", {
    method: "POST",
  });

  DeleteHostGroup = this.createAPI<IHost_groupDeleteReq, IHost_groupDeleteResp>("DeleteHostGroup", {
    method: "DELETE",
  });

  ModifyHostGroup = this.createAPI<IHost_groupModifyReq, IHost_groupModifyResp>("ModifyHostGroup", {
    method: "PUT",
  });

  DescribeHostGroup = this.createAPI<IDescribeHostGroupReq, IHost_groupDescribeResp>(
    "DescribeHostGroup",
    {
      method: "GET",
    }
  );

  DescribeHostGroups = this.createAPI<IDescribeHostGroupsReq, IHost_groupDescribeAllResp>(
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
    IHost_groupDescribeHostGroupRulesResp
  >("DescribeHostGroupRules", {
    method: "GET",
  });

  // alarm
  // 告警
  CreateAlarm = this.createAPI<IAlarm_policyCreateReq, IAlarm_policyCreateResp>("CreateAlarm", {
    method: "POST",
  });

  DeleteAlarm = this.createAPI<IAlarm_policyDeleteReq, IAlarm_policyDeleteResp>("DeleteAlarm", {
    method: "DELETE",
  });

  DescribeAlarms = this.createAPI<IDescribeAlarmsReq, IAlarm_policyDescribeResp>("DescribeAlarms", {
    method: "GET",
  });

  ModifyAlarm = this.createAPI<IAlarm_policyModifyReq, IAlarm_policyModifyResp>("ModifyAlarm", {
    method: "PUT",
  });

  CreateAlarmNotifyGroup = this.createAPI<
    IAlarm_notice_groupCreateReq,
    IAlarm_notice_groupCreateResp
  >("CreateAlarmNotifyGroup", {
    method: "POST",
  });

  DeleteAlarmNotifyGroup = this.createAPI<
    IAlarm_notice_groupDeleteReq,
    IAlarm_notice_groupDeleteResp
  >("DeleteAlarmNotifyGroup", {
    method: "DELETE",
  });

  ModifyAlarmNotifyGroup = this.createAPI<
    IAlarm_notice_groupModifyReq,
    IAlarm_notice_groupModifyResp
  >("ModifyAlarmNotifyGroup", {
    method: "PUT",
  });

  DescribeAlarmNotifyGroups = this.createAPI<
    IDescribeNotifyGroupReq,
    IAlarm_notice_groupDescribeResp
  >("DescribeAlarmNotifyGroups", {
    method: "GET",
  });

  PutLogs = this.createPutLogsAPI("PutLogs");

  SearchLogs = this.createAPI<IIndexSearchLogsReq, IEsclientResult>("SearchLogs", {
    method: "POST",
  });
}
export const defaultService = new TlsService();
