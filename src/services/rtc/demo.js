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
  await rtcOpenapiService.ListRooms({
    AppId: "your app id",
  });

  // 获取质量数据
  await rtcOpenapiService.ListIndicators({
    AppId: "your app id",
    StartTime: "your startTime",
    EndTime: "your endTime",
    Indicator: "your indicator",
  });

  // 自定义OpenAPI请求
  await rtcOpenapiService.fetchOpenAPI({
    Action: "ListRooms",
    Version: "2020-12-01",
    query: {
      AppId: "your app id",
    },
  });
}
