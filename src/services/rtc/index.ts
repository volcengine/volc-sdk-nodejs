import Service from "../../base/service";
import { ServiceOptions } from "../../base/types";
import {
  StartRecordParams,
  StartRecordResult,
  StopRecordParams,
  StopRecordResult,
  GetRecordTaskParams,
  GetRecordTaskResult
} from "./types";

export class RtcService extends Service {
  constructor(options?: ServiceOptions) {
    super({
      ...options,
      defaultVersion: "2022-06-01",
      serviceName: "rtc",
    });
  }

  StartRecord = this.createAPI<StartRecordParams, StartRecordResult>("StartRecord", {
    method: "POST",
    contentType: "json",
    Version: "2022-06-01",
  });

  StopRecord = this.createAPI<StopRecordParams, StopRecordResult>("StopRecord", {
    method: "POST",
    contentType: "json",
    Version: "2022-06-01",
  });

  GetRecordTask = this.createAPI<GetRecordTaskParams, GetRecordTaskResult>("GetRecordTask", {
    method: "GET",
    contentType: "json",
    Version: "2022-06-01",
    queryKeys: ["AppId","RoomId","TaskId"],
  });
}

export const defaultService = new RtcService();
