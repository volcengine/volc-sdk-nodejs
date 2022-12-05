interface IRoom {
  RoomId: string;
  AppId: string;
  UserNum: number;
  StreamNum: number;
  State: number;
  CreatedAt: string;
  UpdatedAt: string;
}

interface IData {
  TimeStamp: string;
  Value: number;
}

interface IIndicator {
  Name: string;
  Unit: string;
  Data: IData[];
}

export interface ListRoomsParams {
  Action: string;
  Version: string;
  AppId: string;
  RoomId?: string;
  Reverse?: number;
  Offset?: string;
  Limit?: number;
}

export interface ListRoomsResult {
  Total: number;
  ActiveNum: number;
  InactiveNum: number;
  Offset: number;
  Limit: number;
  Rooms: IRoom[];
}

export interface ListIndicatorsParams {
  AppId: string;
  StartTime: string;
  EndTime: string;
  Indicator: string;
  OS?: string;
  Network?: string;
}

export interface ListIndicatorsResult {
  Indicators: IIndicator[];
}

type Stream = { Index?: number; UserId: string; StreamType?: number };

type Streams = {
  StreamList: Stream[];
};

type Encode = {
  VideoWidth?: number;
  VideoFps?: number;
  VideoBitrate?: number;
  VideoCodec?: number;
  VideoGop?: number;
  AudioCodec?: number;
  AudioProfile?: number;
  AudioBitrate?: number;
  AudioSampleRate?: number;
  AudioChannels?: number;
};

type Canvas = {
  Width: number;
  Height: number;
  Background: string;
};

type Region = {
  StreamIndex: number;
  LocationX: number;
  LocationY: number;
  WidthProportion: number;
  HeightProportion: number;
  Zorder?: number;
  Alpha?: number;
  RenderMode?: number;
  SourceCrop?: {
    LocationX: number;
    LocationY: number;
    WidthProportion: number;
    HeightProportion: number;
  };
  AlternateImage: string;
};
type CustomLayout = {
  Canvas: Canvas;
  Regions: Region[];
};
export interface StartRecordParams {
  AppId: string;
  BusinessId?: string;
  RoomId: string;
  TaskId: string;
  RecordMode?: number;
  TargetStreams?: Streams;
  ExcludeStreams?: Streams;
  Encode?: Encode;
  Layout: {
    LayoutMode?: number;
    MainVideoStream?: Stream;
    CustomLayout: CustomLayout;
  };
  FileFormatConfig: {
    FileFormat: string[];
  };
  FileNameConfig: {
    Prefix: string[];
    Pattern: string;
  };
  StorageConfig: {
    Type: number;
    TosConfig: {
      UserAccountId: string;
      Region: string;
      Bucket: string;
    };
  };
}

export type StartRecordResult = string;

export interface StopRecordParams {
  AppId: string;
  BusinessId?: string;
  RoomId: string;
  TaskId: string;
}

export type StopRecordResult = string;

export interface GetRecordTaskParams {
  Action: string;
  Version: string;
  AppId: string;
  RoomId: string;
  TaskId: string;
}

export interface GetRecordTaskResult {
  RecordTask: {
    StartTime: number;
    EndTime: number;
    Status: number;
    StopReason: string;
    RecordFileList: {
      Vid: string;
      Duration: number;
      Size: number;
      StartTime: number;
      StreamList: [
        {
          UserId: string;
          StreamType: number;
        }
      ];
    }[];
  };
}
