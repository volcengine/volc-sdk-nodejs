export enum ErrorCode {
  Success = "0",

  InvalidParameter = "100000",
  TopicNotExist = "100001",
  GroupNotExist = "100002",
  UnsurpportedClientType = "100003",
  NoAccessPermissionForTopic = "100004",
  NoAccessPermissionForGroup = "100005",
  InvalidProperties = "100006",
  ClientNotFound = "100007",
  ReqBodyNotExist = "100008",
  InternalServerError = "100009",
  ClientHasTaskRunning = "100010",
  ReqBodyTooLarge = "100011",
  AckMessageError = "100012",
  UnknownError = "100013",

  // 拉取消息的参数不合法
  InvalidPollRequestParameter = "100018",
  ProducerGroupHasAlreadyExist = "100019",

  // 延时等级不合法
  InvalidDelayTimeLevel = "100020",

  // 下面号段的errorCode是可以重试的
  RetryErrorCodeStart = "300000",

  // 流控相关
  TooManyWaitAckMessage = "300001",

  // proxy 维度流控
  TooManyOpenRequest = "300002",
  // 太多ack消息的qps clientToken 维度流控
  TooManyAckRequest = "300003",
  // 太多写入消息的qps clientToken 维度流控
  TooManySendRequest = "300004",
}
