import fetch, { RequestInit } from "node-fetch";
import { createDebug } from "./utils";

const debug = createDebug("fetch");

export default async function request<Result>(
  url: string,
  reqInfo: RequestInit
): Promise<OpenApiResponse<Result>> {
  const { headers = {} } = reqInfo;
  const uri = url.trim();
  const reqOption: RequestInit = {
    timeout: 5000,
    ...reqInfo,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers,
    },
  };
  debug("fetch begin. uri: %s, options: %j", uri, reqOption);
  const res = await fetch(uri, reqOption);
  const text = await res.text();
  debug("fetch end. headers: %j response: %s", res.headers.raw(), text);
  return JSON.parse(text);
}
