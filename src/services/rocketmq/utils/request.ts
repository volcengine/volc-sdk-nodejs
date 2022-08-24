import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { MQError } from "./error";

export type SendRequestOptions = AxiosRequestConfig;

export async function sendRequest(options: SendRequestOptions) {
  const { data } = options;

  try {
    const result = await axios(options);

    return result.data;
  } catch (error) {
    const response = (error as AxiosError).response;
    const status = response?.status;
    const respData = response?.data;

    const message = respData?.msg || response?.statusText || error.message;

    throw new MQError(message, {
      type: "REQUEST_ERROR",
      cause: { status, params: data, response: respData },
    });
  }
}
