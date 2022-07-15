import axios, { AxiosError, Method } from "axios";
import http from "http";
import { MQError } from "./error";

export interface SendRequestOptions<D = any> {
  method: Method;
  url: string;
  data?: D;
  headers?: any;
  httpAgent?: http.Agent;
}

export async function sendRequest(options: SendRequestOptions) {
  const { method, url, data, headers = {}, httpAgent } = options;
  try {
    const result = await axios({ method, url, headers, data, httpAgent });
    return result.data;
  } catch (error) {
    const response = (error as AxiosError).response;
    const message = response?.statusText || "unknown request error";
    const status = response?.status;
    const data = response?.data;
    throw new MQError(message, { type: "REQUEST_ERROR", payload: { status, data } });
  }
}
