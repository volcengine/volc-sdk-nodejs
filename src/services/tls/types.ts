/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-interface */
import type { AxiosRequestConfig, Method } from "axios";
import { ServiceOptionsBase } from "../../base/types";

export interface TlsCreateAPIParams {
  method: Method;
  version?: string;
  queryKeys?: string[];
  axiosConfig?: Omit<AxiosRequestConfig, "url" | "method" | "data" | "params">;
}

export interface TlsServiceOptions extends Omit<ServiceOptionsBase, "defaultVersion"> {
  version?: string;
}

export type Protocol = "https:" | "http:";

export interface IDescribeProjectsReq {
  /** 分页页码 */
  PageNumber?: number;
  /** 页面大小 */
  PageSize?: number;
  /** project name匹配字符串，用于模糊匹配 */
  ProjectName?: string;
  /** project id匹配字符串，用于模糊匹配 */
  ProjectId?: string;
}

export interface IProjectDescribeResp {
  CreateTime: string;
  Description: string;
  InnerNetDomain: string;
  ProjectId: string;
  ProjectName: string;
  TopicCount: number;
  IamProjectName?: string;
  Tags?: Array<{
    Key: string;
    Value: string;
  }>;
}

export interface IProjectDescribeProjectsResp {
  Projects: Array<IProjectDescribeResp>;
  Total: number;
}

export interface IDescribeProjectReq {
  /** 日志项目的uuid。 */
  ProjectId: string;
}

export interface IProjectCreateReq {
  /** 日志项目描述信息: 不支持<>、'、\、\\; 长度为0～64个字符。 */
  Description?: string;
  /** Project的名称:名称必须唯一，不能与Region下其他名称冲突;名称只能由小写字母、数字和-组成; 必须以小写字母或者数字开头和结尾; 名称的长度在3-63个字符以内。 */
  ProjectName: string;
  /** 公共参数，详见产品支持的 地域列表。 */
  Region: string;
}

export interface IProjectCreateResp {
  ProjectId: string;
}

export interface IProjectModifyReq {
  /** 日志项目描述信息: 不支持<>、'、\、\\; 长度为0～64个字符。 */
  Description?: string;
  /** Project的uuid。 */
  ProjectId: string;
  /** Project的名称: 名称必须唯一，不能与全网其他名称冲突;名称只能由小写字母、数字和-组成;必须以小写字母或者数字开头和结尾;名称的长度在3-63个字符以内。 */
  ProjectName?: string;
}

export type IProjectModifyResp = { [key: string]: any };

export interface IProjectDeleteReq {
  /** 日志项目的uuid。 */
  ProjectId: string;
}

export type IProjectDeleteResp = { [key: string]: any };

export interface IDescribeTopicsReq {
  /** 分页，默认从1开始。 */
  PageNumber?: number;
  /** 分页大小限制，默认为20，最大为100。 */
  PageSize?: number;
  /** topic名称，作为模糊查询使用。TopicName和TopicId只能提供一个。 */
  TopicName?: string;
  /** TopicId，作为模糊查询使用。 */
  TopicId?: string;
  /** 日志项目ID */
  ProjectId: string;
}

export interface ITopicDescribeResp {
  CreateTime: string;
  Description: string;
  ModifyTime: string;
  ProjectId: string;
  ShardCount: number;
  TopicId: string;
  TopicName: string;
  Ttl: number;
}

export interface ITopicDescribeTopicsResp {
  Topics: Array<ITopicDescribeResp>;
  Total: number;
}

export interface IDescribeTopicReq {
  /** 主题id */
  TopicId: string;
}

export interface ITopicDescribeResp {
  CreateTime: string;
  Description: string;
  ModifyTime: string;
  ProjectId: string;
  ShardCount: number;
  TopicId: string;
  TopicName: string;
  Ttl: number;
}

export interface ITopicCreateReq {
  /** 日志主题描述信息：不支持<>、'、\、\\；长度为0-64个字符。 */
  Description?: string;
  /** 日志主题所属的日志项目uuid。 */
  ProjectId: string;
  /** 日志主题的日志分区个数: 当前支持配置1-10个。 */
  ShardCount: number;
  /** 日志主题名称:同一个日志项目下，日志主题名称不可重复;只能包括小写字母、数字、-;必须以小写字母或者数字开头和结尾;长度为3-63字符。 */
  TopicName: string;
  /** 数据的保存时间，单位为天，取值范围为1~3650。 */
  Ttl: number;
}

export interface ITopicCreateResp {
  TopicId: string;
}

export interface ITopicModifyReq {
  /** 日志主题描述信息：不支持<>、'、\、\\；长度为0-64个字符。 */
  Description?: string;
  /** 日志主题ID。 */
  TopicId: string;
  /** 日志主题名称:同一个日志项目下，日志主题名称不可重复;只能包括小写字母、数字、-;必须以小写字母或者数字开头和结尾;长度为3-63字符。 */
  TopicName?: string;
  /** 数据的保存时间，单位为天，取值范围为1~3650。 */
  Ttl?: number;
  /** 是否开启分区的自动分裂功能。 */
  AutoSplit?: boolean;
  /** 分区的最大分裂数，取值范围为1~256，默认为256。 */
  MaxSplitShard?: number;
  /** 是否开启WebTracking功能。 */
  EnableTracking?: boolean;
  /** 是否开启记录外网IP功能。默认为开启状态。 */
  LogPublicIP?: boolean;
  /** 是否开启分层存储。 */
  EnableHotTtl?: boolean;
  /** 标准存储时长，取值范围为7~3650天，默认为30天。 */
  HotTtl?: number;
  /** 低频存储时长，取值范围为30~3650天。 */
  ColdTtl?: number;
  /** 归档存储时长，取值范围为60~3650天。 */
  ArchiveTtl?: number;
}
export type ITopicModifyResp = { [key: string]: any };

export interface ITopicDeleteReq {
  /** 日志主题ID。 */
  TopicId: string;
}
export type ITopicDeleteResp = { [key: string]: any };

export interface IDescribeIndexReq {
  /** 主题id */
  TopicId: string;
}

export interface IIndexFullTextInfo {
  /** 是否大小写敏感：true为大小写敏感；false为大小写不敏感。 */
  CaseSensitive: boolean;
  /** 全文索引的分词符。
   - 字符串中每个字符代表一个分词符。
   - 长度为1-256字节。
   - 仅支持以下字符中的一种或者多种 !@#%^&*()-_=\"', <>/?|;: \n\t\r[]{}。
   - 包含中文和分词符不能同时配置。 */
  Delimiter: string;
  /** 默认为false。 */
  IncludeChinese?: boolean;
}

export interface IIndexValue {
  /** 是否区分大小写，默认为false。 */
  CaseSensitive?: boolean;
  /** 字段的分词符，默认为空（""）。
   - 字符串中每个字符代表一个分词符。
   - 长度为0-256字节，长度为0时不分词。
   - 仅支持以下字符中的一种或者多种 !@#%^&*()-_=\"', <>/?|;: \n\t\r[]{}。
   - 包含中文和分词符不能同时配置。 */
  Delimiter?: string;
  /** 是否包含中文，默认为空（""），包含中文和分词符不能同时配置。 */
  IncludeChinese?: boolean;
  /** 字段是否开启分析功能，默认为空（""），开启统计分析功能后，不能配置分词符和包含中文。 */
  SqlFlag?: boolean;
  /** 字段类型。
   - 目前支持 long - 整型，double - 浮点型，text - 字符串。
   - long和double类型不支持配置分词符、包含中文、大小写敏感。 */
  ValueType: string;
  /** 是否为 JSON 字段中所有值为文本的字段创建索引。 */
  IndexAll?: boolean;
  /** JSON 子字段的索引，其值为 KeyValueInfo 数组。 */
  JsonKeys?: Array<{ Key: string; Value: IIndexValue }>;
  /** 该索引是否是自动索引添加。 */
  AutoIndexFlag?: boolean;
}

export interface IIndexKeyValueInfo {
  /** 需要配置键值索引的字段名称。
   - 仅支持字母、数字和_-./，并且不支持以_开头。
   - 同一个索引中key名称唯一。
   - 长度为1-128。 */
  Key: string;
  /** 需要配置键值索引的字段描述信息。 */
  Value: IIndexValue;
}

export interface IIndexDescribeIndexResp {
  CreateTime: string;
  FullText?: IIndexFullTextInfo;
  KeyValue: Array<IIndexKeyValueInfo>;
  ModifyTime: string;
  TopicId: string;
  UserInnerKeyValue: Array<IIndexKeyValueInfo>;
  EnableAutoIndex: boolean;
  MaxTextLen: number;
}

export interface IIndexCreateReq {
  /** 全文索引配置。 */
  FullText?: IIndexFullTextInfo;
  /** 键值索引配置。 */
  KeyValue?: Array<IIndexKeyValueInfo>;
  /** 日志主题ID。 */
  TopicId: string;
}

export interface IIndexCreateResp {
  TopicId: string;
}

export interface IIndexModifyReq {
  /** 全文索引配置。注意：此字段为null或者不配置，表示不开启全文索引。 */
  FullText?: IIndexFullTextInfo;
  /** 键值索引配置。注意：此字段为null或者不配置，表示不开启键值索引。 */
  KeyValue?: Array<IIndexKeyValueInfo>;
  /** 日志主题ID。 */
  TopicId: string;
}
export type IIndexModifyResp = { [key: string]: any };

export interface IIndexDeleteReq {
  /** 日志主题ID。 */
  TopicId: string;
}
export type IIndexDeleteResp = { [key: string]: any };

export interface IDescribeShardsReq {
  /** 主题id */
  TopicId: string;
  /** 分页，默认从1开始 */
  PageNumber?: number;
  /** 分页大小限制，默认为20，最大为100。 */
  PageSize?: number;
}

export interface IShardQueryResp {
  ExclusiveEndKey: string;
  InclusiveBeginKey: string;
  ModifyTime: string;
  ShardId: number;
  Status: string;
  StopWriteTime: string;
  TopicId: string;
}
export interface IShardDescribeShardsResp {
  Shards: Array<IShardQueryResp>;
  Total: number;
}

export interface IDaoPlugin {
  processors?: Array<Record<string, any>>;
}

export interface IDaoParsePathRule {
  Keys?: string[];
  Regex?: string;
  PathSample?: string;
}

export interface IDaoShardHashKey {
  HashKey?: string;
}

export interface IDaoAdvanced {
  CloseEOF?: boolean;
  CloseRemoved?: boolean;
  CloseRenamed?: boolean;
  CloseTimeout?: number;
  CloseInactive?: number;
  NoLineTerminatorEOFMaxTime?: number;
}

export interface IDaoUserDefineRule {
  Fields?: Record<string, string>;
  Plugin?: IDaoPlugin;
  Advanced?: IDaoAdvanced;
  RawLogKey?: string;
  TailFiles?: boolean;
  HostnameKey?: string;
  EnableRawLog?: boolean;
  ShardHashKey?: IDaoShardHashKey;
  ParsePathRule?: IDaoParsePathRule;
  EnableHostname?: boolean;
  HostGroupLabelKey?: string;
  EnableHostGroupLabel?: boolean;
  TailSizeKb?: number;
  IgnoreOlder?: number;
  MultiCollectsType?: string;
}

export interface IDaoKubernetesRule {
  /** 通过Pod名称指定待采集的容器，支持正则匹配。例如设置为"PodNameRegex":"^(nginx-log-demo.*)$"，表示匹配以nginx-log-demo开头的Pod下的所有容器。 */
  ExcludePodLabelRegex?: Record<string, string>;
  /** 通过Pod Label黑名单排除不采集的容器。如果您要设置Pod Label黑名单，那么Key必填，Value可选填。
   - 如果Value为空，则Pod Label中包含Key的Pod下的容器都被排除。
   - 如果Value不为空，则Pod Label中包含Key=Value的Pod下的容器才会被排除。
   - Value默认为字符串匹配，即只有Value和Pod Label的值完全相同才会匹配。如果该值以^开头并且以$结尾，则为正则匹配。例如设置Key为app，设置Value为^(test1|test2)$，表示匹配Pod Label中包含app:test1、app:test2的Pod下的容器。
   多个黑名单之间为或关系，即只要容器Label满足任一黑名单对即可被排除。 */
  IncludePodLabelRegex?: Record<string, string>;
  /** 设置Kubernetes Label日志标签后，日志服务将在日志中新增Kubernetes Label相关字段。例如设置LabelKey为app，设置LabelValue为k8s_label_app，当Kubernetes中包含Label app=serviceA时，会将该信息添加到日志中，即添加字段__tag__k8s_label_app__: serviceA。 */
  LabelTag?: Record<string, string>;
  /** 通过Namespace名称指定采集的容器，支持正则匹配。例如设置为"NamespaceNameRegex":"^(default|nginx)$"，表示匹配nginx命名空间、default命名空间下的所有容器。 */
  NamespaceNameRegex?: string;
  /** 通过Pod Label白名单指定待采集的容器。如果您要设置Pod Label白名单，那么Key必填，Value可选填。
   - 如果Value为空，则Pod Label中包含Key的Pod下的容器都匹配。
   - 如果Value不为空，则Pod Label中包含Key=Value的Pod下的容器才匹配。
   - Value默认为字符串匹配，即只有Value和Pod Label的值完全相同才会匹配。如果该值以^开头并且以$结尾，则为正则匹配。例如设置Key为app，设置Value为^(test1|test2)$，表示匹配Pod Label中包含app:test1、app:test2的Pod下的容器。
   多个白名单之间为或关系，即只要Pod的Label满足任一白名单即可匹配。 */
  PodNameRegex?: string;
  /** 通过工作负载名称指定采集的容器，支持正则匹配。例如设置为"WorkloadNameRegex":"^(nginx-deployment.*)$"，表示匹配以nginx-deployment开头的工作负载下的所有容器。 */
  WorkloadNameRegex?: string;
  /** 通过工作负载的类型指定采集的容器。例如设置为"WorkloadType":"Deployment"，表示匹配Deployment类型工作负载下的所有容器。
   - Deployment: 无状态
   - StatefulSet: 有状态
   - DaemonSet: 守护进程
   - Job: 任务
   - CronJob: 定时任务 */
  WorkloadType?: string;
}

export interface IDaoContainerRule {
  /** 通过容器名称指定待采集的容器，支持正则匹配。例如设置为"ContainerNameRegex":"^(container-test)$"，表示匹配所有名为container-test的容器。 */
  ContainerNameRegex?: string;
  /** 设置环境变量日志标签后，日志服务将在日志中新增环境变量相关字段。例如设置EnvKey为VERSION，设置EnvValue为env_version，当容器中包含环境变量VERSION=v1.0.0时，会将该信息添加到日志中，即添加字段__tag__env_version__: v1.0.0。 */
  EnvTag?: Record<string, string>;
  /** 通过容器环境变量黑名单排除不采集的容器。
   如果要容器设置环境变量黑名单，则Key必填。
   - 如果Value不为空，则只排除在容器环境变量中包含Key=Value的容器。
   - 如果Value为空，则排除所有在容器环境变量中包含Key的容器。
   说明：
   - 多个键值对之间为或关系，即只要容器环境变量满足任一键值对即不被采集。
   - Value默认为字符串匹配，即只有Value和容器环境变量完全相同才会匹配。如果该值以^开头并且以$结尾，则为正则匹配，例如：Value配置为^(kube-system|istio-system)$，可同时匹配kube-system和istio-system。 */
  ExcludeContainerEnvRegex?: Record<string, string>;
  /** 通过容器Label黑名单排除不采集的容器。
   如果要设置容器Label黑名单，则Key必填。
   - 如果Value不为空，则只排除在容器Label中包含Key=Value的容器。
   - 如果Value为空，则排除所有在容器Label中包含Key的容器。
   说明：
   - 多个键值对之间为或关系，即只要容器Label满足任一键值对即不被采集。
   - Value默认为字符串匹配，即只有Value和容器Label完全相同才会匹配。如果该值以^开头并且以$结尾，则为正则匹配，例如：Value配置为^(kube-system|istio-system)$，可同时匹配kube-system和istio-system。
   - 请勿设置相同的Key，如果重名只生效一个。 */
  ExcludeContainerLabelRegex?: Record<string, string>;
  /** 通过容器环境变量白名单指定待采集的容器。
   如果要设置容器环境变量白名单，则Key必填。
   - 如果Value不为空，则只采集在容器环境变量中包含Key=Value的容器。
   - 如果Value为空，则采集所有在容器环境变量中包含Key的容器。
   说明：
   - 多个键值对之间为或关系，即只要容器环境变量满足任一键值对即可被采集。
   - Value默认为字符串匹配，即只有Value和容器环境变量完全相同才会匹配。如果该值以^开头并且以$结尾，则为正则匹配，例如：Value配置为^(kube-system|istio-system)$，可同时匹配kube-system和istio-system。 */
  IncludeContainerEnvRegex?: Record<string, string>;
  /** 通过容器Label白名单指定待采集的容器。
   如果要设置容器Label白名单，则Key必填。
   - 如果Value不为空，则只采集在容器Label中包含Key=Value的容器。
   - 如果Value为空，则采集所有在容器Label中包含Key的容器。
   说明：
   - 多个键值对之间为或关系，即只要容器Label满足任一键值对即可被采集。
   - Value默认为字符串匹配，即只有Value和容器Label完全相同才会匹配。如果该值以^开头并且以$结尾，则为正则匹配，例如：Value配置为^(kube-system|istio-system)$，可同时匹配kube-system和istio-system。
   - 请勿设置相同的Key，如果重名只生效一个。 */
  IncludeContainerLabelRegex?: Record<string, string>;
  /** Kubernetes容器的采集规则 */
  KubernetesRule?: IDaoKubernetesRule;
  /** stdout-采集容器标准输出stdout。
   stderr-采集容器标准错stderr。
   all-采集容器标准输出stdout和容器标准错stderr。
   默认值是all */
  Stream?: string;
}

export interface IDaoExcludePath {
  /** 类型，File或Path。 */
  Type?: string;
  /** 当Type是Path时，Value表示一个目录。
   - Value必须是一个绝对路径；支持完整匹配和通配符模式匹配，通配符只支持“*”、“?”，不支持“**”通配符。
   当Type是File时，Value表示一个文件名称。
   - Value必须是一个绝对路径；  - 支持完整匹配和通配符模式匹配，通配符只支持“**”、“*”、“?”，但是最多只能配置1个“**”通配符。 */
  Value?: string;
}

export interface IDaoFilterKeyRegex {
  /** 过滤字段的名字key。 */
  Key?: string;
  /** 过滤字段的日志内容需要匹配的regex。 */
  Regex?: string;
}

export interface IDaoLogTemplate {
  Type?: string;
  Format?: string;
}

export interface IDaoExtractRule {
  /** 第一行日志需要匹配的regex;\n当且仅当采集的日志类型为multiline_log时有效;\n必须是合法的正则表达式; */
  BeginRegex?: string;
  /** 分隔符;\n当且仅当采集的日志类型为delimiter_log时有效 */
  Delimiter?: string;
  /** 过滤规则列表。
   - 当采集的日志类型为minimalist_log或multiline_log时, 最多能够配置1条过滤规则，并且过滤字段的名字key必须为__content__。
   - 当采集的日志类型为delimiter_log、json_log或fullregex_log时, 最多能够配置5条过滤规则，并且过滤字段的名字key不能重复、不能为空，命名规则同「索引配置」的key名称。过滤字段的日志内容需要匹配的regex必须是合法的正则表达式，并且长度限制是256个字符。 */
  FilterKeyRegex?: Array<IDaoFilterKeyRegex>;
  /** 用户自定义的每个字段的名字key列表;当且仅当采集的日志类型为delimiter_log或fullregex_log时有效。
   - 最多能够配置100个名字key。
   - 命名规则同「索引配置」的key名称。
   - 当采集的日志类型为delimiter_log时, 不能配置非空、重复的名字key，不能全部配置为空的名字key。
   - 当采集的日志类型为fullregex_log时，不能配置重复的名字key， 不能配置空的名字key。 */
  Keys?: Array<string>;
  /** 整条日志需要匹配的regex;当且仅当采集的日志类型为fullregex_log时有效;必须是合法的正则表达式。 */
  LogRegex?: string;
  /** 时间字段的格式。
   - TimeKey和TimeFormat必须成对出现。
   - 参考c语言的strftime函数对于format参数的说明：https://man7.org/linux/man-pages/man3/strftime.3.html */
  TimeFormat?: string;
  /** 时间字段的名字key。
   - TimeKey和TimeFormat必须成对出现。
   - 命名规则同「索引配置」的key名称。 */
  TimeKey?: string;
  /** 当上传解析失败的日志时，解析失败的日志的key名称。
   - UnMatchUpLoadSwitch=true和UnMatchLogKey必须成对出现。
   - 命名规则同「索引配置」的key名称。 */
  UnMatchLogKey?: string;
  /** 是否上传解析失败的日志。
   - UnMatchUpLoadSwitch=true和UnMatchLogKey必须成对出现。
   - true表示上传解析失败的日志，false表示不上传解析失败的日志。 */
  UnMatchUpLoadSwitch?: boolean;
  Quote?: string;
  TimeZone?: string;
  LogTemplate?: IDaoLogTemplate;
  TimeExtractRegex?: string;
  EnableNanosecond?: boolean;
  /** 时间样例。用于判断填写的时间解析格式是否正确。 */
  TimeSample?: string;
}

export interface IRuleCreateReq {
  /** 容器采集规则 */
  ContainerRule?: IDaoContainerRule;
  /** 采集黑名单列表: 最多能够创建10个采集黑名单。
   当InputType=0时:
   - 当Type是Path时，Value表示一个目录。支持完整匹配和通配符模式匹配，通配符只支持“*”、“?”，不支持“**”通配符。
   - 当Type是File时，Value表示一个文件名称。支持完整匹配和通配符模式匹配，通配符只支持“**”、“*”、“?”，但是最多只能配置1个“**”通配符。
   当InputType=1时:
   - 不允许配置采集黑名单列表。
   当InputType=2时:
   - 当Type是Path时，Value表示一个目录。仅支持完整匹配，不支持通配符模式匹配。
   - 当Type是File时，Value表示一个文件名称。目录部分仅支持完整匹配，不支持通配符模式匹配。文件名称部分支持完整匹配和通配符模式匹配，通配符只支持“*”、“?”。 */
  ExcludePaths?: Array<IDaoExcludePath>;
  /** 提取规则: 如果配置非minimalist_log或者非json_log的采集的日志类型，那么必须同时配置提取规则。 */
  ExtractRule?: IDaoExtractRule;
  /** 采集类型：
   - 0：宿主机日志文件
   - 1：k8s容器标准输出
   - 2：k8s容器内日志文件
   当创建采集配置时，如果用户没有配置采集的类型，那么采集的类型默认值是0。 */
  InputType?: number;
  /** 日志样例：日志样例的长度必须不大于3000个字符 */
  LogSample?: string;
  /** 采集的日志类型:
   - minimalist_log代表极简日志；
   - delimiter_log代表分隔符格式日志；
   - json_log代表json格式日志；
   - multiline_log代表多行日志；
   - fullregex_log代表完整正则日志；
   - 当创建采集配置时，如果用户没有配置采集的日志类型，那么采集的日志类型默认值是minimalist_log。 */
  LogType?: "minimalist_log" | "delimiter_log" | "json_log" | "multiline_log" | "fullregex_log";
  /** 采集路径列表:
   - 最多能够创建10个采集路径;
   - 采集路径必须是一个绝对路径;
   当InputType=0时:
   - 采集路径支持完整匹配和通配符模式匹配，通配符只支持"**"、"*"、"?"，但是最多只能配置1个"**"通配符.
   当InputType=1时:
   - 不允许配置采集路径列表
   当InputType=2时:
   - 目录部分仅支持完整匹配，不支持通配符模式匹配。文件名称部分支持完整匹配和通配符模式匹配，通配符只支持"*"，"?". */
  Paths: Array<string>;
  /** 采集配置的名称:
   - 在一个Topic中唯一;
   - 长度限制为3-63个字符，只能包含小写字母、数字和短划线（-），必须以小写字母或者数字开头和结尾。 */
  RuleName: string;
  /** 采集配置所属于的日志主题ID，即TopicID。 */
  TopicId: string;
  /** 用户自定义的采集规则: 用户自定义的采集规则必须是一个Json格式的字符串。 */
  UserDefineRule?: string;
}

export interface IRuleCreateResp {
  /** 采集配置的ID */
  RuleId: string;
}

export interface IRuleDeleteReq {
  /** 采集配置的ID。 */
  RuleId: string;
}

export type IRuleDeleteResp = { [key: string]: any };

export interface IRuleModifyReq {
  /** 容器采集规则 */
  ContainerRule?: IDaoContainerRule;
  /** 采集黑名单列表: 最多能够创建10个采集黑名单。
   当InputType=0时：
   - 当Type是Path时，Value表示一个目录。支持完整匹配和通配符模式匹配，通配符只支持“*”、“?”，不支持“**”通配符。
   - 当Type是File时，Value表示一个文件名称。支持完整匹配和通配符模式匹配，通配符只支持“**”、“*”、“?”，但是最多只能配置1个“**”通配符。
   当InputType=1时：
   - 不允许配置采集黑名单列表。
   当InputType=2时：
   - 当Type是Path时，Value表示一个目录。仅支持完整匹配，不支持通配符模式匹配。
   - 当Type是File时，Value表示一个文件名称。目录部分仅支持完整匹配，不支持通配符模式匹配。文件名称部分支持完整匹配和通配符模式匹配，通配符只支持“*”、“?”。 */
  ExcludePaths?: Array<IDaoExcludePath>;
  /** 提取规则: 如果配置非minimalist_log或者非json_log的采集的日志类型，那么必须同时配置提取规则。 */
  ExtractRule?: IDaoExtractRule;
  /** 采集类型：
   - 0：宿主机日志文件
   - 1：k8s容器标准输出
   - 2：k8s容器内日志文件
   只要修改容器采集规则，无论是否修改采集的类型，采集的类型必须配置。 */
  InputType?: number;
  /** 日志样例: 日志样例的长度必须不大于3000个字符 */
  LogSample?: string;
  /** 采集的日志类型:
   - minimalist_log代表极简日志；
   - delimiter_log代表分隔符格式日志；
   - json_log代表json格式日志；
   - multiline_log代表多行日志；
   - fullregex_log代表完整正则日志；
   只要修改提取规则，无论是否修改采集的日志类型，采集的日志类型必须配置。 */
  LogType?: "minimalist_log" | "delimiter_log" | "json_log" | "multiline_log" | "fullregex_log";
  /** 是否暂停采集配置。1: 暂停采集配置。0：不暂停采集配置。 */
  Pause?: number;
  /** 采集路径列表:
   - 最多能够创建10个采集路径; 采集路径必须是一个绝对路径;
   当InputType=0时：
   - 当Type是Path时，Value表示一个目录。支持完整匹配和通配符模式匹配，通配符只支持“*”、“?”，不支持“**”通配符。
   - 当Type是File时，Value表示一个文件名称。支持完整匹配和通配符模式匹配，通配符只支持“**”、“*”、“?”，但是最多只能配置1个“**”通配符。
   当InputType=1时：
   - 不允许配置采集黑名单列表。
   当InputType=2时：
   - 当Type是Path时，Value表示一个目录。仅支持完整匹配，不支持通配符模式匹配。
   - 当Type是File时，Value表示一个文件名称。目录部分仅支持完整匹配，不支持通配符模式匹配。文件名称部分支持完整匹配和通配符模式匹配，通配符只支持“*”、“?”。 */
  Paths?: Array<string>;
  /** 采集配置的ID。 */
  RuleId: string;
  /** 采集配置的名称:
   - 在一个Topic中唯一;
   - 长度限制为3-63个字符，只能包含小写字母、数字和短划线（-），必须以小写字母或者数字开头和结尾。 */
  RuleName?: string;
  /** 用户自定义的采集规则: 用户自定义的采集规则必须是一个Json格式的字符串。 */
  UserDefineRule?: string;
}
export type IRuleModifyResp = { [key: string]: any };

export interface IDescribeRuleReq {
  /** 采集配置的ID。 */
  RuleId: string;
}

export interface IRestHostGroupInfo {
  AbnormalHeartbeatStatusCount?: number;
  AgentLatestVersion?: string;
  AutoUpdate?: boolean;
  CreateTime?: string;
  HostCount?: number;
  HostGroupId?: string;
  HostGroupName?: string;
  HostGroupType?: string;
  HostIdentifier?: string;
  IamProjectName?: string;
  ModifyTime?: string;
  NormalHeartbeatStatusCount?: number;
  RuleCount?: number;
  UpdateEndTime?: string;
  UpdateStartTime?: string;
  ServiceLogging?: boolean;
}

export interface IRuleRuleInfo {
  ContainerRule?: IDaoContainerRule;
  CreateTime?: string;
  ExcludePaths?: Array<IDaoExcludePath>;
  ExtractRule?: IDaoExtractRule;
  InputType?: number;
  LogSample?: string;
  LogType?: string;
  ModifyTime?: string;
  Paths?: Array<string>;
  RuleId?: string;
  RuleName?: string;
  TopicId?: string;
  TopicName?: string;
  UserDefineRule?: string;
  Pause?: number;
}

export interface IRuleDescribeResp {
  HostGroupInfos: Array<IRestHostGroupInfo>;
  ProjectId: string;
  ProjectName: string;
  RuleInfo: IRuleRuleInfo;
  TopicId: string;
  TopicName: string;
}

export interface IDescribeRulesReq {
  /** 采集配置所属于的项目的ID。 */
  ProjectId: string;
  /** 采集配置所属于的项目的名称。 */
  ProjectName?: string;
  /** IAM 日志项目名称。 */
  IamProjectName?: string;
  /** 采集配置的ID关键词，支持模糊搜索。 */
  RuleId?: string;
  /** 采集配置的名称关键词，支持模糊搜索。 */
  RuleName?: string;
  /** 日志主题的ID关键词，支持模糊搜索。 */
  TopicId?: string;
  /** 日志主题的名称关键词，支持模糊搜索。 */
  TopicName?: string;
  /** 分页查询时的页码。默认为 1，即从第一页数据开始返回。 */
  PageNumber?: number;
  /** 采集模式。 */
  LogType?: string;
  /** 分页大小。默认为 20，最大为 100。 */
  PageSize?: number;
  /** 是否暂停采集配置，0代表开启，1代表暂停 */
  Pause?: number;
}

export interface IRuleDescribeAllResp {
  RuleInfos: Array<IRuleRuleInfo>;
  Total: number;
}

export interface IRuleBindRuleReq {
  /** 机器组的ID列表。 */
  HostGroupIds: Array<string>;
  /** 采集配置的ID。 */
  RuleId: string;
}

export type IRuleBindRuleResp = { [key: string]: any };

export interface IRuleUnbindRuleReq {
  /** 机器组的ID列表。 */
  HostGroupIds: Array<string>;
  /** 采集配置的ID。 */
  RuleId: string;
}
export type IRuleUnbindRuleResp = { [key: string]: any };

export interface IHostGroupCreateReq {
  /** 是否支持自动更新 */
  AutoUpdate?: boolean;
  /** 机器组的名称。 */
  HostGroupName: string;
  /** 机器组的类型: IP表示机器IP; Label表示机器标识。 */
  HostGroupType: "IP" | "Label";
  /** 机器标识符。 */
  HostIdentifier?: string;
  /** 机器IP列表。 */
  HostIpList?: Array<string>;
  /** 升级结束时间 */
  UpdateEndTime?: string;
  /** 升级开始时间 */
  UpdateStartTime?: string;
}

export interface IHostGroupCreateResp {
  HostGroupId: string;
}

export interface IHostGroupDeleteReq {
  /** 机器组的Id。 */
  HostGroupId: string;
}
export type IHostGroupDeleteResp = { [key: string]: any };

export interface IHostGroupModifyReq {
  /** 是否支持自动更新 */
  AutoUpdate?: boolean;
  /** 机器组Id。 */
  HostGroupId: string;
  /** 机器组的名称。 */
  HostGroupName?: string;
  /** 机器组的类型：IP表示机器IP；Label表示机器标识。 */
  HostGroupType?: "IP" | "Label";
  /** 机器标识符 */
  HostIdentifier?: string;
  /** 机器IP列表。 */
  HostIpList?: Array<string>;
  /** 升级结束时间 */
  UpdateEndTime?: string;
  /** 升级开始时间 */
  UpdateStartTime?: string;
  /** 是否开启LogCollector服务日志功能 */
  ServiceLogging?: boolean;
}

export type IHostGroupModifyResp = { [key: string]: any };

export interface IDescribeHostGroupReq {
  /** 机器组Id */
  HostGroupId: string;
}

export interface IHostHostInfo {
  HeartbeatStatus?: number;
  Ip?: string;
  LogCollectorVersion?: string;
}

export interface IHostGroupHostGroupHostsRulesInfo {
  HostGroupInfo?: IRestHostGroupInfo;
  HostInfos?: Array<IHostHostInfo>;
  RuleInfos?: Array<IRuleRuleInfo>;
}
export interface IHostGroupDescribeResp {
  HostGroupHostsRulesInfo: IHostGroupHostGroupHostsRulesInfo;
}

export interface IDescribeHostGroupsReq {
  /** 机器组的Id，可支持模糊查询。 */
  HostGroupId?: string;
  /** 机器组的名称，可支持模糊查询。 */
  HostGroupName?: string;
  /** 机器组是否支持自动升级 */
  AutoUpdate?: boolean;
  /** 页偏移量，初始值为1。 */
  PageNumber?: number;
  /** 单页最大机器组数量。 */
  PageSize?: number;
}

export interface IHostGroupDescribeAllResp {
  HostGroupHostsRulesInfos: Array<IHostGroupHostGroupHostsRulesInfo>;
  Total: number;
}

export interface IDescribeHostsReq {
  /** 机器组的Id。 */
  HostGroupId: string;
  /** 机器IP，作为模糊查询使用。 */
  Ip?: string;
  /** 机器心跳状态。 */
  HeartbeatStatus?: number;
  /** 页偏移量，初始值为1。 */
  PageNumber?: number;
  /** 单页最大HostGroup数量。 */
  PageSize?: number;
}

export interface IHostDescribeAllResp {
  HostInfos: Array<IHostHostInfo>;
  Total: number;
}

export interface IHostDeleteReq {
  /** 机器组的Id。 */
  HostGroupId: string;
  /** 机器的IP。 */
  Ip: string;
}
export type IHostDeleteResp = { [key: string]: any };

export interface IDescribeHostGroupRulesReq {
  /** 机器组的ID。 */
  HostGroupId?: string;
  /** 页偏移量,页偏移量的初始值为1。 */
  PageNumber?: number;
  /** 页大小。 */
  PageSize?: number;
}
export interface IHostGroupDescribeHostGroupRulesResp {
  RuleInfos: Array<IRuleRuleInfo>;
  Total: number;
}

export interface IDaoQueryRequest {
  /** 查询范围终止时间相对当前的历史时间，单位为分钟，取值为非正，须大于StartTimeOffset，最大值为0，最小值为-1440。 */
  EndTimeOffset: number;
  /** 告警对象序号；从1开始递增。 */
  Number: number;
  /** 查询语句，支持的最大长度为1024。 */
  Query: string;
  /** 查询范围起始时间相对当前的历史时间，单位为分钟，取值为非正，最大值为0，最小值为-1440。 */
  StartTimeOffset: number;
  /** 告警策略执行的topicId。 */
  TopicId: string;
  /** 告警策略执行的TopicName。 */
  TopicName?: string;
  /** 查询是否使用整点时间，空白时默认为Relative。 */
  TimeSpanType?: string;
  /** 对时间进行取整，即对分钟、小时取整（Second，Minute，Hour）。 */
  TruncatedTime?: string;
  /** 查询结束时间范围单位, 默认值为分钟，支持秒/分钟/小时（Second，Minute，Hour）。 */
  EndTimeOffsetUnit?: string;
  /** 查询开始时间范围单位, 默认值为分钟，支持秒/分钟/小时（Second，Minute，Hour）。 */
  StartTimeOffsetUnit?: string;
}

export interface IDaoRequestCycle {
  /** 执行的周期，或者定制执行的时间节点。单位为分钟，取值范围为1~1440。 */
  Time?: number;
  /** 可选值：Period-周期执行；Fixed-定期执行。 */
  Type: string;
  /** Cron表达式，日志服务通过 Cron 表达式指定告警任务定时执行。Cron 表达式的最小粒度为分钟，24 小时制。例如 `0 18 * * *`表示每天 18 点整执行一次告警任务。 */
  CronTab?: string;
}

export interface IAlarmPeriodSetting {
  /** 短信告警周期，单位为分钟，取值范围为 10~1440。 */
  SMS?: number;
  /** 邮件告警周期，单位为分钟，取值范围为 1~1440。 */
  Email?: number;
  /** 电话告警周期，单位为分钟，取值范围为 10~1440。 */
  Phone?: number;
  /** 自定义 Webhook 告警周期，单位为分钟，取值范围为 1~1440。 */
  GeneralWebhook?: number;
}

export interface IJoinConfig {
  /** 使用左联或右联时的表达式。 */
  Condition?: string;
  /** 集合操作类型。可选值: CrossJoin（笛卡尔积）、LeftJoin（左联）、RightJoin（右联）、InnerJoin（内联）、FullJoin（全联）。 */
  SetOperationType: string;
}

export interface ITriggerCondition {
  /** 告警通知的级别，即告警的严重程度。支持设置为 `notice`、`warning` 或 `critical`，严重程度递增。默认为 `notice`。 */
  Severity?: string;
  /** 告警触发条件表达式。 */
  Condition?: string;
  /** 有数据、有特定条数据场景下的数值表达式，通过 `__count__`来实现。 */
  CountCondition?: string;
  /** 开启后，集合操作后结果为空集时，触发一条独立的无数据告警。 */
  NoData?: boolean;
}

export interface IAlarmPolicyCreateReq {
  /** 告警策略名称。
   - 同一个日志项目下，告警策略名称不可重复。
   - 只能包括小写字母、数字、-
   - 必须以小写字母或者数字开头和结尾。
   - 长度为3-63字符。 */
  AlarmName: string;
  /** 告警对应的通知列表 */
  AlarmNotifyGroup: Array<string>;
  /** 告警重复的周期。单位是分钟。取值范围是0~1440。 */
  AlarmPeriod: number;
  /** 告警触发条件  */
  Condition: string;
  /** 告警策略所属的ProjectId */
  ProjectId: string;
  /** 查询或者分析命令，支持1-3条 */
  QueryRequest: Array<IDaoQueryRequest>;
  /** 查询或分析请求的执行周期 */
  RequestCycle: IDaoRequestCycle;
  /** 是否开启告警策略。默认值为true */
  Status?: boolean;
  /** 持续周期。持续满足触发条件TriggerPeriod个周期后，再进行告警；最小值为1，最大值为10，默认为1。 */
  TriggerPeriod: number;
  /** 用户自定义告警内容 */
  UserDefineMsg?: string;
  /** 告警通知的级别，即告警的严重程度。支持设置为 `notice`、`warning` 或 `critical`。默认为 `notice`。 */
  Severity?: string;
  /** 告警通知发送的周期。当告警持续触发次数达到指定限额 **TriggerPeriod** 时，日志服务会根据指定的周期发送告警通知。取值范围是 10~1440，单位：分钟。 */
  AlarmPeriodDetail?: IAlarmPeriodSetting;
  /** 告警检索分析结果集合操作的相关配置。日志服务将一个检索分析结果作为一个集合，并基于集合结果判断是否触发告警。 */
  JoinConfigurations?: Array<IJoinConfig>;
  /** 告警触发条件列表。最多可配置 10 条告警触发条件。 */
  TriggerConditions?: Array<ITriggerCondition>;
  /** 是否发送告警恢复通知，不填该参数，默认为true。 */
  SendResolved?: boolean;
}

export interface IAlarmPolicyCreateResp {
  AlarmId: string;
}

export interface IAlarmPolicyDeleteReq {
  /** 创建时返回的告警策略id */
  AlarmId: string;
}

export type IAlarmPolicyDeleteResp = { [key: string]: any };

export interface IDescribeAlarmsReq {
  /** 日志项目 ID。为空时，表示在当前账号下的所有项目范围内筛选告警策略。 */
  ProjectId?: string;
  /** 分页页码 */
  PageNumber?: number;
  /** 页面大小 */
  PageSize?: number;
  /** 告警策略名称，支持模糊匹配。 */
  AlarmName?: string;
  /** 告警策略Id */
  AlarmId?: string;
  /** 监控对象的TopicId */
  TopicId?: string;
  /** 监控对象的TopicName */
  TopicName?: string;
  /** 是否开启告警策略 */
  Status?: string;
}

export interface IGeneralWebhookHeaderKV {
  /** 自定义请求头的 Key。 */
  key?: string;
  /** 自定义请求头的 Value。 */
  value?: string;
}

export interface IAlarmNoticeGroupReceiver {
  /** 允许接收信息的开始时间。 */
  EndTime: string;
  /** 通知接收渠道，暂仅支持Email和Sms。Email-邮件；Sms-短信。 */
  ReceiverChannels: Array<string>;
  /** 接收者的名字。这里前端通过list所有用户选择用户，不涉及该限制长度1~64，仅支持英文、数字、下划线、"."、"-"、"@" */
  ReceiverNames: Array<string>;
  /** 接受者类型。可选值：User-用户ID;暂不支持其余接收者类型。 */
  ReceiverType: string;
  /** 允许接收信息的开始时间。 */
  StartTime: string;
  /** 自定义接口回调地址。 */
  GeneralWebhookUrl?: string;
  /** 自定义 WebHook 请求体。 */
  GeneralWebhookBody?: string;
  /** 通过 Webhook 集成配置发送通知到飞书、钉钉或企业微信时，需要提醒的用户名。 */
  AlarmWebhookAtUsers?: Array<string>;
  /** 通过 Webhook 集成配置发送通知到飞书、钉钉或企业微信时，是否提醒所有人。 */
  AlarmWebhookIsAtAll?: boolean;
  /** 通过 Webhook 集成配置发送通知到飞书、钉钉或企业微信时，需要提醒的用户组名称。 */
  AlarmWebhookAtGroups?: Array<string>;
  /** 自定义接口回调方法，仅支持设置为 POST 或 PUT。 */
  GeneralWebhookMethod?: string;
  /** 自定义接口回调请求头。 */
  GeneralWebhookHeaders?: Array<IGeneralWebhookHeaderKV>;
  /** 告警内容模版 ID。 */
  AlarmContentTemplateId?: string;
  /** 告警 Webhook 集成配置的 ID。 */
  AlarmWebhookIntegrationId?: string;
  /** 告警 Webhook 集成配置的名称。 */
  AlarmWebhookIntegrationName?: string;
}

export interface IRuleNode {
  /** 当前节点类型。可选值：Operation-操作节点；Condition-条件节点 */
  Type?: string;
  /** 节点值。 */
  Value?: Array<string>;
  /** 子节点。 */
  Children?: Array<IRuleNode>;
}

export interface INoticeRule {
  /** 是否继续进入下一层的条件判断。 */
  HasNext?: boolean;
  /** 规则节点。 */
  RuleNode?: IRuleNode;
  /** 后面是否存在结束节点。 */
  HasEndNode?: boolean;
  /** 通知渠道相关信息。 */
  ReceiverInfos?: Array<IAlarmNoticeGroupReceiver>;
}

export interface IAlarmNoticeGroupNotifyGroupsInfo {
  AlarmNotifyGroupId?: string;
  AlarmNotifyGroupName?: string;
  CreateTime?: string;
  ModifyTime?: string;
  NotifyType?: Array<string>;
  Receivers?: Array<IAlarmNoticeGroupReceiver>;
  IamProjectName?: string;
  NoticeRules?: Array<INoticeRule>;
}

export interface IAlarm_policyQueryResp {
  AlarmId: string;
  AlarmName: string;
  AlarmNotifyGroup: Array<IAlarmNoticeGroupNotifyGroupsInfo>;
  AlarmPeriod: number;
  /** 告警通知发送的周期配置。 */
  AlarmPeriodDetail?: IAlarmPeriodSetting;
  Condition: string;
  CreateTime: string;
  /** 告警检索分析结果集合操作的相关配置。 */
  JoinConfigurations?: Array<IJoinConfig>;
  ModifyTime: string;
  ProjectId: string;
  QueryRequest: Array<IDaoQueryRequest>;
  RequestCycle: IDaoRequestCycle;
  /** 是否发送告警恢复通知。 */
  SendResolved?: boolean;
  /** 告警通知的级别，即告警的严重程度。 */
  Severity?: string;
  Status: boolean;
  /** 告警触发条件列表。 */
  TriggerConditions?: Array<ITriggerCondition>;
  TriggerPeriod: number;
  UserDefineMsg: string;
}

export interface IAlarmPolicyDescribeResp {
  Alarms: Array<IAlarm_policyQueryResp>;
  Total: number;
}

export interface IAlarmPolicyModifyReq {
  /** 告警策略Id */
  AlarmId: string;
  /** 告警策略名称。
   - 同一个日志项目下，告警策略名称不可重复。
   - 只能包括小写字母、数字、-
   - 必须以小写字母或者数字开头和结尾。
   - 长度为3-63字符。 */
  AlarmName?: string;
  /** 告警对应的通知列表 */
  AlarmNotifyGroup?: Array<string>;
  /** 告警重复的周期。单位是分钟。取值范围是10~1440。
   一个手机号码每天最多收到50条告警短信，且与火山引擎其他消息通知服务共用短信额度 */
  AlarmPeriod?: number;
  /** 告警通知的级别，即告警的严重程度。支持设置为 notice、warning 或 critical。默认为 notice。 */
  Severity?: string;
  /** 告警通知发送的周期。当告警持续触发次数达到指定限额 TriggerPeriod 时，日志服务会根据指定的周期发送告警通知。 */
  AlarmPeriodDetail?: IAlarmPeriodSetting;
  /** 告警触发条件 */
  Condition?: string;
  /** 查询或者分析命令，支持1-3条 */
  QueryRequest?: Array<IDaoQueryRequest>;
  /** 查询或分析请求的执行周期 */
  RequestCycle?: IDaoRequestCycle;
  /** 是否开启告警策略。默认值为true */
  Status?: boolean;
  /** 持续周期。持续满足触发条件TriggerPeriod个周期后，再进行告警；最小值为1，最大值为10，默认为1。 */
  TriggerPeriod?: number;
  /** 用户自定义告警内容 */
  UserDefineMsg?: string;
  /** 告警检索分析结果集合操作的相关配置。日志服务将一个检索分析结果作为一个集合，并基于集合结果判断是否触发告警。 */
  JoinConfigurations?: Array<IJoinConfig>;
  /** 告警触发条件列表。最多可配置 10 条告警触发条件。 */
  TriggerConditions?: Array<ITriggerCondition>;
  /** 是否发送告警恢复通知，不填该参数，默认为true。 */
  SendResolved?: boolean;
}

export type IAlarmPolicyModifyResp = { [key: string]: any };

export interface IAlarmNoticeGroupCreateResp {
  AlarmNotifyGroupId: string;
}

export interface IAlarmNoticeGroupCreateReq {
  /** 告警通知组名称。
   - 同一个账户下，通知组名称不可重复。
   - 只能包括小写字母、数字、-。
   - 必须以小写字母或者数字开头和结尾。
   - 长度为3-63字符。 */
  AlarmNotifyGroupName: string;
  /** 告警通知的类型。可选值，选择一个或者多个：Trigger-告警触发;Recovery-告警恢复。 */
  NotifyType?: Array<string>;
  /** 告警对应的通知列表，最少1一个，最大支持10个。 */
  Receivers?: Array<IAlarmNoticeGroupReceiver>;
  /** 告警组所属的 IAM 项目名称。未指定此参数时，日志服务会将告警组添加到名为 `default`的 IAM 项目中。 */
  IamProjectName?: string;
  /** 告警通知组的相关配置。当指定 NoticeRules 时，NotifyType 和 Receivers 字段将被忽略，由规则中的 ReceiverInfos 控制通知渠道。 */
  NoticeRules?: Array<INoticeRule>;
}

export interface IProjectDescribeProjectsResp {
  Projects: Array<IProjectDescribeResp>;
  Total: number;
}

export interface IAlarmNoticeGroupDeleteReq {
  /** 创建时返回的NotifyGroupId */
  AlarmNotifyGroupId: string;
}

export type IAlarmNoticeGroupDeleteResp = { [key: string]: any };

export interface IAlarmNoticeGroupModifyReq {
  /** 通知组id */
  AlarmNotifyGroupId: string;
  /** 告警通知组名称。
   - 同一个账户下，通知组名称不可重复。
   - 只能包括小写字母、数字、-。
   - 必须以小写字母或者数字开头和结尾。
   - 长度为3-63字符。 */
  AlarmNotifyGroupName?: string;
  /** 告警通知的类型。可选值，选择一个或者多个：Trigger-告警触发;Recovery-告警恢复。 */
  NotifyType?: Array<string>;
  /** 告警对应的通知列表。 */
  Receivers?: Array<IAlarmNoticeGroupReceiver>;
  /** 告警通知组的相关配置。当指定 NoticeRules 时，NotifyType 和 Receivers 字段将被忽略，由规则中的 ReceiverInfos 控制通知渠道。 */
  NoticeRules?: Array<INoticeRule>;
}

export type IAlarmNoticeGroupModifyResp = { [key: string]: any };

export interface IDescribeNotifyGroupReq {
  /** 告警通知组名称 */
  AlarmNotifyGroupName?: string;
  /** 告警通知组Id */
  AlarmNotifyGroupId?: string;
  /** 接收用户名 */
  ReceiverName?: string;
  /** 根据告警组所属的 IAM 项目名称进行筛选。精确匹配。 */
  IamProjectName?: string;
  /** 分页页码 */
  PageNumber?: number;
  /** 页面大小 */
  PageSize?: number;
}
export interface IAlarmNoticeGroupDescribeResp {
  AlarmNotifyGroups: Array<IAlarmNoticeGroupNotifyGroupsInfo>;
  Total: number;
}

export interface IWebTracksReq {
  /** 日志项目 ID。 */
  ProjectId: string;
  /** 日志主题 ID。 */
  TopicId: string;
  /**
   * 日志组（LogGroup），表示由多个 Log 组成的集合，一个 Log 表示一条日志。
   * 一个 LogGroup 中 Log 个数不能超过 10000。
   */
  Logs: Array<Record<string, string>>;
  /** 日志来源，一般使用机器 IP 作为标识。 */
  Source?: string;
}

export type IWebTracksResp = { [key: string]: any };

export interface IRegionTopic {
  /** 检索所在地域标识，对应后端 Region 字段。 */
  Region: string;
  /** 检索的目标 Topic 标识，对应后端 Topic 字段。 */
  Topic: string;
}

export interface IIndexSearchLogsReq {
  /** 翻页加载更多日志时使用，透传上次返回的 context 值，获取后续的日志内容。 */
  Context?: string;
  /** 查询结束时间点。Unix 时间戳格式，表示从 1970-1-1 00:00:00 UTC 计算起的秒数。 */
  EndTime: number;
  /** 是否返回高亮结果。 */
  HighLight?: boolean;
  /** 返回的日志条数，上限为 1_000_000，且单次返回日志体积不超过约 20MB。 */
  Limit: number;
  /** 查询语句，语句长度最大为 4096 字节。 */
  Query: string;
  /** 按日志时间戳顺序返回日志，精确到秒:
   - desc：（默认值）按照时间逆序返回日志，新的日志在前。
   - asc：按照时间顺序返回日志，旧的日志在前。 */
  Sort?: string;
  /** 查询开始时间点。Unix 时间戳格式，表示从 1970-1-1 00:00:00 UTC 计算起的秒数。 */
  StartTime: number;
  /** 要检索的日志主题 ID。 */
  TopicId: string;
  /** 是否使用精确查询。 */
  AccurateQuery?: boolean;
  /** 深翻页偏移量，对应后端 Offset 字段。 */
  Offset?: number;
  /** 是否必须返回完整结果。为 true 时若查询因超时被截断将返回错误，对应后端 MustComplete 字段。 */
  MustComplete?: boolean;
  /** 多 Region/Topic 检索时指定的检索范围列表，对应后端 RegionTopics 字段。 */
  RegionTopics?: Array<IRegionTopic>;
}

export interface IEsclientAnalysisResult {
  Data?: Array<Record<string, { [key: string]: any }>>;
  Schema?: Array<string>;
  Type?: Record<string, string>;
}

export interface ISearchLogsError {
  /** 多 Topic 检索场景下出错的 TopicId。 */
  TopicId?: string;
  /** 对应错误信息。 */
  ErrorMsg?: string;
}

export interface IEsclientResult {
  Analysis?: boolean;
  AnalysisResult?: IEsclientAnalysisResult;
  Context?: string;
  Count?: number;
  HighLight?: Array<Record<string, { [key: string]: any }>>;
  HitCount?: number;
  Limit?: number;
  ListOver?: boolean;
  Logs?: Array<Record<string, { [key: string]: any }>>;
  ResultStatus?: string;
  /** 本次检索所使用的时间，单位为毫秒。 */
  ElapsedMillisecond?: number;
  /** 多 Topic 检索场景下的错误信息列表。 */
  Errors?: Array<ISearchLogsError>;
}

export interface LogContent {
  Key: string;
  Value: string;
}

export interface Log {
  Time: number;
  Contents: LogContent[];
}

export interface LogTag {
  Key: string;
  Value: string;
}

export interface LogGroup {
  Logs: Log[];
  Source: string;
  LogTags: LogTag[];
  FileName: string;
  ContextFlow?: string;
}

export interface LogGroupList {
  LogGroups: LogGroup[];
}

export interface IPutLogsReq {
  /** 日志主题id */
  TopicId: string;
  CompressType?: "lz4" | "zlib";
  HashKey?: string;
  LogGroupList: Buffer;
  /** 请求体原始大小，单位为字节，对应 x-tls-bodyrawsize 头；不传时由 SDK 自动按 LogGroupList 长度填充。 */
  BodyRawSize?: number;
  ContentMD5?: string;
}

export type IPutLogsResp = { [key: string]: any };

// Trace
// DescribeTraceInstances
export interface IDescribeTraceInstancesReq {
  /** 分页，默认从1开始。 */
  PageNumber?: number;
  /** 分页大小限制，默认为20，最大为100。 */
  PageSize?: number;
  /** Trace实例名称，作为模糊查询使用。TraceInstanceName和TraceInstanceId只能提供一个。 */
  TraceInstanceName?: string;
  /** Trace实例ID，作为模糊查询使用。 */
  TraceInstanceId?: string;
  /** 日志项目ID */
  ProjectId?: string;
  /** 日志项目名称。 */
  ProjectName?: string;
  /** Trace实例的状态。 */
  Status?: string;
  /** IAM日志项目名称 */
  IamProjectName?: string;
  /** CS账号渠道标识，用于区分不同的账号来源或渠道，例如区分不同 CS 账号或环境。 */
  CsAccountChannel?: string;
}

export enum TraceInstanceStatus {
  "CREATING" = "CREATING",
  "CREATED" = "CREATED",
  "DELETING" = "DELETING",
}

/** Trace 实例后端存储配置。 */
export interface IBackendConfig {
  /** 数据的保存时间，单位为天，取值范围为 1~3650。 */
  Ttl?: number;
  /** 是否开启冷热存储。开启后，配合 HotTtl、ColdTtl、ArchiveTtl 将数据分层存储；默认 false。 */
  EnableHotTtl?: boolean;
  /** 标准存储时长，单位为天，取值范围为 7~3650。 */
  HotTtl?: number;
  /** 低频存储时长，单位为天，取值范围为 30~3650。 */
  ColdTtl?: number;
  /** 归档存储时长，单位为天，取值范围为 60~3650。 */
  ArchiveTtl?: number;
  /** 是否开启分区的自动分裂功能。 */
  AutoSplit?: boolean;
  /** Shard 的最大分裂个数。 */
  MaxSplitPartitions?: number;
}

export interface ITraceInsDescribeResp {
  CreateTime: string;
  DependencyTopicId: string;
  DependencyTopicTopicName: string;
  Description: string;
  ModifyTime: string;
  ProjectId: string;
  ProjectName: string;
  TraceInstanceId: string;
  TraceInstanceName: string;
  TraceInstanceStatus: TraceInstanceStatus;
  TraceTopicId: string;
  TraceTopicName: string;
  /** Trace 实例的后端配置。 */
  BackendConfig?: IBackendConfig;
  /** CS 账号渠道标识，用于区分不同的账号来源或环境。 */
  CsAccountChannel?: string;
}

export interface ITraceInsDescribeTraceInstancesResp {
  Total: number;
  TraceInstances: Array<ITraceInsDescribeResp>;
}

export interface ITraceInsDeleteReq {
  /** Trace实例ID。 */
  TraceInstanceId: string;
}

// Delete
export interface IDeleteTraceInstanceReq {
  /** 请求参数 */
  data: ITraceInsDeleteReq;
}

export type ITraceInsDeleteResp = Record<string, any>;

// Create

export interface ITraceInsCreateReq {
  /** Trace实例描述信息：不支持<>、'、、；长度为0-64个字符。 */
  Description?: string;
  /** 日志主题所属的日志项目uuid。 */
  ProjectId: string;
  /** Trace实例名称:同一个日志项目下，日志主题名称不可重复;只能包括小写字母、数字、中文和短划线（-）;必须以小写字母、中文或者数字开头和结尾;长度为3~30字符。 */
  TraceInstanceName: string;
  /** Trace 实例的后端配置，用于设置分层存储与自动分裂等策略。 */
  BackendConfig?: IBackendConfig;
}

export interface ICreateTraceInstanceReq {
  /** 请求参数 */
  data: ITraceInsCreateReq;
}

export interface ITraceInsCreateResp {
  TraceInstanceId: string;
}

// Modify
export interface ITraceInsModifyReq {
  /** 日志主题描述信息：不支持<>、'、、；长度为0-64个字符。 */
  Description?: string;
  /** Trace实例ID。 */
  TraceInstanceId: string;
  /** Trace 实例的后端配置，用于在 ModifyTraceInstance 接口中调整日志存储的分层策略和自动分裂配置。 */
  BackendConfig?: IBackendConfig;
}

export interface IModifyTraceInstanceReq {
  /** 请求参数 */
  data: ITraceInsModifyReq;
}

export type ITraceInsModifyResp = Record<string, any>;

// DescribeTraceInstance
export interface IDescribeTraceInstanceReq {
  /** Trace实例id */
  TraceInstanceId: string;
}

// DescribeTrace
export interface ITraceKeyValue {
  /** Key。 */
  Key: string;
  /** 具体取值。 */
  Value: string;
}

export interface ITraceResource {
  /** 属性列表。 */
  Attributes: Array<ITraceKeyValue>;
}

export interface ITraceInstrumentationLibrary {
  /** 库名称。 */
  Name: string;
  /** 库版本。 */
  Version: string;
}

export interface ITraceStatus {
  /** 错误消息。 */
  Message: string;
  /** 状态码: "UNSET", "OK", "ERROR"。 */
  Code: string;
}

export interface ITraceSpanEvent {
  /** 时间戳，单位为微秒。 */
  Timestamp: number;
  /** Event 名称。 */
  Name: string;
  /** 属性列表。 */
  Attributes: Array<ITraceKeyValue>;
}

export interface ITraceSpanLink {
  /** TraceID 唯一标识一个 trace。 */
  TraceId: string;
  /** 在一个 trace 中 SpanID 唯一标识一个 span。 */
  SpanId: string;
  /** Trace 状态。 */
  TraceState: string;
  /** Span 属性列表。 */
  Attributes: Array<ITraceKeyValue>;
}

export interface ITraceSpan {
  /** TraceID 唯一标识一个 trace。 */
  TraceId: string;
  /** 在一个 trace 中 SpanID 唯一标识一个 span。 */
  SpanId: string;
  /** Trace 状态。 */
  TraceState: string;
  /** 父 SpanID。 */
  ParentSpanId: string;
  /** Span 名称。 */
  Name: string;
  /** Span 类型。 */
  Kind: string;
  /** Span 开始时间，单位为微秒。 */
  StartTime: number;
  /** Span 结束时间，单位为微秒。 */
  EndTime: number;
  /** Span 属性列表。 */
  Attributes: Array<ITraceKeyValue>;
  /** Span event 列表。 */
  Events: Array<ITraceSpanEvent>;
  /** Span Link 列表。 */
  Links: Array<ITraceSpanLink>;
  /** Span 状态。 */
  Status: ITraceStatus;
  /** 资源信息。 */
  Resource: ITraceResource;
  /** Instrumentation 库信息。 */
  InstrumentationLibrary: ITraceInstrumentationLibrary;
}

export interface ITrace {
  /** Span 列表。 */
  Spans: Array<ITraceSpan>;
}

export interface IUnionTraceInstanceID {
  /** Trace 实例 ID。 */
  TraceInstanceId: string;
}

export interface IDescribeTraceReq {
  /** Trace 实例 ID。 */
  TraceInstanceId: string;
  /** Trace ID。 */
  TraceId: string;
  /** 联合查询的 Trace 实例列表。 */
  UnionTraceInstanceIds?: Array<IUnionTraceInstanceID>;
}

export interface IDescribeTraceResp {
  /** Trace 详情。 */
  Trace: ITrace;
}

// SearchTraces
export interface ITraceQueryParameters {
  /** Trace ID。 */
  TraceId?: string;
  /** 服务名称。 */
  ServiceName?: string;
  /** 操作名称。 */
  OperationName?: string;
  /** Span 类型。 */
  Kind?: string;
  /** Attributes 中字段为 key，value 为该字段可能的取值。 */
  Attributes?: Record<string, string>;
  /** Span 最小开始时间的微秒时间戳。 */
  StartTimeMin?: number;
  /** Span 最大开始时间的微秒时间戳。 */
  StartTimeMax?: number;
  /** Duration 的最小值，单位为微秒。 */
  DurationMin?: number;
  /** Duration 的最大值，单位为微秒。 */
  DurationMax?: number;
  /** Trace 状态码。 */
  StatusCode?: string;
  /** Offset。 */
  Offset?: number;
  /** Limit，必填，(0, 100]。 */
  Limit: number;
  /** 排序字段: Kind、Name、ServiceName、Start、End、Duration 等。 */
  Order?: string;
  /** 是否升序。 */
  Asc?: boolean;
}

export interface ITraceInfo {
  /** TraceID。 */
  TraceId: string;
  /** 服务名称。 */
  ServiceName: string;
  /** 操作名称。 */
  OperationName: string;
  /** Attributes 中字段为 key，value 为该字段可能的取值。 */
  Attributes: Record<string, string>;
  /** 开始时间，单位为微秒。 */
  StartTime: number;
  /** 结束时间，单位为微秒。 */
  EndTime: number;
  /** Duration，单位为微秒。 */
  Duration: number;
  /** Trace 状态码。 */
  StatusCode: string;
}

export interface ISearchTracesReq {
  /** Trace 实例 ID。 */
  TraceInstanceId: string;
  /** 查询条件。 */
  Query: ITraceQueryParameters;
}

export interface ISearchTracesResp {
  /** 总条数。 */
  Total: number;
  /** Trace 详情列表。 */
  TraceInfos: Array<ITraceInfo>;
}

export interface IHistogramInfoV1 {
  /** 子区间中对应搜索结果的数量，即该时段内符合条件的日志条数 */
  Count: number;
  /** 查询的结束时间点 */
  EndTime: number;
  /** 查询的开始时间点 */
  StartTime: number;
  /**
   * 查询的状态
   * - complete：查询完成，返回结果完整
   * - incomplete：查询完成，返回部分结果
   * - error：查询未完成，返回错误
   * - time_out：查询超时，返回的结果可能不完整
   */
  ResultStatus: string;
}

export interface IDescribeHistogramV1Req {
  /** 查询结束时间点。Unix 时间戳格式，表示从 1970-1-1 00:00:00 UTC 计算起的秒数，EndTime 必须大于 StartTime。 */
  EndTime: number;
  /** 直方图的子区间长度，单位为秒。该值必须大于 1。默认情况下 Interval = (EndTime-StartTime)/60 并向上取整，最多可指定 60 个子区间。 */
  Interval?: number;
  /** 查询语句，语句长度最大为 4KiB。日志服务支持的检索语法请参考检索语法。 */
  Query: string;
  /** 查询开始时间点。Unix 时间戳格式，表示从 1970-1-1 00:00:00 UTC 计算起的秒数。 */
  StartTime: number;
  /** 要检索的日志主题 ID。 */
  TopicId: string;
  /** 多 Region/Topic 检索时指定的检索范围列表，对应后端 RegionTopics 字段。 */
  RegionTopics?: Array<IRegionTopic>;
}

export interface IDescribeHistogramV1Resp {
  /** 所有子区间的结果集 */
  Histogram: Array<IHistogramInfoV1>;
  /**
   * 查询的状态
   * - complete：查询完成，返回结果完整
   * - incomplete：查询完成，返回部分结果
   * - error：查询未完成，返回错误
   * - time_out：查询超时，返回的结果可能不完整
   */
  ResultStatus: string;
  /** 此次请求所有直方图数据总和，即对应时间内符合条件的日志条数 */
  TotalCount: number;
}

// ManualShardSplit
export interface IManualShardSplitReq {
  /** 日志主题 ID */
  TopicId: string;
  /** 待手动分裂的日志分区 ID */
  ShardId: number;
  /** 分区的分裂数量。应为非零偶数，例如 2、4、8 或 16。分裂后读写状态分区总数不能超过 256 个。 */
  Number: number;
}

export interface IManualShardSplitResp {
  /** 日志分区的范围等详细信息 */
  Shards: Array<IShardQueryResp>;
}

export interface IDescribeCursorReq {
  TopicId: string;
  ShardId: number;
  From: string;
}

export interface IDescribeCursorResp {
  Cursor: string;
}

export interface IDeleteAbnormalHostsReq {
  /** 心跳异常机器对应的的机器组 ID。 */
  HostGroupId: string;
}

export type IDeleteAbnormalHostsResp = { [key: string]: any };

// ModifyHostGroupsAutoUpdate
export interface IModifyHostGroupsAutoUpdateReq {
  /** 机器组 ID 列表。 */
  HostGroupIds: Array<string>;
  /**
   * 机器组服务器中安装的 LogCollector 是否开启自动升级功能。
   *
   * * true：日志服务将会在每天的指定时间段进行升级前检查，若满足升级条件，则自动升级 LogCollector，无需手动操作。
   * * false：（默认）LogCollector 不自动升级，如需使用更高版本的 LogCollector，请参考升级 LogCollector操作。
   *
   * 仅 LogCollector V1.0.8 及后续版本支持自动升级。
   */
  AutoUpdate: boolean;
  /**
   * LogCollector 的自动升级的开始时间。
   *
   * * 仅在 AutoUpdate 为 true 时需要设置。
   * * 自动升级时间建议设置为业务低峰期，自动升级过程中可能会重启 LogCollector，但不会丢失日志。
   */
  UpdateStartTime?: string;
  /** LogCollector 的自动升级的结束时间。 */
  UpdateEndTime?: string;
}

export type IModifyHostGroupsAutoUpdateResp = { [key: string]: any };

// CancelDownloadTask
export interface ICancelDownloadTaskReq {
  /** 下载任务 ID。 */
  TaskId: string;
}

export type ICancelDownloadTaskResp = { [key: string]: any };

// Shipper types
export interface ICsvInfo {
  Keys: Array<string>;
  Delimiter: string;
  EscapeChar: string;
  PrintHeader: boolean;
  NonFieldContent: string;
}

export interface IJsonInfo {
  Keys?: Array<string>;
  Enable: boolean;
  Escape?: boolean;
}

export interface IContentInfo {
  Format?: string;
  CsvInfo?: ICsvInfo;
  JsonInfo?: IJsonInfo;
}

export interface IKafkaShipperInfo {
  /** 投递结束时间，毫秒时间戳，如果不配置，则会一直投递。 */
  EndTime?: number;
  /** 压缩格式，当前支持 snappy、gzip、lz4、none。 */
  Compress: string;
  /** Kafka 实例。 */
  Instance: string;
  /** 投递开始时间，毫秒时间戳，如果不配置，默认为当前时间。 */
  StartTime?: number;
  /** Kafka Topic 名称。 */
  KafkaTopic: string;
}

export interface ITosShipperInfo {
  /** 对象存储桶名称。 */
  Bucket: string;
  /** 存储桶的顶级目录名称。 */
  Prefix?: string;
  /** 每个分区（Shard）最大可投递的原始文件大小，单位为 MiB。 */
  MaxSize?: number;
  /** 压缩格式。 */
  Compress?: string;
  /** 投递时间间隔，单位为秒。 */
  Interval?: number;
  /** 投递日志的分区规则。 */
  PartitionFormat?: string;
}

export interface IModifyShipperReq {
  ShipperId: string;
  ShipperName?: string;
  ShipperType?: string;
  Status?: boolean;
  RoleTrn?: string;
  ContentInfo?: IContentInfo;
  KafkaShipperInfo?: IKafkaShipperInfo;
  TosShipperInfo?: ITosShipperInfo;
}

export type IModifyShipperResp = { [key: string]: any };

// ETL Task
// DeleteETLTask
export interface IDeleteETLTaskReq {
  /** 待删除的加工任务的 ID。 */
  TaskId: string;
}

export type IDeleteETLTaskResp = { [key: string]: any };

// DescribeETLTask
export interface IDescribeETLTaskReq {
  /** 待查询的加工任务 ID。 */
  TaskId: string;
}

export interface ITargetResourcesResp {
  /** 自定义输出目标的名称。 */
  Alias?: string;
  /** 用于存储加工后日志的日志主题 ID。 */
  TopicId?: string;
  /** 用于存储加工后日志的日志项目 ID。 */
  ProjectId?: string;
  /** 用于存储加工后日志的日志项目名称。 */
  ProjectName?: string;
  /** 用于存储加工后日志的日志项目所属地域。 */
  Region?: string;
  /** 用于存储加工后日志的日志主题名称。 */
  TopicName?: string;
  /** 跨账号授权角色名。 */
  RoleTrn?: string;
}

export interface IDescribeETLTaskResp {
  /** 加工任务的创建时间。 */
  CreateTime?: string;
  /** DSL 类型，固定为 NORMAL。 */
  DSLType?: string;
  /** 数据加工任务的描述信息。 */
  Description?: string;
  /** 任务调度状态。 */
  ETLStatus?: string;
  /** 是否启用数据任务。 */
  Enable?: boolean;
  /** 待加工数据的开始时间，空代表加工所有历史数据。 */
  FromTime?: number;
  /** 最近启动时间。 */
  LastEnableTime?: string;
  /** 加工任务的修改时间。 */
  ModifyTime?: string;
  /** 加工任务名称。 */
  Name?: string;
  /** 待加工数据所在的日志项目 ID。 */
  ProjectId?: string;
  /** 待加工数据所在的日志项目名称。 */
  ProjectName?: string;
  /** 加工规则。 */
  Script?: string;
  /** 待加工数据所在的日志主题 ID。 */
  SourceTopicId?: string;
  /** 待加工数据所在的日志主题名称。 */
  SourceTopicName?: string;
  /** 输出目标的相关信息。 */
  TargetResources?: Array<ITargetResourcesResp>;
  /** 加工任务 ID。 */
  TaskId?: string;
  /** 任务类型，固定为 Resident。 */
  TaskType?: string;
  /** 日志加工数据范围的结束时间，空代表无限制。 */
  ToTime?: number;
}

// ETL Task types
export interface IDescribeETLTasksReq {
  /** 分页页码 */
  PageNumber?: number;
  /** 页面大小 */
  PageSize?: number;
  /** 项目ID */
  ProjectId?: string;
  /** 任务名称，支持模糊匹配 */
  TaskName?: string;
  /** 任务ID */
  TaskId?: string;
  /** 任务状态 */
  Status?: string;
  /** 创建时间起始时间戳 */
  CreateTimeStart?: number;
  /** 创建时间结束时间戳 */
  CreateTimeEnd?: number;
}

export interface IETLTaskInfo {
  /** 任务ID */
  TaskId: string;
  /** 任务名称 */
  TaskName: string;
  /** 项目ID */
  ProjectId: string;
  /** 任务描述 */
  Description?: string;
  /** 任务状态 */
  Status: string;
  /** 创建时间 */
  CreateTime: string;
  /** 修改时间 */
  ModifyTime: string;
  /** 任务配置信息 */
  TaskConfig?: { [key: string]: any };
  /** 错误信息 */
  ErrorMessage?: string;
}

export interface IDescribeETLTasksResp {
  /** 任务列表 */
  Tasks: Array<IETLTaskInfo>;
  /** 总数量 */
  Total: number;
}

// ETL Task Management
export interface ITargetResource {
  /** 自定义输出目标的名称，用于数据加工规则中引用。 */
  Alias: string;
  /** 输出目标日志主题 ID。 */
  TopicId: string;
  /** 输出目标日志主题所在的地域。 */
  Region: string;
  /** 跨账号服务角色 TRN，用于跨账号访问目标日志服务资源。 */
  ServiceTrn?: string;
  /** 跨账号授权角色名 TRN，用于其他账号的数据加工任务授权。 */
  RoleTrn?: string;
  /** 代理接入点名称，用于跨地域访问 TLS 时指定的 ProxyPoint。 */
  ProxyPoint?: string;
  /** 代理访问的 Endpoint，当配置 ProxyPoint 时必填。 */
  Endpoint?: string;
}

export interface IModifyETLTaskReq {
  /** 数据加工任务的描述信息。<br><br>* 不支持 `<>、'、\\、\\\\`。<br>* 长度为 0～64 个字符。 */
  Description?: string;
  /** 加工任务名称。 */
  Name?: string;
  /** 加工规则。 */
  Script?: string;
  /** 输出目标的相关信息。 */
  TargetResources?: Array<ITargetResource>;
  /** 加工任务 ID。 */
  TaskId: string;
}

export type IModifyETLTaskResp = { [key: string]: any };

/** CreateETLTask */
export interface ICreateETLTaskReq {
  /** DSL 类型，固定为 NORMAL。 */
  DSLType: "NORMAL";
  /** 数据加工任务的描述信息。 */
  Description?: string;
  /** 是否启用该数据加工任务，true 表示启用，false 表示关闭。 */
  Enable: boolean;
  /** 待加工数据的起始时间戳（Unix 时间戳）。 */
  FromTime?: number;
  /** 数据加工任务的名称。 */
  Name: string;
  /** 数据加工规则。 */
  Script: string;
  /** 待加工数据的源日志主题 ID。 */
  SourceTopicId: string;
  /** 输出目标的相关信息数组。 */
  TargetResources: Array<ITargetResource>;
  /** 任务类型，固定为 Resident（常驻任务）。 */
  TaskType: "Resident";
  /** 待加工数据的结束时间戳（Unix 时间戳）。 */
  ToTime?: number;
}

export interface ICreateETLTaskResp {
  /** 数据加工任务的 ID。 */
  TaskId: string;
}

// DeleteImportTask
export interface IDeleteImportTaskReq {
  /** 待删除的数据导入任务的 ID。 */
  TaskId: string;
}

export type IDeleteImportTaskResp = { [key: string]: any };

// CreateImportTask - 首先定义所有子类型
export interface ITosSourceInfo {
  /** 日志文件所在的 TOS 存储桶。 */
  Bucket?: string;
  /** 待导入的文件在 TOS 存储桶中的路径。 */
  Prefix?: string;
  /** TOS 存储桶所在的地域。支持跨地域导入数据。 */
  Region?: string;
  /** TOS 存储桶中数据的压缩模式。none：无压缩；snappy：使用 snappy 进行压缩；gzip：使用 gzip 进行压缩；lz4：使用 lz4 进行压缩。 */
  CompressType?: string;
}

export interface IKafkaSourceInfo {
  /** Kafka 服务地址，多个地址用半角逗号分隔。 */
  Host?: string;
  /** Kafka 消费组。不填时系统自动创建。 */
  Group?: string;
  /** Kafka Topic 名称，多个 Topic 用半角逗号分隔。 */
  Topic?: string;
  /** 数据编码格式，支持 UTF-8、GBK。 */
  Encode?: string;
  /** Kafka SASL 用户密码，用于身份认证。 */
  Password?: string;
  /** 安全传输协议，可选 plaintext、sasl_ssl、ssl、sasl_plaintext。 */
  Protocol?: string;
  /** Kafka SASL 用户名，用于身份认证。 */
  Username?: string;
  /** 密码认证机制，可选 PLAIN、SCRAM-SHA-256、SCRAM-SHA-512。 */
  Mechanism?: string;
  /** 火山引擎 Kafka 版实例 ID。 */
  InstanceId?: string;
  /** 是否开启鉴权，公网地址建议开启。 */
  IsNeedAuth?: boolean;
  /** 数据导入起始位置。0：最早时间；1：最近时间。 */
  InitialOffset?: number;
  /** 指定日志时间。0：使用 Kafka 消息时间戳；1：使用系统当前时间。 */
  TimeSourceDefault?: number;
}

export interface IExtractRule {
  /** 日志字段名称列表，仅当 LogType 为 delimiter_log 时有效。 */
  Keys?: Array<string>;
  /** 引用符，仅当 LogType 为 delimiter_log 时有效。 */
  Quote?: string;
  /** 日志时间字段名称，与 TimeFormat 成对出现。 */
  TimeKey?: string;
  /** 时区，支持 GMT/UTC 格式。 */
  TimeZone?: string;
  /** 日志分隔符，仅当 LogType 为 delimiter_log 时有效。 */
  Delimiter?: string;
  /** 多行日志首行正则，仅当 LogType 为 multiline_log 时有效。 */
  BeginRegex?: string;
  /** 时间字段解析格式，与 TimeKey 成对出现。 */
  TimeFormat?: string;
  /** 跳过 CSV 文件前 N 行，仅 tos+delimiter_log 有效。 */
  SkipLineCount?: number;
  /** 解析失败日志的 key 名称，与 UnMatchUpLoadSwitch 成对出现。 */
  UnMatchLogKey?: string;
  /** 提取时间值的正则，用于自定义时间解析。 */
  TimeExtractRegex?: string;
  /** 是否上传解析失败的日志，与 UnMatchLogKey 成对出现。 */
  UnMatchUpLoadSwitch?: boolean;
  /** 时间样例，用于校验 TimeFormat 是否正确。 */
  TimeSample?: string;
}

export interface ITargetInfo {
  /** 地域 ID。 */
  Region: string;
  /** 导入时指定日志解析类型。delimiter_log：CSV 类型；multiline_log：多行全文类型；minimalist_log：单行全文类型；json_log：JSON 类型。 */
  LogType: string;
  /** 日志样例。设置 LogType 为 multiline_log 时，需要配置日志样例。 */
  LogSample?: string;
  /** 日志提取规则。 */
  ExtractRule?: IExtractRule;
  /** 用户自定义采集规则，映射实现仓库中的 UserDefineRule 结构。 */
  UserDefineRule?: Record<string, unknown>;
}

export interface IImportSourceInfo {
  /** TOS 导入源端信息。当 sourceType 为 tos 时，必填。 */
  TosSourceInfo?: ITosSourceInfo;
  /** Kafka 导入源端信息。当 sourceType 为 kafka 时，必填。 */
  KafkaSourceInfo?: IKafkaSourceInfo;
}

export interface ICreateImportTaskReq {
  /** 数据导入任务描述。 */
  Description?: string;
  /** 数据导入任务的导入源端信息。 */
  ImportSourceInfo: IImportSourceInfo;
  /** 用于存储数据的日志项目 ID。 */
  ProjectID?: string;
  /** 导入源端类型。tos：导入 TOS 数据；kafka：导入 Kafka 数据。 */
  SourceType: string;
  /** 数据导入任务的输出端信息。 */
  TargetInfo: ITargetInfo;
  /** 数据导入任务名称。 */
  TaskName: string;
  /** 用于存储数据的日志主题 ID。 */
  TopicID: string;
}

export interface ICreateImportTaskResp {
  /** 导入任务 ID。 */
  TaskId: string;
}

// DescribeImportTask
export interface IDescribeImportTaskReq {
  /** 导入任务 ID。 */
  TaskId: string;
}

export interface IImportTaskInfo {
  /** 导入任务 ID。 */
  TaskId: string;
  /** 导入任务名称。 */
  TaskName: string;
  /** 导入任务状态。 */
  Status: string;
  /** 导入任务创建时间。 */
  CreateTime: string;
  /** 导入任务更新时间。 */
  UpdateTime: string;
  /** 导入任务开始时间。 */
  StartTime?: string;
  /** 导入任务结束时间。 */
  EndTime?: string;
  /** 导入任务进度，百分比。 */
  Progress: number;
  /** 导入任务配置信息。 */
  TaskConfig: {
    /** 日志项目 ID。 */
    ProjectId: string;
    /** 日志主题 ID。 */
    TopicId: string;
    /** 导入数据源配置。 */
    SourceConfig: {
      /** 数据源类型。 */
      Type: string;
      /** 数据源具体配置。 */
      Config: Record<string, unknown>;
    };
    /** 导入任务调度配置。 */
    ScheduleConfig?: {
      /** 调度类型。 */
      Type: string;
      /** 调度具体配置。 */
      Config: Record<string, unknown>;
    };
  };
  /** 导入任务统计信息。 */
  Statistics?: {
    /** 已导入日志条数。 */
    ImportedCount: number;
    /** 失败日志条数。 */
    FailedCount: number;
    /** 总日志条数。 */
    TotalCount: number;
  };
  /** 导入任务错误信息。 */
  ErrorInfo?: {
    /** 错误码。 */
    ErrorCode: string;
    /** 错误信息。 */
    ErrorMessage: string;
  };
}

export interface IDescribeImportTaskResp {
  /** 导入任务详情。 */
  TaskInfo: IImportTaskInfo;
}

// DeleteShipper
export interface IDeleteShipperReq {
  /** 待删除的投递配置的 ID。 */
  ShipperId: string;
}

export type IDeleteShipperResp = { [key: string]: any };

// CreateShipper
export interface ICreateShipperReq {
  /** 投递日志的内容格式配置。 */
  ContentInfo: IContentInfo;
  /** 投递到 Kafka 的相关信息。 */
  KafkaShipperInfo?: IKafkaShipperInfo;
  /** 投递结束时间。 */
  ShipperEndTime?: number;
  /** 投递配置名称。 */
  ShipperName: string;
  /** 投递开始时间。 */
  ShipperStartTime?: number;
  /** 投递类型。 */
  ShipperType: string;
  /** 待投递日志所在的日志主题 ID。 */
  TopicId: string;
  /** 投递到 TOS 的相关信息。 */
  TosShipperInfo?: ITosShipperInfo;
  /** 自定义角色的 Trn。 */
  RoleTrn?: string;
}

export interface ICreateShipperResp {
  /** 新建投递配置的 ID。 */
  ShipperId: string;
}

// DescribeShipper
export interface IDescribeShipperReq {
  /** 待查询的投递配置 ID */
  ShipperId: string;
}

export interface IShipperInfo {
  /** 是否开启投递配置。 */
  Status: boolean;
  /** 待投递日志所在的日志主题 ID。 */
  TopicId: string;
  /** 待投递日志所在的日志项目 ID。 */
  ProjectId: string;
  /** 投递配置 ID。 */
  ShipperId: string;
  /** 待投递日志所在的日志主题名称。 */
  TopicName: string;
  /** 投递配置的创建时间。 */
  CreateTime: string;
  /** 投递配置的最近修改时间。 */
  ModifyTime: string;
  /** 投递日志的内容格式配置。 */
  ContentInfo: IContentInfo;
  /** 投递的默认内置仪表盘 ID。 */
  DashboardId: string;
  /** 待投递日志所在的日志项目名称。 */
  ProjectName: string;
  /** 投递配置名称。 */
  ShipperName: string;
  /** 投递类型。 */
  ShipperType: string;
  /** 投递结束时间。 */
  ShipperEndTime: number;
  /** 投递到 TOS 的相关信息。 */
  TosShipperInfo?: ITosShipperInfo;
  /** 投递到 Kafka 的相关信息。 */
  KafkaShipperInfo?: IKafkaShipperInfo;
  /** 投递开始时间。 */
  ShipperStartTime: number;
  /** 自定义角色的 Trn。 */
  RoleTrn: string;
}

export interface IDescribeShipperResp extends IShipperInfo {}
// CloseKafkaConsumer
export interface ICloseKafkaConsumerReq {
  /** 日志主题的 ID。 */
  TopicId: string;
}

export type ICloseKafkaConsumerResp = { [key: string]: any };

// OpenKafkaConsumer
export interface IOpenKafkaConsumerReq {
  /** 日志主题的 ID。 */
  TopicId: string;
}

export type IOpenKafkaConsumerResp = { [key: string]: any };

// DescribeKafkaConsumer
export interface IDescribeKafkaConsumerReq {
  /** 日志主题的 ID。 */
  TopicId: string;
}

export interface IDescribeKafkaConsumerResp {
  /** 指定日志主题是否已开启了 Kafka 协议消费功能。 */
  AllowConsume: boolean;
  /** Kafka 协议消费主题 ID，格式为 out+日志主题 ID。通过 Kafka 协议消费此日志主题中的日志数据时，Topic 应指定为此 ID。 */
  ConsumeTopic: string;
}

// GetAccountStatus
export interface IGetAccountStatusReq {}

export interface IGetAccountStatusResp {
  /** 日志服务版本：2.0：新架构；1.0：老架构 */
  ArchVersion: string;
  /** 是否已开通日志服务：Activated：已开通日志服务；NonActivated：未开通日志服务 */
  Status: string;
}

// ActiveTlsAccount
export interface IActiveTlsAccountReq {}

export type IActiveTlsAccountResp = { [key: string]: any };

// ModifyETLTaskStatus
export interface IModifyETLTaskStatusReq {
  /** 是否开启数据加工任务。
   * true：开启。
   * false：不开启。 */
  Enable: boolean;
  /** 加工任务 ID。 */
  TaskId: string;
}

export type IModifyETLTaskStatusResp = { [key: string]: any };

// ConsumeLogs
export interface IConsumeLogsReq {
  /** 日志主题 ID */
  TopicId: string;
  /** Shard ID */
  ShardId: number;
  /** 游标，表示从什么位置开始读取数据，相当于起点。 */
  Cursor: string;
  /** 结束游标，表示读取数据到什么地方结束，相当于终点。EndCursor 为空则不设 end。 */
  EndCursor?: string;
  /** 想要返回的最大 LogGroup 数量。最大值为 1000。 */
  LogGroupCount?: number;
  /** 返回数据的压缩格式。支持设置为：lz4：压缩格式为 lz4；zlib：压缩格式为 zlib。 */
  Compression?: string;
}

export type IConsumeLogsResp = Buffer;

// CreateDownloadTask
export interface IDownloadTaskCreateReq {
  /** 下载任务名称。长度范围为 1~63 字符。 */
  TaskName: string;
  /** 日志所在日志主题的 ID。 */
  TopicId: string;
  /** 下载的类型，对应后端 DownloadTaskType 枚举。 */
  TaskType: number;
  /**
   * 检索分析语句，语句长度最大为 4KiB。
   *
   * 支持仅指定检索语句，例如指定为`*`表示下载指定时段的所有原始日志。
   * 日志服务支持的检索语法请参考检索语法，SQL 分析语法与函数列表请参考分析语法。
   */
  Query: string;
  /** 查询开始时间点，Unix 时间戳格式，表示从 1970-1-1 00:00:00 UTC 开始计算的秒数。 */
  StartTime: number;
  /** 查询结束时间点，Unix 时间戳格式，表示从 1970-1-1 00:00:00 UTC 开始计算的秒数。 */
  EndTime: number;
  /**
   * 导出的文件格式，支持设置为：
   *
   * * csv：CSV 格式
   * * json：JSON 格式
   */
  DataFormat: string;
  /**
   * 仅检索不分析时，日志的排序方式。
   *
   * * asc：升序
   * * desc：倒序
   */
  Sort: string;
  /** 下载的原始日志条数，或分析结果的行数。必须符合下载任务的数据量限制。详细说明请参考使用说明。 */
  Limit: number;
  /** 是否允许下载非完整结果（incomplete）。 */
  AllowIncomplete?: boolean;
  /**
   * 导出文件的压缩格式。
   *
   * * none：不压缩。建议数据量较小时，才使用不压缩方式。
   * * gzip：使用 gzip 格式压缩。
   * * zip：使用 zip 格式压缩。
   */
  Compression: string;
  /** 上下文查询所需的信息，仅当 TaskType 为上下文下载类型时生效。 */
  LogContextInfos?: {
    /** 指定日志所在的 LogGroup 的 ID。 */
    ContextFlow?: string;
    /** 指定日志在 LogGroup 中的序号。 */
    PackageOffset?: number;
    /** 日志来源主机 IP。 */
    Source?: string;
  };
}

// DescribeDownloadTasks
export interface IDescribeDownloadTasksReq {
  /** 分页查询时的页码。默认为 1，即从第一页数据开始返回。 */
  PageNumber?: number;
  /** 分页大小。默认为 20，最大为 100。 */
  PageSize?: number;
  /** 日志所在的日志主题 ID。 */
  TopicId: string;
  /** 根据任务名称进行筛选，支持模糊搜索。 */
  TaskName?: string;
}

export interface IDownloadTaskResp {
  /** 日志检索分析语句。 */
  Query: string;
  /** 下载任务的 ID。 */
  TaskId: string;
  /** 下载任务的名称。 */
  TaskName: string;
  /** 下载任务的类型，对应后端 DownloadTaskType。 */
  TaskType: number;
  /** 日志主题名称。 */
  TopicId: string;
  /** 下载的日志条数。 */
  LogCount: number;
  /** 下载的日志量，单位为字节（Byte）。 */
  LogSize: number;
  /** 检索开始时间，格式为 `yyyy-MM-dd HH:mm:ss`。 */
  StartTime: string;
  /** 检索结束时间，格式为 `yyyy-MM-dd HH:mm:ss`。 */
  EndTime: string;
  /** 下载任务的创建时间，格式为 `yyyy-MM-dd HH:mm:ss`。 */
  CreateTime: string;
  /** 导出的文件格式，支持 CSV 文件格式或 JSON 格式。 */
  DataFormat: string;
  /**
   * 下载任务状态，即日志压缩文件的生成状态。包括：
   * - creating：文件生成中
   * - created_cut：文件生成中断
   * - success：文件已生成
   * - wait：等待中
   * - fail：已失败
   * - cancel：已取消
   * - incomplete：生成的文件为非完整结果
   */
  TaskStatus: string;
  /** 导出文件的压缩格式。 */
  Compression: string;
  /** 是否允许下载非完整结果（incomplete）。 */
  AllowIncomplete: boolean;
  /** 上下文下载的数据，仅当 TaskType 为上下文下载类型时返回。 */
  LogContextInfos?: {
    ContextFlow: string;
    PackageOffset: number;
    Source: string;
  };
}

export interface IDownloadTaskCreateResp {
  /** 日志主题 ID。 */
  TaskId: string;
}

// DescribeDownloadTasks response
export interface IDownloadTaskDescribeDownloadTasksResp {
  /** 下载任务详情。 */
  Tasks: Array<IDownloadTaskResp>;
  /** 日志下载任务的数量。日志服务仅支持保存一天以内的下载任务信息。 */
  Total: number;
}

// DescribeDownloadUrl
export interface IDescribeDownloadUrlReq {
  /** 下载任务的任务 ID。 */
  TaskId: string;
}

export interface IDescribeDownloadUrlResp {
  /** 指定下载任务对应的下载链接。
   * 链接有效期为 5 分钟，获取下载链接后请及时下载。若链接失效，需要重新调用此接口获取新的下载链接。 */
  DownloadUrl: string;
}

// DescribeLogContext
export interface IDescribeLogContextReq {
  /** 日志主题 ID。 */
  TopicId: string;
  /** 指定日志所在的 LogGroup 的 ID。 */
  ContextFlow: string;
  /** 指定日志在 LogGroup 的序号。 */
  PackageOffset: number;
  /** 日志来源主机 IP。 */
  Source: string;
  /** 指定日志的上文日志条数，即往前查看多少条日志。取值范围为 1~100，默认值为 10。 */
  PrevLogs?: number;
  /** 指定日志的下文日志条数，即往后查看多少条日志。取值范围为 1~100，默认值为 10。 */
  NextLogs?: number;
}

export interface ILogContextInfo {
  /** 该日志所在的 LogGroup 的 ID。 */
  ___context_flow___: string;
  /** 该日志在 LogGroup 的序号。 */
  __package_offset___: string;
  /** 其他字段 - 根据实际日志内容变化 */
  [key: string]: any;
}

export interface IDescribeLogContextResp {
  /** 指定日志的上下文日志信息。按上下文顺序排列。 */
  LogContextInfos: Array<ILogContextInfo>;
  /** 除 LogContextInfos 中的日志以外，是否还存在其他上文。 */
  PrevOver: boolean;
  /** 除 LogContextInfos 中的日志以外，是否还存在其他下文。 */
  NextOver: boolean;
}
/**
 * DescribeShippers
 * DescribeShippers
 */
export interface IDescribeShippersReq {
  /** 指定日志项目 ID。用于查询指定日志项目下的数据投递配置。 */
  ProjectId?: string;
  /** 指定日志项目名称。用于查询指定日志项目下的数据投递配置。支持模糊匹配。 */
  ProjectName?: string;
  /** 指定 IAM 项目名称。用于查询指定 IAM 项目下的数据投递配置。 */
  IamProjectName?: string;
  /** 分页大小。默认为 20，最大为 100。 */
  PageNumber?: number;
  /** 分页查询时的页码。默认为 1，即从第一页数据开始返回。 */
  PageSize?: number;
  /** 指定投递配置名称，支持模糊匹配。 */
  ShipperName?: string;
  /** 指定投递配置 ID。 */
  ShipperId?: string;
  /** 指定日志主题名称。用于查询该日志主题相关的数据投递配置。支持模糊匹配。 */
  TopicName?: string;
  /** 指定日志主题 ID。用于查询该日志主题相关的数据投递配置。 */
  TopicId?: string;
  /**
   * 指定投递类型，用于查询该投递类型相关的投递配置。
   * 可选值包括：tos（投递到 TOS）、kafka（投递到 Kafka）。
   */
  ShipperType?: string;
}

export interface IDescribeShippersResp {
  /** 投递配置相关信息。 */
  Shippers: Array<IShipperInfo>;
  /** 投递配置数量。 */
  Total: number;
}

// Schedule SQL task related interfaces

export interface IRequestCycle {
  Time: number;
  Type: string;
  CronTab?: string;
  CronTimeZone?: string;
}

export interface ICustomMetricLabel {
  Key: string;
  Value: string;
}

export interface IScheduleSqlVmpTaskInfo {
  MetricNames: Array<string>;
  WorkSpaceId: string;
  MetricLabels?: Array<string>;
  CustomMetricLabels?: Array<ICustomMetricLabel>;
}

export interface ICreateScheduleSqlTaskReq {
  TaskName: string;
  Description?: string;
  TopicID: string;
  DestTopicID: string;
  DestRegion?: string;
  Status: number;
  ProcessStartTime: number;
  ProcessEndTime?: number;
  RequestCycle: IRequestCycle;
  ProcessTimeWindow: string;
  Query: string;
  ProcessSqlDelay?: number;
  MaxRetryTimes?: number;
  MaxTimeout?: number;
  TaskType?: number;
  VmpTaskInfo?: IScheduleSqlVmpTaskInfo;
}

export interface ICreateScheduleSqlTaskResp {
  TaskId: string;
}

export interface IDeleteScheduleSqlTaskReq {
  TaskId: string;
}

export type IDeleteScheduleSqlTaskResp = { [key: string]: any };

export interface IDescribeScheduleSqlTaskReq {
  TaskId: string;
}

export interface IDescribeScheduleSqlTaskResp {
  TaskId: string;
  TaskName: string;
  Description?: string;
  SourceProjectID: string;
  SourceProjectName: string;
  SourceTopicID: string;
  SourceTopicName: string;
  DestRegion: string;
  DestProjectID: string;
  DestTopicName: string;
  DestTopicID: string;
  Status: number;
  ProcessStartTime?: number;
  ProcessEndTime?: number;
  RequestCycle: IRequestCycle;
  ProcessTimeWindow: string;
  Query: string;
  ProcessSqlDelay?: number;
  MaxRetryTimes: number;
  MaxTimeout: number;
  TaskType: number;
  VmpTaskInfo?: IScheduleSqlVmpTaskInfo;
  CreateTimeStamp: number;
  ModifyTimeStamp: number;
  CsAccount?: string;
  AllowEdit?: boolean;
  AllowDelete?: boolean;
  ForbiddenScheduleSqlActionList?: Array<string>;
}

export interface IDescribeScheduleSqlTasksReq {
  ProjectId?: string;
  ProjectName?: string;
  SourceTopicId?: string;
  SourceTopicName?: string;
  TaskId?: string;
  TaskName?: string;
  Status?: string;
  PageNumber?: number;
  PageSize?: number;
  IamProjectName?: string;
}

export interface IDescribeScheduleSqlTasksResp {
  Total: number;
  Tasks: Array<IDescribeScheduleSqlTaskResp>;
}

export interface IModifyScheduleSqlTaskReq {
  TaskId: string;
  TaskName?: string;
  Description?: string;
  DestTopicID?: string;
  DestRegion?: string;
  Status?: number;
  RequestCycle?: IRequestCycle;
  ProcessTimeWindow?: string;
  Query?: string;
  ProcessSqlDelay?: number;
  MaxRetryTimes?: number;
  MaxTimeout?: number;
  VmpTaskInfo?: IScheduleSqlVmpTaskInfo;
  CsAccount?: string;
}

export type IModifyScheduleSqlTaskResp = { [key: string]: any };

export interface IWebhookContentTemplateInfo {
  Content: string;
}

export interface IEmailContentTemplateInfo {
  Content: string;
  Subject: string;
  Locale: string;
}

export interface IVmsContentTemplateInfo {
  Content: string;
  Locale: string;
}

export interface ISmsContentTemplateInfo {
  Content: string;
  Locale: string;
}

export interface ILarkContentTemplateInfo {
  Content: string;
  Title: string;
  Locale: string;
}

export interface IDingTalkContentTemplateInfo {
  Content: string;
  Title: string;
  Locale: string;
}

export interface IWeChatContentTemplateInfo {
  Content: string;
  Title: string;
  Locale: string;
}

export interface ICreateAlarmContentTemplateReq {
  AlarmContentTemplateName: string;
  Webhook?: IWebhookContentTemplateInfo;
  Email?: IEmailContentTemplateInfo;
  Vms?: IVmsContentTemplateInfo;
  Sms?: ISmsContentTemplateInfo;
  Lark?: ILarkContentTemplateInfo;
  DingTalk?: IDingTalkContentTemplateInfo;
  WeChat?: IWeChatContentTemplateInfo;
  NeedValidContent?: boolean;
}

export interface ICreateAlarmContentTemplateResp {
  AlarmContentTemplateId: string;
}

export interface IDeleteAlarmContentTemplateReq {
  AlarmContentTemplateId: string;
}

export type IDeleteAlarmContentTemplateResp = { [key: string]: any };

export interface IModifyAlarmContentTemplateReq {
  AlarmContentTemplateId: string;
  AlarmContentTemplateName?: string;
  Webhook?: IWebhookContentTemplateInfo;
  Email?: IEmailContentTemplateInfo;
  Vms?: IVmsContentTemplateInfo;
  Sms?: ISmsContentTemplateInfo;
  Lark?: ILarkContentTemplateInfo;
  DingTalk?: IDingTalkContentTemplateInfo;
  WeChat?: IWeChatContentTemplateInfo;
  NeedValidContent?: boolean;
}

export type IModifyAlarmContentTemplateResp = { [key: string]: any };

export interface IAlarmContentTemplateInfo {
  AlarmContentTemplateName: string;
  AlarmContentTemplateId: string;
  Webhook: IWebhookContentTemplateInfo;
  Email: IEmailContentTemplateInfo;
  Vms: IVmsContentTemplateInfo;
  Sms: ISmsContentTemplateInfo;
  Lark: ILarkContentTemplateInfo;
  DingTalk: IDingTalkContentTemplateInfo;
  WeChat: IWeChatContentTemplateInfo;
  CreateTime: string;
  ModifyTime: string;
  IsDefault: boolean;
}

export interface IDescribeAlarmContentTemplatesReq {
  AlarmContentTemplateName?: string;
  AlarmContentTemplateId?: string;
  OrderField?: string;
  ASC?: boolean;
  PageNumber?: number;
  PageSize?: number;
}

export interface IDescribeAlarmContentTemplatesResp {
  AlarmContentTemplates: Array<IAlarmContentTemplateInfo>;
  Total: number;
}

// Alarm webhook integration related interfaces

export interface IGeneralWebhookHeaderKV {
  Key: string;
  Value: string;
}

export interface ICreateAlarmWebhookIntegrationReq {
  WebhookName: string;
  WebhookType: string;
  WebhookUrl: string;
  WebhookSecret?: string;
  WebhookMethod?: string;
  WebhookHeaders?: Array<IGeneralWebhookHeaderKV>;
}

export interface ICreateAlarmWebhookIntegrationResp {
  AlarmWebhookIntegrationId: string;
}

export interface IDeleteAlarmWebhookIntegrationReq {
  WebhookID: string;
}

export type IDeleteAlarmWebhookIntegrationResp = { [key: string]: any };

export interface IModifyAlarmWebhookIntegrationReq {
  WebhookID: string;
  WebhookName: string;
  WebhookType: string;
  WebhookUrl: string;
  WebhookSecret?: string;
  WebhookMethod?: string;
  WebhookHeaders?: Array<IGeneralWebhookHeaderKV>;
}

export type IModifyAlarmWebhookIntegrationResp = { [key: string]: any };

export interface IAlarmWebhookIntegrationInfo {
  WebhookID: string;
  WebhookName: string;
  WebhookType: string;
  WebhookUrl: string;
  WebhookSecret?: string;
  WebhookMethod?: string;
  WebhookHeaders?: Array<IGeneralWebhookHeaderKV>;
  CreateTime: string;
  ModifyTime: string;
}

export interface IDescribeAlarmWebhookIntegrationsReq {
  WebhookID?: string;
  WebhookName?: string;
  WebhookType?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface IDescribeAlarmWebhookIntegrationsResp {
  Total: number;
  WebhookIntegrations: Array<IAlarmWebhookIntegrationInfo>;
}

// ConsumerHeartbeat
export interface IConsumerHeartbeatReq {
  /** 消费组所属的日志项目的 ID */
  ProjectID: string;
  /** 消费组名称 */
  ConsumerGroupName: string;
  /** 指定消费组中的新消费者名称 */
  ConsumerName: string;
}

export interface IConsumeShard {
  /** 日志分区 ID */
  ShardID: number;
  /** 日志主题 ID */
  TopicID: string;
}

export interface IConsumerHeartbeatResp {
  /** 服务端为指定消费者分配的日志分区列表 */
  Shards: Array<IConsumeShard>;
}

// Consumer Group
export interface ICreateConsumerGroupReq {
  /** 消费组所属的日志项目的 ID。 */
  ProjectID: string;
  /** 消费组待消费的日志主题 ID 列表。 */
  TopicIDList: Array<string>;
  /** 消费组名称。命名规则请参考资源命名规则。 */
  ConsumerGroupName: string;
  /** 心跳过期时间，单位为秒，取值范围为 1~300。 */
  HeartbeatTTL: number;
  /** 是否按顺序消费。
   * true：在 Shard 中按顺序消费。Shard 分裂后，先消费完原 Shard 数据，然后并行消费由该 Shard 分裂出的 Shard 数据；Shard 合并后，先消费完原 Shard 数据，然后消费由原 Shard 合并后的新 Shard 数据。
   * false：不按顺序消费。即所有 Shard 同时消费，Shard 分裂或者合并后产生的新 Shard，也会立即消费。 */
  OrderedConsume: boolean;
}

export type ICreateConsumerGroupResp = { [key: string]: any };

export interface IDescribeConsumerGroupsReq {
  /** 分页页码，默认从 1 开始。 */
  PageNumber?: number;
  /** 分页大小限制，默认为 20，最大为 100。 */
  PageSize?: number;
  /** 仅返回指定 ProjectId 下的消费组。 */
  ProjectId?: string;
  /** 仅返回指定 ProjectName 下的消费组。 */
  ProjectName?: string;
  /** 仅返回名称匹配的消费组。 */
  ConsumerGroupName?: string;
  /** 仅返回指定 TopicName 关联的消费组。 */
  TopicName?: string;
  /** 仅返回指定 TopicId 关联的消费组。 */
  TopicId?: string;
  /** 访问控制项目名称，用于跨项目筛选。 */
  IamProjectName?: string;
  /** 是否按项目维度排序。 */
  OrderByProject?: boolean;
}

export interface IConsumerGroupInfo {
  /** 消费组所属 ProjectID。 */
  ProjectID: string;
  /** 消费组所属 ProjectName。 */
  ProjectName: string;
  /** 消费组关联的 TopicId 列表。 */
  TopicIDList: Array<string>;
  /** 消费组名称。 */
  ConsumerGroupName: string;
  /** 心跳过期时间，单位为秒。 */
  HeartbeatTTL: number;
  /** 是否顺序消费。 */
  OrderedConsume: boolean;
}

export interface IDescribeConsumerGroupsResp {
  /** 消费组列表。 */
  ConsumerGroups: Array<IConsumerGroupInfo>;
  /** 总数。 */
  Total: number;
  /** 关联的 Dashboard ID。 */
  DashboardId?: string;
}

// DeleteConsumerGroup
export interface IDeleteConsumerGroupReq {
  /** 消费组所属的日志项目的 ID。 */
  ProjectID: string;
  /** 消费组名称。 */
  ConsumerGroupName: string;
}

export type IDeleteConsumerGroupResp = { [key: string]: any };

// ModifyConsumerGroup
export interface IModifyConsumerGroupReq {
  /** ConsumerGroup 所绑定 ProjectID。 */
  ProjectID: string;
  /** 可选，新的 TopicID 列表。 */
  TopicIDList?: Array<string>;
  /** 消费组名称。 */
  ConsumerGroupName: string;
  /** 可选，新的心跳 TTL，需满足 (0, 300]。 */
  HeartbeatTTL?: number;
  /** 可选，是否严格保序。 */
  OrderedConsume?: boolean;
}

export type IModifyConsumerGroupResp = { [key: string]: any };

export interface IDescribeCheckPointReq {
  /** ConsumerGroup 所绑定 ProjectId */
  ProjectId: string;
  /** ConsumerGroup 所绑定 TopicId */
  TopicId: string;
  /** 消费组名称，在同一 Topic 下唯一，可选。 */
  ConsumerGroupName?: string;
  /** 需要获取 Checkpoint 的 ShardId */
  ShardId: number;
}

export interface IDescribeCheckPointResp {
  /** Shard ID。 */
  ShardID: number;
  /** 当前 Checkpoint，Base64 编码。 */
  Checkpoint: string;
}

// ModifyCheckPoint
export interface IModifyCheckPointReq {
  /** ConsumerGroup 所绑定 ProjectID。 */
  ProjectID: string;
  /** ConsumerGroup 所绑定 TopicID。 */
  TopicID: string;
  /** 消费组名称，在同一 Topic 下唯一。 */
  ConsumerGroupName: string;
  /** 需要设置 Checkpoint 的 ShardID。 */
  ShardID: number;
  /** 目标 Checkpoint，Base64 编码。 */
  Checkpoint: string;
}

export type IModifyCheckPointResp = { [key: string]: any };

// ResetCheckPoint
export interface IResetCheckPointReq {
  /** ConsumerGroup 所绑定 ProjectID。 */
  ProjectID: string;
  /** 消费组名称。 */
  ConsumerGroupName: string;
  /** 重置位置：支持 begin、end 或秒级时间戳字符串。 */
  Position: string;
}

export type IResetCheckPointResp = { [key: string]: any };

// ListTagsForResources
export interface IFilterTag {
  /** 标签 key。 */
  Key: string;
  /** 标签值列表。 */
  Values: Array<string>;
}

export interface IResourceTag {
  /** 资源类型，project 或 topic。 */
  ResourceType: string;
  /** 资源 ID。 */
  ResourceId: string;
  /** 标签 key。 */
  TagKey: string;
  /** 标签值。 */
  TagValue: string;
}

export interface IListTagsForResourcesReq {
  /** 资源类型，project 或 topic。 */
  ResourceType: string;
  /** 资源 ID 列表。 */
  ResourcesIds?: Array<string>;
  /** 标签过滤条件。 */
  TagFilters?: Array<IFilterTag>;
  /** 翻页游标。 */
  NextToken?: string;
  /** 分页大小，需在服务端允许的范围内。 */
  MaxResults: number;
}

export interface IListTagsForResourcesResp {
  /** 资源标签列表。 */
  ResourceTags: Array<IResourceTag>;
  /** 下一页游标。 */
  NextToken: string;
}

// AddTagsToResource / TagResources
export interface ITag {
  /** 标签 key。 */
  Key: string;
  /** 标签值。 */
  Value: string;
}

export interface IAddTagsToResourceReq {
  /** 资源类型，project 或 topic。 */
  ResourceType: string;
  /** 资源 ID 列表。 */
  ResourcesList: Array<string>;
  /** 标签列表，单次最多 20 个，每个资源最多 50 个。 */
  Tags: Array<ITag>;
}

export type IAddTagsToResourceResp = { [key: string]: any };

export interface ITagResourcesReq {
  /** 资源类型，project 或 topic。 */
  ResourceType: string;
  /** 资源 ID 列表，对应后端 ResourcesIds 字段。 */
  ResourcesIds: Array<string>;
  /** 标签列表，单次最多 20 个，每个资源最多 50 个。 */
  Tags: Array<ITag>;
}

export type ITagResourcesResp = { [key: string]: any };

// UntagResources / RemoveTagsFromResource
export interface IUntagResourcesReq {
  /** 资源类型，project 或 topic。 */
  ResourceType: string;
  /** 资源 ID 列表。 */
  ResourcesIds: Array<string>;
  /** 标签 key 列表。 */
  TagKeys: Array<string>;
}

export type IUntagResourcesResp = { [key: string]: any };

export interface IRemoveTagsFromResourceReq {
  /** 资源类型，project 或 topic。 */
  ResourceType: string;
  /** 资源 ID 列表。 */
  ResourcesList: Array<string>;
  /** 标签 key 列表。 */
  TagKeyList: Array<string>;
}

export type IRemoveTagsFromResourceResp = IUntagResourcesResp;
