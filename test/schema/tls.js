import Ajv from "ajv";
const ajv = new Ajv();

const baseResponseSchema = {
  type: "object",
  properties: {},
};

const getSchema = (target) => {
  return {
    ...baseResponseSchema,
    properties: {
      ...target,
    },
  };
};

const projectSchema = {
  ProjectName: {
    type: "string",
  },
  ProjectId: {
    type: "string",
  },
  Description: {
    type: ["string", "null"],
  },
  InnerNetDomain: {
    type: ["string", "null"],
  },
  CreateTime: {
    type: "string",
  },
  TopicCount: {
    type: ["number", "null"],
  },
};

export const projectValidate = {
  create: ajv.compile(
    getSchema({
      ProjectId: {
        type: "string",
      },
    })
  ),
  detail: ajv.compile(
    getSchema({
      ...projectSchema,
    })
  ),

  modify: ajv.compile(getSchema(null)),

  delete: ajv.compile(getSchema(null)),

  list: ajv.compile(
    getSchema({
      Total: {
        type: "number",
      },
      Projects: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...projectSchema,
          },
        },
      },
    })
  ),
};

const topicSchema = {
  CreateTime: {
    type: "string",
  },
  Description: {
    type: "string",
  },
  ModifyTime: {
    type: "string",
  },
  ProjectId: {
    type: "string",
  },
  ShardCount: {
    type: "number",
  },
  TopicId: {
    type: "string",
  },
  TopicName: {
    type: "string",
  },
  Ttl: {
    type: "number",
  },
};

export const topicValidate = {
  create: ajv.compile(
    getSchema({
      TopicId: {
        type: "string",
      },
    })
  ),

  detail: ajv.compile(
    getSchema({
      ...topicSchema,
    })
  ),

  modify: ajv.compile(getSchema(null)),
  delete: ajv.compile(getSchema(null)),
  list: ajv.compile(
    getSchema({
      Total: {
        type: "number",
      },
      Topics: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...topicSchema,
          },
        },
      },
    })
  ),
};

export const indexValidate = {
  create: ajv.compile(
    getSchema({
      TopicId: {
        type: "string",
      },
    })
  ),
  detail: ajv.compile(
    getSchema({
      CreateTime: {
        type: "string",
      },
      FullText: {
        type: ["null", "object"],
        properties: {
          CaseSensitive: {
            type: "boolean",
          },
          Delimiter: {
            type: "string",
          },
          IncludeChinese: {
            type: "boolean",
          },
        },
      },
      KeyValue: {
        type: ["null", "array"],
        items: {
          type: "object",
          properties: {
            Key: {
              type: "string",
            },
            Value: {
              type: "object",
              properties: {
                CaseSensitive: {
                  type: "boolean",
                },
                Delimiter: {
                  type: "string",
                },
                IncludeChinese: {
                  type: "boolean",
                },
                SqlFlag: {
                  type: "boolean",
                },
                ValueType: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      ModifyTime: {
        type: "string",
      },
      TopicId: {
        type: "string",
      },
    })
  ),
  modify: ajv.compile(getSchema(null)),
  delete: ajv.compile(getSchema(null)),
};

export const logsValidate = {
  search: ajv.compile(
    getSchema({
      Analysis: {
        type: "boolean",
      },
      AnalysisResult: {
        type: ["null", "object"],
        properties: {
          Data: {
            type: ["null", "array"],
            items: {
              type: "object",
            },
          },
          Schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          Type: {
            type: "object",
          },
        },
      },
      Context: {
        type: "string",
      },
      Count: {
        type: "number",
      },
      HighLight: {
        type: "array",
        items: {
          type: "string",
        },
      },
      HitCount: {
        type: "number",
      },
      Limit: {
        type: "number",
      },
      ListOver: {
        type: "boolean",
      },
      Logs: {
        type: "array",
        items: {
          type: "object",
        },
      },
      ResultStatus: {
        type: "string",
      },
    })
  ),
  upload: ajv.compile({
    type: "string",
  }),
};

export const shardsValidate = {
  list: ajv.compile(
    getSchema({
      Total: {
        type: "number",
      },
      Shards: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ExclusiveEndKey: {
              type: "string",
            },
            InclusiveBeginKey: {
              type: "string",
            },
            ModifyTime: {
              type: "string",
            },
            ShardId: {
              type: "number",
            },
            Status: {
              type: "string",
            },
            TopicId: {
              type: "string",
            },
          },
        },
      },
    })
  ),
};

const kubernetsRule = {
  ExcludePodLabelRegex: {
    type: "object",
  },
  IncludePodLabelRegex: {
    type: "object",
  },
  LabelTag: {
    type: "object",
  },
  NamespaceNameRegex: {
    type: "string",
  },
  PodNameRegex: {
    type: "string",
  },
  WorkloadNameRegex: {
    type: "string",
  },
  WorkloadType: {
    type: "string",
  },
};

const containerRule = {
  ContainerNameRegex: {
    type: "string",
  },
  EnvTag: {
    type: "object",
  },
  ExcludeContainerEnvRegex: {
    type: "object",
  },
  ExcludeContainerLabelRegex: {
    type: "object",
  },
  IncludeContainerEnvRegex: {
    type: "object",
  },
  IncludeContainerLabelRegex: {
    type: "object",
  },
  KubernetesRule: {
    type: "object",
    properties: {
      ...kubernetsRule,
    },
  },
  Stream: {
    type: "string",
  },
};

const excludePath = {
  Type: {
    type: "string",
  },
  Value: {
    type: "string",
  },
};

const filterKeyRegex = {
  Key: {
    type: "string",
  },
  Regex: {
    type: "string",
  },
};

const extractRule = {
  BeginRegex: {
    type: "string",
  },
  Delimiter: {
    type: "string",
  },
  FilterKeyRegex: {
    type: "array",
    items: {
      type: "object",
      properties: {
        ...filterKeyRegex,
      },
    },
  },
  Keys: {
    type: "array",
    items: {
      type: "string",
    },
  },
  LogRegex: {
    type: "string",
  },
  TimeFormat: {
    type: "string",
  },
  TimeKey: {
    type: "string",
  },
  UnMatchLogKey: {
    type: "string",
  },
  UnMatchUpLoadSwitch: {
    type: "boolean",
  },
};

const ruleInfo = {
  ContainerRule: {
    type: "object",
    properties: {
      ...containerRule,
    },
  },
  CreateTime: {
    type: "string",
  },
  ExcludePaths: {
    type: "array",
    items: {
      type: "object",
      properties: {
        ...excludePath,
      },
    },
  },
  ExtractRule: {
    type: "object",
    properties: {
      ...extractRule,
    },
  },
  InputType: {
    type: "number",
  },
  LogSample: {
    type: "string",
  },
  LogType: {
    type: "string",
  },
  ModifyTime: {
    type: "string",
  },
  Paths: {
    type: "array",
    items: {
      type: "string",
    },
  },
  RuleId: {
    type: "string",
  },
  RuleName: {
    type: "string",
  },
  TopicId: {
    type: "string",
  },
  TopicName: {
    type: "string",
  },
  UserDefineRule: {
    type: ["string", "object"],
  },
};

const hostGroupInfo = {
  AbnormalHeartbeatStatusCount: {
    type: "number",
  },
  AgentLatestVersion: {
    type: "string",
  },
  AutoUpdate: {
    type: "boolean",
  },
  CreateTime: {
    type: "string",
  },
  HostCount: {
    type: "number",
  },
  HostGroupId: {
    type: "string",
  },
  HostGroupName: {
    type: "string",
  },
  HostGroupType: {
    type: "string",
  },
  HostIdentifier: {
    type: "string",
  },
  ModifyTime: {
    type: "string",
  },
  NormalHeartbeatStatusCount: {
    type: "number",
  },
  RuleCount: {
    type: "number",
  },
  UpdateEndTime: {
    type: "string",
  },
  UpdateStartTime: {
    type: "string",
  },
};

export const rulesValidate = {
  create: ajv.compile(
    getSchema({
      RuleId: {
        type: "string",
      },
    })
  ),

  detail: ajv.compile(
    getSchema({
      HostGroupInfos: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...hostGroupInfo,
          },
        },
      },
      ProjectId: {
        type: "string",
      },
      ProjectName: {
        type: "string",
      },
      RuleInfo: {
        type: "object",
        properties: {
          ...ruleInfo,
        },
      },
      TopicId: {
        type: "string",
      },
      TopicName: {
        type: "string",
      },
    })
  ),

  modify: ajv.compile(getSchema(null)),

  delete: ajv.compile(getSchema(null)),

  list: ajv.compile(
    getSchema({
      Total: {
        type: "number",
      },
      RuleInfos: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...ruleInfo,
          },
        },
      },
    })
  ),
};

const hostInfo = {
  HeartbeatStatus: {
    type: "number",
  },
  Ip: {
    type: "string",
  },
  LogCollectorVersion: {
    type: "string",
  },
};

const hostGroupHostsRulesInfo = {
  HostGroupInfo: {
    type: "object",
    properties: {
      ...hostGroupInfo,
    },
  },
  HostInfos: {
    type: "array",
    items: {
      type: "object",
      properties: {
        ...hostInfo,
      },
    },
  },
  RuleInfos: {
    type: "array",
    items: {
      type: "object",
      properties: {
        ...ruleInfo,
      },
    },
  },
};

export const hostGroupValidate = {
  create: ajv.compile(
    getSchema({
      HostGroupId: {
        type: "string",
      },
    })
  ),
  detail: ajv.compile(
    getSchema({
      HostGroupHostsRulesInfo: {
        type: "object",
        properties: {
          ...hostGroupHostsRulesInfo,
        },
      },
    })
  ),

  modify: ajv.compile(getSchema(null)),
  delete: ajv.compile(getSchema(null)),
  list: ajv.compile(
    getSchema({
      Total: {
        type: "number",
      },
      HostGroupHostsRulesInfos: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...hostGroupHostsRulesInfo,
          },
        },
      },
    })
  ),

  ruleList: ajv.compile(
    getSchema({
      Total: {
        type: "number",
      },
      RuleInfos: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...ruleInfo,
          },
        },
      },
    })
  ),
};

export const ruleHostGroupValidate = {
  bind: ajv.compile(getSchema(null)),
  unbound: ajv.compile(getSchema(null)),
};

const notifyGroupReceiverSchema = {
  EndTime: {
    type: "string",
  },
  ReceiverChannels: {
    type: "array",
    items: {
      type: "string",
    },
  },
  ReceiverNames: {
    type: "array",
    items: {
      type: "string",
    },
  },
  ReceiverType: {
    type: "string",
  },
  StartTime: {
    type: "string",
  },
};

const notifyGroupInfoSechema = {
  AlarmNotifyGroupId: {
    type: "string",
  },
  AlarmNotifyGroupName: {
    type: "string",
  },
  CreateTime: {
    type: "string",
  },
  ModifyTime: {
    type: "string",
  },
  NotifyType: {
    type: "array",
    items: {
      type: "string",
    },
  },
  Receivers: {
    type: "array",
    items: {
      type: "object",
      properties: {
        ...notifyGroupReceiverSchema,
      },
    },
  },
};

const queryRequestSchema = {
  EndTimeOffset: {
    type: "number",
  },
  Number: {
    type: "number",
  },
  Query: {
    type: "string",
  },
  StartTimeOffset: {
    type: "number",
  },
  TopicId: {
    type: "string",
  },
  TopicName: {
    type: "string",
  },
};

const requestCycleSchema = {
  Time: {
    type: "number",
  },
  Type: {
    type: "string",
  },
};

const alarmSchema = {
  AlarmId: {
    type: "string",
  },
  AlarmName: {
    type: "string",
  },
  AlarmNotifyGroup: {
    type: "array",
    items: {
      type: "object",
      properties: {
        ...notifyGroupInfoSechema,
      },
    },
  },
  AlarmPeriod: {
    type: "number",
  },
  Condition: {
    type: "string",
  },
  CreateTime: {
    type: "string",
  },
  ModifyTime: {
    type: "string",
  },
  ProjectId: {
    type: "string",
  },
  QueryRequest: {
    type: "array",
    items: {
      type: "object",
      properties: {
        ...queryRequestSchema,
      },
    },
  },
  RequestCycle: {
    type: "object",
    properties: {
      ...requestCycleSchema,
    },
  },
  Status: {
    type: "boolean",
  },
  TriggerPeriod: {
    type: "number",
  },
  UserDefineMsg: {
    type: ["string", "object"],
  },
};

export const alarmValidate = {
  create: ajv.compile(
    getSchema({
      AlarmId: {
        type: "string",
      },
    })
  ),
  createNotifyGroup: ajv.compile(
    getSchema({
      AlarmNotifyGroupId: {
        type: "string",
      },
    })
  ),
  modify: ajv.compile(getSchema(null)),
  modifyNotifyGroup: ajv.compile(getSchema(null)),

  list: ajv.compile(
    getSchema({
      Total: {
        type: "number",
      },
      Alarms: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...alarmSchema,
          },
        },
      },
    })
  ),

  notifyGroupList: ajv.compile(
    getSchema({
      Total: {
        type: "number",
      },
      AlarmNotifyGroups: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...notifyGroupInfoSechema,
          },
        },
      },
    })
  ),

  delete: ajv.compile(getSchema(null)),
  deleteNotifyGroup: ajv.compile(getSchema(null)),
};
