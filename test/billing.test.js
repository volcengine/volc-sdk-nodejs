import { Service } from "../lib";
import {
  listBillReponseSchemaValidate,
  listBillDetailReponseSchemaValidate,
  listBillOverviewByProdReponseSchemaValidate,
} from "./schema/billing";

test("billing:ListBill", async () => {
  const billingService = new Service({
    accessKeyId: "<Your AK>",
    secretKey: "<Your SK>",
  });

  // 查询账单
  const ListBillResponse = await billingService.fetchOpenAPI({
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
  const validateListBillResult = listBillReponseSchemaValidate(ListBillResponse);
  expect(validateListBillResult).toBe(true);

  // 查询账单明细
  const ListBillDetailresponse = await billingService.fetchOpenAPI({
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
  const validateListBillDetailResult = listBillDetailReponseSchemaValidate(ListBillDetailresponse);
  expect(validateListBillDetailResult).toBe(true);

  // 查询账单总览-产品汇总
  const ListBillOverviewByProdResponse = await billingService.fetchOpenAPI({
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
  const validateListBillOverviewByProdResult = listBillOverviewByProdReponseSchemaValidate(
    ListBillOverviewByProdResponse
  );
  expect(validateListBillOverviewByProdResult).toBe(true);
});
