import { Method } from "axios";
import { ServiceOptionsBase } from "../../base/types";

export interface TlsCreateAPIParams {
  method: Method;
  version?: string;
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
  ModifyTime?: string;
  NormalHeartbeatStatusCount?: number;
  RuleCount?: number;
  UpdateEndTime?: string;
  UpdateStartTime?: string;
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
  /** 采集配置的ID关键词，支持模糊搜索。 */
  RuleId?: string;
  /** 采集配置的名称关键词，支持模糊搜索。 */
  RuleName?: string;
  /** 日志主题的ID关键词，支持模糊搜索。 */
  TopicId?: string;
  /** 日志主题的名称关键词，支持模糊搜索。 */
  TopicName?: string;
  /** 页偏移量,页偏移量的初始值为1。 */
  PageNumber?: number;
  /** 页大小，默认为20，最大值为100。 */
  PageSize?: number;
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
}

export interface IDaoRequestCycle {
  /** 执行的周期，或者定制执行的时间节点。单位为分钟，取值范围为1~1440。 */
  Time?: number;
  /** 可选值：Period-周期执行；Fixed-定期执行。 */
  Type: string;
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
  /** 项目id */
  ProjectId: string;
  /** 分页页码 */
  PageNumber?: number;
  /** 页面大小 */
  PageSize?: number;
  /** 告警策略名 */
  Name?: string;
  /** 告警策略Id */
  AlarmId?: string;
  /** 监控对象的TopicId */
  TopicId?: string;
  /** 监控对象的TopicName */
  TopicName?: string;
  /** 是否开启告警策略 */
  Status?: string;
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
}

export interface IAlarmNoticeGroupNotifyGroupsInfo {
  AlarmNotifyGroupId?: string;
  AlarmNotifyGroupName?: string;
  CreateTime?: string;
  ModifyTime?: string;
  NotifyType?: Array<string>;
  Receivers?: Array<IAlarmNoticeGroupReceiver>;
}

export interface IAlarm_policyQueryResp {
  AlarmId: string;
  AlarmName: string;
  AlarmNotifyGroup: Array<IAlarmNoticeGroupNotifyGroupsInfo>;
  AlarmPeriod: number;
  Condition: string;
  CreateTime: string;
  ModifyTime: string;
  ProjectId: string;
  QueryRequest: Array<IDaoQueryRequest>;
  RequestCycle: IDaoRequestCycle;
  Status: boolean;
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
  NotifyType: Array<string>;
  /** 告警对应的通知列表，最少1一个，最大支持10个。 */
  Receivers: Array<IAlarmNoticeGroupReceiver>;
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
}

export type IAlarmNoticeGroupModifyResp = { [key: string]: any };

export interface IDescribeNotifyGroupReq {
  /** 告警通知组名称 */
  AlarmNotifyGroupName?: string;
  /** 告警通知组Id */
  AlarmNotifyGroupId?: string;
  /** 接收用户名 */
  ReceiverName?: string;
  /** 分页页码 */
  PageNumber?: number;
  /** 页面大小 */
  PageSize?: number;
}
export interface IAlarmNoticeGroupDescribeResp {
  AlarmNotifyGroups: Array<IAlarmNoticeGroupNotifyGroupsInfo>;
  Total: number;
}

export interface IIndexSearchLogsReq {
  /** 翻页加载更多日志时使用，透传上次返回的context值，获取后续的日志内容。 */
  Context?: string;
  /** 查询开始时间点。Unix时间戳格式，表示从1970-1-1 00:00:00 UTC计算起的秒数。 */
  EndTime: number;
  HighLight?: boolean;
  /** 返回的日志条数，最大值为100，通过分页最多返回100000条。 */
  Limit: number;
  /** 查询语句，语句长度最大为4096 */
  Query: string;
  /** 按日志时间戳顺序返回日志，精确到秒:
   - desc：（默认值）按照时间逆序返回日志，新的日志在前。
   - asc：按照时间顺序返回日志，旧的日志在前。 */
  Sort?: string;
  /** 查询开始时间点。Unix时间戳格式，表示从1970-1-1 00:00:00 UTC计算起的秒数。 */
  StartTime: number;
  /** 要检索的日志主题ID。 */
  TopicId: string;
}

export interface IEsclientAnalysisResult {
  Data?: Array<Record<string, { [key: string]: any }>>;
  Schema?: Array<string>;
  Type?: Record<string, string>;
}

export interface IEsclientResult {
  Analysis?: boolean;
  AnalysisResult?: IEsclientAnalysisResult;
  Context?: string;
  Count?: number;
  HighLight?: Array<string>;
  HitCount?: number;
  Limit?: number;
  ListOver?: boolean;
  Logs?: Array<Record<string, { [key: string]: any }>>;
  ResultStatus?: string;
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
  CompressType?: "lz4";
  HashKey?: string;
  LogGroupList: Buffer;
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
}

export enum TraceInstanceStatus {
  "CREATING" = "CREATING",
  "CREATED" = "CREATED",
  "DELETING" = "DELETING",
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
