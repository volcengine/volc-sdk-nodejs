type roleName = "admin" | "manager" | "user" | "visitor";
type roleType = 1 | 4 | 7 | 10;
interface IProjectParams {
  projectId: number;
}
interface INamespaceParams extends IProjectParams {
  namespaceId: number;
}

interface ITaskParams extends IProjectParams {
  taskId: number;
}

interface IListParams {
  offset?: number;
  limit?: number;
}
interface IDownloadParams {
  format?: "xml" | "json" | "ts" | "strings" | "stringsdict" | "po";
  dirType?: "locale" | "primary";
  fileName?: string;
}

interface IBaseResult {
  message?: string;
}
interface IListResult extends IBaseResult {
  total: number;
  pagination: {
    offset: number;
    limit: number;
  };
}

interface IProject {
  id: number;
  name: string;
  description: string;
  creatorId: number;
  extra: {
    setting: {
      textValidate: {
        sourceTextValidate: boolean;
        targetTextValidate: boolean;
      };
      autoFillTargetText: {
        onUpdate: boolean;
        onCreate: boolean;
      };
      approval: boolean;
      key: {
        keyWhetherMust: boolean;
        showPlural: boolean;
        keyTips: string;
        wordCharacterOnly: boolean;
        startWithoutNumber: boolean;
      };
      task: {
        defaultSyncNamespaces: number[];
      };
    };
  };
  createdAt: string;
  updatedAt: string;
  sourceLocale: string;
  targetLanguages: string[];
}

interface IUser {
  userId: number;
  role: number;
  createdAt: string;
  updatedAt: string;
}

interface INamespace {
  id: number;
  projectId: number;
  projectName: string;
  namespace: string;
  description: string;
  creatorId: number;
  extra: string;
  createdAt: string;
  updatedAt: string;
}

interface ISourceText {
  id: number;
  lang: string;
  keyText: string;
  content: string;
  tagName: string;
  lengthLimit: number;
  distributeStatus: 8 | 9 | 10 | 11 | 12 | 13;
  translatedStatus: 1 | 0;
  textExtra?: {
    id: number;
    textId: number;
    createdAt: string;
    updatedAt: string;
    zero: string;
    one: string;
    two: string;
    other: string;
    few: string;
    many: string;
  };
  taskId: number;
  approvalStatus: 0;
  createdAt: string;
  updatedAt: string;
  operatorId: number;
  commentary: string;
}

interface ITargetText {
  id: number;
  sourceTextId: number;
  namespaceId: number;
  lang: string;
  keyText: string;
  content: string;
  distributed: number;
  tagName: string;
  textExtra?: {
    id: number;
    textId: number;
    createdAt: string;
    updatedAt: string;
    zero: string;
    one: string;
    two: string;
    other: string;
    few: string;
    many: string;
  };
  createdAt: string;
  updatedAt: string;
  operatorId: number;
}

interface ITask {
  taskId: number;
  taskName: string;
  comment: string;
  syncNamespaces: number[];
  createdAt: string;
  updatedAt: string;
  creatorId: number;
}

interface ITermTarget {
  id: number;
  locale: string;
  term: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  operatorId: number;
  creatorId: number;
}
interface ITerm {
  id: number;
  locale: string;
  term: string;
  description: string;
  isApplyAll: false;
  createdAt: string;
  updatedAt: string;
  operatorId: number;
  creatorId: number;
  targetTerms: ITermTarget[];
}
export interface ProjectsParams extends IListParams {}

export interface ProjectsResult extends IListResult {
  data: IProject[];
}
export interface ProjectDetailParams extends IProjectParams {}

export interface ProjectDetailResult extends IBaseResult {
  data: IProject;
}
export interface ProjectUsersParams extends IProjectParams, IListParams {}

export interface ProjectUsersResult extends IListResult {
  data: IUser[];
}
export interface ProjectUserRoleParams extends IProjectParams {
  userId: number;
}
export interface ProjectUserRoleResult extends IBaseResult {
  data: {
    roleName: roleName;
    role: roleType;
  };
}
export interface ProjectNamespacesParams extends IProjectParams, IListParams {}

export interface ProjectNamespacesResult extends IListResult {
  data: INamespace[];
}
export interface ProjectNamespaceDetailParams extends INamespaceParams {}

export interface ProjectNamespaceDetailResult extends IBaseResult {
  data: INamespace;
}
export interface ProjectNamespaceCreateParams extends IProjectParams {
  name: string;
  description: string;
}

export interface ProjectNamespaceCreateResult extends IBaseResult {}
export interface ProjectNamespaceSourcesParams extends INamespaceParams {
  sourceIds?: number[];
  keyTexts?: string[];
  offset?: number;
  limit?: number;
  searchKey?: string;
  searchSource?: string;
  searchTarget?: string;
  translatedStatus?: number;
  distributeStatus?: number;
}

export interface ProjectNamespaceSourcesResult extends IBaseResult {
  data: ISourceText[];
}
export interface ProjectNamespaceSourceDetailParams extends INamespaceParams {
  sourceId: number;
}

export interface ProjectNamespaceSourceDetailResult extends IBaseResult {
  data: ISourceText;
}
export interface ProjectNamespaceSourceDownloadParams extends INamespaceParams, IDownloadParams {}

export interface ProjectNamespaceSourceDownloadResult extends IBaseResult {}
export interface ProjectNamespaceSourceUpdateParams extends INamespaceParams {
  sourceId: number;
  content?: string;
  lengthLimit?: number;
  commentary?: string;
}
export interface ProjectNamespaceSourceUpdateResult extends IBaseResult {}

export interface ProjectNamespaceSourceAddParams extends INamespaceParams {
  texts: {
    key: string;
    content: string;
    commentary?: string;
    lengthLimit?: number;
    extra?: {
      one?: string;
      other?: string;
    };
  }[];
}

export interface ProjectNamespaceSourceAddResult extends IBaseResult {}

export interface ProjectNamespaceSourceDeleteByKeysParams extends INamespaceParams {
  textKeys: string[];
}

export interface ProjectNamespaceSourceDeleteByKeysResult extends IBaseResult {}

export interface ProjectNamespaceSourceDeleteByIdsParams extends INamespaceParams {
  textIds: number[];
}

export interface ProjectNamespaceSourceDeleteByIdsResult extends IBaseResult {}

export interface ProjectNamespaceTargetsParams extends INamespaceParams, IListParams {}

export interface ProjectNamespaceTargetsResult extends IBaseResult {
  data: ITargetText[];
}
export interface ProjectNamespaceTargetDownloadParams extends INamespaceParams, IDownloadParams {}

export interface ProjectNamespaceTargetDownloadResult extends IBaseResult {}

export interface ProjectNamespaceTargetUpdateParams extends INamespaceParams {
  targets: {
    key: string;
    content?: string;
    locale: string;
    zero?: string;
    one?: string;
    two?: string;
    few?: string;
    many?: string;
    other?: string;
  }[];
}

export interface ProjectNamespaceTargetUpdateResult extends IBaseResult {}

export interface ProjectNamespaceTargetDeleteByIdParams extends INamespaceParams {
  targetTextId: number;
}

export interface ProjectNamespaceTargetDeleteByIdResult extends IBaseResult {}

export interface ProjectTasksParams extends IProjectParams {}

export interface ProjectTasksResult extends IListResult {
  data: ITask[];
}

export interface ProjectTaskDetailParams extends ITaskParams {}

export interface ProjectTaskDetailResult extends IBaseResult {
  data: ITask;
}

export interface ProjectTaskCreateParams extends IProjectParams {
  name: string;
  syncNamespaces: number[];
}

export interface ProjectTaskCreateResult extends IBaseResult {}

export interface ProjectTaskSourcesParams extends ITaskParams {
  sourceIds?: number[];
  keyTexts?: string[];
  offset?: number;
  limit?: number;
  searchKey?: string;
  searchSource?: string;
  searchTarget?: string;
  translatedStatus?: number;
  distributeStatus?: number;
}

export interface ProjectTaskSourcesResult extends IBaseResult {
  data: ISourceText[];
}

export interface ProjectTaskSourceDetailParams extends ITaskParams {
  sourceId: number;
}

export interface ProjectTaskSourceDetailResult extends IBaseResult {
  data: ISourceText;
}

export interface ProjectTaskSourceDownloadParams extends ITaskParams, IDownloadParams {}

export interface ProjectTaskSourceDownloadResult extends IBaseResult {}

export interface ProjectTaskSourceUpdateParams extends ITaskParams {
  sourceId: number;
  content?: string;
  lengthLimit?: number;
  commentary?: string;
}

export interface ProjectTaskSourceUpdateResult extends IBaseResult {}

export interface ProjectTaskSourceAddParams extends ITaskParams {
  texts: {
    key: string;
    content: string;
    commentary?: string;
    lengthLimit?: number;
    extra?: {
      one?: string;
      other?: string;
    };
  }[];
}

export interface ProjectTaskSourceAddResult extends IBaseResult {}

export interface ProjectTaskSourceDeleteByKeysParams extends ITaskParams {
  textKeys: string[];
}

export interface ProjectTaskSourceDeleteByKeysResult extends IBaseResult {}

export interface ProjectTaskSourceDeleteByIdsParams extends ITaskParams {
  textIds: number[];
}

export interface ProjectTaskSourceDeleteByIdsResult extends IBaseResult {}

export interface ProjectTaskTargetsParams extends ITaskParams, IListParams {}

export interface ProjectTaskTargetsResult extends IBaseResult {
  data: ITargetText[];
}

export interface ProjectTaskTargetUpdateParams extends ITaskParams {
  targets: {
    key: string;
    content?: string;
    locale: string;
    zero?: string;
    one?: string;
    two?: string;
    few?: string;
    many?: string;
    other?: string;
  }[];
}

export interface ProjectTaskTargetUpdateResult extends IBaseResult {}

export interface ProjectTaskTargetDownloadParams extends ITaskParams, IDownloadParams {}

export interface ProjectTaskTargetDownloadResult extends IBaseResult {}

export interface ProjectTaskTargetDeleteByIdParams extends ITaskParams {
  targetTextId: number;
}

export interface ProjectTaskTargetDeleteByIdResult extends IBaseResult {}

export interface ProjectTermsParams extends IProjectParams {}

export interface ProjectTermsResult extends IBaseResult {
  data: ITerm[];
}

export interface ProjectTermDetailParams extends IProjectParams {
  sourceTermId: number;
}

export interface ProjectTermDetailResult extends IBaseResult {
  data: ITerm;
}

export interface ProjectTermTargetAddParams extends IProjectParams {
  sourceTermId: number;
  locale: string;
  term: string;
}

export interface ProjectTermTargetAddResult extends IBaseResult {}

export interface ProjectTermTargetUpdateParams extends IProjectParams {
  sourceTermId: number;
  term: string;
  termId: number;
}

export interface ProjectTermTargetUpdateResult extends IBaseResult {}

export interface ProjectTermTargetDeleteParams extends IProjectParams {
  sourceTermId: number;
}

export interface ProjectTermTargetDeleteResult extends IBaseResult {}

export interface ProjectTermSourceAddParams extends IProjectParams {
  description: string;
  term: string;
}

export interface ProjectTermSourceAddResult extends IBaseResult {}

export interface ProjectTermSourceUpdateParams extends IProjectParams {
  description: string;
  term: string;
  sourceTermId: number;
}

export interface ProjectTermSourceUpdateResult extends IBaseResult {}

export interface ProjectTermSourceDeleteParams extends IProjectParams {
  sourceTermIds: number[];
}

export interface ProjectTermSourceDeleteResult extends IBaseResult {}

export interface ProjectDistributionsParams extends IProjectParams {}

export interface ProjectDistributionsResult extends IBaseResult {}

export interface ProjectDistributionsReleaseParams extends IProjectParams {}

export interface ProjectDistributionsReleaseResult extends IBaseResult {}
