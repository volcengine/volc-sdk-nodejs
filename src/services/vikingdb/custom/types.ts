import { type RequestOptions, VikingdbResponse } from "../types";

export class CustomResponse<T> extends VikingdbResponse {
  constructor(public readonly Data: T, OriginalRequest: string, LogId: string) {
    super(OriginalRequest, LogId);
  }
}

export interface Options<T> extends Omit<RequestOptions, "method"> {
  data: T;
  pathname: string;
}
