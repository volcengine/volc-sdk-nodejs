import Service from "../../base/service";
import { ServiceOptions } from "../../base/types";
import {
  SubmitDirectEditTaskAsyncParams,
  SubmitDirectEditTaskAsyncResult,
  GetDirectEditResultParams,
  DirectEditResult,
  SubmitTemplateTaskAsyncParams,
  SubmitTemplateTaskAsyncResult,
} from "./types";

export class EditService extends Service {
  constructor(options?: ServiceOptions) {
    super({
      defaultVersion: "2018-01-01",
      serviceName: "edit",
      host: "vedit.volcengineapi.com",
      ...options,
    });
  }
  SubmitDirectEditTaskAsync = this.createAPI<
    SubmitDirectEditTaskAsyncParams,
    SubmitDirectEditTaskAsyncResult
  >("SubmitDirectEditTaskAsync", { method: "POST", contentType: "json" });
  GetDirectEditResult = this.createAPI<GetDirectEditResultParams, DirectEditResult[]>(
    "GetDirectEditResult",
    { method: "POST", contentType: "json" }
  );
  SubmitTemplateTaskAsync = this.createAPI<
    SubmitTemplateTaskAsyncParams,
    SubmitTemplateTaskAsyncResult
  >("SubmitTemplateTaskAsync", { method: "POST", contentType: "json" });
}

export const defaultService = new EditService();
