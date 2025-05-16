const { tlsOpenapi } = require("@volcengine/openapi");

// topic
async function main() {
  const tlsOpenapiService = tlsOpenapi.defaultService;
  tlsOpenapiService.setHost("your host");
  tlsOpenapiService.setSecretKey("your secret key");
  tlsOpenapiService.setAccessKeyId("your access key id");

  // create topic
  const topicCreateResp = await tlsOpenapiService.CreateTopic({
    ProjectId: "project id",
    ShardCount: "shard count",
    TopicName: "topic name",
    ttl: "topic ttl",
  });

  // query topic
  const topicQueryResp = await tlsOpenapiService.DescribeTopic({
    TopicId: "topic id",
  });

  // modify topic
  const topicModifyResp = await tlsOpenapiService.ModifyTopic({
    TopicId: "topic id",
    Description: "topic description",
  });

  // delete topic
  const topicDeleteResp = await tlsOpenapiService.DeleteTopic({
    TopicId: "topic id",
  });

  // query topics
  const topicListResp = await tlsOpenapiService.DescribeTopics({
    PageNumber: 1,
    PageSize: 10,
    ProjectId: "project id",
    TopicId: "topic id",
    TopicName: "topic name",
  });
}
