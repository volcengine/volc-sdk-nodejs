import Service from "../../base/service";
import { ServiceOptions } from "../../base/types";
import * as types from "./type";

/**
 * Class representing a ImagexService.
 */

export default class ImagexService extends Service {
  /**
   * 创建 ImagexService
   * @param options 初始化配置
   */
  constructor(options?: ServiceOptions) {
    super({
      ...options,
      serviceName: "imagex",
    });
  }

  /**
   * @function UpdateImageDomainVolcOrigin
   */
  public UpdateImageDomainVolcOrigin = this.createAPI<
    types.UpdateImageDomainVolcOriginQuery & types.UpdateImageDomainVolcOriginBody,
    types.UpdateImageDomainVolcOriginRes["Result"]
  >("UpdateImageDomainVolcOrigin", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function DelDomain
   */
  public DelDomain = this.createAPI<
    types.DelDomainQuery & types.DelDomainBody,
    types.DelDomainRes["Result"]
  >("DelDomain", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function AddDomainV1
   */
  public AddDomainV1 = this.createAPI<
    types.AddDomainV1Query & types.AddDomainV1Body,
    types.AddDomainV1Res["Result"]
  >("AddDomainV1", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateImageDomainIPAuth
   */
  public UpdateImageDomainIPAuth = this.createAPI<
    types.UpdateImageDomainIPAuthQuery & types.UpdateImageDomainIPAuthBody,
    types.UpdateImageDomainIPAuthRes["Result"]
  >("UpdateImageDomainIPAuth", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateRefer
   */
  public UpdateRefer = this.createAPI<
    types.UpdateReferQuery & types.UpdateReferBody,
    types.UpdateReferRes["Result"]
  >("UpdateRefer", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateImageDomainUaAccess
   */
  public UpdateImageDomainUaAccess = this.createAPI<
    types.UpdateImageDomainUaAccessQuery & types.UpdateImageDomainUaAccessBody,
    types.UpdateImageDomainUaAccessRes["Result"]
  >("UpdateImageDomainUaAccess", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateHttps
   */
  public UpdateHttps = this.createAPI<
    types.UpdateHttpsQuery & types.UpdateHttpsBody,
    types.UpdateHttpsRes["Result"]
  >("UpdateHttps", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateImageDomainDownloadSpeedLimit
   */
  public UpdateImageDomainDownloadSpeedLimit = this.createAPI<
    types.UpdateImageDomainDownloadSpeedLimitQuery & types.UpdateImageDomainDownloadSpeedLimitBody,
    types.UpdateImageDomainDownloadSpeedLimitRes["Result"]
  >("UpdateImageDomainDownloadSpeedLimit", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateResponseHeader
   */
  public UpdateResponseHeader = this.createAPI<
    types.UpdateResponseHeaderQuery & types.UpdateResponseHeaderBody,
    types.UpdateResponseHeaderRes["Result"]
  >("UpdateResponseHeader", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateImageDomainAreaAccess
   */
  public UpdateImageDomainAreaAccess = this.createAPI<
    types.UpdateImageDomainAreaAccessQuery & types.UpdateImageDomainAreaAccessBody,
    types.UpdateImageDomainAreaAccessRes["Result"]
  >("UpdateImageDomainAreaAccess", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateDomainAdaptiveFmt
   */
  public UpdateDomainAdaptiveFmt = this.createAPI<
    types.UpdateDomainAdaptiveFmtQuery & types.UpdateDomainAdaptiveFmtBody,
    types.UpdateDomainAdaptiveFmtRes["Result"]
  >("UpdateDomainAdaptiveFmt", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateImageDomainConfig
   */
  public UpdateImageDomainConfig = this.createAPI<
    types.UpdateImageDomainConfigQuery & types.UpdateImageDomainConfigBody,
    types.UpdateImageDomainConfigRes["Result"]
  >("UpdateImageDomainConfig", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateAdvance
   */
  public UpdateAdvance = this.createAPI<
    types.UpdateAdvanceQuery & types.UpdateAdvanceBody,
    types.UpdateAdvanceRes["Result"]
  >("UpdateAdvance", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateImageDomainBandwidthLimit
   */
  public UpdateImageDomainBandwidthLimit = this.createAPI<
    types.UpdateImageDomainBandwidthLimitQuery & types.UpdateImageDomainBandwidthLimitBody,
    types.UpdateImageDomainBandwidthLimitRes["Result"]
  >("UpdateImageDomainBandwidthLimit", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateSlimConfig
   */
  public UpdateSlimConfig = this.createAPI<
    types.UpdateSlimConfigQuery & types.UpdateSlimConfigBody,
    types.UpdateSlimConfigRes["Result"]
  >("UpdateSlimConfig", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function SetDefaultDomain
   */
  public SetDefaultDomain = this.createAPI<
    types.SetDefaultDomainBody,
    types.SetDefaultDomainRes["Result"]
  >("SetDefaultDomain", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageVolcCdnAccessLog
   */
  public DescribeImageVolcCdnAccessLog = this.createAPI<
    types.DescribeImageVolcCdnAccessLogQuery & types.DescribeImageVolcCdnAccessLogBody,
    types.DescribeImageVolcCdnAccessLogRes["Result"]
  >("DescribeImageVolcCdnAccessLog", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetResponseHeaderValidateKeys
   */
  public GetResponseHeaderValidateKeys = this.createAPI<
    Record<string, any>,
    types.GetResponseHeaderValidateKeysRes["Result"]
  >("GetResponseHeaderValidateKeys", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetDomainConfig
   */
  public GetDomainConfig = this.createAPI<
    types.GetDomainConfigQuery,
    types.GetDomainConfigRes["Result"]
  >("GetDomainConfig", {
    method: "GET",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["DomainName", "ServiceId"],
  });

  /**
   * @function GetServiceDomains
   */
  public GetServiceDomains = this.createAPI<
    types.GetServiceDomainsQuery,
    types.GetServiceDomainsRes["Result"]
  >("GetServiceDomains", {
    method: "GET",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function DeleteImageMonitorRules
   */
  public DeleteImageMonitorRules = this.createAPI<
    types.DeleteImageMonitorRulesBody,
    types.DeleteImageMonitorRulesRes["Result"]
  >("DeleteImageMonitorRules", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
  });

  /**
   * @function DeleteImageMonitorRecords
   */
  public DeleteImageMonitorRecords = this.createAPI<
    types.DeleteImageMonitorRecordsBody,
    types.DeleteImageMonitorRecordsRes["Result"]
  >("DeleteImageMonitorRecords", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
  });

  /**
   * @function CreateImageMonitorRule
   */
  public CreateImageMonitorRule = this.createAPI<
    types.CreateImageMonitorRuleBody,
    types.CreateImageMonitorRuleRes["Result"]
  >("CreateImageMonitorRule", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
  });

  /**
   * @function UpdateImageMonitorRule
   */
  public UpdateImageMonitorRule = this.createAPI<
    types.UpdateImageMonitorRuleBody,
    types.UpdateImageMonitorRuleRes["Result"]
  >("UpdateImageMonitorRule", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
  });

  /**
   * @function UpdateImageMonitorRuleStatus
   */
  public UpdateImageMonitorRuleStatus = this.createAPI<
    types.UpdateImageMonitorRuleStatusBody,
    types.UpdateImageMonitorRuleStatusRes["Result"]
  >("UpdateImageMonitorRuleStatus", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
  });

  /**
   * @function GetImageAlertRecords
   */
  public GetImageAlertRecords = this.createAPI<
    types.GetImageAlertRecordsBody,
    types.GetImageAlertRecordsRes["Result"]
  >("GetImageAlertRecords", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
  });

  /**
   * @function GetImageMonitorRules
   */
  public GetImageMonitorRules = this.createAPI<
    types.GetImageMonitorRulesQuery,
    types.GetImageMonitorRulesRes["Result"]
  >("GetImageMonitorRules", {
    method: "GET",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["Limit", "Offset", "AppId", "NamePtn", "RuleId"],
  });

  /**
   * @function CreateImageSettingRule
   */
  public CreateImageSettingRule = this.createAPI<
    types.CreateImageSettingRuleBody,
    types.CreateImageSettingRuleRes["Result"]
  >("CreateImageSettingRule", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DeleteImageSettingRule
   */
  public DeleteImageSettingRule = this.createAPI<
    types.DeleteImageSettingRuleBody,
    types.DeleteImageSettingRuleRes["Result"]
  >("DeleteImageSettingRule", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function UpdateImageSettingRulePriority
   */
  public UpdateImageSettingRulePriority = this.createAPI<
    types.UpdateImageSettingRulePriorityBody,
    types.UpdateImageSettingRulePriorityRes["Result"]
  >("UpdateImageSettingRulePriority", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function UpdateImageSettingRule
   */
  public UpdateImageSettingRule = this.createAPI<
    types.UpdateImageSettingRuleBody,
    types.UpdateImageSettingRuleRes["Result"]
  >("UpdateImageSettingRule", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageSettings
   */
  public GetImageSettings = this.createAPI<
    types.GetImageSettingsQuery,
    types.GetImageSettingsRes["Result"]
  >("GetImageSettings", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["AppId", "Category"],
  });

  /**
   * @function GetImageSettingRuleHistory
   */
  public GetImageSettingRuleHistory = this.createAPI<
    types.GetImageSettingRuleHistoryQuery,
    types.GetImageSettingRuleHistoryRes["Result"]
  >("GetImageSettingRuleHistory", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["AppId", "SettingId", "Offset", "Limit"],
  });

  /**
   * @function GetImageSettingRules
   */
  public GetImageSettingRules = this.createAPI<
    types.GetImageSettingRulesQuery,
    types.GetImageSettingRulesRes["Result"]
  >("GetImageSettingRules", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["AppId", "SettingId"],
  });

  /**
   * @function CreateImageMigrateTask
   */
  public CreateImageMigrateTask = this.createAPI<
    types.CreateImageMigrateTaskBody,
    types.CreateImageMigrateTaskRes["Result"]
  >("CreateImageMigrateTask", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DeleteImageMigrateTask
   */
  public DeleteImageMigrateTask = this.createAPI<
    types.DeleteImageMigrateTaskQuery,
    types.DeleteImageMigrateTaskRes["Result"]
  >("DeleteImageMigrateTask", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Region", "TaskId"],
  });

  /**
   * @function ExportFailedMigrateTask
   */
  public ExportFailedMigrateTask = this.createAPI<
    types.ExportFailedMigrateTaskQuery,
    types.ExportFailedMigrateTaskRes["Result"]
  >("ExportFailedMigrateTask", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Region", "TaskId"],
  });

  /**
   * @function UpdateImageTaskStrategy
   */
  public UpdateImageTaskStrategy = this.createAPI<
    types.UpdateImageTaskStrategyBody,
    types.UpdateImageTaskStrategyRes["Result"]
  >("UpdateImageTaskStrategy", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function TerminateImageMigrateTask
   */
  public TerminateImageMigrateTask = this.createAPI<
    types.TerminateImageMigrateTaskQuery,
    types.TerminateImageMigrateTaskRes["Result"]
  >("TerminateImageMigrateTask", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Region", "TaskId"],
  });

  /**
   * @function GetVendorBuckets
   */
  public GetVendorBuckets = this.createAPI<
    types.GetVendorBucketsBody,
    types.GetVendorBucketsRes["Result"]
  >("GetVendorBuckets", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageMigrateTasks
   */
  public GetImageMigrateTasks = this.createAPI<
    types.GetImageMigrateTasksQuery,
    types.GetImageMigrateTasksRes["Result"]
  >("GetImageMigrateTasks", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Region", "TaskId", "ServiceId", "Offset", "Limit", "TaskNamePtn", "Status"],
  });

  /**
   * @function RerunImageMigrateTask
   */
  public RerunImageMigrateTask = this.createAPI<
    types.RerunImageMigrateTaskQuery,
    types.RerunImageMigrateTaskRes["Result"]
  >("RerunImageMigrateTask", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Region", "TaskId"],
  });

  /**
   * @function GetImageAddOnTag
   */
  public GetImageAddOnTag = this.createAPI<
    types.GetImageAddOnTagQuery,
    types.GetImageAddOnTagRes["Result"]
  >("GetImageAddOnTag", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Key", "Type"],
  });

  /**
   * @function DescribeImageXSourceRequestBandwidth
   */
  public DescribeImageXSourceRequestBandwidth = this.createAPI<
    types.DescribeImageXSourceRequestBandwidthQuery,
    types.DescribeImageXSourceRequestBandwidthRes["Result"]
  >("DescribeImageXSourceRequestBandwidth", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: [
      "ServiceIds",
      "DomainNames",
      "Regions",
      "UserCountry",
      "UserProvince",
      "Protocols",
      "Isp",
      "GroupBy",
      "StartTime",
      "EndTime",
      "Interval",
    ],
  });

  /**
   * @function DescribeImageXSourceRequestTraffic
   */
  public DescribeImageXSourceRequestTraffic = this.createAPI<
    types.DescribeImageXSourceRequestTrafficQuery,
    types.DescribeImageXSourceRequestTrafficRes["Result"]
  >("DescribeImageXSourceRequestTraffic", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: [
      "ServiceIds",
      "DomainNames",
      "Regions",
      "UserCountry",
      "UserProvince",
      "Protocols",
      "Isp",
      "GroupBy",
      "StartTime",
      "EndTime",
      "Interval",
    ],
  });

  /**
   * @function DescribeImageXSourceRequest
   */
  public DescribeImageXSourceRequest = this.createAPI<
    types.DescribeImageXSourceRequestQuery,
    types.DescribeImageXSourceRequestRes["Result"]
  >("DescribeImageXSourceRequest", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: [
      "ServiceIds",
      "DomainNames",
      "Regions",
      "UserCountry",
      "UserProvince",
      "Protocols",
      "Isp",
      "DataTypes",
      "GroupBy",
      "StartTime",
      "EndTime",
      "Interval",
      "DetailedCode",
    ],
  });

  /**
   * @function DescribeImageXBucketRetrievalUsage
   */
  public DescribeImageXBucketRetrievalUsage = this.createAPI<
    types.DescribeImageXBucketRetrievalUsageQuery,
    types.DescribeImageXBucketRetrievalUsageRes["Result"]
  >("DescribeImageXBucketRetrievalUsage", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceIds", "BucketNames", "GroupBy", "StartTime", "EndTime"],
  });

  /**
   * @function DescribeImageXSummary
   */
  public DescribeImageXSummary = this.createAPI<
    types.DescribeImageXSummaryQuery,
    types.DescribeImageXSummaryRes["Result"]
  >("DescribeImageXSummary", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceIds", "Timestamp"],
  });

  /**
   * @function DescribeImageXDomainTrafficData
   */
  public DescribeImageXDomainTrafficData = this.createAPI<
    types.DescribeImageXDomainTrafficDataQuery,
    types.DescribeImageXDomainTrafficDataRes["Result"]
  >("DescribeImageXDomainTrafficData", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: [
      "ServiceIds",
      "DomainNames",
      "BillingRegion",
      "GroupBy",
      "StartTime",
      "EndTime",
      "Interval",
    ],
  });

  /**
   * @function DescribeImageXDomainBandwidthData
   */
  public DescribeImageXDomainBandwidthData = this.createAPI<
    types.DescribeImageXDomainBandwidthDataQuery,
    types.DescribeImageXDomainBandwidthDataRes["Result"]
  >("DescribeImageXDomainBandwidthData", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: [
      "ServiceIds",
      "DomainNames",
      "BillingRegion",
      "GroupBy",
      "StartTime",
      "EndTime",
      "Interval",
    ],
  });

  /**
   * @function DescribeImageXDomainBandwidthNinetyFiveData
   */
  public DescribeImageXDomainBandwidthNinetyFiveData = this.createAPI<
    types.DescribeImageXDomainBandwidthNinetyFiveDataQuery,
    types.DescribeImageXDomainBandwidthNinetyFiveDataRes["Result"]
  >("DescribeImageXDomainBandwidthNinetyFiveData", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceIds", "DomainNames", "BillingRegion", "StartTime", "EndTime"],
  });

  /**
   * @function DescribeImageXBucketUsage
   */
  public DescribeImageXBucketUsage = this.createAPI<
    types.DescribeImageXBucketUsageQuery,
    types.DescribeImageXBucketUsageRes["Result"]
  >("DescribeImageXBucketUsage", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceIds", "BucketNames", "GroupBy", "StartTime", "EndTime"],
  });

  /**
   * @function DescribeImageXBillingRequestCntUsage
   */
  public DescribeImageXBillingRequestCntUsage = this.createAPI<
    types.DescribeImageXBillingRequestCntUsageQuery,
    types.DescribeImageXBillingRequestCntUsageRes["Result"]
  >("DescribeImageXBillingRequestCntUsage", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceIds", "AdvFeats", "GroupBy", "StartTime", "EndTime", "Interval"],
  });

  /**
   * @function DescribeImageXRequestCntUsage
   */
  public DescribeImageXRequestCntUsage = this.createAPI<
    types.DescribeImageXRequestCntUsageQuery,
    types.DescribeImageXRequestCntUsageRes["Result"]
  >("DescribeImageXRequestCntUsage", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: [
      "ServiceIds",
      "AdvFeats",
      "Templates",
      "GroupBy",
      "StartTime",
      "EndTime",
      "Interval",
    ],
  });

  /**
   * @function DescribeImageXBaseOpUsage
   */
  public DescribeImageXBaseOpUsage = this.createAPI<
    types.DescribeImageXBaseOpUsageQuery,
    types.DescribeImageXBaseOpUsageRes["Result"]
  >("DescribeImageXBaseOpUsage", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceIds", "GroupBy", "StartTime", "EndTime", "Interval"],
  });

  /**
   * @function DescribeImageXCompressUsage
   */
  public DescribeImageXCompressUsage = this.createAPI<
    types.DescribeImageXCompressUsageQuery,
    types.DescribeImageXCompressUsageRes["Result"]
  >("DescribeImageXCompressUsage", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceIds", "GroupBy", "StartTime", "EndTime", "Interval"],
  });

  /**
   * @function DescribeImageXScreenshotUsage
   */
  public DescribeImageXScreenshotUsage = this.createAPI<
    types.DescribeImageXScreenshotUsageQuery,
    types.DescribeImageXScreenshotUsageRes["Result"]
  >("DescribeImageXScreenshotUsage", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceIds", "StartTime", "EndTime", "Interval"],
  });

  /**
   * @function DescribeImageXVideoClipDurationUsage
   */
  public DescribeImageXVideoClipDurationUsage = this.createAPI<
    types.DescribeImageXVideoClipDurationUsageQuery,
    types.DescribeImageXVideoClipDurationUsageRes["Result"]
  >("DescribeImageXVideoClipDurationUsage", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceIds", "StartTime", "EndTime", "Interval"],
  });

  /**
   * @function DescribeImageXMultiCompressUsage
   */
  public DescribeImageXMultiCompressUsage = this.createAPI<
    types.DescribeImageXMultiCompressUsageQuery,
    types.DescribeImageXMultiCompressUsageRes["Result"]
  >("DescribeImageXMultiCompressUsage", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceIds", "StartTime", "EndTime", "Interval"],
  });

  /**
   * @function DescribeImageXEdgeRequest
   */
  public DescribeImageXEdgeRequest = this.createAPI<
    types.DescribeImageXEdgeRequestQuery,
    types.DescribeImageXEdgeRequestRes["Result"]
  >("DescribeImageXEdgeRequest", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: [
      "ServiceIds",
      "DomainNames",
      "Regions",
      "UserCountry",
      "UserProvince",
      "Protocols",
      "Isp",
      "DataTypes",
      "GroupBy",
      "StartTime",
      "EndTime",
      "Interval",
      "DetailedCode",
    ],
  });

  /**
   * @function DescribeImageXEdgeRequestBandwidth
   */
  public DescribeImageXEdgeRequestBandwidth = this.createAPI<
    types.DescribeImageXEdgeRequestBandwidthQuery,
    types.DescribeImageXEdgeRequestBandwidthRes["Result"]
  >("DescribeImageXEdgeRequestBandwidth", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: [
      "ServiceIds",
      "DomainNames",
      "Regions",
      "UserCountry",
      "UserProvince",
      "Protocols",
      "Isp",
      "GroupBy",
      "StartTime",
      "EndTime",
      "Interval",
    ],
  });

  /**
   * @function DescribeImageXEdgeRequestTraffic
   */
  public DescribeImageXEdgeRequestTraffic = this.createAPI<
    types.DescribeImageXEdgeRequestTrafficQuery,
    types.DescribeImageXEdgeRequestTrafficRes["Result"]
  >("DescribeImageXEdgeRequestTraffic", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: [
      "ServiceIds",
      "DomainNames",
      "Regions",
      "UserCountry",
      "UserProvince",
      "Protocols",
      "Isp",
      "GroupBy",
      "StartTime",
      "EndTime",
      "Interval",
    ],
  });

  /**
   * @function DescribeImageXEdgeRequestRegions
   */
  public DescribeImageXEdgeRequestRegions = this.createAPI<
    types.DescribeImageXEdgeRequestRegionsQuery,
    types.DescribeImageXEdgeRequestRegionsRes["Result"]
  >("DescribeImageXEdgeRequestRegions", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["StartTime", "EndTime"],
  });

  /**
   * @function DescribeImageXMirrorRequestHttpCodeByTime
   */
  public DescribeImageXMirrorRequestHttpCodeByTime = this.createAPI<
    types.DescribeImageXMirrorRequestHttpCodeByTimeBody,
    types.DescribeImageXMirrorRequestHttpCodeByTimeRes["Result"]
  >("DescribeImageXMirrorRequestHttpCodeByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXMirrorRequestHttpCodeOverview
   */
  public DescribeImageXMirrorRequestHttpCodeOverview = this.createAPI<
    types.DescribeImageXMirrorRequestHttpCodeOverviewBody,
    types.DescribeImageXMirrorRequestHttpCodeOverviewRes["Result"]
  >("DescribeImageXMirrorRequestHttpCodeOverview", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXMirrorRequestTraffic
   */
  public DescribeImageXMirrorRequestTraffic = this.createAPI<
    types.DescribeImageXMirrorRequestTrafficBody,
    types.DescribeImageXMirrorRequestTrafficRes["Result"]
  >("DescribeImageXMirrorRequestTraffic", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXMirrorRequestBandwidth
   */
  public DescribeImageXMirrorRequestBandwidth = this.createAPI<
    types.DescribeImageXMirrorRequestBandwidthBody,
    types.DescribeImageXMirrorRequestBandwidthRes["Result"]
  >("DescribeImageXMirrorRequestBandwidth", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXServerQPSUsage
   */
  public DescribeImageXServerQPSUsage = this.createAPI<
    types.DescribeImageXServerQPSUsageQuery,
    types.DescribeImageXServerQPSUsageRes["Result"]
  >("DescribeImageXServerQPSUsage", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceIds", "StartTime", "EndTime", "Interval"],
  });

  /**
   * @function DescribeImageXHitRateTrafficData
   */
  public DescribeImageXHitRateTrafficData = this.createAPI<
    types.DescribeImageXHitRateTrafficDataQuery,
    types.DescribeImageXHitRateTrafficDataRes["Result"]
  >("DescribeImageXHitRateTrafficData", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceIds", "DomainNames", "GroupBy", "StartTime", "EndTime", "Interval"],
  });

  /**
   * @function DescribeImageXHitRateRequestData
   */
  public DescribeImageXHitRateRequestData = this.createAPI<
    types.DescribeImageXHitRateRequestDataQuery,
    types.DescribeImageXHitRateRequestDataRes["Result"]
  >("DescribeImageXHitRateRequestData", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceIds", "DomainNames", "GroupBy", "StartTime", "EndTime", "Interval"],
  });

  /**
   * @function DescribeImageXCDNTopRequestData
   */
  public DescribeImageXCDNTopRequestData = this.createAPI<
    types.DescribeImageXCDNTopRequestDataQuery,
    types.DescribeImageXCDNTopRequestDataRes["Result"]
  >("DescribeImageXCDNTopRequestData", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: [
      "ServiceIds",
      "DomainNames",
      "IPVersion",
      "Country",
      "KeyType",
      "ValueType",
      "StartTime",
      "EndTime",
      "Limit",
      "Offset",
    ],
  });

  /**
   * @function DescribeImageXHeifEncodeFileInSizeByTime
   */
  public DescribeImageXHeifEncodeFileInSizeByTime = this.createAPI<
    types.DescribeImageXHeifEncodeFileInSizeByTimeBody,
    types.DescribeImageXHeifEncodeFileInSizeByTimeRes["Result"]
  >("DescribeImageXHeifEncodeFileInSizeByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXHeifEncodeFileOutSizeByTime
   */
  public DescribeImageXHeifEncodeFileOutSizeByTime = this.createAPI<
    types.DescribeImageXHeifEncodeFileOutSizeByTimeBody,
    types.DescribeImageXHeifEncodeFileOutSizeByTimeRes["Result"]
  >("DescribeImageXHeifEncodeFileOutSizeByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXHeifEncodeSuccessCountByTime
   */
  public DescribeImageXHeifEncodeSuccessCountByTime = this.createAPI<
    types.DescribeImageXHeifEncodeSuccessCountByTimeBody,
    types.DescribeImageXHeifEncodeSuccessCountByTimeRes["Result"]
  >("DescribeImageXHeifEncodeSuccessCountByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXHeifEncodeSuccessRateByTime
   */
  public DescribeImageXHeifEncodeSuccessRateByTime = this.createAPI<
    types.DescribeImageXHeifEncodeSuccessRateByTimeBody,
    types.DescribeImageXHeifEncodeSuccessRateByTimeRes["Result"]
  >("DescribeImageXHeifEncodeSuccessRateByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXHeifEncodeDurationByTime
   */
  public DescribeImageXHeifEncodeDurationByTime = this.createAPI<
    types.DescribeImageXHeifEncodeDurationByTimeBody,
    types.DescribeImageXHeifEncodeDurationByTimeRes["Result"]
  >("DescribeImageXHeifEncodeDurationByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXHeifEncodeErrorCodeByTime
   */
  public DescribeImageXHeifEncodeErrorCodeByTime = this.createAPI<
    types.DescribeImageXHeifEncodeErrorCodeByTimeBody,
    types.DescribeImageXHeifEncodeErrorCodeByTimeRes["Result"]
  >("DescribeImageXHeifEncodeErrorCodeByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXExceedResolutionRatioAll
   */
  public DescribeImageXExceedResolutionRatioAll = this.createAPI<
    types.DescribeImageXExceedResolutionRatioAllBody,
    types.DescribeImageXExceedResolutionRatioAllRes["Result"]
  >("DescribeImageXExceedResolutionRatioAll", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXExceedFileSize
   */
  public DescribeImageXExceedFileSize = this.createAPI<
    types.DescribeImageXExceedFileSizeBody,
    types.DescribeImageXExceedFileSizeRes["Result"]
  >("DescribeImageXExceedFileSize", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXExceedCountByTime
   */
  public DescribeImageXExceedCountByTime = this.createAPI<
    types.DescribeImageXExceedCountByTimeBody,
    types.DescribeImageXExceedCountByTimeRes["Result"]
  >("DescribeImageXExceedCountByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXServiceQuality
   */
  public DescribeImageXServiceQuality = this.createAPI<
    types.DescribeImageXServiceQualityQuery,
    types.DescribeImageXServiceQualityRes["Result"]
  >("DescribeImageXServiceQuality", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Region"],
  });

  /**
   * @function GetImageXQueryApps
   */
  public GetImageXQueryApps = this.createAPI<
    types.GetImageXQueryAppsQuery,
    types.GetImageXQueryAppsRes["Result"]
  >("GetImageXQueryApps", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Source"],
  });

  /**
   * @function GetImageXQueryRegions
   */
  public GetImageXQueryRegions = this.createAPI<
    types.GetImageXQueryRegionsQuery,
    types.GetImageXQueryRegionsRes["Result"]
  >("GetImageXQueryRegions", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Source", "Appid", "OS"],
  });

  /**
   * @function GetImageXQueryDims
   */
  public GetImageXQueryDims = this.createAPI<
    types.GetImageXQueryDimsQuery,
    types.GetImageXQueryDimsRes["Result"]
  >("GetImageXQueryDims", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Source", "Appid", "OS"],
  });

  /**
   * @function GetImageXQueryVals
   */
  public GetImageXQueryVals = this.createAPI<
    types.GetImageXQueryValsQuery,
    types.GetImageXQueryValsRes["Result"]
  >("GetImageXQueryVals", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Dim", "Source", "Appid", "OS", "Keyword"],
  });

  /**
   * @function DescribeImageXUploadCountByTime
   */
  public DescribeImageXUploadCountByTime = this.createAPI<
    types.DescribeImageXUploadCountByTimeBody,
    types.DescribeImageXUploadCountByTimeRes["Result"]
  >("DescribeImageXUploadCountByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXUploadDuration
   */
  public DescribeImageXUploadDuration = this.createAPI<
    types.DescribeImageXUploadDurationBody,
    types.DescribeImageXUploadDurationRes["Result"]
  >("DescribeImageXUploadDuration", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXUploadSuccessRateByTime
   */
  public DescribeImageXUploadSuccessRateByTime = this.createAPI<
    types.DescribeImageXUploadSuccessRateByTimeBody,
    types.DescribeImageXUploadSuccessRateByTimeRes["Result"]
  >("DescribeImageXUploadSuccessRateByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXUploadFileSize
   */
  public DescribeImageXUploadFileSize = this.createAPI<
    types.DescribeImageXUploadFileSizeBody,
    types.DescribeImageXUploadFileSizeRes["Result"]
  >("DescribeImageXUploadFileSize", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXUploadErrorCodeByTime
   */
  public DescribeImageXUploadErrorCodeByTime = this.createAPI<
    types.DescribeImageXUploadErrorCodeByTimeBody,
    types.DescribeImageXUploadErrorCodeByTimeRes["Result"]
  >("DescribeImageXUploadErrorCodeByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXUploadErrorCodeAll
   */
  public DescribeImageXUploadErrorCodeAll = this.createAPI<
    types.DescribeImageXUploadErrorCodeAllBody,
    types.DescribeImageXUploadErrorCodeAllRes["Result"]
  >("DescribeImageXUploadErrorCodeAll", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXUploadSpeed
   */
  public DescribeImageXUploadSpeed = this.createAPI<
    types.DescribeImageXUploadSpeedBody,
    types.DescribeImageXUploadSpeedRes["Result"]
  >("DescribeImageXUploadSpeed", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXUploadSegmentSpeedByTime
   */
  public DescribeImageXUploadSegmentSpeedByTime = this.createAPI<
    types.DescribeImageXUploadSegmentSpeedByTimeBody,
    types.DescribeImageXUploadSegmentSpeedByTimeRes["Result"]
  >("DescribeImageXUploadSegmentSpeedByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXCdnSuccessRateByTime
   */
  public DescribeImageXCdnSuccessRateByTime = this.createAPI<
    types.DescribeImageXCdnSuccessRateByTimeBody,
    types.DescribeImageXCdnSuccessRateByTimeRes["Result"]
  >("DescribeImageXCdnSuccessRateByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXCdnSuccessRateAll
   */
  public DescribeImageXCdnSuccessRateAll = this.createAPI<
    types.DescribeImageXCdnSuccessRateAllBody,
    types.DescribeImageXCdnSuccessRateAllRes["Result"]
  >("DescribeImageXCdnSuccessRateAll", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXCdnErrorCodeByTime
   */
  public DescribeImageXCdnErrorCodeByTime = this.createAPI<
    types.DescribeImageXCdnErrorCodeByTimeBody,
    types.DescribeImageXCdnErrorCodeByTimeRes["Result"]
  >("DescribeImageXCdnErrorCodeByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXCdnErrorCodeAll
   */
  public DescribeImageXCdnErrorCodeAll = this.createAPI<
    types.DescribeImageXCdnErrorCodeAllBody,
    types.DescribeImageXCdnErrorCodeAllRes["Result"]
  >("DescribeImageXCdnErrorCodeAll", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXCdnDurationDetailByTime
   */
  public DescribeImageXCdnDurationDetailByTime = this.createAPI<
    types.DescribeImageXCdnDurationDetailByTimeBody,
    types.DescribeImageXCdnDurationDetailByTimeRes["Result"]
  >("DescribeImageXCdnDurationDetailByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXCdnDurationAll
   */
  public DescribeImageXCdnDurationAll = this.createAPI<
    types.DescribeImageXCdnDurationAllBody,
    types.DescribeImageXCdnDurationAllRes["Result"]
  >("DescribeImageXCdnDurationAll", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXCdnReuseRateByTime
   */
  public DescribeImageXCdnReuseRateByTime = this.createAPI<
    types.DescribeImageXCdnReuseRateByTimeBody,
    types.DescribeImageXCdnReuseRateByTimeRes["Result"]
  >("DescribeImageXCdnReuseRateByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXCdnReuseRateAll
   */
  public DescribeImageXCdnReuseRateAll = this.createAPI<
    types.DescribeImageXCdnReuseRateAllBody,
    types.DescribeImageXCdnReuseRateAllRes["Result"]
  >("DescribeImageXCdnReuseRateAll", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXCdnProtocolRateByTime
   */
  public DescribeImageXCdnProtocolRateByTime = this.createAPI<
    types.DescribeImageXCdnProtocolRateByTimeBody,
    types.DescribeImageXCdnProtocolRateByTimeRes["Result"]
  >("DescribeImageXCdnProtocolRateByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientFailureRate
   */
  public DescribeImageXClientFailureRate = this.createAPI<
    types.DescribeImageXClientFailureRateBody,
    types.DescribeImageXClientFailureRateRes["Result"]
  >("DescribeImageXClientFailureRate", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientDecodeSuccessRateByTime
   */
  public DescribeImageXClientDecodeSuccessRateByTime = this.createAPI<
    types.DescribeImageXClientDecodeSuccessRateByTimeBody,
    types.DescribeImageXClientDecodeSuccessRateByTimeRes["Result"]
  >("DescribeImageXClientDecodeSuccessRateByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientDecodeDurationByTime
   */
  public DescribeImageXClientDecodeDurationByTime = this.createAPI<
    types.DescribeImageXClientDecodeDurationByTimeBody,
    types.DescribeImageXClientDecodeDurationByTimeRes["Result"]
  >("DescribeImageXClientDecodeDurationByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientQueueDurationByTime
   */
  public DescribeImageXClientQueueDurationByTime = this.createAPI<
    types.DescribeImageXClientQueueDurationByTimeBody,
    types.DescribeImageXClientQueueDurationByTimeRes["Result"]
  >("DescribeImageXClientQueueDurationByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientErrorCodeByTime
   */
  public DescribeImageXClientErrorCodeByTime = this.createAPI<
    types.DescribeImageXClientErrorCodeByTimeBody,
    types.DescribeImageXClientErrorCodeByTimeRes["Result"]
  >("DescribeImageXClientErrorCodeByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientErrorCodeAll
   */
  public DescribeImageXClientErrorCodeAll = this.createAPI<
    types.DescribeImageXClientErrorCodeAllBody,
    types.DescribeImageXClientErrorCodeAllRes["Result"]
  >("DescribeImageXClientErrorCodeAll", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientLoadDuration
   */
  public DescribeImageXClientLoadDuration = this.createAPI<
    types.DescribeImageXClientLoadDurationBody,
    types.DescribeImageXClientLoadDurationRes["Result"]
  >("DescribeImageXClientLoadDuration", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientLoadDurationAll
   */
  public DescribeImageXClientLoadDurationAll = this.createAPI<
    types.DescribeImageXClientLoadDurationAllBody,
    types.DescribeImageXClientLoadDurationAllRes["Result"]
  >("DescribeImageXClientLoadDurationAll", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientSdkVerByTime
   */
  public DescribeImageXClientSdkVerByTime = this.createAPI<
    types.DescribeImageXClientSdkVerByTimeBody,
    types.DescribeImageXClientSdkVerByTimeRes["Result"]
  >("DescribeImageXClientSdkVerByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientFileSize
   */
  public DescribeImageXClientFileSize = this.createAPI<
    types.DescribeImageXClientFileSizeBody,
    types.DescribeImageXClientFileSizeRes["Result"]
  >("DescribeImageXClientFileSize", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientTopFileSize
   */
  public DescribeImageXClientTopFileSize = this.createAPI<
    types.DescribeImageXClientTopFileSizeBody,
    types.DescribeImageXClientTopFileSizeRes["Result"]
  >("DescribeImageXClientTopFileSize", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientCountByTime
   */
  public DescribeImageXClientCountByTime = this.createAPI<
    types.DescribeImageXClientCountByTimeBody,
    types.DescribeImageXClientCountByTimeRes["Result"]
  >("DescribeImageXClientCountByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientQualityRateByTime
   */
  public DescribeImageXClientQualityRateByTime = this.createAPI<
    types.DescribeImageXClientQualityRateByTimeBody,
    types.DescribeImageXClientQualityRateByTimeRes["Result"]
  >("DescribeImageXClientQualityRateByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientTopQualityURL
   */
  public DescribeImageXClientTopQualityURL = this.createAPI<
    types.DescribeImageXClientTopQualityURLBody,
    types.DescribeImageXClientTopQualityURLRes["Result"]
  >("DescribeImageXClientTopQualityURL", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientDemotionRateByTime
   */
  public DescribeImageXClientDemotionRateByTime = this.createAPI<
    types.DescribeImageXClientDemotionRateByTimeBody,
    types.DescribeImageXClientDemotionRateByTimeRes["Result"]
  >("DescribeImageXClientDemotionRateByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientTopDemotionURL
   */
  public DescribeImageXClientTopDemotionURL = this.createAPI<
    types.DescribeImageXClientTopDemotionURLBody,
    types.DescribeImageXClientTopDemotionURLRes["Result"]
  >("DescribeImageXClientTopDemotionURL", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXClientScoreByTime
   */
  public DescribeImageXClientScoreByTime = this.createAPI<
    types.DescribeImageXClientScoreByTimeBody,
    types.DescribeImageXClientScoreByTimeRes["Result"]
  >("DescribeImageXClientScoreByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXSensibleCountByTime
   */
  public DescribeImageXSensibleCountByTime = this.createAPI<
    types.DescribeImageXSensibleCountByTimeBody,
    types.DescribeImageXSensibleCountByTimeRes["Result"]
  >("DescribeImageXSensibleCountByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXSensibleCacheHitRateByTime
   */
  public DescribeImageXSensibleCacheHitRateByTime = this.createAPI<
    types.DescribeImageXSensibleCacheHitRateByTimeBody,
    types.DescribeImageXSensibleCacheHitRateByTimeRes["Result"]
  >("DescribeImageXSensibleCacheHitRateByTime", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXSensibleTopSizeURL
   */
  public DescribeImageXSensibleTopSizeURL = this.createAPI<
    types.DescribeImageXSensibleTopSizeURLBody,
    types.DescribeImageXSensibleTopSizeURLRes["Result"]
  >("DescribeImageXSensibleTopSizeURL", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXSensibleTopResolutionURL
   */
  public DescribeImageXSensibleTopResolutionURL = this.createAPI<
    types.DescribeImageXSensibleTopResolutionURLBody,
    types.DescribeImageXSensibleTopResolutionURLRes["Result"]
  >("DescribeImageXSensibleTopResolutionURL", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXSensibleTopRamURL
   */
  public DescribeImageXSensibleTopRamURL = this.createAPI<
    types.DescribeImageXSensibleTopRamURLBody,
    types.DescribeImageXSensibleTopRamURLRes["Result"]
  >("DescribeImageXSensibleTopRamURL", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DescribeImageXSensibleTopUnknownURL
   */
  public DescribeImageXSensibleTopUnknownURL = this.createAPI<
    types.DescribeImageXSensibleTopUnknownURLBody,
    types.DescribeImageXSensibleTopUnknownURLRes["Result"]
  >("DescribeImageXSensibleTopUnknownURL", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function CreateBatchProcessTask
   */
  public CreateBatchProcessTask = this.createAPI<
    types.CreateBatchProcessTaskQuery & types.CreateBatchProcessTaskBody,
    types.CreateBatchProcessTaskRes["Result"]
  >("CreateBatchProcessTask", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetBatchProcessResult
   */
  public GetBatchProcessResult = this.createAPI<
    types.GetBatchProcessResultQuery & types.GetBatchProcessResultBody,
    types.GetBatchProcessResultRes["Result"]
  >("GetBatchProcessResult", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetBatchTaskInfo
   */
  public GetBatchTaskInfo = this.createAPI<
    types.GetBatchTaskInfoQuery,
    types.GetBatchTaskInfoRes["Result"]
  >("GetBatchTaskInfo", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["TaskId", "ServiceId"],
  });

  /**
   * @function UpdateImageResourceStatus
   */
  public UpdateImageResourceStatus = this.createAPI<
    types.UpdateImageResourceStatusQuery & types.UpdateImageResourceStatusBody,
    types.UpdateImageResourceStatusRes["Result"]
  >("UpdateImageResourceStatus", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateFileStorageClass
   */
  public UpdateFileStorageClass = this.createAPI<
    types.UpdateFileStorageClassQuery & types.UpdateFileStorageClassBody,
    types.UpdateFileStorageClassRes["Result"]
  >("UpdateFileStorageClass", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetImageStorageFiles
   */
  public GetImageStorageFiles = this.createAPI<
    types.GetImageStorageFilesQuery,
    types.GetImageStorageFilesRes["Result"]
  >("GetImageStorageFiles", {
    method: "GET",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId", "Marker", "Limit", "Prefix", "Delimiter"],
  });

  /**
   * @function DeleteImageUploadFiles
   */
  public DeleteImageUploadFiles = this.createAPI<
    types.DeleteImageUploadFilesQuery & types.DeleteImageUploadFilesBody,
    types.DeleteImageUploadFilesRes["Result"]
  >("DeleteImageUploadFiles", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function CreateFileRestore
   */
  public CreateFileRestore = this.createAPI<
    types.CreateFileRestoreQuery & types.CreateFileRestoreBody,
    types.CreateFileRestoreRes["Result"]
  >("CreateFileRestore", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateImageUploadFiles
   */
  public UpdateImageUploadFiles = this.createAPI<
    types.UpdateImageUploadFilesQuery & types.UpdateImageUploadFilesBody,
    types.UpdateImageUploadFilesRes["Result"]
  >("UpdateImageUploadFiles", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function CommitImageUpload
   */
  public CommitImageUpload = this.createAPI<
    types.CommitImageUploadQuery & types.CommitImageUploadBody,
    types.CommitImageUploadRes["Result"]
  >("CommitImageUpload", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId", "SkipMeta"],
  });

  /**
   * @function UpdateImageFileCT
   */
  public UpdateImageFileCT = this.createAPI<
    types.UpdateImageFileCTQuery & types.UpdateImageFileCTBody,
    types.UpdateImageFileCTRes["Result"]
  >("UpdateImageFileCT", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function ApplyImageUpload
   */
  public ApplyImageUpload = this.createAPI<
    types.ApplyImageUploadQuery,
    types.ApplyImageUploadRes["Result"]
  >("ApplyImageUpload", {
    method: "GET",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: [
      "ServiceId",
      "SessionKey",
      "UploadNum",
      "StoreKeys",
      "Prefix",
      "FileExtension",
      "Overwrite",
    ],
  });

  /**
   * @function GetImageUploadFile
   */
  public GetImageUploadFile = this.createAPI<
    types.GetImageUploadFileQuery,
    types.GetImageUploadFileRes["Result"]
  >("GetImageUploadFile", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId", "StoreUri"],
  });

  /**
   * @function GetImageUploadFiles
   */
  public GetImageUploadFiles = this.createAPI<
    types.GetImageUploadFilesQuery,
    types.GetImageUploadFilesRes["Result"]
  >("GetImageUploadFiles", {
    method: "GET",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId", "Limit", "Marker"],
  });

  /**
   * @function GetImageUpdateFiles
   */
  public GetImageUpdateFiles = this.createAPI<
    types.GetImageUpdateFilesQuery,
    types.GetImageUpdateFilesRes["Result"]
  >("GetImageUpdateFiles", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId", "Type", "UrlPattern", "Offset", "Limit"],
  });

  /**
   * @function PreviewImageUploadFile
   */
  public PreviewImageUploadFile = this.createAPI<
    types.PreviewImageUploadFileQuery,
    types.PreviewImageUploadFileRes["Result"]
  >("PreviewImageUploadFile", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId", "StoreUri"],
  });

  /**
   * @function GetImageService
   */
  public GetImageService = this.createAPI<
    types.GetImageServiceQuery,
    types.GetImageServiceRes["Result"]
  >("GetImageService", {
    method: "GET",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetAllImageServices
   */
  public GetAllImageServices = this.createAPI<
    types.GetAllImageServicesQuery,
    types.GetAllImageServicesRes["Result"]
  >("GetAllImageServices", {
    method: "GET",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["SearchPtn"],
  });

  /**
   * @function CreateImageCompressTask
   */
  public CreateImageCompressTask = this.createAPI<
    types.CreateImageCompressTaskQuery & types.CreateImageCompressTaskBody,
    types.CreateImageCompressTaskRes["Result"]
  >("CreateImageCompressTask", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function FetchImageUrl
   */
  public FetchImageUrl = this.createAPI<types.FetchImageUrlBody, types.FetchImageUrlRes["Result"]>(
    "FetchImageUrl",
    {
      method: "POST",
      contentType: "json",
      Version: "2023-05-01",
    }
  );

  /**
   * @function UpdateImageStorageTTL
   */
  public UpdateImageStorageTTL = this.createAPI<
    types.UpdateImageStorageTTLBody,
    types.UpdateImageStorageTTLRes["Result"]
  >("UpdateImageStorageTTL", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetCompressTaskInfo
   */
  public GetCompressTaskInfo = this.createAPI<
    types.GetCompressTaskInfoQuery,
    types.GetCompressTaskInfoRes["Result"]
  >("GetCompressTaskInfo", {
    method: "GET",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["TaskId", "ServiceId"],
  });

  /**
   * @function GetUrlFetchTask
   */
  public GetUrlFetchTask = this.createAPI<
    types.GetUrlFetchTaskQuery,
    types.GetUrlFetchTaskRes["Result"]
  >("GetUrlFetchTask", {
    method: "GET",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["Id", "ServiceId"],
  });

  /**
   * @function GetResourceURL
   */
  public GetResourceURL = this.createAPI<
    types.GetResourceURLQuery,
    types.GetResourceURLRes["Result"]
  >("GetResourceURL", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId", "Domain", "URI", "Tpl", "Proto", "Format", "Timestamp"],
  });

  /**
   * @function CreateImageFromUri
   */
  public CreateImageFromUri = this.createAPI<
    types.CreateImageFromUriQuery & types.CreateImageFromUriBody,
    types.CreateImageFromUriRes["Result"]
  >("CreateImageFromUri", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateImageFileKey
   */
  public UpdateImageFileKey = this.createAPI<
    types.UpdateImageFileKeyQuery & types.UpdateImageFileKeyBody,
    types.UpdateImageFileKeyRes["Result"]
  >("UpdateImageFileKey", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function CreateImageContentTask
   */
  public CreateImageContentTask = this.createAPI<
    types.CreateImageContentTaskBody,
    types.CreateImageContentTaskRes["Result"]
  >("CreateImageContentTask", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageContentTaskDetail
   */
  public GetImageContentTaskDetail = this.createAPI<
    types.GetImageContentTaskDetailBody,
    types.GetImageContentTaskDetailRes["Result"]
  >("GetImageContentTaskDetail", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageContentBlockList
   */
  public GetImageContentBlockList = this.createAPI<
    types.GetImageContentBlockListBody,
    types.GetImageContentBlockListRes["Result"]
  >("GetImageContentBlockList", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function CreateImageTranscodeQueue
   */
  public CreateImageTranscodeQueue = this.createAPI<
    types.CreateImageTranscodeQueueBody,
    types.CreateImageTranscodeQueueRes["Result"]
  >("CreateImageTranscodeQueue", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DeleteImageTranscodeQueue
   */
  public DeleteImageTranscodeQueue = this.createAPI<
    types.DeleteImageTranscodeQueueBody,
    types.DeleteImageTranscodeQueueRes["Result"]
  >("DeleteImageTranscodeQueue", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function UpdateImageTranscodeQueue
   */
  public UpdateImageTranscodeQueue = this.createAPI<
    types.UpdateImageTranscodeQueueBody,
    types.UpdateImageTranscodeQueueRes["Result"]
  >("UpdateImageTranscodeQueue", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function UpdateImageTranscodeQueueStatus
   */
  public UpdateImageTranscodeQueueStatus = this.createAPI<
    types.UpdateImageTranscodeQueueStatusBody,
    types.UpdateImageTranscodeQueueStatusRes["Result"]
  >("UpdateImageTranscodeQueueStatus", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageTranscodeQueues
   */
  public GetImageTranscodeQueues = this.createAPI<
    types.GetImageTranscodeQueuesQuery,
    types.GetImageTranscodeQueuesRes["Result"]
  >("GetImageTranscodeQueues", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Region", "SearchPtn", "Limit", "Offset"],
  });

  /**
   * @function CreateImageTranscodeTask
   */
  public CreateImageTranscodeTask = this.createAPI<
    types.CreateImageTranscodeTaskBody,
    types.CreateImageTranscodeTaskRes["Result"]
  >("CreateImageTranscodeTask", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageTranscodeDetails
   */
  public GetImageTranscodeDetails = this.createAPI<
    types.GetImageTranscodeDetailsQuery,
    types.GetImageTranscodeDetailsRes["Result"]
  >("GetImageTranscodeDetails", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: [
      "QueueId",
      "Region",
      "StartTime",
      "EndTime",
      "Status",
      "SearchPtn",
      "Limit",
      "Offset",
    ],
  });

  /**
   * @function CreateImageTranscodeCallback
   */
  public CreateImageTranscodeCallback = this.createAPI<
    types.CreateImageTranscodeCallbackBody,
    types.CreateImageTranscodeCallbackRes["Result"]
  >("CreateImageTranscodeCallback", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DeleteImageTranscodeDetail
   */
  public DeleteImageTranscodeDetail = this.createAPI<
    types.DeleteImageTranscodeDetailBody,
    types.DeleteImageTranscodeDetailRes["Result"]
  >("DeleteImageTranscodeDetail", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImagePSDetection
   */
  public GetImagePSDetection = this.createAPI<
    types.GetImagePSDetectionQuery & types.GetImagePSDetectionBody,
    types.GetImagePSDetectionRes["Result"]
  >("GetImagePSDetection", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetImageEraseResult
   */
  public GetImageEraseResult = this.createAPI<
    types.GetImageEraseResultBody,
    types.GetImageEraseResultRes["Result"]
  >("GetImageEraseResult", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageSuperResolutionResult
   */
  public GetImageSuperResolutionResult = this.createAPI<
    types.GetImageSuperResolutionResultBody,
    types.GetImageSuperResolutionResultRes["Result"]
  >("GetImageSuperResolutionResult", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetDenoisingImage
   */
  public GetDenoisingImage = this.createAPI<
    types.GetDenoisingImageQuery & types.GetDenoisingImageBody,
    types.GetDenoisingImageRes["Result"]
  >("GetDenoisingImage", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetImageDuplicateDetection
   */
  public GetImageDuplicateDetection = this.createAPI<
    types.GetImageDuplicateDetectionQuery & types.GetImageDuplicateDetectionBody,
    types.GetImageDuplicateDetectionRes["Result"]
  >("GetImageDuplicateDetection", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetImageOCRV2
   */
  public GetImageOCRV2 = this.createAPI<
    types.GetImageOCRV2Query & types.GetImageOCRV2Body,
    types.GetImageOCRV2Res["Result"]
  >("GetImageOCRV2", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetImageBgFillResult
   */
  public GetImageBgFillResult = this.createAPI<
    types.GetImageBgFillResultBody,
    types.GetImageBgFillResultRes["Result"]
  >("GetImageBgFillResult", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetSegmentImage
   */
  public GetSegmentImage = this.createAPI<
    types.GetSegmentImageQuery & types.GetSegmentImageBody,
    types.GetSegmentImageRes["Result"]
  >("GetSegmentImage", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetImageSmartCropResult
   */
  public GetImageSmartCropResult = this.createAPI<
    types.GetImageSmartCropResultBody,
    types.GetImageSmartCropResultRes["Result"]
  >("GetImageSmartCropResult", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageComicResult
   */
  public GetImageComicResult = this.createAPI<
    types.GetImageComicResultBody,
    types.GetImageComicResultRes["Result"]
  >("GetImageComicResult", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageEnhanceResult
   */
  public GetImageEnhanceResult = this.createAPI<
    types.GetImageEnhanceResultBody,
    types.GetImageEnhanceResultRes["Result"]
  >("GetImageEnhanceResult", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
  });

  /**
   * @function GetImageQuality
   */
  public GetImageQuality = this.createAPI<
    types.GetImageQualityQuery & types.GetImageQualityBody,
    types.GetImageQualityRes["Result"]
  >("GetImageQuality", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetLicensePlateDetection
   */
  public GetLicensePlateDetection = this.createAPI<
    types.GetLicensePlateDetectionQuery & types.GetLicensePlateDetectionBody,
    types.GetLicensePlateDetectionRes["Result"]
  >("GetLicensePlateDetection", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetPrivateImageType
   */
  public GetPrivateImageType = this.createAPI<
    types.GetPrivateImageTypeQuery & types.GetPrivateImageTypeBody,
    types.GetPrivateImageTypeRes["Result"]
  >("GetPrivateImageType", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function CreateCVImageGenerateTask
   */
  public CreateCVImageGenerateTask = this.createAPI<
    types.CreateCVImageGenerateTaskQuery & types.CreateCVImageGenerateTaskBody,
    types.CreateCVImageGenerateTaskRes["Result"]
  >("CreateCVImageGenerateTask", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function CreateHiddenWatermarkImage
   */
  public CreateHiddenWatermarkImage = this.createAPI<
    types.CreateHiddenWatermarkImageQuery & types.CreateHiddenWatermarkImageBody,
    types.CreateHiddenWatermarkImageRes["Result"]
  >("CreateHiddenWatermarkImage", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateImageExifData
   */
  public UpdateImageExifData = this.createAPI<
    types.UpdateImageExifDataQuery & types.UpdateImageExifDataBody,
    types.UpdateImageExifDataRes["Result"]
  >("UpdateImageExifData", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetImageDetectResult
   */
  public GetImageDetectResult = this.createAPI<
    types.GetImageDetectResultQuery & types.GetImageDetectResultBody,
    types.GetImageDetectResultRes["Result"]
  >("GetImageDetectResult", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetCVImageGenerateResult
   */
  public GetCVImageGenerateResult = this.createAPI<
    types.GetCVImageGenerateResultQuery & types.GetCVImageGenerateResultBody,
    types.GetCVImageGenerateResultRes["Result"]
  >("GetCVImageGenerateResult", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function CreateImageHmExtract
   */
  public CreateImageHmExtract = this.createAPI<
    types.CreateImageHmExtractQuery,
    types.CreateImageHmExtractRes["Result"]
  >("CreateImageHmExtract", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId", "StoreUri", "ImageUrl", "Algorithm"],
  });

  /**
   * @function GetCVTextGenerateImage
   */
  public GetCVTextGenerateImage = this.createAPI<
    types.GetCVTextGenerateImageQuery & types.GetCVTextGenerateImageBody,
    types.GetCVTextGenerateImageRes["Result"]
  >("GetCVTextGenerateImage", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetCVImageGenerateTask
   */
  public GetCVImageGenerateTask = this.createAPI<
    types.GetCVImageGenerateTaskQuery & types.GetCVImageGenerateTaskBody,
    types.GetCVImageGenerateTaskRes["Result"]
  >("GetCVImageGenerateTask", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function CreateImageHmEmbed
   */
  public CreateImageHmEmbed = this.createAPI<
    types.CreateImageHmEmbedBody,
    types.CreateImageHmEmbedRes["Result"]
  >("CreateImageHmEmbed", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetCVAnimeGenerateImage
   */
  public GetCVAnimeGenerateImage = this.createAPI<
    types.GetCVAnimeGenerateImageQuery & types.GetCVAnimeGenerateImageBody,
    types.GetCVAnimeGenerateImageRes["Result"]
  >("GetCVAnimeGenerateImage", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetComprehensiveEnhanceImage
   */
  public GetComprehensiveEnhanceImage = this.createAPI<
    types.GetComprehensiveEnhanceImageBody,
    types.GetComprehensiveEnhanceImageRes["Result"]
  >("GetComprehensiveEnhanceImage", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageAiGenerateTask
   */
  public GetImageAiGenerateTask = this.createAPI<
    types.GetImageAiGenerateTaskQuery,
    types.GetImageAiGenerateTaskRes["Result"]
  >("GetImageAiGenerateTask", {
    method: "GET",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["TaskId", "ServiceId"],
  });

  /**
   * @function GetProductAIGCResult
   */
  public GetProductAIGCResult = this.createAPI<
    types.GetProductAIGCResultQuery & types.GetProductAIGCResultBody,
    types.GetProductAIGCResultRes["Result"]
  >("GetProductAIGCResult", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetImageEraseModels
   */
  public GetImageEraseModels = this.createAPI<
    types.GetImageEraseModelsQuery,
    types.GetImageEraseModelsRes["Result"]
  >("GetImageEraseModels", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Type"],
  });

  /**
   * @function GetDedupTaskStatus
   */
  public GetDedupTaskStatus = this.createAPI<
    types.GetDedupTaskStatusQuery,
    types.GetDedupTaskStatusRes["Result"]
  >("GetDedupTaskStatus", {
    method: "GET",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["TaskId"],
  });

  /**
   * @function CreateImageService
   */
  public CreateImageService = this.createAPI<
    types.CreateImageServiceBody,
    types.CreateImageServiceRes["Result"]
  >("CreateImageService", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DeleteImageService
   */
  public DeleteImageService = this.createAPI<
    types.DeleteImageServiceQuery,
    types.DeleteImageServiceRes["Result"]
  >("DeleteImageService", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateImageAuthKey
   */
  public UpdateImageAuthKey = this.createAPI<
    types.UpdateImageAuthKeyQuery & types.UpdateImageAuthKeyBody,
    types.UpdateImageAuthKeyRes["Result"]
  >("UpdateImageAuthKey", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateResEventRule
   */
  public UpdateResEventRule = this.createAPI<
    types.UpdateResEventRuleQuery & types.UpdateResEventRuleBody,
    types.UpdateResEventRuleRes["Result"]
  >("UpdateResEventRule", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateServiceName
   */
  public UpdateServiceName = this.createAPI<
    types.UpdateServiceNameQuery & types.UpdateServiceNameBody,
    types.UpdateServiceNameRes["Result"]
  >("UpdateServiceName", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateStorageRules
   */
  public UpdateStorageRules = this.createAPI<
    types.UpdateStorageRulesQuery & types.UpdateStorageRulesBody,
    types.UpdateStorageRulesRes["Result"]
  >("UpdateStorageRules", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateImageObjectAccess
   */
  public UpdateImageObjectAccess = this.createAPI<
    types.UpdateImageObjectAccessQuery & types.UpdateImageObjectAccessBody,
    types.UpdateImageObjectAccessRes["Result"]
  >("UpdateImageObjectAccess", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateImageUploadOverwrite
   */
  public UpdateImageUploadOverwrite = this.createAPI<
    types.UpdateImageUploadOverwriteQuery & types.UpdateImageUploadOverwriteBody,
    types.UpdateImageUploadOverwriteRes["Result"]
  >("UpdateImageUploadOverwrite", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateImageMirrorConf
   */
  public UpdateImageMirrorConf = this.createAPI<
    types.UpdateImageMirrorConfQuery & types.UpdateImageMirrorConfBody,
    types.UpdateImageMirrorConfRes["Result"]
  >("UpdateImageMirrorConf", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetImageServiceSubscription
   */
  public GetImageServiceSubscription = this.createAPI<
    types.GetImageServiceSubscriptionQuery,
    types.GetImageServiceSubscriptionRes["Result"]
  >("GetImageServiceSubscription", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["AddOnType", "AddOnId", "AddOnKey"],
  });

  /**
   * @function GetImageAuthKey
   */
  public GetImageAuthKey = this.createAPI<
    types.GetImageAuthKeyQuery,
    types.GetImageAuthKeyRes["Result"]
  >("GetImageAuthKey", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function CreateImageAnalyzeTask
   */
  public CreateImageAnalyzeTask = this.createAPI<
    types.CreateImageAnalyzeTaskBody,
    types.CreateImageAnalyzeTaskRes["Result"]
  >("CreateImageAnalyzeTask", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DeleteImageAnalyzeTaskRun
   */
  public DeleteImageAnalyzeTaskRun = this.createAPI<
    types.DeleteImageAnalyzeTaskRunBody,
    types.DeleteImageAnalyzeTaskRunRes["Result"]
  >("DeleteImageAnalyzeTaskRun", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DeleteImageAnalyzeTask
   */
  public DeleteImageAnalyzeTask = this.createAPI<
    types.DeleteImageAnalyzeTaskBody,
    types.DeleteImageAnalyzeTaskRes["Result"]
  >("DeleteImageAnalyzeTask", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function UpdateImageAnalyzeTaskStatus
   */
  public UpdateImageAnalyzeTaskStatus = this.createAPI<
    types.UpdateImageAnalyzeTaskStatusBody,
    types.UpdateImageAnalyzeTaskStatusRes["Result"]
  >("UpdateImageAnalyzeTaskStatus", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function UpdateImageAnalyzeTask
   */
  public UpdateImageAnalyzeTask = this.createAPI<
    types.UpdateImageAnalyzeTaskBody,
    types.UpdateImageAnalyzeTaskRes["Result"]
  >("UpdateImageAnalyzeTask", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageAnalyzeTasks
   */
  public GetImageAnalyzeTasks = this.createAPI<
    types.GetImageAnalyzeTasksQuery,
    types.GetImageAnalyzeTasksRes["Result"]
  >("GetImageAnalyzeTasks", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Region", "SearchPtn", "Limit", "Offset"],
  });

  /**
   * @function GetImageAnalyzeResult
   */
  public GetImageAnalyzeResult = this.createAPI<
    types.GetImageAnalyzeResultQuery,
    types.GetImageAnalyzeResultRes["Result"]
  >("GetImageAnalyzeResult", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["TaskId", "StartTime", "EndTime", "RunId", "Limit", "Offset", "File"],
  });

  /**
   * @function DeleteImageElements
   */
  public DeleteImageElements = this.createAPI<
    types.DeleteImageElementsBody,
    types.DeleteImageElementsRes["Result"]
  >("DeleteImageElements", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DeleteImageBackgroundColors
   */
  public DeleteImageBackgroundColors = this.createAPI<
    types.DeleteImageBackgroundColorsBody,
    types.DeleteImageBackgroundColorsRes["Result"]
  >("DeleteImageBackgroundColors", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DeleteImageStyle
   */
  public DeleteImageStyle = this.createAPI<
    types.DeleteImageStyleBody,
    types.DeleteImageStyleRes["Result"]
  >("DeleteImageStyle", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function CreateImageStyle
   */
  public CreateImageStyle = this.createAPI<
    types.CreateImageStyleBody,
    types.CreateImageStyleRes["Result"]
  >("CreateImageStyle", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function UpdateImageStyleMeta
   */
  public UpdateImageStyleMeta = this.createAPI<
    types.UpdateImageStyleMetaBody,
    types.UpdateImageStyleMetaRes["Result"]
  >("UpdateImageStyleMeta", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function AddImageElements
   */
  public AddImageElements = this.createAPI<
    types.AddImageElementsBody,
    types.AddImageElementsRes["Result"]
  >("AddImageElements", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function AddImageBackgroundColors
   */
  public AddImageBackgroundColors = this.createAPI<
    types.AddImageBackgroundColorsBody,
    types.AddImageBackgroundColorsRes["Result"]
  >("AddImageBackgroundColors", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function UpdateImageStyle
   */
  public UpdateImageStyle = this.createAPI<
    types.UpdateImageStyleBody,
    types.UpdateImageStyleRes["Result"]
  >("UpdateImageStyle", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
  });

  /**
   * @function GetImageFonts
   */
  public GetImageFonts = this.createAPI<Record<string, any>, types.GetImageFontsRes["Result"]>(
    "GetImageFonts",
    {
      method: "GET",
      contentType: "json",
      Version: "2023-05-01",
    }
  );

  /**
   * @function GetImageElements
   */
  public GetImageElements = this.createAPI<
    types.GetImageElementsQuery,
    types.GetImageElementsRes["Result"]
  >("GetImageElements", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Type", "SearchPtn", "Limit", "Offset"],
  });

  /**
   * @function GetImageBackgroundColors
   */
  public GetImageBackgroundColors = this.createAPI<
    Record<string, any>,
    types.GetImageBackgroundColorsRes["Result"]
  >("GetImageBackgroundColors", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageStyles
   */
  public GetImageStyles = this.createAPI<
    types.GetImageStylesQuery,
    types.GetImageStylesRes["Result"]
  >("GetImageStyles", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Type", "SearchPtn", "Limit", "Offset"],
  });

  /**
   * @function GetImageStyleDetail
   */
  public GetImageStyleDetail = this.createAPI<
    types.GetImageStyleDetailQuery,
    types.GetImageStyleDetailRes["Result"]
  >("GetImageStyleDetail", {
    method: "GET",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["StyleId"],
  });

  /**
   * @function GetImageStyleResult
   */
  public GetImageStyleResult = this.createAPI<
    types.GetImageStyleResultQuery & types.GetImageStyleResultBody,
    types.GetImageStyleResultRes["Result"]
  >("GetImageStyleResult", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function DownloadCert
   */
  public DownloadCert = this.createAPI<types.DownloadCertQuery, types.DownloadCertRes["Result"]>(
    "DownloadCert",
    {
      method: "GET",
      contentType: "json",
      Version: "2023-05-01",
      queryKeys: ["CertID"],
    }
  );

  /**
   * @function GetImageAllDomainCert
   */
  public GetImageAllDomainCert = this.createAPI<
    Record<string, any>,
    types.GetImageAllDomainCertRes["Result"]
  >("GetImageAllDomainCert", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetCertInfo
   */
  public GetCertInfo = this.createAPI<types.GetCertInfoQuery, types.GetCertInfoRes["Result"]>(
    "GetCertInfo",
    {
      method: "GET",
      contentType: "json",
      Version: "2023-05-01",
      queryKeys: ["CertID"],
    }
  );

  /**
   * @function GetAllCerts
   */
  public GetAllCerts = this.createAPI<Record<string, any>, types.GetAllCertsRes["Result"]>(
    "GetAllCerts",
    {
      method: "GET",
      contentType: "json",
      Version: "2023-05-01",
    }
  );

  /**
   * @function CreateImageTemplate
   */
  public CreateImageTemplate = this.createAPI<
    types.CreateImageTemplateQuery & types.CreateImageTemplateBody,
    types.CreateImageTemplateRes["Result"]
  >("CreateImageTemplate", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function DeleteTemplatesFromBin
   */
  public DeleteTemplatesFromBin = this.createAPI<
    types.DeleteTemplatesFromBinQuery & types.DeleteTemplatesFromBinBody,
    types.DeleteTemplatesFromBinRes["Result"]
  >("DeleteTemplatesFromBin", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function DeleteImageTemplate
   */
  public DeleteImageTemplate = this.createAPI<
    types.DeleteImageTemplateQuery & types.DeleteImageTemplateBody,
    types.DeleteImageTemplateRes["Result"]
  >("DeleteImageTemplate", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function CreateImageTemplatesByImport
   */
  public CreateImageTemplatesByImport = this.createAPI<
    types.CreateImageTemplatesByImportBody,
    types.CreateImageTemplatesByImportRes["Result"]
  >("CreateImageTemplatesByImport", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function CreateTemplatesFromBin
   */
  public CreateTemplatesFromBin = this.createAPI<
    types.CreateTemplatesFromBinQuery & types.CreateTemplatesFromBinBody,
    types.CreateTemplatesFromBinRes["Result"]
  >("CreateTemplatesFromBin", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetImageTemplate
   */
  public GetImageTemplate = this.createAPI<
    types.GetImageTemplateQuery,
    types.GetImageTemplateRes["Result"]
  >("GetImageTemplate", {
    method: "GET",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId", "TemplateName"],
  });

  /**
   * @function GetTemplatesFromBin
   */
  public GetTemplatesFromBin = this.createAPI<
    types.GetTemplatesFromBinQuery,
    types.GetTemplatesFromBinRes["Result"]
  >("GetTemplatesFromBin", {
    method: "GET",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId", "TemplateNamePattern", "Offset", "Limit", "Asc"],
  });

  /**
   * @function GetAllImageTemplates
   */
  public GetAllImageTemplates = this.createAPI<
    types.GetAllImageTemplatesQuery,
    types.GetAllImageTemplatesRes["Result"]
  >("GetAllImageTemplates", {
    method: "GET",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId", "TemplateNamePattern", "Offset", "Limit", "Asc"],
  });

  /**
   * @function CreateImageAuditTask
   */
  public CreateImageAuditTask = this.createAPI<
    types.CreateImageAuditTaskBody,
    types.CreateImageAuditTaskRes["Result"]
  >("CreateImageAuditTask", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function DeleteImageAuditResult
   */
  public DeleteImageAuditResult = this.createAPI<
    types.DeleteImageAuditResultBody,
    types.DeleteImageAuditResultRes["Result"]
  >("DeleteImageAuditResult", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetSyncAuditResult
   */
  public GetSyncAuditResult = this.createAPI<
    types.GetSyncAuditResultBody,
    types.GetSyncAuditResultRes["Result"]
  >("GetSyncAuditResult", {
    method: "POST",
    contentType: "json",
    Version: "2018-08-01",
  });

  /**
   * @function UpdateImageAuditTaskStatus
   */
  public UpdateImageAuditTaskStatus = this.createAPI<
    types.UpdateImageAuditTaskStatusBody,
    types.UpdateImageAuditTaskStatusRes["Result"]
  >("UpdateImageAuditTaskStatus", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function UpdateImageAuditTask
   */
  public UpdateImageAuditTask = this.createAPI<
    types.UpdateImageAuditTaskBody,
    types.UpdateImageAuditTaskRes["Result"]
  >("UpdateImageAuditTask", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function UpdateAuditImageStatus
   */
  public UpdateAuditImageStatus = this.createAPI<
    types.UpdateAuditImageStatusBody,
    types.UpdateAuditImageStatusRes["Result"]
  >("UpdateAuditImageStatus", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageAuditTasks
   */
  public GetImageAuditTasks = this.createAPI<
    types.GetImageAuditTasksQuery,
    types.GetImageAuditTasksRes["Result"]
  >("GetImageAuditTasks", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Region", "Type", "AuditAbility", "Status", "TaskType", "Limit", "Offset"],
  });

  /**
   * @function GetImageAuditResult
   */
  public GetImageAuditResult = this.createAPI<
    types.GetImageAuditResultQuery,
    types.GetImageAuditResultRes["Result"]
  >("GetImageAuditResult", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["TaskId", "Type", "Problem", "ImageType", "AuditSuggestion", "Limit", "Marker"],
  });

  /**
   * @function GetAuditEntrysCount
   */
  public GetAuditEntrysCount = this.createAPI<
    types.GetAuditEntrysCountQuery,
    types.GetAuditEntrysCountRes["Result"]
  >("GetAuditEntrysCount", {
    method: "GET",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["TaskId"],
  });

  /**
   * @function CreateImageRetryAuditTask
   */
  public CreateImageRetryAuditTask = this.createAPI<
    types.CreateImageRetryAuditTaskBody,
    types.CreateImageRetryAuditTaskRes["Result"]
  >("CreateImageRetryAuditTask", {
    method: "POST",
    contentType: "json",
    Version: "2023-05-01",
  });
}
