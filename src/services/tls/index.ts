import Base from "./service";
import { TlsServiceOptions } from "./types";

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

  DescribeProjects = this.createAPI("DescribeProjects", {
    method: "GET",
  });

  DescribeProject = this.createAPI("DescribeProject", {
    method: "GET",
  });

  CreateProject = this.createAPI("CreateProject", {
    method: "POST",
  });

  ModifyProject = this.createAPI("ModifyProject", {
    method: "PUT",
  });

  DeleteProject = this.createAPI("DeleteProject", {
    method: "DELETE",
  });

  // log topic related interface
  // 日志主题相关接口
  DescribeTopics = this.createAPI("DescribeTopics", {
    method: "GET",
  });

  DescribeTopic = this.createAPI("DescribeTopic", {
    method: "GET",
  });

  CreateTopic = this.createAPI("CreateTopic", {
    method: "POST",
  });

  ModifyTopic = this.createAPI("ModifyTopic", {
    method: "PUT",
  });

  DeleteTopic = this.createAPI("DeleteTopic", {
    method: "DELETE",
  });

  // index related interface
  // 索引相关接口
  DescribeIndex = this.createAPI("DescribeIndex", {
    method: "GET",
  });

  CreateIndex = this.createAPI("CreateIndex", {
    method: "POST",
  });

  ModifyIndex = this.createAPI("ModifyIndex", {
    method: "PUT",
  });

  DeleteIndex = this.createAPI("DeleteIndex", {
    method: "DELETE",
  });

  // topic partition related interface
  // 主题分区相关接口
  DescribeShards = this.createAPI("DescribeShards", {
    method: "GET",
  });

  // collection and configuration related interfaces
  // 采集配置相关接口
  CreateRule = this.createAPI("CreateRule", {
    method: "POST",
  });

  DeleteRule = this.createAPI("DeleteRule", {
    method: "DELETE",
  });

  ModifyRule = this.createAPI("ModifyRule", {
    method: "PUT",
  });

  DescribeRule = this.createAPI("DescribeRule", {
    method: "GET",
  });

  DescribeRules = this.createAPI("DescribeRules", {
    method: "GET",
  });

  // collect and configure binding/unbinding host groups
  // 采集配置绑定/解绑机器组
  ApplyRuleToHostGroups = this.createAPI("ApplyRuleToHostGroups", {
    method: "PUT",
  });

  DeleteRuleFromHostGroups = this.createAPI("DeleteRuleFromHostGroups", {
    method: "DELETE",
  });

  // host group
  // 机器组
  CreateHostGroup = this.createAPI("CreateHostGroup", {
    method: "POST",
  });

  DeleteHostGroup = this.createAPI("DeleteHostGroup", {
    method: "DELETE",
  });

  ModifyHostGroup = this.createAPI("ModifyHostGroup", {
    method: "PUT",
  });

  DescribeHostGroup = this.createAPI("DescribeHostGroup", {
    method: "GET",
  });

  DescribeHostGroups = this.createAPI("DescribeHostGroups", {
    method: "GET",
  });

  DescribeHosts = this.createAPI("DescribeHosts", {
    method: "GET",
  });

  DeleteHost = this.createAPI("DeleteHost", {
    method: "DELETE",
  });

  DescribeHostGroupRules = this.createAPI("DescribeHostGroupRules", {
    method: "GET",
  });

  // alarm
  // 告警
  CreateAlarm = this.createAPI("CreateAlarm", {
    method: "POST",
  });

  DeleteAlarm = this.createAPI("DeleteAlarm", {
    method: "DELETE",
  });

  DescribeAlarms = this.createAPI("DescribeAlarms", {
    method: "GET",
  });

  ModifyAlarm = this.createAPI("ModifyAlarm", {
    method: "PUT",
  });

  CreateAlarmNotifyGroup = this.createAPI("CreateAlarmNotifyGroup", {
    method: "POST",
  });

  DeleteAlarmNotifyGroup = this.createAPI("DeleteAlarmNotifyGroup", {
    method: "DELETE",
  });

  ModifyAlarmNotifyGroup = this.createAPI("ModifyAlarmNotifyGroup", {
    method: "PUT",
  });

  DescribeAlarmNotifyGroups = this.createAPI("DescribeAlarmNotifyGroups", {
    method: "GET",
  });

  PutLogs = this.createPutLogsAPI("PutLogs");

  SearchLogs = this.createAPI("SearchLogs", {
    method: "POST",
  });
}
export const defaultService = new TlsService();
