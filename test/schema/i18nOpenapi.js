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