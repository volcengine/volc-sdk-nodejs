interface Bill {
  BillPeriod: string;
  PayerID: string;
  PayerUserName: string;
  PayerCustomerName: string;
  OwnerID: string;
  OwnerUserName: string;
  OwnerCustomerName: string;
  Product: string;
  ProductZh: string;
  BusinessMode: string;
  BillingMode: string;
  ExpenseBeginTime: string;
  ExpenseEndTime: string;
  TradeTime: string;
  BillID: string;
  BillCategoryParent: string;
  OriginalBillAmount: string;
  PreferentialBillAmount: string;
  RoundBillAmount: string;
  DiscountBillAmount: string;
  CouponAmount: string;
  PayableAmount: string;
  PaidAmount: string;
  UnpaidAmount: string;
  Currency: string;
  PayStatus: string;
}

export interface ListBillParams {
  BillPeriod: string;
  Limit: string;
  Offset: string;
  Product: string;
  BillingMode: string;
  BillCategoryParent: string;
  PayStatus: string;
  IgnoreZero: string;
  NeedRecordNum: string;
}

export interface ListBillResult {
  Total: number;
  Offset: number;
  Limit: number;
  BillList: Bill[];
}

interface BillDetail {
  BillPeriod: string;
  ExpenseDate: string;
  PayerID: string;
  PayerUserName: string;
  PayerCustomerName: string;
  OwnerID: string;
  OwnerUserName: string;
  OwnerCustomerName: string;
  BusinessMode: string;
  Product: string;
  ProductZh: string;
  BillingMode: string;
  ExpenseBeginTime: string;
  ExpenseEndTime: string;
  UseDuration: string;
  UseDurationUnit: string;
  TradeTime: string;
  BillID: string;
  BillCategoryParent: string;
  InstanceNo: string;
  InstanceName: string;
  ConfigName: string;
  Element: string;
  Region: string;
  Zone: string;
  Factor: string;
  ExpandField: string;
  Price: string;
  PriceUnit: string;
  Count: string;
  Unit: string;
  DeductionCount: string;
  OriginalBillAmount: string;
  PreferentialBillAmount: string;
  DiscountBillAmount: string;
  CouponAmount: string;
  PayableAmount: string;
  PaidAmount: string;
  UnpaidAmount: string;
  Currency: string;
}

export interface ListBillDetailParams {
  BillPeriod: string;
  Limit: string;
  Offset: string;
  GroupTerm: string;
  GroupPeriod: string;
  Product: string;
  BillingMode: string;
  BillCategory: string;
  InstanceNo: string;
  IgnoreZero: string;
  NeedRecordNum: string;
}

export interface ListBillDetailResult {
  Total: number;
  Offset: number;
  Limit: number;
  BillList: BillDetail[];
}

interface BillOverviewByProd {
  BillPeriod: string;
  PayerID: string;
  PayerUserName: string;
  PayerCustomerName: string;
  OwnerID: string;
  OwnerUserName: string;
  OwnerCustomerName: string;
  BusinessMode: string;
  Product: string;
  ProductZh: string;
  BillingMode: string;
  BillCategoryParent: string;
  OriginalBillAmount: string;
  PreferentialBillAmount: string;
  RoundBillAmount: string;
  DiscountBillAmount: string;
  CouponAmount: string;
  PayableAmount: string;
  PaidAmount: string;
  UnpaidAmount: string;
}

export interface ListBillOverviewByProdParams {
  BillPeriod: string;
  Limit: string;
  Offset: string;
  Product: string;
  BillingMode: string;
  BillCategoryParent: string;
  IgnoreZero: string;
  NeedRecordNum: string;
}

export interface ListBillOverviewByProdResult {
  Total: number;
  Offset: number;
  Limit: number;
  BillList: BillOverviewByProd[];
}
