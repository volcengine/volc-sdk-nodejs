import { type RequestOptions, VikingdbResponse } from "../types";
import { BackendCreateTaskData, BackendGetTaskInfoData, TaskParams } from "./backend";

export class TaskResponse<T> extends VikingdbResponse {
  constructor(public readonly Data: T, OriginalRequest: string, LogId: string) {
    super(OriginalRequest, LogId);
  }
}

export interface Options<T> extends Omit<RequestOptions, "method"> {
  data: T;
  pathname: string;
}

export interface CreateTaskRequest {
  TaskType: string;
  TaskParams: TaskParams;
}

export class CreateTaskResponse extends VikingdbResponse {
  constructor(public Data: BackendCreateTaskData, OriginalRequest: string, LogId: string) {
    super(OriginalRequest, LogId);
  }
}

export interface UpdateTaskRequest {
  TaskType: string;
  TaskStatus: string;
}

export interface GetTaskInfoRequest {
  TaskId: string;
}

export class GetTaskInfoResponse extends VikingdbResponse {
  constructor(public Data: BackendGetTaskInfoData, OriginalRequest: string, LogId: string) {
    super(OriginalRequest, LogId);
  }
}
