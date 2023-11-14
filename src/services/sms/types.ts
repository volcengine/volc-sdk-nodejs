interface BaseMetaData {
  RequestId: string;
  Service: string;
  Region: string;
  Action: string;
  Version: string;
}

interface BaseError {
  CodeN: number;
  Code: string;
  Message: string;
}
export interface SendSmsParams {
  SmsAccount: string;
  Sign: string;
  TemplateID: string;
  TemplateParam: string;
  PhoneNumbers: string;
  Tag: string;
  UserExtCode: string;
}

export interface SendSmsResponse {
  ResponseMetadata: BaseMetaData & BaseError;
  Result: { MessageID: string[] };
}

export interface BatchSendSmsParams {
  SmsAccount: string;
  Sign: string;
  TemplateID: string;
  Tag: string;
  Messages: Array<{ TemplateParam: string; PhoneNumber: number }>;
}

export interface BatchSendSmsResponse {
  ResponseMetadata: {
    Sign: string;
    TemplateID: string;
    TemplateParam: string;
    PhoneNumbers: string;
    Tag: string;
    UserExtCode: string;
  };
  Result: {
    MessageID: string[];
  };
}

export interface ConversionParams {
  MessageIDs: string[];
  Type: number;
}
export interface ConversionResponse {
  RequestId: string;
  Service: string;
  Region: string;
  Action: string;
  Version: string;
  Error: {
    CodeN: number;
    Code: string;
    Message: string;
  };
}

export interface CheckVerifyCodeParams {
  SmsAccount: string;
  PhoneNumber: string;
  Scene: string;
  Code: string;
}
export interface CheckVerifyCodeResponse {
  ResponseMetadata: BaseMetaData & BaseError;
  Result: string;
}

export interface SendVerifyCodeParams {
  SmsAccount: string;
  Sign: string;
  TemplateID: string;
  PhoneNumber: string;
  Tag: string;
  UserExtCode: string;
  Scene: string;
  CodeType: number;
  ExpireTime: number;
  TryCount: number;
}
export interface SendVerifyCodeResponse {
  ResponseMetadata: BaseMetaData & BaseError;
  Result: string;
}

/* vms */
enum SmsOrderStatus {
  SmsOrder_REVIEWING = 1,
  SmsOrder_REJECTED = 2,
  SmsOrder_PASSED = 3,
  SmsOrder_CLOSE = 4,
  SmsOrder_EXEMPTED = 5,
}
enum SmsChannelType {
  SmsChannelTypeCnOTP = "CN_OTP",
  SmsChannelTypeCnNTC = "CN_NTC",
  SmsChannelTypeCnMKT = "CN_MKT",
  SmsChannelTypeCnVms = "CN_VMS",
  SmsChannelTypeI18nOTP = "I18N_OTP",
  SmsChannelTypeI18nMKT = "I18N_MKT",
}
interface VmsElement {
  SourceType: string;
  Content: string;
}

interface CarrierReviewInfo {
  Carrier: string;
  Status: SmsOrderStatus;
  Reason: string;
}
export interface ApplyVmsTemplateParams {
  SubAccount: string;
  ChannelType: SmsChannelType;
  Name: string;
  Theme: string;
  Signature: string;
  Contents: VmsElement[];
}
export interface ApplyVmsTemplateResponse {
  ResponseMetadata: BaseMetaData & BaseError;
  Result: string;
}

export interface GetVmsTemplateStatusParams {
  SubAccount: string;
  TemplateId: string;
}
export interface GetVmsTemplateStatusResponse {
  ResponseMetadata: BaseMetaData & BaseError;
  Result: {
    ApplyResult: CarrierReviewInfo[];
    approveTime: number;
    expireTime: number;
    restValidDays: number;
    status: number;
  };
}
/* vms -end*/

/* template */
enum Area {
  AreaCN = "cn",
  AreaOverseas = "overseas",
  AreaAll = "all",
}
export interface GetSmsTemplateAndOrderListParams {
  SubAccount: string;
  TemplateId: string;
  Name: string;
  Area: Area;
  ChannelType: string;
  Content: string;
  PageIndex: number;
  PageSize: number;
}
export interface GetSmsTemplateAndOrderListResponse {
  ResponseMetadata: BaseMetaData & BaseError;
  Result: {
    ApplyResult: CarrierReviewInfo[];
    Total: number;
  };
}

export interface ApplySmsTemplateParams {
  SubAccount: string;
  TemplateId: string;
  Name: string;
  Area: Area;
  ChannelType: string;
  Content: string;
  PageIndex: number;
  PageSize: number;
}
export interface ApplySmsTemplateResponse {
  ResponseMetadata: BaseMetaData & BaseError;
  Result: {
    ApplyResult: CarrierReviewInfo[];
    Total: number;
  };
}

export interface DeleteSmsTemplateParams {
  SubAccount: string;
  Id: string;
  IsOrder: boolean;
}
export interface DeleteSmsTemplateResponse {
  ResponseMetadata: BaseMetaData & BaseError;
  Result: string;
}
/* template end*/

/** subAccount  */
interface SmsSubAccountInfo {
  SubAccountId: string;
  SubAccountName: string;
  CreatedTime: number;
  Status: number;
  Desc: string;
}

interface SmsSubAccountDetail {
  SubAccountId: string;
  SubAccountName: string;
  EnabledChannelType: {
    Name: string;
    Value: SmsChannelType;
    Area: Area;
  };
  Status: number;
  Desc: string;
  CreatedTime: number;
}

export interface GetSubAccountListParams {
  SubAccount: string;
  SubAccountName: string;
  PageIndex: number;
  PageSize: number;
}
export interface GetSubAccountListResponse {
  ResponseMetadata: BaseMetaData & BaseError;
  Result: {
    List: SmsSubAccountInfo[];
    Total: number;
  };
}

export interface GetSubAccountDetailParams {
  SubAccount: string;
}
export interface GetSubAccountDetailResponse {
  ResponseMetadata: BaseMetaData & BaseError;
  Result: SmsSubAccountDetail;
}

export interface InsertSmsSubAccountParams {
  SubAccountName: string;
  Desc: string;
}
export interface InsertSmsSubAccountResponse {
  ResponseMetadata: BaseMetaData & BaseError;
  Result: string;
}
/** subAccount end */

/** signature */
interface SmsSignatureInfo {
  Id: string;
  ApplyId: string;
  Content: string;
  Source: string;
  Application: string;
  CreatedTime: number;
  IsOrder: number;
  Status: SmsOrderStatus;
  Reason: string;
}
export interface GetSignatureAndOrderListParams {
  SubAccount: string;
  Signature: string;
  PageIndex: number;
  PageSize: number;
}
export interface GetSignatureAndOrderListResponse {
  ResponseMetadata: BaseMetaData & BaseError;
  Result: {
    List: SmsSignatureInfo[];
    Total: number;
  };
}

export interface ApplySmsSignatureParams {
  SubAccount: string;
  Content: string;
  Source: string;
  Domain: string;
  Desc: string;
  UploadFileKey: string;
}
export interface ApplySmsSignatureResponse {
  ResponseMetadata: BaseMetaData & BaseError;
  Result: SmsSignatureInfo;
}

export interface DeleteSignatureParams {
  SubAccount: string;
  Content: string;
  Source: string;
  Domain: string;
  Desc: string;
  UploadFileKey: string;
}
export interface DeleteSignatureResponse {
  ResponseMetadata: BaseMetaData & BaseError;
  Result: SmsSignatureInfo;
}
