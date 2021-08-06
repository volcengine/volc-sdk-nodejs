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

const commonProjectQuery = {
  projectId: 3622,
};

const commonNamespaceQuery = {
  namespaceId: 38157,
};

const commonTaskQuery = {
  taskId: 20282082,
};

const commonTermQuery = {
  sourceTermId: 62855,
};

test("i18nOpenapi:Projects", async () => {
  const response = await i18nOpenapiService.Projects();
  const validateResult = validateProjects(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectDetail", async () => {
  const response = await i18nOpenapiService.ProjectDetail({
    ...commonProjectQuery,
  });
  const validateResult = validateProjectDetail(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectUsers", async () => {
  const response = await i18nOpenapiService.ProjectUsers({
    ...commonProjectQuery,
  });
  const validateResult = validateProjectUsers(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectUserRole", async () => {
  const response = await i18nOpenapiService.ProjectUserRole({
    ...commonProjectQuery,
    userId: 1000840,
  });
  const validateResult = validateProjectUserRole(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaces", async () => {
  const response = await i18nOpenapiService.ProjectNamespaces({
    ...commonProjectQuery,
  });
  const validateResult = validateProjectNamespaces(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceDetail", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceDetail({
    ...commonProjectQuery,
    ...commonNamespaceQuery,
  });
  const validateResult = validateProjectNamespaceDetail(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceCreate", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceCreate({
    ...commonProjectQuery,
    name: `create_node_SDK_test${Date.now()}`,
    description: "我是描述",
  });
  const validateResult = validateProjectNamespaceCreate(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceSources", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceSources({
    ...commonProjectQuery,
    ...commonNamespaceQuery,
  });
  const validateResult = validateProjectNamespaceSources(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceSourceDetail", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceSourceDetail({
    ...commonProjectQuery,
    ...commonNamespaceQuery,
    sourceId: 6762260,
  });
  const validateResult = validateProjectNamespaceSourceDetail(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceSourceUpdate", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceSourceUpdate({
    ...commonProjectQuery,
    sourceId: 6762260,
    content: "i am api update 111 1\u000b\u000b\u000b2",
    ...commonNamespaceQuery,
    lengthLimit: 99,
    commentary: "我是api 更新的注释",
  });
  const validateResult = validateProjectNamespaceSourceUpdate(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceSourceAdd", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceSourceAdd({
    ...commonProjectQuery,
    ...commonNamespaceQuery,
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
    ...commonProjectQuery,
    ...commonNamespaceQuery,
    textKeys: ["api_add", "api_add_plural"],
  });
  const validateResult = validateProjectNamespaceSourceDeleteByKeys(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceSourceDeleteByIds", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceSourceDeleteByIds({
    ...commonProjectQuery,
    ...commonNamespaceQuery,
    textIds: [6610504, 6610503],
  });
  const validateResult = validateProjectNamespaceSourceDeleteByIds(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceTargets", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceTargets({
    ...commonProjectQuery,
    ...commonNamespaceQuery,
    limit: 2,
    locale: "en",
  });

  const validateResult = validateProjectNamespaceTargets(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceTargetUpdate", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceTargetUpdate({
    ...commonProjectQuery,
    ...commonNamespaceQuery,
    targets: [
      {
        key: "apiupdate",
        content: "i am api update 111",
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

  const validateResult = validateProjectNamespaceTargetUpdate(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectNamespaceTargetDeleteById", async () => {
  const response = await i18nOpenapiService.ProjectNamespaceTargetDeleteById({
    ...commonProjectQuery,
    ...commonNamespaceQuery,
    "targetTextId": 33039439
  });

  const validateResult = validateProjectNamespaceTargetDeleteById(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTasks", async () => {
  const response = await i18nOpenapiService.ProjectTasks({
    ...commonProjectQuery,
  });

  const validateResult = validateProjectTasks(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskDetail", async () => {
  const response = await i18nOpenapiService.ProjectTaskDetail({
    ...commonProjectQuery,
    ...commonTaskQuery,
  });

  const validateResult = validateProjectTaskDetail(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskCreate", async () => {
  const response = await i18nOpenapiService.ProjectTaskCreate({
    ...commonProjectQuery,
    name: `sdk 单测创建的任务${Date.now()}`,
    syncNamespaces: [commonNamespaceQuery.namespaceId],
  });

  const validateResult = validateProjectTaskCreate(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskSources", async () => {
  const response = await i18nOpenapiService.ProjectTaskSources({
    ...commonProjectQuery,
    ...commonTaskQuery,
  });

  const validateResult = validateProjectTaskSources(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskSourceDetail", async () => {
  const response = await i18nOpenapiService.ProjectTaskSourceDetail({
    ...commonProjectQuery,
    ...commonTaskQuery,
    sourceId: 6762263,
  });

  const validateResult = validateProjectTaskSourceDetail(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskSourceUpdate", async () => {
  const response = await i18nOpenapiService.ProjectTaskSourceUpdate({
    ...commonProjectQuery,
    ...commonTaskQuery,
    content: "我是api更新源文案 1\u000b\u000b\u000b2",
    commentary: "我是api更新任务 注释111",
    lengthLimit: 100,
    sourceId: 6762263,
  });

  const validateResult = validateProjectTaskSourceUpdate(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskSourceAdd", async () => {
  const response = await i18nOpenapiService.ProjectTaskSourceAdd({
    ...commonProjectQuery,
    ...commonTaskQuery,
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
    ...commonProjectQuery,
    ...commonTaskQuery,
    textKeys: ["api_add", "api_add_plural"],
  });

  const validateResult = validateProjectTaskSourceDeleteByKeys(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskSourceDeleteByIds", async () => {
  const response = await i18nOpenapiService.ProjectTaskSourceDeleteByIds({
    ...commonProjectQuery,
    ...commonTaskQuery,
    textKeys: ["api_add", "api_add_plural"],
  });

  const validateResult = validateProjectTaskSourceDeleteByIds(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskTargets", async () => {
  const response = await i18nOpenapiService.ProjectTaskTargets({
    ...commonProjectQuery,
    ...commonTaskQuery,
    limit: 1,
    locale: "en",
  });

  const validateResult = validateProjectTaskTargets(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTaskTargetUpdate", async () => {
  const response = await i18nOpenapiService.ProjectTaskTargetUpdate({
    ...commonProjectQuery,
    ...commonTaskQuery,
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
    ...commonProjectQuery,
    ...commonTaskQuery,
    targetTextId: 33039704,
  });

  const validateResult = validateProjectTaskTargetDeleteById(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTerms", async () => {
  const response = await i18nOpenapiService.ProjectTerms({
    ...commonProjectQuery,
    limit: 1,
  });

  const validateResult = validateProjectTerms(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTermDetail", async () => {
  const response = await i18nOpenapiService.ProjectTermDetail({
    ...commonProjectQuery,
    ...commonTermQuery,
  });

  const validateResult = validateProjectTermDetail(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTermTargetAdd", async () => {
  const response = await i18nOpenapiService.ProjectTermTargetAdd({
    ...commonProjectQuery,
    ...commonTermQuery,
    locale: "ar",
    term: "我是api 增加的印尼",
  });

  const validateResult = validateProjectTermTargetAdd(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTermTargetUpdate", async () => {
  const response = await i18nOpenapiService.ProjectTermTargetUpdate({
    ...commonProjectQuery,
    ...commonTermQuery,
    term: "我是api 更新的英语12",
    termId: 391224,
  });

  const validateResult = validateProjectTermTargetUpdate(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTermTargetDelete", async () => {
  const response = await i18nOpenapiService.ProjectTermTargetDelete({
    ...commonProjectQuery,
    sourceTermId: 62842,
  });

  const validateResult = validateProjectTermTargetDelete(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTermSourceAdd", async () => {
  const response = await i18nOpenapiService.ProjectTermSourceAdd({
    ...commonProjectQuery,
    description: "我的描述",
    term: `我是 sdk 单测新增${Date.now()}`,
  });

  const validateResult = validateProjectTermSourceAdd(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTermSourceUpdate", async () => {
  const response = await i18nOpenapiService.ProjectTermSourceUpdate({
    ...commonProjectQuery,
    description: `我的sdk 更新描述 ${Date.now()}`,
    term: `我是api 更新的 sdk ${Date.now()}`,
    sourceTermId: 62843,
  });

  const validateResult = validateProjectTermSourceUpdate(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectTermSourceDelete", async () => {
  const response = await i18nOpenapiService.ProjectTermSourceDelete({
    ...commonProjectQuery,
    sourceTermIds: [627971],
  });

  const validateResult = validateProjectTermSourceDelete(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectDistributions", async () => {
  const response = await i18nOpenapiService.ProjectDistributions({
    ...commonProjectQuery,
    ...commonNamespaceQuery,
    locale: "en",
  });

  const validateResult = validateProjectDistributions(response);
  expect(validateResult).toBe(true);
});

test("i18nOpenapi:ProjectDistributionsRelease", async () => {
  const response = await i18nOpenapiService.ProjectDistributionsRelease({
    ...commonProjectQuery,
    ...commonNamespaceQuery,
    locale: "en",
    keys: ["tasksync", "plural_task", "plural", "apiupdate"],
  });

  const validateResult = validateProjectDistributionsRelease(response);
  expect(validateResult).toBe(true);
});
