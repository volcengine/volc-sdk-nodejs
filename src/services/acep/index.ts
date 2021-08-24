import Service from "../../base/service";
import { ServiceOptions } from "../../base/types";
import {
  IGetListPodParams,
  IListPodResult,
  IPodStartParams,
  IPodStartResult,
  IPodStopParams,
  IPodStopResult,
} from "./types";


export class ACEPService extends Service {
  constructor(options?: ServiceOptions) {
    super({
      ...options,
      defaultVersion: "2020-10-25",
      serviceName: "ACEP",
    });
  }
  GetListPod = this.createAPI<IGetListPodParams, IListPodResult>(
      "ListPod"
  );
  PodStart = this.createAPI<IPodStartParams, IPodStartResult>(
    "PodStart", {
        method: "POST",
        contentType: "json",
    // queryKeys: ["ServiceId"],
    }
  );
  PodStop = this.createAPI<IPodStopParams, IPodStopResult>(
    "PodStop", {
        method: "POST",
        contentType: "json",
    // queryKeys: ["ServiceId"],
    }
  );
}

export const defaultService = new ACEPService();
