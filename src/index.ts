import Service from "./base/service";
import Signer from "./base/sign";
import * as iam from "./services/iam";
import * as imagex from "./services/imagex";
import * as edit from "./services/edit";
import * as i18nOpenapi from "./services/i18nOpenapi";
import * as acep from "./services/acep";
import * as rtcOpenapi from "./services/rtc";
import * as vodOpenapi from "./services/vod";
import * as tlsOpenapi from "./services/tls";
import * as liveOpenapi from "./services/live";
import * as livesaasOpenapi from "./services/livesaas";
import * as rocketmq from "./services/rocketmq";
import * as billing from "./services/billing";
import * as sts from "./services/sts";
import * as cdn from "./services/cdn";
import * as sms from "./services/sms";

export {
  Service,
  Signer,
  iam,
  imagex,
  edit,
  i18nOpenapi,
  acep,
  rtcOpenapi,
  vodOpenapi,
  tlsOpenapi,
  liveOpenapi,
  livesaasOpenapi,
  rocketmq,
  billing,
  sts,
  cdn,
  sms,
};
