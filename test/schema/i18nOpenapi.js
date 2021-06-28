import Ajv from "ajv";
const ajv = new Ajv();
import merge from "lodash.merge";

const baseReponseSchema = {
  type: "object",
  properties: {
    apiVersion: {
      type: "string",
    },
  },
  required: ["apiVersion"],
};

function createListSchema(resultSchema) {
  return merge({}, baseReponseSchema, {
    type: "object",
    properties: {
      ...resultSchema,
      total: {
        type: "number",
      },
      pagination: {
        type: "object",
        properties: {
          offset: {
            type: "number",
          },
          limit: {
            type: "number",
          },
        },
      },
    },
    required: ["data", "total", "pagination", "apiVersion"],
  });
}

function createDataSchema(resultSchema) {
  return merge({}, baseReponseSchema, {
    type: "object",
    properties: {
      data: resultSchema,
    },
    required: ["data", "apiVersion"],
  });
}

function createSuccessSchema() {
  return merge({}, baseReponseSchema, {
    type: "object",
    properties: {
      message: {
        type: "string",
      },
    },
    required: ["message", "apiVersion"],
  });
}

export const validateProjects = ajv.compile(
  createListSchema({
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          creatorId: {
            type: "number",
          },
          extra: {
            type: "object",
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
          sourceLocale: {
            type: "string",
          },
          targetLanguages: {
            type: "array",
          },
        },
      },
    },
  })
);

export const validateProjectDetail = ajv.compile(
  createDataSchema({
    type: "object",
    properties: {
      id: {
        type: "number",
      },
      name: {
        type: "string",
      },
      description: {
        type: "string",
      },
      creatorId: {
        type: "number",
      },
      extra: {
        type: "object",
      },
      createdAt: {
        type: "string",
      },
      updatedAt: {
        type: "string",
      },
      sourceLocale: {
        type: "string",
      },
      targetLanguages: {
        type: "array",
      },
    },
  })
);

export const validateProjectUsers = ajv.compile(
  createListSchema({
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          userId: {
            type: "number",
          },
          role: {
            type: "number",
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
        },
      },
    },
  })
);

export const validateProjectUserRole = ajv.compile(
  createDataSchema({
    type: "object",
    properties: {
      roleName: {
        type: "string",
      },
      role: {
        type: "number",
      },
    },
  })
);

export const validateProjectNamespaces = ajv.compile(
  createListSchema({
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          projectId: {
            type: "number",
          },
          projectName: {
            type: "string",
          },
          namespace: {
            type: "string",
          },
          description: {
            type: "string",
          },
          creatorId: {
            type: "number",
          },
          extra: {
            type: "object",
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
        },
      },
    },
  })
);

export const validateProjectNamespaceDetail = ajv.compile(
  createDataSchema({
    type: "object",
    properties: {
      id: {
        type: "number",
      },
      projectId: {
        type: "number",
      },
      projectName: {
        type: "string",
      },
      namespace: {
        type: "string",
      },
      description: {
        type: "string",
      },
      creatorId: {
        type: "number",
      },
      extra: {
        type: "object",
      },
      createdAt: {
        type: "string",
      },
      updatedAt: {
        type: "string",
      },
    },
  })
);

export const validateProjectNamespaceCreate = ajv.compile(createSuccessSchema());

export const validateProjectNamespaceSources = ajv.compile(
  createListSchema({
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          lang: {
            type: "string",
          },
          keyText: {
            type: "string",
          },
          content: {
            type: "string",
          },
          tagName: {
            type: "string",
          },
          lengthLimit: {
            type: "number",
          },
          distributeStatus: {
            type: "number",
          },
          translatedStatus: {
            type: "number",
          },
          textExtra: {
            type: ["null", "object"],
          },
          taskId: {
            type: "number",
          },
          approvalStatus: {
            type: "number",
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
          operatorId: {
            type: "number",
          },
          commentary: {
            type: "string",
          },
        },
      },
    },
  })
);

export const validateProjectNamespaceSourceDetail = ajv.compile(
  createDataSchema({
    type: "object",
    properties: {
      id: {
        type: "number",
      },
      lang: {
        type: "string",
      },
      keyText: {
        type: "string",
      },
      content: {
        type: "string",
      },
      tagName: {
        type: "string",
      },
      lengthLimit: {
        type: "number",
      },
      distributeStatus: {
        type: "number",
      },
      translatedStatus: {
        type: "number",
      },
      textExtra: {
        type: ["null", "object"],
      },
      taskId: {
        type: "number",
      },
      approvalStatus: {
        type: "number",
      },
      createdAt: {
        type: "string",
      },
      updatedAt: {
        type: "string",
      },
      operatorId: {
        type: "number",
      },
      commentary: {
        type: "string",
      },
    },
  })
);

export const validateProjectNamespaceSourceUpdate = ajv.compile(createSuccessSchema());
export const validateProjectNamespaceSourceAdd = ajv.compile(createSuccessSchema());
export const validateProjectNamespaceSourceDeleteByKeys = ajv.compile(createSuccessSchema());
export const validateProjectNamespaceSourceDeleteByIds = ajv.compile(createSuccessSchema());

export const validateProjectNamespaceTargets = ajv.compile(
  createListSchema({
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          sourceTextId: {
            type: "number",
          },
          namespaceId: {
            type: "number",
          },
          lang: {
            type: "string",
          },
          keyText: {
            type: "string",
          },
          content: {
            type: "string",
          },
          distributed: {
            type: "number",
          },
          tagName: {
            type: "string",
          },
          textExtra: {
            type: ["null", "object"],
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
          operatorId: {
            type: "number",
          },
        },
      },
    },
  })
);

export const validateProjectNamespaceTargetUpdate = ajv.compile(createSuccessSchema());
export const validateProjectNamespaceTargetDeleteById = ajv.compile(createSuccessSchema());

export const validateProjectTasks = ajv.compile(
  createListSchema({
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          taskId: {
            type: "number",
          },
          taskName: {
            type: "string",
          },
          syncNamespaces: {
            type: "array",
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
          creatorId: {
            type: "number",
          },
        },
      },
    },
  })
);

export const validateProjectTaskDetail = ajv.compile(
  createDataSchema({
    type: "object",
    properties: {
      taskId: {
        type: "number",
      },
      taskName: {
        type: "string",
      },
      syncNamespaces: {
        type: "array",
      },
      createdAt: {
        type: "string",
      },
      updatedAt: {
        type: "string",
      },
      creatorId: {
        type: "number",
      },
    },
  })
);

export const validateProjectTaskCreate = ajv.compile(
  createDataSchema({
    type: "object",
    properties: {
      taskId: {
        type: "number",
      },
    },
  })
);

export const validateProjectTaskSources = ajv.compile(
  createListSchema({
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          lang: {
            type: "string",
          },
          keyText: {
            type: "string",
          },
          content: {
            type: "string",
          },
          tagName: {
            type: "string",
          },
          lengthLimit: {
            type: "number",
          },
          distributeStatus: {
            type: "number",
          },
          translatedStatus: {
            type: "number",
          },
          textExtra: {
            type: ["null", "object"],
          },
          taskId: {
            type: "number",
          },
          approvalStatus: {
            type: "number",
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
          operatorId: {
            type: "number",
          },
          commentary: {
            type: "string",
          },
        },
      },
    },
  })
);

export const validateProjectTaskSourceDetail = ajv.compile(
  createDataSchema({
    type: "object",
    properties: {
      id: {
        type: "number",
      },
      lang: {
        type: "string",
      },
      keyText: {
        type: "string",
      },
      content: {
        type: "string",
      },
      tagName: {
        type: "string",
      },
      lengthLimit: {
        type: "number",
      },
      distributeStatus: {
        type: "number",
      },
      translatedStatus: {
        type: "number",
      },
      textExtra: {
        type: ["null", "object"],
      },
      taskId: {
        type: "number",
      },
      approvalStatus: {
        type: "number",
      },
      createdAt: {
        type: "string",
      },
      updatedAt: {
        type: "string",
      },
      operatorId: {
        type: "number",
      },
      commentary: {
        type: "string",
      },
    },
  })
);

export const validateProjectTaskSourceUpdate = ajv.compile(createSuccessSchema());
export const validateProjectTaskSourceAdd = ajv.compile(createSuccessSchema());
export const validateProjectTaskSourceDeleteByKeys = ajv.compile(createSuccessSchema());
export const validateProjectTaskSourceDeleteByIds = ajv.compile(createSuccessSchema());

export const validateProjectTaskTargets = ajv.compile(
  createListSchema({
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          sourceTextId: {
            type: "number",
          },
          lang: {
            type: "string",
          },
          keyText: {
            type: "string",
          },
          content: {
            type: "string",
          },
          tagName: {
            type: "string",
          },
          textExtra: {
            type: ["null", "object"],
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
          operatorId: {
            type: "number",
          },
        },
      },
    },
  })
);

export const validateProjectTaskTargetUpdate = ajv.compile(createSuccessSchema());
export const validateProjectTaskTargetDeleteById = ajv.compile(createSuccessSchema());

export const validateProjectTerms = ajv.compile(
  createListSchema({
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          locale: {
            type: "string",
          },
          term: {
            type: "string",
          },
          description: {
            type: "string",
          },
          isApplyAll: {
            type: "boolean",
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
          operatorId: {
            type: "number",
          },
          creatorId: {
            type: "number",
          },
          targetTerms: {
            type: "array",
          },
        },
      },
    },
  })
);

export const validateProjectTermDetail = ajv.compile(
  createDataSchema({
    type: "object",
    properties: {
      id: {
        type: "number",
      },
      locale: {
        type: "string",
      },
      term: {
        type: "string",
      },
      description: {
        type: "string",
      },
      isApplyAll: {
        type: "boolean",
      },
      createdAt: {
        type: "string",
      },
      updatedAt: {
        type: "string",
      },
      operatorId: {
        type: "number",
      },
      creatorId: {
        type: "number",
      },
      targetTerms: {
        type: "array",
      },
    },
  })
);

export const validateProjectTermTargetAdd = ajv.compile(createSuccessSchema());
export const validateProjectTermTargetUpdate = ajv.compile(createSuccessSchema());
export const validateProjectTermTargetDelete = ajv.compile(createSuccessSchema());
export const validateProjectTermSourceAdd = ajv.compile(
  createDataSchema({
    type: "object",
    properties: {
      termId: {
        type: "number",
      },
    },
  })
  );

export const validateProjectTermSourceUpdate = ajv.compile(createSuccessSchema());
export const validateProjectTermSourceDelete = ajv.compile(createSuccessSchema());

export const validateProjectDistributions = ajv.compile(
  createListSchema({
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          key: {
            type: "string",
          },
          sourceText: {
            type: "string",
          },
          newTranslateText: {
            type: "string",
          },
          oldTranslateText: {
            type: "string",
          },
          status: {
            type: "number",
          },
          targetTextId: {
            type: "number",
          },
          sourceTextId: {
            type: "number",
          },
          tagName: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
          operatorId: {
            type: "number",
          },
        },
      },
    },
  })
);

export const validateProjectDistributionsRelease = ajv.compile(createSuccessSchema());