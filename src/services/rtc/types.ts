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
