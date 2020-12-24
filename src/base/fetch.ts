import axios, { AxiosRequestConfig } from "axios";
import { createDebug } from "./utils";
import { OpenApiResponse } from "./types";

const debug = createDebug("fetch");

export default async function request<Result>(
  url: string,
  reqInfo: AxiosRequestConfig
): Promise<OpenApiResponse<Result>> {
  const { headers = {} } = reqInfo;
  const reqOption: AxiosRequestConfig = {
    url: url.trim(),
    timeout: 5000,
    ...reqInfo,
    // proxy: {
    //   protocol: "http",
    //   host: "127.0.0.1",
    //   port: 8888,
    // },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers,
    },
  };
  debug("fetch begin. options: %j", reqOption);
  const res = await axios(reqOption);
  const body = res.data;
  debug("fetch end. headers: %j response: %s", res.headers, body);
  return body;
}
