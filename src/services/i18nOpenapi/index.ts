import Service from "../../base/service";
import { ServiceOptions } from "../../base/types";
import {
  ProjectsParams,
  ProjectsResult,
  ProjectDetailParams,
  ProjectDetailResult,
  ProjectUsersParams,
  ProjectUsersResult,
  ProjectUserRoleParams,
  ProjectUserRoleResult,
  ProjectNamespacesParams,
  ProjectNamespacesResult,
  ProjectNamespaceDetailParams,
  ProjectNamespaceDetailResult,
  ProjectNamespaceCreateParams,
  ProjectNamespaceCreateResult,
  ProjectNamespaceSourcesParams,
  ProjectNamespaceSourcesResult,
  ProjectNamespaceSourceDetailParams,
  ProjectNamespaceSourceDetailResult,
  ProjectNamespaceSourceDownloadParams,
  ProjectNamespaceSourceDownloadResult,
  ProjectNamespaceSourceUpdateParams,
  ProjectNamespaceSourceUpdateResult,
  ProjectNamespaceSourceAddParams,
  ProjectNamespaceSourceAddResult,
  ProjectNamespaceSourceDeleteByKeysParams,
  ProjectNamespaceSourceDeleteByKeysResult,
  ProjectNamespaceSourceDeleteByIdsParams,
  ProjectNamespaceSourceDeleteByIdsResult,
  ProjectNamespaceTargetsParams,
  ProjectNamespaceTargetsResult,
  ProjectNamespaceTargetDownloadParams,
  ProjectNamespaceTargetDownloadResult,
  ProjectNamespaceTargetUpdateParams,
  ProjectNamespaceTargetUpdateResult,
  ProjectNamespaceTargetDeleteByIdParams,
  ProjectNamespaceTargetDeleteByIdResult,
  ProjectTasksParams,
  ProjectTasksResult,
  ProjectTaskDetailParams,
  ProjectTaskDetailResult,
  ProjectTaskCreateParams,
  ProjectTaskCreateResult,
  ProjectTaskSourcesParams,
  ProjectTaskSourcesResult,
  ProjectTaskSourceDetailParams,
  ProjectTaskSourceDetailResult,
  ProjectTaskSourceDownloadParams,
  ProjectTaskSourceDownloadResult,
  ProjectTaskSourceUpdateParams,
  ProjectTaskSourceUpdateResult,
  ProjectTaskSourceAddParams,
  ProjectTaskSourceAddResult,
  ProjectTaskSourceDeleteByKeysParams,
  ProjectTaskSourceDeleteByKeysResult,
  ProjectTaskSourceDeleteByIdsParams,
  ProjectTaskSourceDeleteByIdsResult,
  ProjectTaskTargetsParams,
  ProjectTaskTargetsResult,
  ProjectTaskTargetUpdateParams,
  ProjectTaskTargetUpdateResult,
  ProjectTaskTargetDownloadParams,
  ProjectTaskTargetDownloadResult,
  ProjectTaskTargetDeleteByIdParams,
  ProjectTaskTargetDeleteByIdResult,
  ProjectTermsParams,
  ProjectTermsResult,
  ProjectTermDetailParams,
  ProjectTermDetailResult,
  ProjectTermTargetAddParams,
  ProjectTermTargetAddResult,
  ProjectTermTargetUpdateParams,
  ProjectTermTargetUpdateResult,
  ProjectTermTargetDeleteParams,
  ProjectTermTargetDeleteResult,
  ProjectTermSourceAddParams,
  ProjectTermSourceAddResult,
  ProjectTermSourceUpdateParams,
  ProjectTermSourceUpdateResult,
  ProjectTermSourceDeleteParams,
  ProjectTermSourceDeleteResult,
  ProjectDistributionsParams,
  ProjectDistributionsResult,
  ProjectDistributionsReleaseParams,
  ProjectDistributionsReleaseResult,
} from "./types";

export class i18nOpenapiService extends Service {
  constructor(options?: ServiceOptions) {
    super({
      ...options,
      defaultVersion: "2021-05-21",
      serviceName: "i18n_openapi",
    });
  }

  Projects = this.createAPI<ProjectsParams, ProjectsResult>("Projects");

  ProjectDetail = this.createAPI<ProjectDetailParams, ProjectDetailResult>("ProjectDetail");

  ProjectUsers = this.createAPI<ProjectUsersParams, ProjectUsersResult>("ProjectUsers");

  ProjectUserRole = this.createAPI<ProjectUserRoleParams, ProjectUserRoleResult>("ProjectUserRole");

  ProjectNamespaces = this.createAPI<ProjectNamespacesParams, ProjectNamespacesResult>(
    "ProjectNamespaces"
  );

  ProjectNamespaceDetail = this.createAPI<
    ProjectNamespaceDetailParams,
    ProjectNamespaceDetailResult
  >("ProjectNamespaceDetail");

  ProjectNamespaceCreate = this.createAPI<
    ProjectNamespaceCreateParams,
    ProjectNamespaceCreateResult
  >("ProjectNamespaceCreate", {
    method: "POST",
    contentType: "json",
  });

  ProjectNamespaceSources = this.createAPI<
    ProjectNamespaceSourcesParams,
    ProjectNamespaceSourcesResult
  >("ProjectNamespaceSources", {
    method: "POST",
    contentType: "json",
  });

  ProjectNamespaceSourceDetail = this.createAPI<
    ProjectNamespaceSourceDetailParams,
    ProjectNamespaceSourceDetailResult
  >("ProjectNamespaceSourceDetail");
  ProjectNamespaceSourceDownload = this.createAPI<
    ProjectNamespaceSourceDownloadParams,
    ProjectNamespaceSourceDownloadResult
  >("ProjectNamespaceSourceDownload");
  ProjectNamespaceSourceUpdate = this.createAPI<
    ProjectNamespaceSourceUpdateParams,
    ProjectNamespaceSourceUpdateResult
  >("ProjectNamespaceSourceUpdate", {
    method: "POST",
    contentType: "json",
  });

  ProjectNamespaceSourceAdd = this.createAPI<
    ProjectNamespaceSourceAddParams,
    ProjectNamespaceSourceAddResult
  >("ProjectNamespaceSourceAdd", {
    method: "POST",
    contentType: "json",
  });

  ProjectNamespaceSourceDeleteByKeys = this.createAPI<
    ProjectNamespaceSourceDeleteByKeysParams,
    ProjectNamespaceSourceDeleteByKeysResult
  >("ProjectNamespaceSourceDeleteByKeys", {
    method: "POST",
    contentType: "json",
  });

  ProjectNamespaceSourceDeleteByIds = this.createAPI<
    ProjectNamespaceSourceDeleteByIdsParams,
    ProjectNamespaceSourceDeleteByIdsResult
  >("ProjectNamespaceSourceDeleteByIds", {
    method: "POST",
    contentType: "json",
  });

  ProjectNamespaceTargets = this.createAPI<
    ProjectNamespaceTargetsParams,
    ProjectNamespaceTargetsResult
  >("ProjectNamespaceTargets");

  ProjectNamespaceTargetDownload = this.createAPI<
    ProjectNamespaceTargetDownloadParams,
    ProjectNamespaceTargetDownloadResult
  >("ProjectNamespaceTargetDownload");

  ProjectNamespaceTargetUpdate = this.createAPI<
    ProjectNamespaceTargetUpdateParams,
    ProjectNamespaceTargetUpdateResult
  >("ProjectNamespaceTargetUpdate", {
    method: "POST",
    contentType: "json",
  });

  ProjectNamespaceTargetDeleteById = this.createAPI<
    ProjectNamespaceTargetDeleteByIdParams,
    ProjectNamespaceTargetDeleteByIdResult
  >("ProjectNamespaceTargetDeleteById", {
    method: "POST",
    contentType: "json",
  });

  ProjectTasks = this.createAPI<ProjectTasksParams, ProjectTasksResult>("ProjectTasks");
  ProjectTaskDetail = this.createAPI<ProjectTaskDetailParams, ProjectTaskDetailResult>(
    "ProjectTaskDetail"
  );
  ProjectTaskCreate = this.createAPI<ProjectTaskCreateParams, ProjectTaskCreateResult>(
    "ProjectTaskCreate",
    {
      method: "POST",
      contentType: "json",
    }
  );

  ProjectTaskSources = this.createAPI<ProjectTaskSourcesParams, ProjectTaskSourcesResult>(
    "ProjectTaskSources",
    {
      method: "POST",
      contentType: "json",
    }
  );

  ProjectTaskSourceDetail = this.createAPI<
    ProjectTaskSourceDetailParams,
    ProjectTaskSourceDetailResult
  >("ProjectTaskSourceDetail");

  ProjectTaskSourceDownload = this.createAPI<
    ProjectTaskSourceDownloadParams,
    ProjectTaskSourceDownloadResult
  >("ProjectTaskSourceDownload");

  ProjectTaskSourceUpdate = this.createAPI<
    ProjectTaskSourceUpdateParams,
    ProjectTaskSourceUpdateResult
  >("ProjectTaskSourceUpdate", {
    method: "POST",
    contentType: "json",
  });

  ProjectTaskSourceAdd = this.createAPI<ProjectTaskSourceAddParams, ProjectTaskSourceAddResult>(
    "ProjectTaskSourceAdd",
    {
      method: "POST",
      contentType: "json",
    }
  );

  ProjectTaskSourceDeleteByKeys = this.createAPI<
    ProjectTaskSourceDeleteByKeysParams,
    ProjectTaskSourceDeleteByKeysResult
  >("ProjectTaskSourceDeleteByKeys", {
    method: "POST",
    contentType: "json",
  });

  ProjectTaskSourceDeleteByIds = this.createAPI<
    ProjectTaskSourceDeleteByIdsParams,
    ProjectTaskSourceDeleteByIdsResult
  >("ProjectTaskSourceDeleteByIds", {
    method: "POST",
    contentType: "json",
  });

  ProjectTaskTargets = this.createAPI<ProjectTaskTargetsParams, ProjectTaskTargetsResult>(
    "ProjectTaskTargets"
  );

  ProjectTaskTargetUpdate = this.createAPI<
    ProjectTaskTargetUpdateParams,
    ProjectTaskTargetUpdateResult
  >("ProjectTaskTargetUpdate", {
    method: "POST",
    contentType: "json",
  });

  ProjectTaskTargetDownload = this.createAPI<
    ProjectTaskTargetDownloadParams,
    ProjectTaskTargetDownloadResult
  >("ProjectTaskTargetDownload");

  ProjectTaskTargetDeleteById = this.createAPI<
    ProjectTaskTargetDeleteByIdParams,
    ProjectTaskTargetDeleteByIdResult
  >("ProjectTaskTargetDeleteById", {
    method: "POST",
    contentType: "json",
  });

  ProjectTerms = this.createAPI<ProjectTermsParams, ProjectTermsResult>("ProjectTerms");

  ProjectTermDetail = this.createAPI<ProjectTermDetailParams, ProjectTermDetailResult>(
    "ProjectTermDetail"
  );

  ProjectTermTargetAdd = this.createAPI<ProjectTermTargetAddParams, ProjectTermTargetAddResult>(
    "ProjectTermTargetAdd",
    {
      method: "POST",
      contentType: "json",
    }
  );

  ProjectTermTargetUpdate = this.createAPI<
    ProjectTermTargetUpdateParams,
    ProjectTermTargetUpdateResult
  >("ProjectTermTargetUpdate", {
    method: "POST",
    contentType: "json",
  });

  ProjectTermTargetDelete = this.createAPI<
    ProjectTermTargetDeleteParams,
    ProjectTermTargetDeleteResult
  >("ProjectTermTargetDelete", {
    method: "POST",
    contentType: "json",
  });

  ProjectTermSourceAdd = this.createAPI<ProjectTermSourceAddParams, ProjectTermSourceAddResult>(
    "ProjectTermSourceAdd",
    {
      method: "POST",
      contentType: "json",
    }
  );

  ProjectTermSourceUpdate = this.createAPI<
    ProjectTermSourceUpdateParams,
    ProjectTermSourceUpdateResult
  >("ProjectTermSourceUpdate", {
    method: "POST",
    contentType: "json",
  });

  ProjectTermSourceDelete = this.createAPI<
    ProjectTermSourceDeleteParams,
    ProjectTermSourceDeleteResult
  >("ProjectTermSourceDelete", {
    method: "POST",
    contentType: "json",
  });

  ProjectDistributions = this.createAPI<ProjectDistributionsParams, ProjectDistributionsResult>(
    "ProjectDistributions"
  );
  ProjectDistributionsRelease = this.createAPI<
    ProjectDistributionsReleaseParams,
    ProjectDistributionsReleaseResult
  >("ProjectDistributionsRelease", {
    method: "POST",
    contentType: "json",
  });
}

export const defaultService = new i18nOpenapiService();
