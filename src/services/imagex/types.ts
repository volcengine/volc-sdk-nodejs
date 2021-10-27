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

export interface DeleteImageUploadFilesParams {
  ServiceId: string;
  StoreUris: string[];
}
export interface DeleteImageUploadFilesResult {
  ServiceId: string;
  DeletedFiles: string[];
}

export interface UploadImagesOption {
  serviceId: string;
  files: string[] | NodeJS.ReadableStream[] | ArrayBuffer[] | ArrayBufferView[];
  fileKeys?: string[];
}

export interface GetUploadAuthParams {
  serviceIds?: string[];
  expire?: number;
  storeKeys?: string[];
}

export interface GetUploadAuthTokenParams {
  ServiceId: string;
  "X-Expires": number;
}
