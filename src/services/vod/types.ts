export interface PolarisResponse {
  code: number;
  headers: any;
  status: number;
  data: any;
}

export declare enum FileTypes {
  VIDEO = "video",
  IMAGE = "image",
  AUDIO = "audio",
  FONT = "font",
  OBJECT = "object",
}

export interface UploadParams {
  SpaceName: string;
  FilePath: string;
  FileSize?: number;
  SessionKey?: string;
  FileType?: string;
  CallbackArgs?: string;
  FileName?: string;
  FileExtension?: string;
  maxConcurrency?: number;
  Content?: NodeJS.ReadableStream; // 流内容
}

// 媒资上传
export interface VodUploadMediaRequest {
  SpaceName: string;
  FilePath?: string;
  CallbackArgs?: string;
  Functions?: string;
  FileName?: string; // 设置文件存储路径
  FileExtension?: string; // 设置文件后缀
  maxConcurrency?: number; // 单次上传最大并发数
  FileSize?: number; // 流大小
  Content?: NodeJS.ReadableStream; // 流内容
}

// 素材上传
export interface VodUploadMaterialRequest extends VodUploadMediaRequest {
  FileType?: FileTypes;
}

// 获取上传凭证

/**
 * 获取上传凭证请求
 */
export interface VodApplyUploadInfoRequest {
  SpaceName?: string;
  SessionKey?: string;
  FileSize?: number;
  FileType?: string;
  FileName?: string; // 设置文件存储路径
  FileExtension?: string; // 设置文件后缀
}
interface VodStoreInfo {
  StoreUri?: string;
  Auth?: string;
}
interface VodHeaderPair {
  Key?: string;
  Value?: string;
}
interface VodUploadAddress {
  StoreInfos?: VodStoreInfo[];
  UploadHosts?: string[];
  UploadHeader?: VodHeaderPair[];
  SessionKey?: string;
}
interface VodApplyUploadInfoData {
  UploadAddress?: VodUploadAddress;
}
/**
 * 获取上传凭证响应
 */
export interface VodApplyUploadInfoResult {
  Data?: VodApplyUploadInfoData;
}

// 确认上传

/**
 * 确认上传请求
 */
export interface VodCommitUploadInfoRequest {
  SpaceName?: string;
  SessionKey?: string;
  CallbackArgs?: string;
  Functions?: string;
}
interface VodSourceInfo {
  FileId?: string; // 文件ID
  Md5?: string; // hash值
  FileType?: string; // 文件类型 video/audio
  Codec?: string; // 编码格式
  Height?: number; // 视频高度
  Width?: number; // 视频宽度
  Format?: string; // 文件格式
  Duration?: number; // 时长
  Size?: number; // 文件大小
  StoreUri?: string; // 对象地址
  Definition?: string; // 视频分辨率
  Bitrate?: number; // 码率(Kbps)
  Fps?: number; // 帧率
  CreateTime?: string; // 创建时间
}
interface VodCommitUploadInfoData {
  Vid?: string;
  PosterUri?: string;
  SourceInfo?: VodSourceInfo;
  Mid?: string;
}
/**
 * 确认上传响应
 */
export interface VodCommitUploadInfoResult {
  Data?: VodCommitUploadInfoData;
}

//  素材上传

//  URL批量拉取上传

interface VodUrlUploadURLSet {
  SourceUrl?: string; // 视频的URL
  CallbackArgs?: string; // 透传的回调信息
  Md5?: string; // 视频的MD5
  TemplateId?: string; // 模板Id
  Title?: string; // 标题
  Description?: string; // 描述信息
  Tags?: string; // 标签
  Category?: string; // 分类
  FileName?: string; // 设置文件存储路径
  FileExtension?: string; // 设置文件后缀
}
/**
 * URL批量拉取上传请求
 */
export interface VodUploadMediaByUrlRequest {
  SpaceName?: string; // 上传的空间名
  URLSets?: VodUrlUploadURLSet[]; // 上传URL设置参数集合
}
interface ValuePair {
  JobId?: string; // Url对应的JobId
  SourceUrl?: string; // 上传的Url
}
/**
 * URL批量拉取上传响应
 */
export interface VodUploadMediaByUrlResult {
  Data?: ValuePair[];
}

//  查询URL上传任务状态

/**
 * 查询URL上传任务状态请求
 */
export interface VodQueryUploadTaskInfoRequest {
  JobIds?: string;
}
interface VodURLSet {
  RequestId?: string;
  JobId?: string;
  SourceUrl?: string;
  State?: string;
  Vid?: string;
  SpaceName?: string;
  AccountId?: string;
  SourceInfo?: VodSourceInfo;
}
interface VodQueryUploadResult {
  MediaInfoList?: VodURLSet[];
  NotExistJobIds?: string[];
}
/**
 * 查询URL上传任务状态响应
 */
export interface VodQueryUploadTaskInfoResult {
  Data?: VodQueryUploadResult;
}

// 媒资管理

//  查询媒资信息

/**
 * 查询媒资信息请求
 */
export interface VodGetMediaInfosRequest {
  Vids?: string; // 视频ID列表
}
interface VodMediaBasicInfo {
  SpaceName?: string; // 空间名
  Vid?: string; // 视频ID
  Title?: string; // 视频名称
  Description?: string; // 视频描述
  PosterUri?: string; // 封面图对象地址
  PublishStatus?: string; // 发布状态
  Tags?: string[]; // 标签列表
  CreateTime?: string; // 创建时间
}
interface VodVideoStreamMeta {
  Codec?: string; // 视频编码格式
  Height?: number; // 视频高度
  Width?: number; // 视频宽度
  Duration?: number; // 视频时长
  Definition?: string; // 视频清晰度
  Bitrate?: number; // 视频码率(Kbps)
  Fps?: number; // 帧率
}
interface VodAudioStreamMeta {
  Codec?: string; // 音频编码格式
  Duration?: number; // 音频时长
  SampleRate?: number; // 音频采样率
  Bitrate?: number; // 音频码率(Kbps)
}
interface VodTranscodeInfo {
  FileId?: string; // 文件ID
  Md5?: string; // hash值
  FileType?: string; // 文件类型 video/audio
  LogoType?: string; // logo类型
  Encrypt?: boolean; // 是否加密
  Format?: string; // 文件格式
  Duration?: number; // 时长
  Size?: number; // 文件大小
  StoreUri?: string; // 对象地址
  VideoStreamMeta?: VodVideoStreamMeta; // 视频流信息
  AudioStreamMeta?: VodAudioStreamMeta; // 音频流信息
  CreateTime?: string; // 创建时间
}
interface VodMediaInfo {
  BasicInfo?: VodMediaBasicInfo; // 视频基础信息
  SourceInfo?: VodSourceInfo; // 原视频信息
  TranscodeInfos?: VodTranscodeInfo[]; // 转码视频信息列表
}
/**
 * 查询媒资信息响应
 */
export interface VodGetMediaInfosResult {
  MediaInfoList?: VodMediaInfo[]; // 视频信息列表
  NotExistVids?: string[]; // 不存在的视频VID列表
}

//  修改媒资信息

/**
 * 修改媒资信息请求
 */
export interface VodUpdateMediaInfoRequest {
  Vid?: string; // 视频ID
  PosterUri?: string; // 视频封面Uri
  Title?: string; // 视频名称
  Description?: string; // 视频描述
  Tags?: string; // 视频标签
}

//  修改媒资发布状态

/**
 * 修改媒资发布状态请求
 */
export interface VodUpdateMediaPublishStatusRequest {
  Vid?: string; // 视频ID
  Status?: string; // 视频发布状态
}

//  获取封面候选结果

/**
 * 获取封面候选结果请求
 */
export interface VodGetRecommendedPosterRequest {
  Vids?: string; // 视频ID列表
}
interface VodStoreUriGroup {
  Vid?: string; // 视频ID
  StoreUris?: string[]; // 封面图对象地址列表
}
/**
 * 获取封面候选结果响应
 */
export interface VodGetRecommendedPosterResult {
  StoreUriGroups?: VodStoreUriGroup[]; // 封面图信息
  NotExistVids?: string[]; // 不存在的视频VID列表
}

//  批量删除完整媒资

/**
 * 批量删除完整媒资请求
 */
export interface VodDeleteMediaRequest {
  Vids?: string; // 视频ID列表
  CallbackArgs?: string; // 回调回传参数
}
/**
 * 批量删除完整媒资响应
 */
export interface VodDeleteMediaResult {
  NotExistVids?: string[]; // 不存在的视频VID列表
}

//  删除媒体文件

/**
 * 删除媒体文件请求
 */
export interface VodDeleteTranscodesRequest {
  Vid?: string; // 视频ID
  FileIds?: string; // 转码视频ID列表
  CallbackArgs?: string; // 回调回传参数
}
/**
 * 删除媒体文件响应
 */
export interface VodDeleteTranscodesResult {
  NotExistFileIds?: string[]; // 不存在的转码FileID列表
}

//  获取音视频列表

/**
 * 获取音视频列表请求
 */
export interface VodGetMediaListRequest {
  SpaceName?: string; // 空间名
  Vid?: string; // 视频ID
  Status?: string; // 视频状态
  Order?: string; // 排序规则
  Tags?: string; // 标签，多个用","隔开
  StartTime?: string; // 查询时间范围下限
  EndTime?: string; // 查询时间范围上限
  Offset?: string; // 数据偏移量
  PageSize?: string; // 分页大小
}
/**
 * 获取音视频列表响应
 */
export interface VodGetMediaListResult {
  SpaceName?: string; // 空间名
  MediaInfoList?: VodMediaInfo[]; // 视频信息列表
  TotalCount?: number; // 符合条件的结果总数
  Offset?: number; // 数据偏移量
  PageSize?: number; // 分页大小
}

//  获取字幕文件

/**
 * 获取字幕文件请求
 */
export interface VodGetSubtitleInfoListRequest {
  Vid?: string; // 视频ID
  FileIds?: string; // 转码视频id列表，多个用","隔开
  Languages?: string; // 字幕语言列表，多个用","隔开
  Formats?: string; // 字幕格式列表，多个用","隔开
  LanguageIds?: string; // 字幕语言Id列表，多个用","隔开
  SubtitleIds?: string; // 字幕Id列表，多个用","隔开
  Status?: string; // 状态，多个用","隔开
  Title?: string; // 标题
  Tag?: string; // 标签
  Offset?: string; // file的偏移量
  PageSize?: string; // 分页大小（结果一fileId分页）
  Ssl?: string; // 返回https播放地址，默认否, 1-是；0-否
}
interface VodSubtitleInfoCommon {
  Vid?: string; // 视频ID
  FileId?: string; // 文件ID
  Language?: string; // 字幕语言
  LanguageId?: number; // 字幕语言ID
  Format?: string; // 字幕格式
  SubtitleId?: string; // 字幕ID
  Title?: string; // 字幕标题
  Tag?: string; // 字幕标签
  Status?: string; // 字幕状态
  Source?: string; // 字幕来源
  StoreUri?: string; // 字幕uri
  SubtitleUrl?: string; // 字幕url
  CreateTime?: string; // 创建时间
  Version?: string; // 字幕版本
}
interface VodFileSubtitleInfo {
  FileId?: string; // 文件ID
  SubtitleInfoList?: VodSubtitleInfoCommon[]; // 字幕列表
}
/**
 * 获取字幕文件响应
 */
export interface VodGetSubtitleInfoListResult {
  Vid?: string; // 视频ID
  FileSubtitleInfoList?: VodFileSubtitleInfo[]; // 字幕列表
  NotExistFileIds?: string[]; // 不存在的转码FileID列表
  TotalCount?: number; // 符合条件的结果总数
  Offset?: number; // 数据偏移量
  PageSize?: number; // 分页大小
}

//  修改字幕发布状态

/**
 * 修改字幕发布状态请求
 */
export interface VodUpdateSubtitleStatusRequest {
  Vid?: string; // 视频ID
  FileIds?: string; // 转码视频id列表，多个用","隔开
  Languages?: string; // 字幕语言列表，多个用","隔开
  Formats?: string; // 字幕格式列表，多个用","隔开
  Status?: string; // 状态
}
/**
 * 修改字幕发布状态响应
 */
export interface VodUpdateSubtitleStatusResult {
  NotExistFileIds?: string[]; // 不存在的转码FileID列表
}

// 修改字幕信息

/**
 * 修改字幕信息请求
 */
export interface VodUpdateSubtitleInfoRequest {
  Vid?: string; // 视频ID
  FileId?: string; // 转码视频id列表
  Language?: string; // 字幕语言列表
  Format?: string; // 字幕格式列表
  Title?: string; // 标题
  Tag?: string; // 标签
}

// 媒资处理

// 触发工作流

interface Clip {
  StartTime?: number; // 开始时间 ms
  EndTime?: number; // 结束时间 ms
}
interface TranscodeAudioOverride {
  TemplateId?: string[]; // 被覆盖的音频模板Id, 支持ALL
  Clip?: Clip;
}
interface LogoOverride {
  TemplateId?: string; // 被覆盖的水印模板Id, 支持ALL
  Vars?: string; // 自定义水印变量
}
interface TranscodeVideoOverride {
  TemplateId?: string[]; // 被覆盖的视频模板Id, 支持ALL
  Clip?: Clip; // 裁剪参数
}
interface SnapshotOverride {
  TemplateId?: string[]; // 被覆盖的截图模板Id, 支持ALL
  OffsetTime?: number; // 截图时间, 单位ms, AIDynpost和Sprite类型不支持
  OffsetTimeList?: number[]; // 多Dynpost类型截取时间，单位ms
}
interface OverrideParams {
  Logo?: LogoOverride[]; // 水印覆盖参数
  TranscodeVideo?: TranscodeVideoOverride[]; // 视频转码覆盖参数
  TranscodeAudio?: TranscodeAudioOverride[]; // 音频转码覆盖参数
  Snapshot?: SnapshotOverride[]; // 截图覆盖参数
}
interface WorkflowParams {
  OverrideParams?: OverrideParams; // 覆盖参数
  Condition?: boolean; // 条件变量
}
/**
 * 触发工作流请求
 */
export interface VodStartWorkflowRequest {
  Vid?: string; // 视频Id
  TemplateId?: string; // 工作流模板Id
  Input?: WorkflowParams; // 动态参数
  Priority?: number; // 任务优先级
  CallbackArgs?: string; // 回调参数
}
/**
 * 触发工作流响应
 */
export interface VodStartWorkflowResult {
  RunId?: string; // 工作流执行Id
  Etc?: number;
}

// 媒资播放

// 获取播放信息

/**
 * 获取播放信息请求
 */
export interface VodGetPlayInfoRequest {
  Vid?: string; // 视频ID
  Format?: string; // 封装格式，支持mp4,dash,hls，默认mp4Format
  Codec?: string; // 编码类型，默认h264，可选值为h264,bytevc1等Codec
  Definition?: string; // 视频流清晰度，默认返回全部，支持：240p，360p，480p，540p，720p，1080p,
  FileType?: string; // 流文件类型，默认video，支持：加密视频流evideo，加密音频流传eaudio，非加密视频流video，普通音频音频流audio
  LogoType?: string; // 水印贴片标签
  Base64?: string; // 播放地址是否base64编码，默认否，支持设置： 0-否，1-是
  Ssl?: string; // 返回https播放地址，默认否, 1-是；0-否
  NeedThumbs?: string; // 是否需要雪碧图（缩略图），默认否，1-是；0-否
  NeedBarrageMask?: string; // 是否需要蒙版弹幕，默认否，1-是；0-否
  CdnType?: string; // 指定CDN类型
  UnionInfo?: string; // 唯一性标识信息
  HDRDefinition?: string; // HDR清晰度，默认不查询，支持：all,
}
interface VodAdaptiveInfo {
  MainPlayUrl: string;
  BackupPlayUrl: string;
  AdaptiveType: string;
}
interface VodPlayInfo {
  FileId: string;
  Md5: string;
  FileType: string;
  Format: string;
  Codec: string;
  Definition: string;
  MainPlayUrl: string;
  BackupPlayUrl: string;
  Bitrate: number;
  Width: number;
  Height: number;
  Size: number;
  CheckInfo: string;
  IndexRange: string;
  InitRange: string;
  PlayAuth: string;
  PlayAuthId: string;
  LogoType: string;
  Quality: string;
  BarrageMaskOffset: string;
}
interface VodThumbInfo {
  CaptureNum: number;
  StoreUrls: Array<string>;
  CellWidth: number;
  CellHeight: number;
  ImgXLen: number;
  ImgYLen: number;
  Interval: number;
  Format: string;
}
interface VodSubtitleInfo {
  Format: string;
  SubtitleId: string;
  LanguageId: number;
  Version: string;
}
/**
 * 获取播放信息响应
 */
export interface VodGetPlayInfoResult {
  Version: number;
  Vid: string;
  Status: number;
  PosterUrl: string;
  Duration: number;
  FileType: string;
  EnableAdaptive: boolean;
  TotalCount: number;
  AdaptiveInfo: VodAdaptiveInfo;
  PlayInfoList: Array<VodPlayInfo>;
  ThumbInfoList: Array<VodThumbInfo>;
  SubtitleInfoList: Array<VodSubtitleInfo>;
  BarrageMaskUrl: string;
}

//  签发私有 DRM 加密 AuthToken

/**
 * 签发私有 DRM 加密 AuthToken请求
 */
export interface VodGetPrivateDrmPlayAuthRequest {
  DrmType?: string; // drm类型（不区分大小写，支持web,app;默认web）
  Vid?: string; // 视频id
  PlayAuthIds?: string; // 播放许可id列表，以逗号分割
  UnionInfo?: string; // 加密唯一信息
}

/**
 * 签发私有 DRM 加密 AuthToken 响应
 */
interface VodPrivateDrmPlayAuthInfo {
  PlayAuthId?: string; // 播放许可id
  PlayAuthContent?: string; // 播放许可内容
}
export interface VodGetPrivateDrmPlayAuthResult {
  PlayAuthInfoList?: VodPrivateDrmPlayAuthInfo[]; // 播放许可信息列表
}
