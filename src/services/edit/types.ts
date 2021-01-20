export interface IEditParam {
  Upload: IUploadInfo;
  Output: IOutputInfo;
  Segments?: ISegment[];
  GlobalElements?: (IVideoElement | IAudioElement | ITextElement | IImageElement | IMVElement)[];
  [propName: string]: any;
}

export interface IUploadInfo {
  Uploader: string;
  VideoName: string;
}

export interface IOutputInfo {
  Mode?: 'normal' | 'split';
  Width: number;
  Height: number;
  Format?: 'mp4' | 'hls' | 'jpg';
  SegmentTime?: number;
  Fps?: number;
  Quality?: 'low' | 'medium' | 'high';
  NoEncode?: number;
  PosterTime?: number;
}

export interface ISegment {
  BackGround?: string;
  Duration?: number;
  Transition?: string;
  TransitionTime?: number;
  Elements: (IVideoElement | IAudioElement | ITextElement | IImageElement | IMVElement)[];
}

export interface IVideoElement {
  Type: 'video';
  StartTime?: number;
  Duration?: number;
  Source: string;
  Position?: IRect;
  Crop?: IRect;
  Speed?: number;
  Rotate?: number;
  Delogo?: IDelogo[];
  Gblurs?: IGblur[];
  Mosaics?: IMosaic[];
  Trims?: number[][];
  VFlip?: number;
  HFlip?: number;
  BorderRadius?: string;
  Filters?: any;
  ExtraFilters?: any[];
  Volume?: string;
  Mute?: number;
  Subtitle?: string;
  Overwrite?: number;
  ParamName?: string;
}

export interface IImageElement {
  Type: 'image',
  StartTime?: number;
  Source: string;
  Position?: IRect;
  Duration: number;
  Crop?: IRect;
  Pad?: number;
  Rotate?: number;
  VFlip?: number;
  HFlip?: number;
  BorderRadius?: string;
  Filters?: any;
  ExtraFilters?: any[];
  Overwrite?: number;
  ParamName?: string;
}

export interface ITextElement {
  Type: 'text',
  StartTime?: number;
  Duration: number;
  Text: string;
  Position: IRect;
  FontType?: string;
  FontSize?: number;
  FontColor?: string;
  BackgroundColor?: string;
  ShadowColor?: string;
  HorizontalAlign?: number;
  VerticalAlign?: number;
  MultiLine?: number;
  LineSpace?: number;
  ReplaceSuffix?: number;
  Animation?: ITextAnimation;
  FontWeight?: 'normal' | 'bold';
  Italic?: number;
  Underline?: number;
  Overwrite?: number;
  ParamName?: string;
}

export interface IAudioElement {
  Type: 'audio',
  StartTime?: number;
  Duration?: number;
  Source: string;
  Trims?: number[][];
  Volume?: string;
  Loop?: 0 | 1;
  Overwrite?: number;
  ParamName?: string;
}

export interface IMVElement {
  Type: 'mv',
  Template: number;
  SourceList: any[];
  SourceType?: string;
  Position?: IRect;
}

export interface IRect {
  PosX?: string;
  PosY?: string;
  Width: string;
  Height: string;
}

export interface IDelogo {
  StartTime?: number;
  Duration?: number;
  Position: IRect;
}

export interface IGblur {
  StartTime?: number;
  Duration?: number;
  Position: IRect;
  Sigma?: number;
}

export interface IMosaic {
  StartTime?: number;
  Duration?: number;
  Position: IRect;
  Size?: number;
}

export interface ITextAnimation {
  Type: string;
  Speed: string;
  Duration: number;
}

export interface SubmitDirectEditTaskAsyncParams {
  Uploader: string,
  Application?: string,
  FuncVersion?: string,
  EditParam: IEditParam,
  Priority?: number;
  VideoName?: string;
  CallbackUri?: string;
  CallbackArgs?: string;
}

export interface SubmitDirectEditTaskAsyncResult {
  ReqId: string;
}

export interface GetDirectEditResultParams {
  ReqIds?: string[];
}

export interface DirectEditResult {
  ReqId: string;
  EditParam: IEditParam;
  CallbackUri: string;
  CallbackArgs: string;
  Priority: number;
  Status: string;
  Message: string;
  OutputVid: string;
  SubVid: string[];
  TaskId: string;
}

export interface SubmitTemplateTaskAsyncParams {
  Type?: string;
  TemplateId: string;
  Space: string;
  VideoName?: string[];
  Params?: ITemplateParamItem[][];
  ExtraParams?: any[];
  Priority?: number;
  CallbackUri?: string;
  CallbackArgs?: string;
}

interface ITemplateParamItem {
  Name?: String;
  Type: 'audio' | 'video' | 'image' | 'text';
  Position?: string;
  Source?: String;
  Text?: String;
  StartTime: number;
  Duration: number;
}

export interface SubmitTemplateTaskAsyncResult {
  ReqId: string[];
}