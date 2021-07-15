import { i18nOpenapi } from "../lib";
import {
  validateProjects,
  validateProjectDetail,
  validateProjectUsers,
  validateProjectUserRole,
  validateProjectNamespaces,
  validateProjectNamespaceDetail,
  validateProjectNamespaceCreate,
  validateProjectNamespaceSources,
  validateProjectNamespaceSourceDetail,
  validateProjectNamespaceSourceUpdate,
  validateProjectNamespaceSourceAdd,
  validateProjectNamespaceSourceDeleteByKeys,
  validateProjectNamespaceSourceDeleteByIds,
  validateProjectNamespaceTargets,
  validateProjectNamespaceTargetUpdate,
  validateProjectNamespaceTargetDeleteById,
  validateProjectTasks,
  validateProjectTaskDetail,
  validateProjectTaskCreate,
  validateProjectTaskSources,
  validateProjectTaskSourceDetail,
  validateProjectTaskSourceUpdate,
  validateProjectTaskSourceAdd,
  validateProjectTaskSourceDeleteByKeys,
  validateProjectTaskSourceDeleteByIds,
  validateProjectTaskTargets,
  validateProjectTaskTargetUpdate,
  validateProjectTaskTargetDeleteById,
  validateProjectTerms,
  validateProjectTermDetail,
  validateProjectTermTargetAdd,
  validateProjectTermTargetUpdate,
  validateProjectTermTargetDelete,
  validateProjectTermSourceAdd,
  validateProjectTermSourceUpdate,
  validateProjectTermSourceDelete,
  validateProjectDistributions,
  validateProjectDistributionsRelease,
} from "./schema/i18nOpenapi";

const i18nOpenapiService = i18nOpenapi.defaultService;

process.env.VOLC_HOST && i18nOpenapiService.setHost(process.env.VOLC_HOST);

test("i18nOpenapi:Projects", async () => {
  const response = await i18nOpenapiService.Projects();
  const validateResult = validateProjects(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectDetail", async () => {
  const response = await i18nOpenapiService.ProjectDetail({
    projectId: 3546,
  });
  const validateResult = validateProjectDetail(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectUsers", async () => {
  const response = await i18nOpenapiService.ProjectUsers({
    projectId: 3546,
  });
  const validateResult = validateProjectUsers(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectUserRole", async () => {
  const response = await i18nOpenapiService.ProjectUserRole({
    projectId: 3546,
    userId: 14193,
  });
  const validateResult = validateProjectUserRole(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaces", async () => {
  const response = await i18nOpenapiService.ProjectNamespaces({
    projectId: 3546,
  });
  const validateResult = validateProjectNamespaces(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceDetail", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceDetail({
    projectId: 3546,
    namespaceId: 37848,
  });
  const validateResult = validateProjectNamespaceDetail(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceCreate", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceCreate({
    projectId: 3546,
    name: `创建空间_来自node SDK 单元测试${Date.now()}`,
    description: "我是描述",
  });
  const validateResult = validateProjectNamespaceCreate(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceSources", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceSources({
    projectId: 3546,
    namespaceId: 37848,
  });
  const validateResult = validateProjectNamespaceSources(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceSourceDetail", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceSourceDetail({
    projectId: 3546,
    namespaceId: 37848,
    sourceId: 6610441,
  });
  const validateResult = validateProjectNamespaceSourceDetail(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceSourceUpdate", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceSourceUpdate({
    projectId: 3546,
    sourceId: 6610468,
    content: "我是api更新源文案112233 1\u000b\u000b\u000b2",
    namespaceId: 37848,
    lengthLimit: 99,
    commentary: "我是api 更新的注释",
  });
  const validateResult = validateProjectNamespaceSourceUpdate(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceSourceAdd", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceSourceAdd({
    projectId: 3546,
    namespaceId: 37848,
    texts: [
      {
        key: `sdk add text${Date.now()}`,
        content: "adk add test text",
        commentary: "我是sdk 单测注释",
        lengthLimit: 100,
      },
      {
        key: `sdk add text plural ${Date.now()}`,
        content: "adk add test text plural",
        commentary: "我是sdk 单测注释",
        lengthLimit: 100,
        extra: {
          one: "one",
          other: "other",
        },
      },
    ],
  });
  const validateResult = validateProjectNamespaceSourceAdd(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceSourceDeleteByKeys", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceSourceDeleteByKeys({
    projectId: 3546,
    namespaceId: 37848,
    textKeys: ["api_add", "api_add_plural"],
  });
  const validateResult = validateProjectNamespaceSourceDeleteByKeys(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceSourceDeleteByIds", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceSourceDeleteByIds({
    projectId: 3546,
    namespaceId: 37848,
    textIds: [6610504, 6610503],
  });
  const validateResult = validateProjectNamespaceSourceDeleteByIds(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceTargets", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceTargets({
    projectId: 3546,
    namespaceId: 37848,
    limit: 2,
    locale: "en",
  });

  const validateResult = validateProjectNamespaceTargets(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceTargetUpdate", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceTargetUpdate({
    projectId: 3546,
    namespaceId: 37848,
    targets: [
      {
        key: "apiupdate",
        content: "我是api 更新的 翻译111",
        locale: "en",
      },
      {
        locale: "en",
        key: "plural",
        one: "我是个api 更新的 one1",
        other: "我是个api 更新的 other1",
      },
    ],
  });

  const validateResult = validateProjectNamespaceTargetUpdate(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceTargetDeleteById", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceTargetDeleteById({
    projectId: 3546,
    namespaceId: 37848,
    "targetTextId": 33039439
  });

  const validateResult = validateProjectNamespaceTargetDeleteById(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTasks", async () => {
  const response = await i18nOpenapiService.ProjectTasks({
    projectId: 3546,
  });

  const validateResult = validateProjectTasks(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskDetail", async () => {
  const response = await i18nOpenapiService.ProjectTaskDetail({
    projectId: 3546,
    taskId: 17348437,
  });

  const validateResult = validateProjectTaskDetail(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskCreate", async () => {
  const response = await i18nOpenapiService.ProjectTaskCreate({
    projectId: 3546,
    name: `sdk 单测创建的任务${Date.now()}`,
    syncNamespaces: [37848],
  });

  const validateResult = validateProjectTaskCreate(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskSources", async () => {
  const response = await i18nOpenapiService.ProjectTaskSources({
    projectId: 3546,
    taskId: 17348437,
  });

  const validateResult = validateProjectTaskSources(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskSourceDetail", async () => {
  const response = await i18nOpenapiService.ProjectTaskSourceDetail({
    projectId: 3546,
    taskId: 17348437,
    sourceId: 6610442,
  });

  const validateResult = validateProjectTaskSourceDetail(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskSourceUpdate", async () => {
  const response = await i18nOpenapiService.ProjectTaskSourceUpdate({
    projectId: 3546,
    taskId: 17348437,
    content: "我是api更新源文案 1\u000b\u000b\u000b2",
    commentary: "我是api更新任务 注释111",
    lengthLimit: 100,
    sourceId: 6610442,
  });

  const validateResult = validateProjectTaskSourceUpdate(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskSourceAdd", async () => {
  const response = await i18nOpenapiService.ProjectTaskSourceAdd({
    projectId: 3546,
    taskId: 17348437,
    texts: [
      {
        key: `sdk add text for task${Date.now()}`,
        content: "adk add test text",
        commentary: "我是sdk 单测注释",
        lengthLimit: 100,
      },
      {
        key: `sdk add text plural for ${Date.now()}`,
        content: "adk add test text plural",
        commentary: "我是sdk 单测注释",
        lengthLimit: 100,
        extra: {
          one: "one",
          other: "other",
        },
      },
    ],
  });

  const validateResult = validateProjectTaskSourceAdd(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskSourceDeleteByKeys", async () => {
  const response = await i18nOpenapiService.ProjectTaskSourceDeleteByKeys({
    projectId: 3546,
    taskId: 17348437,
    textKeys: ["api_add", "api_add_plural"],
  });

  const validateResult = validateProjectTaskSourceDeleteByKeys(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskSourceDeleteByIds", async () => {
  const response = await i18nOpenapiService.ProjectTaskSourceDeleteByIds({
    projectId: 3546,
    taskId: 17348437,
    textKeys: ["api_add", "api_add_plural"],
  });

  const validateResult = validateProjectTaskSourceDeleteByIds(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskTargets", async () => {
  const response = await i18nOpenapiService.ProjectTaskTargets({
    projectId: 3546,
    taskId: 17348437,
    limit: 1,
    locale: "en",
  });

  const validateResult = validateProjectTaskTargets(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskTargetUpdate", async () => {
  const response = await i18nOpenapiService.ProjectTaskTargetUpdate({
    projectId: 3546,
    taskId: 17348437,
    targets: [
      {
        key: "tasksync",
        content: "i am api update",
        locale: "en",
      },
      {
        locale: "en",
        key: "plural",
        one: "i am api update one",
        other: "i am api update other",
      },
    ],
  });

  const validateResult = validateProjectTaskTargetUpdate(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskTargetDeleteById", async () => {
  const response = await i18nOpenapiService.ProjectTaskTargetDeleteById({
    projectId: 3546,
    taskId: 17348437,
    targetTextId: 33039704,
  });

  const validateResult = validateProjectTaskTargetDeleteById(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTerms", async () => {
  const response = await i18nOpenapiService.ProjectTerms({
    projectId: 3546,
    limit: 1,
  });

  const validateResult = validateProjectTerms(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTermDetail", async () => {
  const response = await i18nOpenapiService.ProjectTermDetail({
    projectId: 3546,
    sourceTermId: 62841,
  });

  const validateResult = validateProjectTermDetail(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTermTargetAdd", async () => {
  const response = await i18nOpenapiService.ProjectTermTargetAdd({
    projectId: 3546,
    sourceTermId: 62841,
    locale: "ar",
    term: "我是api 增加的印尼",
  });

  const validateResult = validateProjectTermTargetAdd(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTermTargetUpdate", async () => {
  const response = await i18nOpenapiService.ProjectTermTargetUpdate({
    projectId: 3546,
    sourceTermId: 62841,
    term: "我是api 更新的英语12",
    termId: 391224,
  });

  const validateResult = validateProjectTermTargetUpdate(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTermTargetDelete", async () => {
  const response = await i18nOpenapiService.ProjectTermTargetDelete({
    projectId: 3546,
    sourceTermId: 62842,
  });

  const validateResult = validateProjectTermTargetDelete(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTermSourceAdd", async () => {
  const response = await i18nOpenapiService.ProjectTermSourceAdd({
    projectId: 3546,
    description: "我的描述",
    term: `我是 sdk 单测新增${Date.now()}`,
  });

  const validateResult = validateProjectTermSourceAdd(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTermSourceUpdate", async () => {
  const response = await i18nOpenapiService.ProjectTermSourceUpdate({
    projectId: 3546,
    description: `我的sdk 更新描述 ${Date.now()}`,
    term: `我是api 更新的 sdk ${Date.now()}`,
    sourceTermId: 62843,
  });

  const validateResult = validateProjectTermSourceUpdate(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTermSourceDelete", async () => {
  const response = await i18nOpenapiService.ProjectTermSourceDelete({
    projectId: 3546,
    sourceTermIds: [627971],
  });

  const validateResult = validateProjectTermSourceDelete(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectDistributions", async () => {
  const response = await i18nOpenapiService.ProjectDistributions({
    projectId: 3546,
    namespaceId: 37848,
    locale: "en",
  });

  const validateResult = validateProjectDistributions(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectDistributionsRelease", async () => {
  const response = await i18nOpenapiService.ProjectDistributionsRelease({
    projectId: 3546,
    namespaceId: 37848,
    locale: "en",
    keys: ["tasksync", "plural_task", "plural", "apiupdate"],
  });

  const validateResult = validateProjectDistributionsRelease(response);
  expect(validateResult).toBe(true);
});
