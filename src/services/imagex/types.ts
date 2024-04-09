interface IStoreInfo {
  StoreUri: string;
  Auth: string;
}

interface IOptionInfo {
  StoreUri: string;
  FileName?: string;
}

interface IFunction {
  Name: string;
  Input: any;
}

interface IResult {
  Uri: string;
  Encryption: any;
}

interface IImageInfo {
  FileName: string;
  ImageUri: string;
  ImageWidth: number;
  ImageHeight: number;
  ImageMd5: string;
  ImageFormat: string;
  ImageSize: number;
  FrameCnt: number;
  Duration: number;
}

export interface ApplyImageUploadParams {
  ServiceId: string;
  SessionKey?: string;
  UploadNum?: number;
  StoreKeys?: string[];
}
export interface ApplyImageUploadResult {
  UploadAddress: {
    StoreInfos: IStoreInfo[];
    UploadHosts: string[];
    SessionKey: string;
  };
  RequestId: string;
}

export interface CommitImageUploadParams {
  ServiceId: string;
  SessionKey: string;
  OptionInfos?: IOptionInfo[];
  Functions?: IFunction[];
}

export interface CommitImageUploadResult {
  Results: IResult[];
  RequestId: string;
  PluginResult: IImageInfo[];
}

export interface UpdateImageUploadFilesParams {
  ServiceId: string;
  Action: number;
  ImageUrls: string[];
}

export interface UpdateImageUploadFilesResult {
  ServiceId: string;
  ImageUrls: string[];
  FailUrls: string[];
}

export interface PreviewImageUploadFileParams {
  ServiceId: string;
  StoreUri: string;
}
export interface PreviewImageUploadFileResult {
  ServiceId: string;
  FileName: string;
  StoreUri: string;
  ImageURL: string;
  ImageFormat: string;
  ImageSize: number;
  ImageWidth: number;
  ImageHeight: number;
  ImageFrames?: number;
  ImageDuration?: number;
}

// 指定上传策略
export type UploadPolicy = {
  /**
   * 上传格式黑名单, 示例 image/* video/*
   */
  ContentTypeBlackList?: string[];
  /**
   * 上传格式白名单, 示例 image/* video/*
   */
  ContentTypeWhiteList?: string[];
  /**
   * 上传文件大小上限, 单位 byte, 示例 1024
   */
  FileSizeUpLimit?: string;
  /**
   * 上传文件大小下限, 单位 byte, 示例 1024
   */
  FileSizeBottomLimit?: string;
};

// 生成上传临时密钥配置参数
export interface GetUploadAuthParams {
  /** 指定服务 ID 列表 */
  serviceIds?: string[];
  /** 密钥超时时间 */
  expire?: number;
  /** 指定资源存储名称 */
  storeKeys?: string[];
  /** 是否开启上传覆盖 */
  uploadOverwrite?: boolean;
  /** 上传策略配置 */
  uploadPolicy?: UploadPolicy;
}

export interface GetUploadAuthTokenParams {
  /** 指定服务 ID */
  ServiceId: string;
  /** 指定过期时间 */
  "X-Expires": number;
}

export type UploadPutResult = {
  success: boolean;
  uri: string;
  putErr?: {
    errCode?: string;
    errCodeN?: string | number;
    errStatus?: number;
    errMsg?: string;
  };
};
