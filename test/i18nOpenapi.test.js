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
} from "./schema/i18nOpenapi";

const i18nOpenapiService = i18nOpenapi.defaultService;

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
