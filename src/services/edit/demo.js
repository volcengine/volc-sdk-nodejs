import { edit } from "@volcengine/openapi";

export async function main(AccessKeyId, SecretKey, SessionToken) {
  // 使用默认的service实例 也可以创建一个新实例 const editService = new edit.EditService();
  const editService = edit.defaultService;
  // 设置aksk
  editService.setAccessKeyId(AccessKeyId);
  editService.setSecretKey(SecretKey);
  if (SessionToken) {
    // 使用sts请求时 设置SessionToken
    editService.setSessionToken(SessionToken);
  }

  // 请求预定义的OpenAPI
  await editService.GetDirectEditResult({ ReqIds: ['xxxxxx'] });

  // 自定义OpenAPI请求
  await editService.fetchOpenAPI({
    Action: "GetDirectEditResult",
    Version: "2018-01-01",
    method: 'POST',
    headers: {
      "content-type": "application-json",
    },
    data: {
      ReqIds: ['xxxxxx'],
    }
  });
}
