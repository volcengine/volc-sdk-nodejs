/* CreateTask start */
export interface CommonTaskParamsCommon {
  collection_name: string;
  filter?: Record<string, unknown>;
}

export interface DeleteTaskParams extends CommonTaskParamsCommon {
  need_confirm?: boolean;
}

export interface ExportTaskParams extends CommonTaskParamsCommon {
  tos_path: string;
  field_type: "parquet" | "json";
  export_all: boolean;
}

export type TaskParams = DeleteTaskParams | ExportTaskParams;
export interface BackendCreateTaskRequest {
  task_type: string;
  task_params: TaskParams;
}

export interface BackendCreateTaskData {
  task_id: string;
}

/* CreateTask end */

/* UpdateTask start */
export interface BackendUpdateTaskRequest {
  task_id: string;
  task_status: string;
}
/* UpdateTask end */

/* GetTaskInfo start */
export interface BackendGetTaskInfoRequest {
  task_id: string;
}

export interface ProcessInfo {
  sampled_data: Array<unknown>;
  sampled_tipmestamp: number;
  err_msg: string;
  process_step: string;
  task_progress: number;
  total_data_count: number;
  total_delete_count: number;
  total_filter_count: number;
}
export type TaskStatus = "init" | "queued" | "running" | "done" | "fail" | "confirm" | "confirmed";

export interface BackendGetTaskInfoData {
  process_info: {
    task_id: string;
    task_status: TaskStatus;
    task_type: string;
    task_params: TaskParams;
    update_person: string;
    update_time: number;
    create_time: number;
    process_info: ProcessInfo;
  };
}
/* GetTaskInfo end */
