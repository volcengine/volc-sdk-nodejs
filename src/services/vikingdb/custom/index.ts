import { AbstractService } from "../abstractService";
import { CustomResponse, type Options } from "./types";

export class CustomService extends AbstractService {
  async fetch<T extends NonNullable<unknown>, R = void>({
    pathname,
    data,
    ...rest
  }: Options<T>): Promise<CustomResponse<R>> {
    const response = await this.request<T, R>(pathname, data, rest);
    return new CustomResponse(response.data, response.original_request, response.request_id);
  }
}
