import { AbstractService } from "../abstractService";
import { VikingdbResponse } from "../types";
import {
  BackendCreateTaskData,
  BackendCreateTaskRequest,
  BackendGetTaskInfoData,
  BackendGetTaskInfoRequest,
  BackendUpdateTaskRequest,
} from "./backend";
import { Pathname } from "./pathname";
import {
  CreateTaskRequest,
  CreateTaskResponse,
  GetTaskInfoRequest,
  GetTaskInfoResponse,
  UpdateTaskRequest,
} from "./types";

export class TaskService extends AbstractService {
  async CreateTask({ TaskType, TaskParams }: CreateTaskRequest): Promise<CreateTaskResponse> {
    const response = await this.request<BackendCreateTaskRequest, BackendCreateTaskData>(
      Pathname.CreateTask,
      {
        task_type: TaskType,
        task_params: TaskParams,
      }
    );
    return new CreateTaskResponse(response.data, response.original_request, response.request_id);
  }
  async UpdateTask({ TaskType, TaskStatus }: UpdateTaskRequest): Promise<VikingdbResponse> {
    const response = await this.request<BackendUpdateTaskRequest>(Pathname.UpdateTask, {
      task_id: TaskType,
      task_status: TaskStatus,
    });
    return new VikingdbResponse(response.original_request, response.request_id);
  }
  async GetTaskInfo({ TaskId }: GetTaskInfoRequest): Promise<GetTaskInfoResponse> {
    const response = await this.request<BackendGetTaskInfoRequest, BackendGetTaskInfoData>(
      Pathname.GetTaskInfo,
      {
        task_id: TaskId,
      }
    );
    return new GetTaskInfoResponse(response.data, response.original_request, response.request_id);
  }
}

export * as task from "./types";
