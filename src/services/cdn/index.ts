import Service from "../../base/service";
import { ServiceOptionsBase } from "../../base/types";

export class CdnService extends Service {
  constructor(options?: ServiceOptionsBase) {
    super({
      host: "cdn.volcengineapi.com",
      serviceName: "cdn",
      defaultVersion: "2021-03-01",
      ...options,
    });
  }

  Generic = async (name: string, body: Record<string, unknown>) => {
    return await this.fetchOpenAPI({
      Action: name,
      Version: "2021-03-01",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: body,
    });
  };

  // 添加加速域名: https://www.volcengine.com/docs/6454/97340
  AddCdnDomain = (body: Record<string, unknown>) => {
    return this.Generic("AddCdnDomain", body);
  };

  // 上线加速域名: https://www.volcengine.com/docs/6454/74667
  StartCdnDomain = (body: Record<string, unknown>) => {
    return this.Generic("StartCdnDomain", body);
  };

  // 下线加速域名: https://www.volcengine.com/docs/6454/75129
  StopCdnDomain = (body: Record<string, unknown>) => {
    return this.Generic("StopCdnDomain", body);
  };

  // 删除加速域名: https://www.volcengine.com/docs/6454/75130
  DeleteCdnDomain = (body: Record<string, unknown>) => {
    return this.Generic("DeleteCdnDomain", body);
  };

  // 获取域名列表: https://www.volcengine.com/docs/6454/75269
  ListCdnDomains = (body: Record<string, unknown>) => {
    return this.Generic("ListCdnDomains", body);
  };

  // 获取域名配置详情: https://www.volcengine.com/docs/6454/80320
  DescribeCdnConfig = (body: Record<string, unknown>) => {
    return this.Generic("DescribeCdnConfig", body);
  };

  // 修改加速域名配置: https://www.volcengine.com/docs/6454/97266
  UpdateCdnConfig = (body: Record<string, unknown>) => {
    return this.Generic("UpdateCdnConfig", body);
  };

  // 获取访问统计的细分数据: https://www.volcengine.com/docs/6454/70442
  DescribeCdnData = (body: Record<string, unknown>) => {
    return this.Generic("DescribeCdnData", body);
  };

  // 获取访问统计的汇总数据: https://www.volcengine.com/docs/6454/96132
  DescribeEdgeNrtDataSummary = (body: Record<string, unknown>) => {
    return this.Generic("DescribeEdgeNrtDataSummary", body);
  };

  // 获取回源统计的细分数据: https://www.volcengine.com/docs/6454/70443
  DescribeCdnOriginData = (body: Record<string, unknown>) => {
    return this.Generic("DescribeCdnOriginData", body);
  };

  // 获取回源统计的汇总数据: https://www.volcengine.com/docs/6454/96133
  DescribeOriginNrtDataSummary = (body: Record<string, unknown>) => {
    return this.Generic("DescribeOriginNrtDataSummary", body);
  };

  // 获取省份运营商的细分数据: https://www.volcengine.com/docs/6454/75159
  DescribeCdnDataDetail = (body: Record<string, unknown>) => {
    return this.Generic("DescribeCdnDataDetail", body);
  };

  // 获取多个域名的省份和运营商的细分数据: https://www.volcengine.com/docs/6454/145577
  DescribeDistrictIspData = (body: Record<string, unknown>) => {
    return this.Generic("DescribeDistrictIspData", body);
  };

  // 获取独立访客的细分数据: https://www.volcengine.com/docs/6454/79321
  DescribeEdgeStatisticalData = (body: Record<string, unknown>) => {
    return this.Generic("DescribeEdgeStatisticalData", body);
  };

  // 获取访问统计的排行数据: https://www.volcengine.com/docs/6454/96145
  DescribeEdgeTopNrtData = (body: Record<string, unknown>) => {
    return this.Generic("DescribeEdgeTopNrtData", body);
  };

  // 获取回源数据的统计排序: https://www.volcengine.com/docs/6454/104892
  DescribeOriginTopNrtData = (body: Record<string, unknown>) => {
    return this.Generic("DescribeOriginTopNrtData", body);
  };

  // 获取访问状态码的统计排序: https://www.volcengine.com/docs/6454/104888
  DescribeEdgeTopStatusCode = (body: Record<string, unknown>) => {
    return this.Generic("DescribeEdgeTopStatusCode", body);
  };

  // 获取回源状态码的统计排序: https://www.volcengine.com/docs/6454/104891
  DescribeOriginTopStatusCode = (body: Record<string, unknown>) => {
    return this.Generic("DescribeOriginTopStatusCode", body);
  };

  // 获取热点及访客排行数据: https://www.volcengine.com/docs/6454/79322
  DescribeEdgeTopStatisticalData = (body: Record<string, unknown>) => {
    return this.Generic("DescribeEdgeTopStatisticalData", body);
  };

  // 获取区域和 ISP 列表: https://www.volcengine.com/docs/6454/70445
  DescribeCdnRegionAndIsp = (body: Record<string, unknown>) => {
    return this.Generic("DescribeCdnRegionAndIsp", body);
  };

  // 获取服务相关信息: https://www.volcengine.com/docs/6454/78999
  DescribeCdnService = (body: Record<string, unknown>) => {
    return this.Generic("DescribeCdnService", body);
  };

  // 获取计费指标的细分数据: https://www.volcengine.com/docs/6454/96167
  DescribeAccountingData = (body: Record<string, unknown>) => {
    return this.Generic("DescribeAccountingData", body);
  };

  // 提交刷新任务: https://www.volcengine.com/docs/6454/70438
  SubmitRefreshTask = (body: Record<string, unknown>) => {
    return this.Generic("SubmitRefreshTask", body);
  };

  // 提交预热任务: https://www.volcengine.com/docs/6454/70436
  SubmitPreloadTask = (body: Record<string, unknown>) => {
    return this.Generic("SubmitPreloadTask", body);
  };

  // 获取刷新预热任务信息: https://www.volcengine.com/docs/6454/70437
  DescribeContentTasks = (body: Record<string, unknown>) => {
    return this.Generic("DescribeContentTasks", body);
  };

  // 获取刷新预热配额信息: https://www.volcengine.com/docs/6454/70439
  DescribeContentQuota = (body: Record<string, unknown>) => {
    return this.Generic("DescribeContentQuota", body);
  };

  // 提交封禁任务: https://www.volcengine.com/docs/6454/79890
  SubmitBlockTask = (body: Record<string, unknown>) => {
    return this.Generic("SubmitBlockTask", body);
  };

  // 提交解封任务: https://www.volcengine.com/docs/6454/79893
  SubmitUnblockTask = (body: Record<string, unknown>) => {
    return this.Generic("SubmitUnblockTask", body);
  };

  // 获取封禁解封任务信息: https://www.volcengine.com/docs/6454/79906
  DescribeContentBlockTasks = (body: Record<string, unknown>) => {
    return this.Generic("DescribeContentBlockTasks", body);
  };

  // 获取访问日志下载链接: https://www.volcengine.com/docs/6454/70446
  DescribeCdnAccessLog = (body: Record<string, unknown>) => {
    return this.Generic("DescribeCdnAccessLog", body);
  };

  // 获取 IP 归属信息: https://www.volcengine.com/docs/6454/75233
  DescribeIPInfo = (body: Record<string, unknown>) => {
    return this.Generic("DescribeIPInfo", body);
  };

  // 批量获取 IP 归属信息: https://www.volcengine.com/docs/6454/106852
  DescribeIPListInfo = (body: Record<string, unknown>) => {
    return this.Generic("DescribeIPListInfo", body);
  };

  // 获取回源节点 IP 列表: https://www.volcengine.com/docs/6454/75273
  DescribeCdnUpperIp = (body: Record<string, unknown>) => {
    return this.Generic("DescribeCdnUpperIp", body);
  };

  // 添加资源标签: https://www.volcengine.com/docs/6454/80308
  AddResourceTags = (body: Record<string, unknown>) => {
    return this.Generic("AddResourceTags", body);
  };

  // 更新资源标签: https://www.volcengine.com/docs/6454/80313
  UpdateResourceTags = (body: Record<string, unknown>) => {
    return this.Generic("UpdateResourceTags", body);
  };

  // 查询标签清单: https://www.volcengine.com/docs/6454/80315
  ListResourceTags = (body: Record<string, unknown>) => {
    return this.Generic("ListResourceTags", body);
  };

  // 删除资源标签: https://www.volcengine.com/docs/6454/80316
  DeleteResourceTags = (body: Record<string, unknown>) => {
    return this.Generic("DeleteResourceTags", body);
  };

  // 上传证书: https://www.volcengine.com/docs/6454/125708
  AddCdnCertificate = (body: Record<string, unknown>) => {
    return this.Generic("AddCdnCertificate", body);
  };

  // 查询CDN证书列表: https://www.volcengine.com/docs/6454/125709
  ListCertInfo = (body: Record<string, unknown>) => {
    return this.Generic("ListCertInfo", body);
  };

  // 查询CDN有关联域名的证书列表: https://www.volcengine.com/docs/6454/125710
  ListCdnCertInfo = (body: Record<string, unknown>) => {
    return this.Generic("ListCdnCertInfo", body);
  };

  // 获取特定证书的域名关联信息: https://www.volcengine.com/docs/6454/125711
  DescribeCertConfig = (body: Record<string, unknown>) => {
    return this.Generic("DescribeCertConfig", body);
  };

  // 批量关联证书: https://www.volcengine.com/docs/6454/125712
  BatchDeployCert = (body: Record<string, unknown>) => {
    return this.Generic("BatchDeployCert", body);
  };
}

export const defaultService = new CdnService();
