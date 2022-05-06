import { Method } from "axios";
import { ServiceOptionsBase } from "../../base/types";

export interface TlsCreateAPIParams {
  method: Method;
  version?: string;
}

export interface TlsServiceOptions extends Omit<ServiceOptionsBase, "defaultVersion"> {
  version?: string;
}

export type Protocol = "https:" | "http:";

