import { rtcOpenapi } from "@volcengine/openapi";

async function main(AccessKeyId, SecretKey, SessionToken) {
  // 使用默认的service实例 也可以创建一个新实例 const rtcOpenapiService = new rtcOpenapi.RtcService();
  const rtcOpenapiService = rtcOpenapi.defaultService;
  // 设置aksk
  rtcOpenapiService.setAccessKeyId(AccessKeyId);
  rtcOpenapiService.setSecretKey(SecretKey);

  if (SessionToken) {
    // 使用sts请求时 设置SessionToken
    rtcOpenapiService.setSessionToken(SessionToken);
  }

  // 获取房间信息
  await rtcOpenapiService.StartRecord({
    "AppId" : "Your_AppId",
    "BusinessId" : "Your_BusinessId",
    "RoomId" : "Your_RoomId",
    "TaskId": "Your_TaskId",
    "RecordMode": 0,
    "FileFormatConfig": {
        "FileFormat": ["HLS", "FLV"]
    },
    "FileNameConfig": {
        "Prefix": ["directory1", "directory2"],
        "Pattern": ""
    },
    "StorageConfig": {
        "Type": 0,
        "TosConfig": {
            "UserAccountId": "Your_UserAccountId",
            "Region": "Your_Region",
            "Bucket": "Your_Bucket"
        }
    }
  });

  // 获取质量数据
  await rtcOpenapiService.StopRecord({
    "AppId" : "Your_AppId",
    "RoomId" : "Your_RoomId",
    "TaskId": "Your_TaskId"
  });

  // 自定义OpenAPI请求
  await rtcOpenapiService.fetchOpenAPI({
    Action: "GetRecordTask",
    Version: "2022-06-01",
    query: {
      AppId: "Your_AppId",
      RoomId: "Your_RoomId",
      TaskId: "Your_TaskId"
    },
  });
}