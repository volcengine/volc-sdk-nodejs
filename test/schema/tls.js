import Ajv from "ajv";
const ajv = new Ajv({ allowUnionTypes: true });

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
  consume: ajv.compile(baseResponseSchema),
};

export const hostGroupAutoUpdateValidate = {
  modify: ajv.compile(getSchema(null)),
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
  manualShardSplit: ajv.compile(
    getSchema({
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
            StopWriteTime: {
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

const traceSchema = {
  CreateTime: {
    type: "string",
  },
  DependencyTopicId: {
    type: "string",
  },
  DependencyTopicTopicName: {
    type: "string",
  },
  Description: {
    type: "string",
  },
  ProjectId: {
    type: "string",
  },
  ProjectName: {
    type: "string",
  },
  TraceInstanceId: {
    type: "string",
  },
  TraceInstanceName: {
    type: "string",
  },
  TraceInstanceStatus: {
    type: "string",
  },
  TraceTopicId: {
    type: "string",
  },
  TraceTopicName: {
    type: "string",
  },
};

export const traceValidate = {
  create: ajv.compile(
    getSchema({
      TraceInstanceId: {
        type: "string",
      },
    })
  ),
  detail: ajv.compile(
    getSchema({
      ...traceSchema,
    })
  ),

  modify: ajv.compile(getSchema(null)),

  delete: ajv.compile(getSchema(null)),

  list: ajv.compile(
    getSchema({
      Total: {
        type: "number",
      },
      TraceInstances: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...traceSchema,
          },
        },
      },
    })
  ),
};

export const describeTraceValidate = {
  describe: ajv.compile(
    getSchema({
      Trace: {
        type: "object",
      },
    })
  ),
};

export const searchTracesValidate = {
  search: ajv.compile(
    getSchema({
      Total: {
        type: "number",
      },
      TraceInfos: {
        type: "array",
        items: {
          type: "object",
          properties: {
            TraceId: {
              type: "string",
            },
            ServiceName: {
              type: "string",
            },
            OperationName: {
              type: "string",
            },
            Attributes: {
              type: "object",
            },
            StartTime: {
              type: "number",
            },
            EndTime: {
              type: "number",
            },
            Duration: {
              type: "number",
            },
            StatusCode: {
              type: "string",
            },
          },
        },
      },
    })
  ),
};

export const logContextValidate = {
  describe: ajv.compile(
    getSchema({
      LogContextInfos: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ___context_flow___: {
              type: "string",
            },
            __package_offset___: {
              type: "string",
            },
          },
          additionalProperties: true,
        },
      },
      PrevOver: {
        type: "boolean",
      },
      NextOver: {
        type: "boolean",
      },
    })
  ),
};

export const histogramV1Validate = {
  describe: ajv.compile(
    getSchema({
      Histogram: {
        type: "array",
        items: {
          type: "object",
          properties: {
            Count: {
              type: "number",
            },
            EndTime: {
              type: "number",
            },
            StartTime: {
              type: "number",
            },
            ResultStatus: {
              type: "string",
            },
          },
        },
      },
      ResultStatus: {
        type: "string",
      },
      TotalCount: {
        type: "number",
      },
    })
  ),
};

const shipperSchema = {
  ContentInfo: {
    type: "object",
    properties: {
      Format: {
        type: "string",
      },
      CsvInfo: {
        type: "object",
        properties: {
          Keys: {
            type: "array",
            items: {
              type: "string",
            },
          },
          Delimiter: {
            type: "string",
          },
          EscapeChar: {
            type: "string",
          },
          PrintHeader: {
            type: "boolean",
          },
          NonFieldContent: {
            type: "string",
          },
        },
      },
      JsonInfo: {
        type: "object",
        properties: {
          Keys: {
            type: "array",
            items: {
              type: "string",
            },
          },
          Enable: {
            type: "boolean",
          },
          Escape: {
            type: "boolean",
          },
        },
      },
    },
  },
  CreateTime: {
    type: "string",
  },
  DashboardId: {
    type: "string",
  },
  KafkaShipperInfo: {
    type: "object",
    properties: {
      EndTime: {
        type: "number",
      },
      Compress: {
        type: "string",
      },
      Instance: {
        type: "string",
      },
      StartTime: {
        type: "number",
      },
      KafkaTopic: {
        type: "string",
      },
    },
  },
  ModifyTime: {
    type: "string",
  },
  ProjectId: {
    type: "string",
  },
  ProjectName: {
    type: "string",
  },
  RoleTrn: {
    type: "string",
  },
  ShipperEndTime: {
    type: "number",
  },
  ShipperId: {
    type: "string",
  },
  ShipperName: {
    type: "string",
  },
  ShipperStartTime: {
    type: "number",
  },
  ShipperType: {
    type: "string",
  },
  Status: {
    type: "boolean",
  },
  TopicId: {
    type: "string",
  },
  TopicName: {
    type: "string",
  },
  TosShipperInfo: {
    type: "object",
    properties: {
      Bucket: {
        type: "string",
      },
      Prefix: {
        type: "string",
      },
      MaxSize: {
        type: "number",
      },
      Interval: {
        type: "number",
      },
      Compress: {
        type: "string",
      },
      PartitionFormat: {
        type: "string",
      },
    },
  },
};

export const shipperValidate = {
  delete: ajv.compile(getSchema(null)),
  modify: ajv.compile(baseResponseSchema),
  create: ajv.compile(
    getSchema({
      ShipperId: {
        type: "string",
      },
    })
  ),
  detail: ajv.compile(getSchema(shipperSchema)),
  list: ajv.compile(
    getSchema({
      Total: {
        type: "number",
      },
      Shippers: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...shipperSchema,
          },
        },
      },
    })
  ),
};

export const abnormalHostsValidate = {
  delete: ajv.compile(getSchema(null)),
};

const downloadTaskSchema = {
  Query: {
    type: "string",
  },
  TaskId: {
    type: "string",
  },
  EndTime: {
    type: "string",
  },
  LogSize: {
    type: "number",
  },
  TopicId: {
    type: "string",
  },
  LogCount: {
    type: "number",
  },
  TaskName: {
    type: "string",
  },
  StartTime: {
    type: "string",
  },
  CreateTime: {
    type: "string",
  },
  DataFormat: {
    type: "string",
  },
  TaskStatus: {
    type: "string",
  },
  Compression: {
    type: "string",
  },
};

export const downloadTaskValidate = {
  cancel: ajv.compile(baseResponseSchema),
  create: ajv.compile(
    getSchema({
      TaskId: {
        type: "string",
      },
    })
  ),
  list: ajv.compile(
    getSchema({
      Total: {
        type: "number",
      },
      Tasks: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...downloadTaskSchema,
          },
        },
      },
    })
  ),
};

export const activeTlsAccountValidate = {
  active: ajv.compile(baseResponseSchema),
};

// DescribeDownloadUrl schema
const downloadUrlSchema = {
  DownloadUrl: {
    type: "string",
  },
};

export const downloadUrlValidate = {
  describe: ajv.compile(getSchema(downloadUrlSchema)),
};

export const accountValidate = {
  getStatus: ajv.compile(
    getSchema({
      ArchVersion: {
        type: "string",
      },
      Status: {
        type: "string",
      },
    })
  ),
};

const etlTaskDetailSchema = {
  TaskId: {
    type: "string",
  },
  Name: {
    type: "string",
  },
  Description: {
    type: ["string", "null"],
  },
  ProjectId: {
    type: "string",
  },
  ProjectName: {
    type: "string",
  },
  SourceTopicId: {
    type: "string",
  },
  SourceTopicName: {
    type: "string",
  },
  Script: {
    type: "string",
  },
  DSLType: {
    type: "string",
  },
  TaskType: {
    type: "string",
  },
  ETLStatus: {
    type: "string",
  },
  Enable: {
    type: "boolean",
  },
  CreateTime: {
    type: "string",
  },
  ModifyTime: {
    type: "string",
  },
  LastEnableTime: {
    type: ["string", "null"],
  },
  FromTime: {
    type: ["number", "null"],
  },
  ToTime: {
    type: ["number", "null"],
  },
  TargetResources: {
    type: "array",
    items: {
      type: "object",
      properties: {
        Alias: {
          type: ["string", "null"],
        },
        TopicId: {
          type: "string",
        },
        ProjectId: {
          type: "string",
        },
        ProjectName: {
          type: "string",
        },
        Region: {
          type: "string",
        },
        TopicName: {
          type: "string",
        },
        RoleTrn: {
          type: ["string", "null"],
        },
      },
    },
  },
};

const etlTaskListSchema = {
  TaskId: {
    type: "string",
  },
  TaskName: {
    type: "string",
  },
  ProjectId: {
    type: "string",
  },
  Description: {
    type: ["string", "null"],
  },
  Status: {
    type: "string",
  },
  CreateTime: {
    type: "string",
  },
  ModifyTime: {
    type: "string",
  },
  TaskConfig: {
    type: ["object", "null"],
  },
  ErrorMessage: {
    type: ["string", "null"],
  },
};

export const etlTaskValidate = {
  create: ajv.compile(
    getSchema({
      TaskId: {
        type: "string",
      },
    })
  ),
  detail: ajv.compile(
    getSchema({
      ...etlTaskDetailSchema,
    })
  ),
  list: ajv.compile(
    getSchema({
      Tasks: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...etlTaskListSchema,
          },
        },
      },
      Total: {
        type: "number",
      },
    })
  ),
  modifyStatus: ajv.compile(baseResponseSchema),
};

export const etlValidate = {
  delete: ajv.compile(baseResponseSchema),
  modify: ajv.compile(baseResponseSchema),
};

const importTaskSchema = {
  TaskId: {
    type: "string",
  },
  TaskName: {
    type: "string",
  },
  Status: {
    type: "string",
  },
  CreateTime: {
    type: "string",
  },
  UpdateTime: {
    type: "string",
  },
  StartTime: {
    type: ["string", "null"],
  },
  EndTime: {
    type: ["string", "null"],
  },
  Progress: {
    type: "number",
  },
  TaskConfig: {
    type: "object",
    properties: {
      ProjectId: {
        type: "string",
      },
      TopicId: {
        type: "string",
      },
      SourceConfig: {
        type: "object",
        properties: {
          Type: {
            type: "string",
          },
          Config: {
            type: "object",
          },
        },
      },
      ScheduleConfig: {
        type: ["object", "null"],
        properties: {
          Type: {
            type: "string",
          },
          Config: {
            type: "object",
          },
        },
      },
    },
  },
  Statistics: {
    type: ["object", "null"],
    properties: {
      ImportedCount: {
        type: "number",
      },
      FailedCount: {
        type: "number",
      },
      TotalCount: {
        type: "number",
      },
    },
  },
  ErrorInfo: {
    type: ["object", "null"],
    properties: {
      ErrorCode: {
        type: "string",
      },
      ErrorMessage: {
        type: "string",
      },
    },
  },
};

export const importTaskValidate = {
  create: ajv.compile(
    getSchema({
      TaskId: {
        type: "string",
      },
    })
  ),
  detail: ajv.compile(
    getSchema({
      TaskInfo: {
        type: "object",
        properties: {
          ...importTaskSchema,
        },
      },
    })
  ),
};

const scheduleSqlTaskDetailSchema = {
  TaskId: {
    type: "string",
  },
  TaskName: {
    type: "string",
  },
  Description: {
    type: ["string", "null"],
  },
  SourceProjectID: {
    type: "string",
  },
  SourceProjectName: {
    type: "string",
  },
  SourceTopicID: {
    type: "string",
  },
  SourceTopicName: {
    type: "string",
  },
  DestRegion: {
    type: "string",
  },
  DestProjectID: {
    type: "string",
  },
  DestTopicName: {
    type: "string",
  },
  DestTopicID: {
    type: "string",
  },
  Status: {
    type: "number",
  },
  ProcessStartTime: {
    type: ["number", "null"],
  },
  ProcessEndTime: {
    type: ["number", "null"],
  },
  RequestCycle: {
    type: "object",
    properties: {
      ...requestCycleSchema,
    },
  },
  ProcessTimeWindow: {
    type: "string",
  },
  Query: {
    type: "string",
  },
  ProcessSqlDelay: {
    type: ["number", "null"],
  },
  MaxRetryTimes: {
    type: "number",
  },
  MaxTimeout: {
    type: "number",
  },
  TaskType: {
    type: "number",
  },
  CreateTimeStamp: {
    type: "number",
  },
  ModifyTimeStamp: {
    type: "number",
  },
};

// ScheduleSqlTask validators (Create/Delete/DescribeTask/DescribeTasks/ModifyStatus only)
export const scheduleSqlTaskValidate = {
  create: ajv.compile(
    getSchema({
      TaskId: {
        type: "string",
      },
    })
  ),
  delete: ajv.compile(baseResponseSchema),
  detail: ajv.compile(
    getSchema({
      ...scheduleSqlTaskDetailSchema,
    })
  ),
  list: ajv.compile(
    getSchema({
      Total: {
        type: "number",
      },
      Tasks: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...scheduleSqlTaskDetailSchema,
          },
        },
      },
    })
  ),
  modifyStatus: ajv.compile(baseResponseSchema),
};

const webhookContentTemplateSchema = {
  Content: {
    type: "string",
  },
};

const emailContentTemplateSchema = {
  Content: {
    type: "string",
  },
  Subject: {
    type: "string",
  },
  Locale: {
    type: "string",
  },
};

const vmsContentTemplateSchema = {
  Content: {
    type: "string",
  },
  Locale: {
    type: "string",
  },
};

const smsContentTemplateSchema = {
  Content: {
    type: "string",
  },
  Locale: {
    type: "string",
  },
};

const larkContentTemplateSchema = {
  Content: {
    type: "string",
  },
  Title: {
    type: "string",
  },
  Locale: {
    type: "string",
  },
};

const dingTalkContentTemplateSchema = {
  Content: {
    type: "string",
  },
  Title: {
    type: "string",
  },
  Locale: {
    type: "string",
  },
};

const weChatContentTemplateSchema = {
  Content: {
    type: "string",
  },
  Title: {
    type: "string",
  },
  Locale: {
    type: "string",
  },
};

const alarmContentTemplateItemSchema = {
  AlarmContentTemplateName: {
    type: "string",
  },
  AlarmContentTemplateId: {
    type: "string",
  },
  Webhook: {
    type: "object",
    properties: {
      ...webhookContentTemplateSchema,
    },
  },
  Email: {
    type: "object",
    properties: {
      ...emailContentTemplateSchema,
    },
  },
  Vms: {
    type: "object",
    properties: {
      ...vmsContentTemplateSchema,
    },
  },
  Sms: {
    type: "object",
    properties: {
      ...smsContentTemplateSchema,
    },
  },
  Lark: {
    type: "object",
    properties: {
      ...larkContentTemplateSchema,
    },
  },
  DingTalk: {
    type: "object",
    properties: {
      ...dingTalkContentTemplateSchema,
    },
  },
  WeChat: {
    type: "object",
    properties: {
      ...weChatContentTemplateSchema,
    },
  },
  CreateTime: {
    type: "string",
  },
  ModifyTime: {
    type: "string",
  },
  IsDefault: {
    type: "boolean",
  },
};

// AlarmContentTemplate validators for Create/Delete/Modify/List, based on alarmContentTemplateItemSchema and baseResponseSchema
export const alarmContentTemplateValidate = {
  create: ajv.compile(
    getSchema({
      AlarmContentTemplateId: {
        type: "string",
      },
    })
  ),
  delete: ajv.compile(baseResponseSchema),
  modify: ajv.compile(baseResponseSchema),
  list: ajv.compile(
    getSchema({
      Total: {
        type: "number",
      },
      AlarmContentTemplates: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...alarmContentTemplateItemSchema,
          },
        },
      },
    })
  ),
};

const alarmWebhookHeaderSchema = {
  Key: {
    type: "string",
  },
  Value: {
    type: "string",
  },
};

const alarmWebhookIntegrationSchema = {
  WebhookID: {
    type: "string",
  },
  WebhookName: {
    type: "string",
  },
  WebhookType: {
    type: "string",
  },
  WebhookUrl: {
    type: "string",
  },
  WebhookSecret: {
    type: ["string", "null"],
  },
  WebhookMethod: {
    type: ["string", "null"],
  },
  WebhookHeaders: {
    type: "array",
    items: {
      type: "object",
      properties: {
        ...alarmWebhookHeaderSchema,
      },
    },
  },
  CreateTime: {
    type: "string",
  },
  ModifyTime: {
    type: "string",
  },
};

// AlarmWebhookIntegration validators for Create/Delete/Modify/List, based on alarmWebhookIntegrationSchema and baseResponseSchema
export const alarmWebhookIntegrationValidate = {
  create: ajv.compile(
    getSchema({
      AlarmWebhookIntegrationId: {
        type: "string",
      },
    })
  ),
  delete: ajv.compile(baseResponseSchema),
  modify: ajv.compile(baseResponseSchema),
  list: ajv.compile(
    getSchema({
      Total: {
        type: "number",
      },
      WebhookIntegrations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...alarmWebhookIntegrationSchema,
          },
        },
      },
    })
  ),
};

export const consumerGroupValidate = {
  delete: ajv.compile(baseResponseSchema),
  modify: ajv.compile(baseResponseSchema),
};

export const describeConsumerGroupsValidate = {
  list: ajv.compile(
    getSchema({
      ConsumerGroups: {
        type: "array",
        items: {
          type: "object",
        },
      },
      Total: {
        type: "number",
      },
      DashboardId: {
        type: ["string", "null"],
      },
    })
  ),
};

export const describeCheckPointValidate = {
  describe: ajv.compile(
    getSchema({
      ShardID: {
        type: "number",
      },
      Checkpoint: {
        type: "string",
      },
    })
  ),
};

export const modifyCheckPointValidate = {
  modify: ajv.compile(baseResponseSchema),
};

export const resetCheckPointValidate = {
  reset: ajv.compile(baseResponseSchema),
};

const resourceTagSchema = {
  ResourceType: {
    type: "string",
  },
  ResourceId: {
    type: "string",
  },
  TagKey: {
    type: "string",
  },
  TagValue: {
    type: "string",
  },
};

export const listTagsForResourcesValidate = {
  list: ajv.compile(
    getSchema({
      ResourceTags: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...resourceTagSchema,
          },
        },
      },
      NextToken: {
        type: ["string", "null"],
      },
    })
  ),
};

export const tagResourcesValidate = {
  tag: ajv.compile(baseResponseSchema),
};

export const untagResourcesValidate = {
  untag: ajv.compile(baseResponseSchema),
};
