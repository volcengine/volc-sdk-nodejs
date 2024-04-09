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
   * @function DelDomain
   */
  public DelDomain = this.createAPI<
    types.DelDomainQuery & types.DelDomainBody,
    types.DelDomainRes["Result"]
  >("DelDomain", {
    method: "post",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateRefer
   */
  public UpdateRefer = this.createAPI<
    types.UpdateReferQuery & types.UpdateReferBody,
    types.UpdateReferRes["Result"]
  >("UpdateRefer", {
    method: "post",
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
    method: "post",
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
    method: "post",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function SetDefaultDomain
   */
  public SetDefaultDomain = this.createAPI<
    types.SetDefaultDomainBody,
    types.SetDefaultDomainRes["Result"]
  >("SetDefaultDomain", {
    method: "post",
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
    method: "post",
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
    method: "get",
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
    method: "get",
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
    method: "get",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function CreateImageMigrateTask
   */
  public CreateImageMigrateTask = this.createAPI<
    types.CreateImageMigrateTaskBody,
    types.CreateImageMigrateTaskRes["Result"]
  >("CreateImageMigrateTask", {
    method: "post",
    contentType: "json",
    Version: "2018-08-01",
  });

  /**
   * @function DeleteImageMigrateTask
   */
  public DeleteImageMigrateTask = this.createAPI<
    types.DeleteImageMigrateTaskQuery,
    types.DeleteImageMigrateTaskRes["Result"]
  >("DeleteImageMigrateTask", {
    method: "post",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["Region", "TaskId"],
  });

  /**
   * @function ExportFailedMigrateTask
   */
  public ExportFailedMigrateTask = this.createAPI<
    types.ExportFailedMigrateTaskQuery,
    types.ExportFailedMigrateTaskRes["Result"]
  >("ExportFailedMigrateTask", {
    method: "get",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["Region", "TaskId"],
  });

  /**
   * @function UpdateImageTaskStrategy
   */
  public UpdateImageTaskStrategy = this.createAPI<
    types.UpdateImageTaskStrategyBody,
    types.UpdateImageTaskStrategyRes["Result"]
  >("UpdateImageTaskStrategy", {
    method: "post",
    contentType: "json",
    Version: "2018-08-01",
  });

  /**
   * @function TerminateImageMigrateTask
   */
  public TerminateImageMigrateTask = this.createAPI<
    types.TerminateImageMigrateTaskQuery,
    types.TerminateImageMigrateTaskRes["Result"]
  >("TerminateImageMigrateTask", {
    method: "post",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["Region", "TaskId"],
  });

  /**
   * @function GetVendorBuckets
   */
  public GetVendorBuckets = this.createAPI<
    types.GetVendorBucketsBody,
    types.GetVendorBucketsRes["Result"]
  >("GetVendorBuckets", {
    method: "post",
    contentType: "json",
    Version: "2018-08-01",
  });

  /**
   * @function GetImageMigrateTasks
   */
  public GetImageMigrateTasks = this.createAPI<
    types.GetImageMigrateTasksQuery,
    types.GetImageMigrateTasksRes["Result"]
  >("GetImageMigrateTasks", {
    method: "get",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["Region", "TaskId", "ServiceId", "Offset", "Limit", "TaskNamePtn", "Status"],
  });

  /**
   * @function RerunImageMigrateTask
   */
  public RerunImageMigrateTask = this.createAPI<
    types.RerunImageMigrateTaskQuery,
    types.RerunImageMigrateTaskRes["Result"]
  >("RerunImageMigrateTask", {
    method: "post",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["Region", "TaskId"],
  });

  /**
   * @function DescribeImageXBucketRetrievalUsage
   */
  public DescribeImageXBucketRetrievalUsage = this.createAPI<
    types.DescribeImageXBucketRetrievalUsageQuery,
    types.DescribeImageXBucketRetrievalUsageRes["Result"]
  >("DescribeImageXBucketRetrievalUsage", {
    method: "get",
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
    method: "get",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Timestamp", "ServiceIds"],
  });

  /**
   * @function DescribeImageXDomainTrafficData
   */
  public DescribeImageXDomainTrafficData = this.createAPI<
    types.DescribeImageXDomainTrafficDataQuery,
    types.DescribeImageXDomainTrafficDataRes["Result"]
  >("DescribeImageXDomainTrafficData", {
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "get",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceIds", "StartTime", "EndTime", "Interval"],
  });

  /**
   * @function DescribeImageXCompressUsage
   */
  public DescribeImageXCompressUsage = this.createAPI<
    types.DescribeImageXCompressUsageQuery,
    types.DescribeImageXCompressUsageRes["Result"]
  >("DescribeImageXCompressUsage", {
    method: "get",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceIds", "StartTime", "EndTime", "Interval"],
  });

  /**
   * @function DescribeImageXScreenshotUsage
   */
  public DescribeImageXScreenshotUsage = this.createAPI<
    types.DescribeImageXScreenshotUsageQuery,
    types.DescribeImageXScreenshotUsageRes["Result"]
  >("DescribeImageXScreenshotUsage", {
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "get",
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
   * @function DescribeImageXExceedResolutionRatioAll
   */
  public DescribeImageXExceedResolutionRatioAll = this.createAPI<
    types.DescribeImageXExceedResolutionRatioAllBody,
    types.DescribeImageXExceedResolutionRatioAllRes["Result"]
  >("DescribeImageXExceedResolutionRatioAll", {
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "get",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["Dim", "Source", "Appid", "OS"],
  });

  /**
   * @function DescribeImageXUploadCountByTime
   */
  public DescribeImageXUploadCountByTime = this.createAPI<
    types.DescribeImageXUploadCountByTimeBody,
    types.DescribeImageXUploadCountByTimeRes["Result"]
  >("DescribeImageXUploadCountByTime", {
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function UpdateImageResourceStatus
   */
  public UpdateImageResourceStatus = this.createAPI<
    types.UpdateImageResourceStatusQuery & types.UpdateImageResourceStatusBody,
    types.UpdateImageResourceStatusRes["Result"]
  >("UpdateImageResourceStatus", {
    method: "post",
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
    method: "get",
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
    method: "post",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateImageUploadFiles
   */
  public UpdateImageUploadFiles = this.createAPI<
    types.UpdateImageUploadFilesQuery & types.UpdateImageUploadFilesBody,
    types.UpdateImageUploadFilesRes["Result"]
  >("UpdateImageUploadFiles", {
    method: "post",
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
    method: "post",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId", "SkipMeta"],
  });

  /**
   * @function ApplyImageUpload
   */
  public ApplyImageUpload = this.createAPI<
    types.ApplyImageUploadQuery,
    types.ApplyImageUploadRes["Result"]
  >("ApplyImageUpload", {
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "get",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId", "StoreUri"],
  });

  /**
   * @function GetImageServiceSubscription
   */
  public GetImageServiceSubscription = this.createAPI<
    Record<string, any>,
    types.GetImageServiceSubscriptionRes["Result"]
  >("GetImageServiceSubscription", {
    method: "get",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageService
   */
  public GetImageService = this.createAPI<
    types.GetImageServiceQuery,
    types.GetImageServiceRes["Result"]
  >("GetImageService", {
    method: "get",
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
    method: "get",
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
    method: "post",
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
      method: "post",
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
    method: "post",
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
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "post",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateImageFileKey
   */
  public UpdateImageFileKey = this.createAPI<
    types.UpdateImageFileKeyQuery & types.UpdateImageFileKeyBody,
    types.UpdateImageFileKeyRes["Result"]
  >("UpdateImageFileKey", {
    method: "post",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function CreateImageContentTask
   */
  public CreateImageContentTask = this.createAPI<
    types.CreateImageContentTaskQuery & types.CreateImageContentTaskBody,
    types.CreateImageContentTaskRes["Result"]
  >("CreateImageContentTask", {
    method: "post",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetImageContentTaskDetail
   */
  public GetImageContentTaskDetail = this.createAPI<
    types.GetImageContentTaskDetailBody,
    types.GetImageContentTaskDetailRes["Result"]
  >("GetImageContentTaskDetail", {
    method: "post",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageContentBlockList
   */
  public GetImageContentBlockList = this.createAPI<
    types.GetImageContentBlockListQuery & types.GetImageContentBlockListBody,
    types.GetImageContentBlockListRes["Result"]
  >("GetImageContentBlockList", {
    method: "post",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function CreateImageTranscodeQueue
   */
  public CreateImageTranscodeQueue = this.createAPI<
    types.CreateImageTranscodeQueueBody,
    types.CreateImageTranscodeQueueRes["Result"]
  >("CreateImageTranscodeQueue", {
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "get",
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
    method: "post",
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
    method: "get",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageDuplicateDetection
   */
  public GetImageDuplicateDetection = this.createAPI<
    types.GetImageDuplicateDetectionQuery & types.GetImageDuplicateDetectionBody,
    types.GetImageDuplicateDetectionRes["Result"]
  >("GetImageDuplicateDetection", {
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetPrivateImageType
   */
  public GetPrivateImageType = this.createAPI<
    types.GetPrivateImageTypeQuery & types.GetPrivateImageTypeBody,
    types.GetPrivateImageTypeRes["Result"]
  >("GetPrivateImageType", {
    method: "post",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function CreateHiddenWatermarkImage
   */
  public CreateHiddenWatermarkImage = this.createAPI<
    types.CreateHiddenWatermarkImageQuery & types.CreateHiddenWatermarkImageBody,
    types.CreateHiddenWatermarkImageRes["Result"]
  >("CreateHiddenWatermarkImage", {
    method: "post",
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
    method: "post",
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
    method: "post",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId", "StoreUri", "Algorithm", "ImageUrl"],
  });

  /**
   * @function CreateImageHmEmbed
   */
  public CreateImageHmEmbed = this.createAPI<
    types.CreateImageHmEmbedBody,
    types.CreateImageHmEmbedRes["Result"]
  >("CreateImageHmEmbed", {
    method: "post",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetComprehensiveEnhanceImage
   */
  public GetComprehensiveEnhanceImage = this.createAPI<
    types.GetComprehensiveEnhanceImageBody,
    types.GetComprehensiveEnhanceImageRes["Result"]
  >("GetComprehensiveEnhanceImage", {
    method: "post",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function GetImageEraseModels
   */
  public GetImageEraseModels = this.createAPI<
    types.GetImageEraseModelsQuery,
    types.GetImageEraseModelsRes["Result"]
  >("GetImageEraseModels", {
    method: "get",
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
    method: "get",
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
    method: "post",
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
    method: "post",
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
    method: "post",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateServiceName
   */
  public UpdateServiceName = this.createAPI<
    types.UpdateServiceNameQuery & types.UpdateServiceNameBody,
    types.UpdateServiceNameRes["Result"]
  >("UpdateServiceName", {
    method: "post",
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
    method: "post",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function UpdateImageMirrorConf
   */
  public UpdateImageMirrorConf = this.createAPI<
    types.UpdateImageMirrorConfQuery & types.UpdateImageMirrorConfBody,
    types.UpdateImageMirrorConfRes["Result"]
  >("UpdateImageMirrorConf", {
    method: "post",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function GetImageAuthKey
   */
  public GetImageAuthKey = this.createAPI<
    types.GetImageAuthKeyQuery,
    types.GetImageAuthKeyRes["Result"]
  >("GetImageAuthKey", {
    method: "get",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "get",
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
    method: "get",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["TaskId", "StartTime", "EndTime", "RunId", "Limit", "Offset", "File"],
  });

  /**
   * @function GetImageStyleResult
   */
  public GetImageStyleResult = this.createAPI<
    types.GetImageStyleResultQuery & types.GetImageStyleResultBody,
    types.GetImageStyleResultRes["Result"]
  >("GetImageStyleResult", {
    method: "post",
    contentType: "json",
    Version: "2018-08-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function CreateImageTemplate
   */
  public CreateImageTemplate = this.createAPI<
    types.CreateImageTemplateQuery & types.CreateImageTemplateBody,
    types.CreateImageTemplateRes["Result"]
  >("CreateImageTemplate", {
    method: "post",
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
    method: "post",
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
    method: "post",
    contentType: "json",
    Version: "2023-05-01",
    queryKeys: ["ServiceId"],
  });

  /**
   * @function CreateTemplatesFromBin
   */
  public CreateTemplatesFromBin = this.createAPI<
    types.CreateTemplatesFromBinQuery & types.CreateTemplatesFromBinBody,
    types.CreateTemplatesFromBinRes["Result"]
  >("CreateTemplatesFromBin", {
    method: "post",
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
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "post",
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
    method: "post",
    contentType: "json",
    Version: "2023-05-01",
  });

  /**
   * @function UpdateImageAuditTaskStatus
   */
  public UpdateImageAuditTaskStatus = this.createAPI<
    types.UpdateImageAuditTaskStatusBody,
    types.UpdateImageAuditTaskStatusRes["Result"]
  >("UpdateImageAuditTaskStatus", {
    method: "post",
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
    method: "post",
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
    method: "post",
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
    method: "get",
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
    method: "get",
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
    method: "get",
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
    method: "post",
    contentType: "json",
    Version: "2023-05-01",
  });
}
