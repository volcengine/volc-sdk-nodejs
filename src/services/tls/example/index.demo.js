const { tlsOpenapi } = require("@volcengine/openapi");

// index
async function main() {
  const tlsOpenapiService = tlsOpenapi.defaultService;
  tlsOpenapi.setHost("your host");
  tlsOpenapiService.setSecretKey("your secret key");
  tlsOpenapiService.setAccessKeyId("your access key id");

  // create index
  const indexCreateResp = await tlsOpenapiService.CreateIndex({
    TopicId: "topic id",
    FullText: {
      CaseSensitive: false,
      Delimiter: "_",
      IncludeChinese: false,
    },
  });

  // query index
  const indexQueryResp = await tlsOpenapiService.DescribeIndex({
    TopicId: "topic id",
  });

  // modify index
  const indexModifyResp = await tlsOpenapiService.ModifyIndex({
    TopicId: "topic id",
    FullText: {
      CaseSensitive: false,
      Delimiter: "_",
      IncludeChinese: false,
    },
  });

  const indexDeleteResp = await tlsOpenapiService.DeleteIndex({
    TopicId: "topic id",
  });
}
