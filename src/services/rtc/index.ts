import Service from "../../base/service";
import { ServiceOptions } from "../../base/types";
import {
  ListRoomsParams,
  ListRoomsResult,
  ListIndicatorsParams,
  ListIndicatorsResult,
} from "./types";

export class RtcService extends Service {
  constructor(options?: ServiceOptions) {
    super({
      ...options,
      defaultVersion: "2018-01-01",
      serviceName: "rtc",
    });
  }

  ListRooms = this.createAPI<ListRoomsParams, ListRoomsResult>("ListRooms", {
    method: "GET",
    contentType: "json",
    Version: "2020-12-01",
    queryKeys: ["AppId"],
  });

  ListIndicators = this.createAPI<ListIndicatorsParams, ListIndicatorsResult>("ListIndicators", {
    method: "POST",
    contentType: "json",
    Version: "2020-12-01",
  });
}

export const defaultService = new RtcService();
