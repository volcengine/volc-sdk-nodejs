const { tlsOpenapi } = require("@volcengine/openapi");

// project
async function main() {
  const tlsOpenapiService = tlsOpenapi.defaultService;
  tlsOpenapiService.setHost("your host");
  tlsOpenapiService.setSecretKey("your secret key");
  tlsOpenapiService.setAccessKeyId("your access key id");

  // create project
  const projectCreateResp = await tlsOpenapiService.CreateProject({
    ProjectName: "project name",
    Region: "project belong to which region",
  });

  // query project
  const projectQueryResp = await tlsOpenapiService.DescribeProject({
    ProjectId: "project id",
  });

  // modify project
  const projectModifyResp = await tlsOpenapiService.ModifyProject({
    ProjectId: "project id",
    Description: "project description",
  });

  // delete project
  const projectDeleteResp = await tlsOpenapiService.DeleteProject({
    ProjectId: "project id",
  });

  // query projects
  const projectListResp = await tlsOpenapiService.DescribeProjects({
    PageNumber: 1,
    PageSize: 10,
    ProjectId: "project id",
    ProjectName: "project name",
  });
}
