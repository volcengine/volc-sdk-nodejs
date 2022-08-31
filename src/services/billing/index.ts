import Service from "../../base/service";
import { ServiceOptions } from "../../base/types";
import {
  ListBillParams,
  ListBillResult,
  ListBillDetailParams,
  ListBillDetailResult,
  ListBillOverviewByProdParams,
  ListBillOverviewByProdResult,
} from "./types";

export class BillingService extends Service {
  constructor(options?: ServiceOptions) {
    super({
      ...options,
      host: "billing.volcengineapi.com",
      defaultVersion: "2022-01-01",
      serviceName: "billing",
    });
  }

  ListBill = this.createAPI<ListBillParams, ListBillResult>("ListBill", {
    method: "POST",
    contentType: "json",
    Version: "2022-01-01",
  });

  ListBillDetail = this.createAPI<ListBillDetailParams, ListBillDetailResult>("ListBillDetail", {
    method: "POST",
    contentType: "json",
    Version: "2022-01-01",
  });

  ListBillOverviewByProd = this.createAPI<
    ListBillOverviewByProdParams,
    ListBillOverviewByProdResult
  >("ListBillOverviewByProd", {
    method: "POST",
    contentType: "json",
    Version: "2022-01-01",
  });
}

export const defaultService = new BillingService();
