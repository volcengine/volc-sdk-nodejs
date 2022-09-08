import Ajv from "ajv";
import { createResponseSchema } from "./response";

const ajv = new Ajv();

export const listBillReponseSchemaValidate = ajv.compile(
  createResponseSchema({
    type: "object",
    properties: {
      Limit: {
        type: "number",
      },
      Offset: { type: "number" },
      Total: {
        type: "number",
      },
      BillList: {
        type: "array",
        items: {
          type: "object",
          properties: {
            BillPeriod: {
              type: "string",
            },
            PayerID: {
              type: "string",
            },
            PayerUserName: {
              type: "string",
            },
            PayerCustomerName: {
              type: "string",
            },
            OwnerID: {
              type: "string",
            },
            OwnerUserName: {
              type: "string",
            },
            OwnerCustomerName: {
              type: "string",
            },
            Product: {
              type: "string",
            },
            ProductZh: {
              type: "string",
            },
            BusinessMode: {
              type: "string",
            },
            BillingMode: {
              type: "string",
            },
            ExpenseBeginTime: {
              type: "string",
            },
            ExpenseEndTime: {
              type: "string",
            },
            TradeTime: {
              type: "string",
            },
            BillID: {
              type: "string",
            },
            BillCategoryParent: {
              type: "string",
            },
            OriginalBillAmount: {
              type: "string",
            },
            PreferentialBillAmount: {
              type: "string",
            },
            RoundBillAmount: {
              type: "string",
            },
            DiscountBillAmount: {
              type: "string",
            },
            CouponAmount: {
              type: "string",
            },
            PayableAmount: {
              type: "string",
            },
            PaidAmount: {
              type: "string",
            },
            UnpaidAmount: {
              type: "string",
            },
            Currency: {
              type: "string",
            },
            PayStatus: {
              type: "string",
            },
          },
        },
      },
    },
    required: ["Limit", "Offset", "Total", "BillList"],
  })
);

export const listBillDetailReponseSchemaValidate = ajv.compile(
  createResponseSchema({
    type: "object",
    properties: {
      Limit: {
        type: "number",
      },
      Offset: { type: "number" },
      Total: {
        type: "number",
      },
      BillList: {
        type: "array",
        items: {
          type: "object",
          properties: {
            BillPeriod: {
              type: "string",
            },
            ExpenseDate: {
              type: "string",
            },
            PayerID: {
              type: "string",
            },
            PayerUserName: {
              type: "string",
            },
            PayerCustomerName: {
              type: "string",
            },
            OwnerID: {
              type: "string",
            },
            OwnerUserName: {
              type: "string",
            },
            OwnerCustomerName: {
              type: "string",
            },
            BusinessMode: {
              type: "string",
            },
            Product: {
              type: "string",
            },
            ProductZh: {
              type: "string",
            },
            BillingMode: {
              type: "string",
            },
            ExpenseBeginTime: {
              type: "string",
            },
            ExpenseEndTime: {
              type: "string",
            },
            UseDuration: {
              type: "string",
            },
            UseDurationUnit: {
              type: "string",
            },
            TradeTime: {
              type: "string",
            },
            BillID: {
              type: "string",
            },
            BillCategory: {
              type: "string",
            },
            InstanceNo: {
              type: "string",
            },
            InstanceName: {
              type: "string",
            },
            ConfigName: {
              type: "string",
            },
            Element: {
              type: "string",
            },
            Region: {
              type: "string",
            },
            Zone: {
              type: "string",
            },
            Factor: {
              type: "string",
            },
            ExpandField: {
              type: "string",
            },
            Price: {
              type: "string",
            },
            PriceUnit: {
              type: "string",
            },
            Count: {
              type: "string",
            },
            Unit: {
              type: "string",
            },
            DeductionCount: {
              type: "string",
            },
            OriginalBillAmount: {
              type: "string",
            },
            PreferentialBillAmount: {
              type: "string",
            },
            DiscountBillAmount: {
              type: "string",
            },
            CouponAmount: {
              type: "string",
            },
            PayableAmount: {
              type: "string",
            },
            PaidAmount: {
              type: "string",
            },
            UnpaidAmount: {
              type: "string",
            },
            Currency: {
              type: "string",
            },
          },
        },
      },
    },
    required: ["Limit", "Offset", "Total", "BillDetailList"],
  })
);

export const listBillOverviewByProdReponseSchemaValidate = ajv.compile(
  createResponseSchema({
    type: "object",
    properties: {
      Limit: {
        type: "number",
      },
      Offset: { type: "number" },
      Total: {
        type: "number",
      },
      BillList: {
        type: "array",
        items: {
          type: "object",
          properties: {
            BillPeriod: {
              type: "string",
            },
            PayerID: {
              type: "string",
            },
            PayerUserName: {
              type: "string",
            },
            PayerCustomerName: {
              type: "string",
            },
            OwnerID: {
              type: "string",
            },
            OwnerUserName: {
              type: "string",
            },
            OwnerCustomerName: {
              type: "string",
            },
            BusinessMode: {
              type: "string",
            },
            Product: {
              type: "string",
            },
            ProductZh: {
              type: "string",
            },
            BillingMode: {
              type: "string",
            },
            BillCategoryParent: {
              type: "string",
            },
            OriginalBillAmount: {
              type: "string",
            },
            PreferentialBillAmount: {
              type: "string",
            },
            RoundBillAmount: {
              type: "string",
            },
            DiscountBillAmount: {
              type: "string",
            },
            CouponAmount: {
              type: "string",
            },
            PayableAmount: {
              type: "string",
            },
            PaidAmount: {
              type: "string",
            },
            UnpaidAmount: {
              type: "string",
            },
          },
        },
      },
    },
    required: ["Limit", "Offset", "Total", "BillOverviewByProdList"],
  })
);
