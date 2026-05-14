import Service from "../../base/service";
import { ServiceOptions } from "../../base/types";
import {
  BatchSendSmsParams,
  SendSmsParams,
  ConversionParams,
  ConversionResponse,
  CheckVerifyCodeParams,
  CheckVerifyCodeResponse,
  SendVerifyCodeParams,
  SendVerifyCodeResponse,
  SendSmsResponse,
  BatchSendSmsResponse,
  ApplyVmsTemplateParams,
  ApplyVmsTemplateResponse,
  GetVmsTemplateStatusParams,
  GetVmsTemplateStatusResponse,
  GetSmsTemplateAndOrderListParams,
  GetSmsTemplateAndOrderListResponse,
  ApplySmsTemplateParams,
  ApplySmsTemplateResponse,
  DeleteSmsTemplateParams,
  DeleteSmsTemplateResponse,
  GetSubAccountListParams,
  GetSubAccountListResponse,
  GetSubAccountDetailParams,
  GetSubAccountDetailResponse,
  InsertSmsSubAccountParams,
  InsertSmsSubAccountResponse,
  ApplySmsSignatureParams,
  ApplySmsSignatureResponse,
  DeleteSignatureParams,
  DeleteSignatureResponse,
  GetSignatureAndOrderListParams,
  GetSignatureAndOrderListResponse,
  ApplySignatureIdentParams,
  ApplySignatureIdentResponse,
  GetSignatureIdentListParams,
  GetSignatureIdentListResponse,
  BatchBindSignatureIdentParams,
  BatchBindSignatureIdentResponse,
} from "./types";
enum HttpMethod {
  GET = "GET",
  DELETE = "DELETE",
  POST = "POST",
  PUT = "PUT",
  Patch = "PATCH", // RFC 5789
  Connect = "CONNECT",
  Options = "OPTIONS",
  Trace = "TRACE",
}
const ServiceVersion20200101 = "2020-01-01";
const ServiceVersion20210101 = "2021-01-01";
const ServiceVersion20210111 = "2021-01-11";

export class SmsService extends Service {
  constructor(options?: ServiceOptions) {
    super({
      ...options,
      host: "sms.volcengineapi.com",
      serviceName: "volcSMS",
    });
  }

  /** sms group */
  Send = this.createAPI<SendSmsParams, SendSmsResponse>("SendSms", {
    method: HttpMethod.POST,
    contentType: "json",
    Version: ServiceVersion20200101,
  });

  BatchSend = this.createAPI<BatchSendSmsParams, BatchSendSmsResponse>("SendBatchSms", {
    method: HttpMethod.POST,
    contentType: "json",
    Version: ServiceVersion20210101,
  });

  Conversion = this.createAPI<ConversionParams, ConversionResponse>("Conversion", {
    method: HttpMethod.POST,
    contentType: "json",
    Version: ServiceVersion20200101,
  });

  SendVerifyCode = this.createAPI<SendVerifyCodeParams, SendVerifyCodeResponse>(
    "SendSmsVerifyCode",
    {
      method: HttpMethod.POST,
      contentType: "json",
      Version: ServiceVersion20200101,
    }
  );

  CheckVerifyCode = this.createAPI<CheckVerifyCodeParams, CheckVerifyCodeResponse>(
    "CheckSmsVerifyCode",
    {
      method: HttpMethod.POST,
      contentType: "json",
      Version: ServiceVersion20200101,
    }
  );

  /* sms - end */

  /* vms */
  ApplyVmsTemplate = this.createAPI<ApplyVmsTemplateParams, ApplyVmsTemplateResponse>(
    "ApplyVmsTemplate",
    {
      method: HttpMethod.POST,
      contentType: "json",
      Version: ServiceVersion20210111,
    }
  );

  GetVmsTemplateStatus = this.createAPI<GetVmsTemplateStatusParams, GetVmsTemplateStatusResponse>(
    "GetVmsTemplateStatus",
    {
      method: HttpMethod.POST,
      contentType: "json",
      Version: ServiceVersion20210111,
    }
  );

  SendVms = this.createAPI<SendSmsParams, SendSmsResponse>("SendSms", {
    method: HttpMethod.POST,
    contentType: "json",
    Version: ServiceVersion20210111,
  });
  /* vms -end */

  /* template -start */
  GetSmsTemplateAndOrderList = this.createAPI<
    GetSmsTemplateAndOrderListParams,
    GetSmsTemplateAndOrderListResponse
  >("GetSmsTemplateAndOrderList", {
    method: HttpMethod.GET,
    contentType: "json",
    Version: ServiceVersion20210111,
  });

  ApplySmsTemplate = this.createAPI<ApplySmsTemplateParams, ApplySmsTemplateResponse>(
    "ApplySmsTemplate",
    {
      method: HttpMethod.POST,
      contentType: "json",
      Version: ServiceVersion20210111,
    }
  );

  DeleteSmsTemplate = this.createAPI<DeleteSmsTemplateParams, DeleteSmsTemplateResponse>(
    "DeleteSmsTemplate",
    {
      method: HttpMethod.POST,
      contentType: "json",
      Version: ServiceVersion20210111,
    }
  );
  /* template end*/

  /* subAccount start*/
  GetSubAccountList = this.createAPI<GetSubAccountListParams, GetSubAccountListResponse>(
    "GetSubAccountList",
    {
      method: HttpMethod.GET,
      contentType: "json",
      Version: ServiceVersion20210111,
    }
  );

  GetSubAccountDetail = this.createAPI<GetSubAccountDetailParams, GetSubAccountDetailResponse>(
    "GetSubAccountDetail",
    {
      method: HttpMethod.GET,
      contentType: "json",
      Version: ServiceVersion20210111,
    }
  );

  InsertSmsSubAccount = this.createAPI<InsertSmsSubAccountParams, InsertSmsSubAccountResponse>(
    "InsertSmsSubAccount",
    {
      method: HttpMethod.POST,
      contentType: "json",
      Version: ServiceVersion20210111,
    }
  );
  /* subAccount end*/

  /* signature start*/
  GetSignatureAndOrderList = this.createAPI<
    GetSignatureAndOrderListParams,
    GetSignatureAndOrderListResponse
  >("GetSignatureAndOrderList", {
    method: HttpMethod.GET,
    contentType: "json",
    Version: ServiceVersion20210111,
  });

  ApplySmsSignature = this.createAPI<ApplySmsSignatureParams, ApplySmsSignatureResponse>(
    "ApplySmsSignature",
    {
      method: HttpMethod.GET,
      contentType: "json",
      Version: ServiceVersion20210111,
    }
  );

  DeleteSignature = this.createAPI<DeleteSignatureParams, DeleteSignatureResponse>(
    "DeleteSignature",
    {
      method: HttpMethod.POST,
      contentType: "json",
      Version: ServiceVersion20210111,
    }
  );
  /* signature end*/

  /*batch import signatures*/

  ApplySignatureIdent = this.createAPI<ApplySignatureIdentParams, ApplySignatureIdentResponse>(
    "ApplySignatureIdent",
    {
      method: HttpMethod.POST,
      contentType: "json",
      Version: ServiceVersion20210111,
    }
  );

  GetSignatureIdentList = this.createAPI<
    GetSignatureIdentListParams,
    GetSignatureIdentListResponse
  >("GetSignatureIdentList", {
    method: HttpMethod.GET,
    contentType: "json",
    Version: ServiceVersion20210111,
  });

  BatchBindSignatureIdent = this.createAPI<
    BatchBindSignatureIdentParams,
    BatchBindSignatureIdentResponse
  >("BatchBindSignatureIdent", {
    method: HttpMethod.POST,
    contentType: "json",
    Version: ServiceVersion20210111,
  });
}

export const defaultService = new SmsService();
