import { billing } from "@volcengine/openapi";

export async function main(AccessKeyId, SecretKey) {
  // 使用默认的service实例 也可以创建一个新实例 const billingService = new billing.BillingService();
  const billingService = billing.defaultService;
  // 设置aksk
  billingService.setAccessKeyId(AccessKeyId);
  billingService.setSecretKey(SecretKey);

  // 请求预定义的OpenAPI
  await billingService.ListBill({
    Limit: 10,
    Offset: 0,
  });

  // 自定义OpenAPI请求
  await billingService.fetchOpenAPI({
    Action: "ListBill",
    Version: "2022-01-01",
    query: {
      BillPeriod: "2022-01",
      Limit: "10",
      Offset: "0",
      Product: "",
      BillingMode: "",
      BillCategoryParent: "",
      PayStatus: "",
      IgnoreZero: "0",
      NeedRecordNum: "1",
    },
  });

  // 请求预定义的OpenAPI
  await billingService.ListBillDetail({
    Limit: 10,
    Offset: 0,
  });

  // 自定义OpenAPI请求
  await billingService.fetchOpenAPI({
    Action: "ListBillDetail",
    Version: "2022-01-01",
    query: {
      BillPeriod: "2022-01",
      Limit: "10",
      Offset: "0",
      GroupTerm: "0",
      GroupPeriod: "2",
      Product: "",
      BillingMode: "",
      BillCategory: "",
      InstanceNo: "",
      IgnoreZero: "0",
      NeedRecordNum: "1",
    },
  });

  // 请求预定义的OpenAPI
  await billingService.ListBillOverviewByProd({
    Limit: 10,
    Offset: 0,
  });

  // 自定义OpenAPI请求
  await billingService.fetchOpenAPI({
    Action: "ListBillOverviewByProd",
    Version: "2022-01-01",
    query: {
      BillPeriod: "2022-01",
      Limit: "10",
      Offset: "0",
      Product: "",
      BillingMode: "",
      BillCategoryParent: "",
      IgnoreZero: "0",
      NeedRecordNum: "1",
    },
  });
}
