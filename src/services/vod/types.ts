export interface GetPlayInfoParams {
  Action: string;
  Version: string;
  Vid: string;
}

export interface VodAdaptiveInfo {
  MainPlayUrl: string;
  BackupPlayUrl: string;
  AdaptiveType: string;
}
export interface VodPlayInfo {
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
export interface VodThumbInfo {
  CaptureNum: number;
  StoreUrls: Array<string>;
  CellWidth: number;
  CellHeight: number;
  ImgXLen: number;
  ImgYLen: number;
  Interval: number;
  Format: string;
}

export interface VodSubtitleInfo {
  Format: string;
  SubtitleId: string;
  LanguageId: number;
  Version: string;
}

export interface GetPlayInfoResult {
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
