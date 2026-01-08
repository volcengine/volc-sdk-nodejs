import Base from "./service";
import type {
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
  IDescribeCursorReq,
  IDescribeCursorResp,
  IDescribeShipperReq,
  IDescribeShipperResp,
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
  IManualShardSplitReq,
  IManualShardSplitResp,
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
  IDescribeTraceInstanceReq,
  ITraceInsDescribeResp,
  IDescribeTraceInstancesReq,
  ITraceInsDescribeTraceInstancesResp,
  IDescribeTraceReq,
  IDescribeTraceResp,
  ISearchTracesReq,
  ISearchTracesResp,
  ITraceInsCreateResp,
  ITraceInsDeleteResp,
  ITraceInsModifyResp,
  TlsServiceOptions,
  ITraceInsCreateReq,
  ITraceInsModifyReq,
  ITraceInsDeleteReq,
  IDeleteAbnormalHostsReq,
  IDeleteAbnormalHostsResp,
  IModifyHostGroupsAutoUpdateReq,
  IModifyHostGroupsAutoUpdateResp,
  ICancelDownloadTaskReq,
  ICancelDownloadTaskResp,
  ICreateConsumerGroupReq,
  ICreateConsumerGroupResp,
  IDescribeConsumerGroupsReq,
  IDescribeConsumerGroupsResp,
  IModifyConsumerGroupReq,
  IModifyConsumerGroupResp,
  IConsumerHeartbeatReq,
  IConsumerHeartbeatResp,
  ICloseKafkaConsumerReq,
  ICloseKafkaConsumerResp,
  IOpenKafkaConsumerReq,
  IOpenKafkaConsumerResp,
  IDescribeKafkaConsumerReq,
  IDescribeKafkaConsumerResp,
  IGetAccountStatusReq,
  IGetAccountStatusResp,
  IActiveTlsAccountReq,
  IActiveTlsAccountResp,
  IModifyETLTaskStatusReq,
  IModifyETLTaskStatusResp,
  IWebTracksReq,
  IWebTracksResp,
  IDownloadTaskCreateReq,
  IDownloadTaskCreateResp,
  IDescribeDownloadTasksReq,
  IDownloadTaskDescribeDownloadTasksResp,
  IDescribeDownloadUrlReq,
  IDescribeDownloadUrlResp,
  IDeleteETLTaskReq,
  IDeleteETLTaskResp,
  IDescribeETLTaskReq,
  IDescribeETLTaskResp,
  IDescribeETLTasksReq,
  IDescribeETLTasksResp,
  IModifyETLTaskReq,
  IModifyETLTaskResp,
  ICreateETLTaskReq,
  ICreateETLTaskResp,
  IDeleteImportTaskReq,
  IDeleteImportTaskResp,
  ICreateImportTaskReq,
  ICreateImportTaskResp,
  IDescribeImportTaskReq,
  IDescribeImportTaskResp,
  IDeleteShipperReq,
  IDeleteShipperResp,
  IModifyShipperReq,
  IModifyShipperResp,
  ICreateShipperReq,
  ICreateShipperResp,
  IDescribeShippersReq,
  IDescribeShippersResp,
  ICreateScheduleSqlTaskReq,
  ICreateScheduleSqlTaskResp,
  IDeleteScheduleSqlTaskReq,
  IDeleteScheduleSqlTaskResp,
  IDescribeScheduleSqlTaskReq,
  IDescribeScheduleSqlTaskResp,
  IDescribeScheduleSqlTasksReq,
  IDescribeScheduleSqlTasksResp,
  IModifyScheduleSqlTaskReq,
  IModifyScheduleSqlTaskResp,
  ICreateAlarmContentTemplateReq,
  ICreateAlarmContentTemplateResp,
  IDeleteAlarmContentTemplateReq,
  IDeleteAlarmContentTemplateResp,
  IModifyAlarmContentTemplateReq,
  IModifyAlarmContentTemplateResp,
  IDescribeAlarmContentTemplatesReq,
  IDescribeAlarmContentTemplatesResp,
  ICreateAlarmWebhookIntegrationReq,
  ICreateAlarmWebhookIntegrationResp,
  IDeleteAlarmWebhookIntegrationReq,
  IDeleteAlarmWebhookIntegrationResp,
  IModifyAlarmWebhookIntegrationReq,
  IModifyAlarmWebhookIntegrationResp,
  IDescribeAlarmWebhookIntegrationsReq,
  IDescribeAlarmWebhookIntegrationsResp,
  IDeleteConsumerGroupReq,
  IDeleteConsumerGroupResp,
  IDescribeCheckPointReq,
  IDescribeCheckPointResp,
  IModifyCheckPointReq,
  IModifyCheckPointResp,
  IResetCheckPointReq,
  IResetCheckPointResp,
  IListTagsForResourcesReq,
  IListTagsForResourcesResp,
  IAddTagsToResourceReq,
  IAddTagsToResourceResp,
  ITagResourcesReq,
  ITagResourcesResp,
  IUntagResourcesReq,
  IUntagResourcesResp,
  IRemoveTagsFromResourceReq,
  IRemoveTagsFromResourceResp,
  IDescribeHistogramV1Req,
  IDescribeHistogramV1Resp,
  IConsumeLogsReq,
  IConsumeLogsResp,
  IDescribeLogContextReq,
  IDescribeLogContextResp,
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

  ManualShardSplit = this.createAPI<IManualShardSplitReq, IManualShardSplitResp>(
    "ManualShardSplit",
    {
      method: "POST",
    }
  );

  DescribeCursor = this.createAPI<IDescribeCursorReq, IDescribeCursorResp>("DescribeCursor", {
    method: "GET",
    queryKeys: ["TopicId", "ShardId"],
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

  ModifyHostGroupsAutoUpdate = this.createAPI<
    IModifyHostGroupsAutoUpdateReq,
    IModifyHostGroupsAutoUpdateResp
  >("ModifyHostGroupsAutoUpdate", {
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

  DeleteAbnormalHosts = this.createAPI<IDeleteAbnormalHostsReq, IDeleteAbnormalHostsResp>(
    "DeleteAbnormalHosts",
    {
      method: "DELETE",
    }
  );

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

  DescribeHistogramV1 = this.createAPI<IDescribeHistogramV1Req, IDescribeHistogramV1Resp>(
    "DescribeHistogramV1",
    {
      method: "POST",
    }
  );

  ConsumeLogs = this.createAPI<IConsumeLogsReq, IConsumeLogsResp>("ConsumeLogs", {
    method: "GET",
    queryKeys: ["TopicId", "ShardId"],
    axiosConfig: {
      responseType: "arraybuffer",
      headers: {
        Accept: "application/x-protobuf",
      },
    },
  });

  DescribeLogContext = this.createAPI<IDescribeLogContextReq, IDescribeLogContextResp>(
    "DescribeLogContext",
    {
      method: "POST",
    }
  );

  DescribeTraceInstances = this.createAPI<
    IDescribeTraceInstancesReq,
    ITraceInsDescribeTraceInstancesResp
  >("DescribeTraceInstances", {
    method: "GET",
  });

  DeleteTraceInstance = this.createAPI<ITraceInsDeleteReq, ITraceInsDeleteResp>(
    "DeleteTraceInstance",
    {
      method: "delete",
    }
  );

  CreateTraceInstance = this.createAPI<ITraceInsCreateReq, ITraceInsCreateResp>(
    "CreateTraceInstance",
    {
      method: "POST",
    }
  );

  ModifyTraceInstance = this.createAPI<ITraceInsModifyReq, ITraceInsModifyResp>(
    "ModifyTraceInstance",
    {
      method: "PUT",
    }
  );

  DescribeTraceInstance = this.createAPI<IDescribeTraceInstanceReq, ITraceInsDescribeResp>(
    "DescribeTraceInstance",
    {
      method: "GET",
    }
  );

  DescribeShipper = this.createAPI<IDescribeShipperReq, IDescribeShipperResp>("DescribeShipper", {
    method: "GET",
  });

  DescribeShippers = this.createAPI<IDescribeShippersReq, IDescribeShippersResp>(
    "DescribeShippers",
    {
      method: "GET",
    }
  );

  DescribeTrace = this.createAPI<IDescribeTraceReq, IDescribeTraceResp>("DescribeTrace", {
    method: "POST",
  });

  SearchTraces = this.createAPI<ISearchTracesReq, ISearchTracesResp>("SearchTraces", {
    method: "POST",
  });

  DescribeETLTask = this.createAPI<IDescribeETLTaskReq, IDescribeETLTaskResp>("DescribeETLTask", {
    method: "GET",
  });

  DescribeETLTasks = this.createAPI<IDescribeETLTasksReq, IDescribeETLTasksResp>(
    "DescribeETLTasks",
    {
      method: "GET",
    }
  );

  DescribeImportTask = this.createAPI<IDescribeImportTaskReq, IDescribeImportTaskResp>(
    "DescribeImportTask",
    {
      method: "GET",
    }
  );

  GetAccountStatus = this.createAPI<IGetAccountStatusReq, IGetAccountStatusResp>(
    "GetAccountStatus",
    {
      method: "GET",
    }
  );

  ActiveTlsAccount = this.createAPI<IActiveTlsAccountReq, IActiveTlsAccountResp>(
    "ActiveTlsAccount",
    {
      method: "POST",
    }
  );

  CreateImportTask = this.createAPI<ICreateImportTaskReq, ICreateImportTaskResp>(
    "CreateImportTask",
    {
      method: "POST",
    }
  );

  // consumer group related interface
  // 消费组相关接口
  CreateConsumerGroup = this.createAPI<ICreateConsumerGroupReq, ICreateConsumerGroupResp>(
    "CreateConsumerGroup",
    {
      method: "POST",
    }
  );

  DeleteShipper = this.createAPI<IDeleteShipperReq, IDeleteShipperResp>("DeleteShipper", {
    method: "DELETE",
  });

  DescribeConsumerGroups = this.createAPI<IDescribeConsumerGroupsReq, IDescribeConsumerGroupsResp>(
    "DescribeConsumerGroups",
    {
      method: "GET",
    }
  );

  ModifyConsumerGroup = this.createAPI<IModifyConsumerGroupReq, IModifyConsumerGroupResp>(
    "ModifyConsumerGroup",
    {
      method: "PUT",
    }
  );

  DeleteConsumerGroup = this.createAPI<IDeleteConsumerGroupReq, IDeleteConsumerGroupResp>(
    "DeleteConsumerGroup",
    {
      method: "DELETE",
    }
  );

  DescribeCheckPoint = this.createAPI<IDescribeCheckPointReq, IDescribeCheckPointResp>(
    "DescribeCheckPoint",
    {
      method: "GET",
    }
  );

  ModifyCheckPoint = this.createAPI<IModifyCheckPointReq, IModifyCheckPointResp>(
    "ModifyCheckPoint",
    {
      method: "PUT",
    }
  );

  ResetCheckPoint = this.createAPI<IResetCheckPointReq, IResetCheckPointResp>("ResetCheckPoint", {
    method: "PUT",
  });

  ListTagsForResources = this.createAPI<IListTagsForResourcesReq, IListTagsForResourcesResp>(
    "ListTagsForResources",
    {
      method: "POST",
    }
  );

  AddTagsToResource = this.createAPI<IAddTagsToResourceReq, IAddTagsToResourceResp>(
    "AddTagsToResource",
    {
      method: "POST",
    }
  );

  TagResources = this.createAPI<ITagResourcesReq, ITagResourcesResp>("TagResources", {
    method: "POST",
  });

  UntagResources = this.createAPI<IUntagResourcesReq, IUntagResourcesResp>("UntagResources", {
    method: "POST",
  });

  RemoveTagsFromResource = this.createAPI<IRemoveTagsFromResourceReq, IRemoveTagsFromResourceResp>(
    "RemoveTagsFromResource",
    {
      method: "POST",
    }
  );

  CancelDownloadTask = this.createAPI<ICancelDownloadTaskReq, ICancelDownloadTaskResp>(
    "CancelDownloadTask",
    {
      method: "POST",
    }
  );

  ModifyShipper = this.createAPI<IModifyShipperReq, IModifyShipperResp>("ModifyShipper", {
    method: "PUT",
  });

  CloseKafkaConsumer = this.createAPI<ICloseKafkaConsumerReq, ICloseKafkaConsumerResp>(
    "CloseKafkaConsumer",
    {
      method: "PUT",
    }
  );

  OpenKafkaConsumer = this.createAPI<IOpenKafkaConsumerReq, IOpenKafkaConsumerResp>(
    "OpenKafkaConsumer",
    {
      method: "PUT",
    }
  );

  DescribeKafkaConsumer = this.createAPI<IDescribeKafkaConsumerReq, IDescribeKafkaConsumerResp>(
    "DescribeKafkaConsumer",
    {
      method: "GET",
    }
  );

  ConsumerHeartbeat = this.createAPI<IConsumerHeartbeatReq, IConsumerHeartbeatResp>(
    "ConsumerHeartbeat",
    {
      method: "POST",
    }
  );

  ModifyETLTaskStatus = this.createAPI<IModifyETLTaskStatusReq, IModifyETLTaskStatusResp>(
    "ModifyETLTaskStatus",
    {
      method: "PUT",
    }
  );

  CreateDownloadTask = this.createAPI<IDownloadTaskCreateReq, IDownloadTaskCreateResp>(
    "CreateDownloadTask",
    {
      method: "POST",
    }
  );

  DescribeDownloadTasks = this.createAPI<
    IDescribeDownloadTasksReq,
    IDownloadTaskDescribeDownloadTasksResp
  >("DescribeDownloadTasks", {
    method: "GET",
  });

  DescribeDownloadUrl = this.createAPI<IDescribeDownloadUrlReq, IDescribeDownloadUrlResp>(
    "DescribeDownloadUrl",
    {
      method: "GET",
    }
  );

  WebTracks = this.createAPI<IWebTracksReq, IWebTracksResp>("WebTracks", {
    method: "POST",
  });

  ModifyETLTask = this.createAPI<IModifyETLTaskReq, IModifyETLTaskResp>("ModifyETLTask", {
    method: "PUT",
  });

  CreateETLTask = this.createAPI<ICreateETLTaskReq, ICreateETLTaskResp>("CreateETLTask", {
    method: "POST",
  });

  DeleteETLTask = this.createAPI<IDeleteETLTaskReq, IDeleteETLTaskResp>("DeleteETLTask", {
    method: "DELETE",
  });

  DeleteImportTask = this.createAPI<IDeleteImportTaskReq, IDeleteImportTaskResp>(
    "DeleteImportTask",
    {
      method: "DELETE",
    }
  );

  CreateShipper = this.createAPI<ICreateShipperReq, ICreateShipperResp>("CreateShipper", {
    method: "POST",
  });

  CreateScheduleSqlTask = this.createAPI<ICreateScheduleSqlTaskReq, ICreateScheduleSqlTaskResp>(
    "CreateScheduleSqlTask",
    {
      method: "POST",
    }
  );

  DeleteScheduleSqlTask = this.createAPI<IDeleteScheduleSqlTaskReq, IDeleteScheduleSqlTaskResp>(
    "DeleteScheduleSqlTask",
    {
      method: "DELETE",
    }
  );

  DescribeScheduleSqlTask = this.createAPI<
    IDescribeScheduleSqlTaskReq,
    IDescribeScheduleSqlTaskResp
  >("DescribeScheduleSqlTask", {
    method: "GET",
  });

  DescribeScheduleSqlTasks = this.createAPI<
    IDescribeScheduleSqlTasksReq,
    IDescribeScheduleSqlTasksResp
  >("DescribeScheduleSqlTasks", {
    method: "GET",
  });

  ModifyScheduleSqlTask = this.createAPI<IModifyScheduleSqlTaskReq, IModifyScheduleSqlTaskResp>(
    "ModifyScheduleSqlTask",
    {
      method: "PUT",
    }
  );

  CreateAlarmContentTemplate = this.createAPI<
    ICreateAlarmContentTemplateReq,
    ICreateAlarmContentTemplateResp
  >("CreateAlarmContentTemplate", {
    method: "POST",
  });

  DeleteAlarmContentTemplate = this.createAPI<
    IDeleteAlarmContentTemplateReq,
    IDeleteAlarmContentTemplateResp
  >("DeleteAlarmContentTemplate", {
    method: "DELETE",
  });

  ModifyAlarmContentTemplate = this.createAPI<
    IModifyAlarmContentTemplateReq,
    IModifyAlarmContentTemplateResp
  >("ModifyAlarmContentTemplate", {
    method: "PUT",
  });

  DescribeAlarmContentTemplates = this.createAPI<
    IDescribeAlarmContentTemplatesReq,
    IDescribeAlarmContentTemplatesResp
  >("DescribeAlarmContentTemplates", {
    method: "GET",
  });

  CreateAlarmWebhookIntegration = this.createAPI<
    ICreateAlarmWebhookIntegrationReq,
    ICreateAlarmWebhookIntegrationResp
  >("CreateAlarmWebhookIntegration", {
    method: "POST",
  });

  DeleteAlarmWebhookIntegration = this.createAPI<
    IDeleteAlarmWebhookIntegrationReq,
    IDeleteAlarmWebhookIntegrationResp
  >("DeleteAlarmWebhookIntegration", {
    method: "DELETE",
  });

  ModifyAlarmWebhookIntegration = this.createAPI<
    IModifyAlarmWebhookIntegrationReq,
    IModifyAlarmWebhookIntegrationResp
  >("ModifyAlarmWebhookIntegration", {
    method: "PUT",
  });

  DescribeAlarmWebhookIntegrations = this.createAPI<
    IDescribeAlarmWebhookIntegrationsReq,
    IDescribeAlarmWebhookIntegrationsResp
  >("DescribeAlarmWebhookIntegrations", {
    method: "GET",
  });
}
export const defaultService = new TlsService();
