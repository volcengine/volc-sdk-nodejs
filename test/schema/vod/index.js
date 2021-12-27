import Ajv from "ajv";
import { createResponseSchema } from "../response";
import { jsonSchema } from "./schema";

const ajv = new Ajv();
const suffix = "SchemaValidate";

// 修改媒资信息 VodUpdateMediaInfoRequest
// 修改媒资发布状态 VodUpdateMediaPublishStatusRequest
// 修改字幕信息 VodUpdateSubtitleInfoRequest
// 上述 3 个接口的响应无 Result 字段
const genSchemaValidateFunc = () => {
  const res = {};
  Object.keys(jsonSchema).forEach((key) => {
    // 过滤掉请求类型
    if (!key.includes("Request")) {
      res[key + suffix] = ajv.compile(createResponseSchema(jsonSchema[key]));
    }
  });
  return res;
};

export const allSchemaValidateFuncs = genSchemaValidateFunc();
