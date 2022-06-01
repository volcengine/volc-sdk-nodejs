const { tlsOpenapi } = require("@volcengine/openapi");

// log
async function main() {
  const tlsOpenapiService = tlsOpenapi.defaultService;
  tlsOpenapi.setHost("your host");
  tlsOpenapiService.setSecretKey("your secret key");
  tlsOpenapiService.setAccessKeyId("your access key id");

  // search logs
  const searchLogsResp = await tlsOpenapiService.SearchLogs({
    StartTime: "log start time",
    EndTime: "log  end time",
    Limit: "page size",
    Query: "query phrases",
    TopicId: "topic id",
  });

  // put logs
  const logsBuffer = await tlsOpenapi.TlsService.objToProtoBuffer({
    LogGroups: [
      {
        Logs: [
          {
            Time: Date.now(),
            Contents: [{ Key: "TEST", Value: "TEST" }],
          },
        ],
        Source: "TEST",
        LogTags: [{ Key: "Tag", Value: "Tag" }],
        FileName: "TEST",
        ContextFlow: "TEST",
      },
    ],
  });

  const putLogsResp = await tlsOpenapiService.PutLogs({
    TopicId: "topic id",
    CompressType: "logs compress type",
    LogGroupList: logsBuffer,
  });
}
