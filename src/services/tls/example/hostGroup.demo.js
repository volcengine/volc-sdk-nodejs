const { tlsOpenapi } = require("@volcengine/openapi");

// host group
async function main() {
  const tlsOpenapiService = tlsOpenapi.defaultService;
  tlsOpenapiService.setHost("your host");
  tlsOpenapiService.setSecretKey("your secret key");
  tlsOpenapiService.setAccessKeyId("your access key id");

  // create host group
  const hostGroupCreateResp = await tlsOpenapiService.CreateHostGroup({
    HostGroupName: "host group name",
    HostGroupType: "host group type",
    HostIdentifier: "host identifier",
  });

  // query host group
  const hostGroupQueryResp = await tlsOpenapiService.DescribeHostGroup({
    HostGroupId: "host group id",
  });

  // modify host group
  const hostGroupModifyResp = await tlsOpenapiService.ModifyHostGroup({
    HostGroupId: "host group id",
    HostGroupName: "host group name",
    HostGroupType: "host group type",
    HostIdentifier: "host identifier",
  });

  // delete host group
  const hostGroupDeleteResp = await tlsOpenapiService.DeleteHostGroup({
    HostGroupId: "host group id",
  });

  // query host groups
  const hostGroupListResp = await tlsOpenapiService.DescribeHostGroups({
    PageNumber: 1,
    PageSize: 10,
  });
}
