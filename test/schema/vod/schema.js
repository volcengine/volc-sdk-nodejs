import { reponseSchema } from "../response";
export const jsonSchema = {
  VodApplyUploadInfoRequest: {
    additionalProperties: false,
    description: "获取上传凭证请求",
    properties: {
      FileSize: {
        type: "number",
      },
      FileType: {
        type: "string",
      },
      SessionKey: {
        type: "string",
      },
      SpaceName: {
        type: "string",
      },
      FileName: {
        type: "string",
      },
      FileExtension: {
        type: "string",
      },
    },
    type: "object",
  },
  VodApplyUploadInfoResult: {
    additionalProperties: false,
    description: "获取上传凭证响应",
    properties: {
      Data: {
        additionalProperties: false,
        properties: {
          UploadAddress: {
            additionalProperties: false,
            properties: {
              SessionKey: {
                type: "string",
              },
              StoreInfos: {
                items: {
                  additionalProperties: false,
                  properties: {
                    Auth: {
                      type: "string",
                    },
                    StoreUri: {
                      type: "string",
                    },
                  },
                  type: "object",
                },
                type: "array",
              },
              UploadHeader: {
                items: {
                  additionalProperties: false,
                  properties: {
                    Key: {
                      type: "string",
                    },
                    Value: {
                      type: "string",
                    },
                  },
                  type: "object",
                },
                type: "array",
              },
              UploadHosts: {
                items: {
                  type: "string",
                },
                type: "array",
              },
            },
            type: "object",
          },
        },
        type: "object",
      },
    },
    type: "object",
  },
  VodCommitUploadInfoRequest: {
    additionalProperties: false,
    description: "确认上传请求",
    properties: {
      CallbackArgs: {
        type: "string",
      },
      Functions: {
        type: "string",
      },
      SessionKey: {
        type: "string",
      },
      SpaceName: {
        type: "string",
      },
    },
    type: "object",
  },
  VodCommitUploadInfoResult: {
    additionalProperties: false,
    description: "确认上传响应",
    properties: {
      Data: {
        additionalProperties: false,
        properties: {
          Mid: {
            type: "string",
          },
          PosterUri: {
            type: "string",
          },
          SourceInfo: {
            additionalProperties: false,
            properties: {
              Bitrate: {
                type: "number",
              },
              Codec: {
                type: "string",
              },
              CreateTime: {
                type: "string",
              },
              Definition: {
                type: "string",
              },
              Duration: {
                type: "number",
              },
              FileId: {
                type: "string",
              },
              FileType: {
                type: "string",
              },
              Format: {
                type: "string",
              },
              Fps: {
                type: "number",
              },
              Height: {
                type: "number",
              },
              Md5: {
                type: "string",
              },
              Size: {
                type: "number",
              },
              StoreUri: {
                type: "string",
              },
              Width: {
                type: "number",
              },
            },
            type: "object",
          },
          Vid: {
            type: "string",
          },
        },
        type: "object",
      },
    },
    type: "object",
  },
  VodDeleteMediaRequest: {
    additionalProperties: false,
    description: "批量删除完整媒资请求",
    properties: {
      CallbackArgs: {
        type: "string",
      },
      Vids: {
        type: "string",
      },
    },
    type: "object",
  },
  VodDeleteMediaResult: {
    additionalProperties: false,
    description: "批量删除完整媒资响应",
    properties: {
      NotExistVids: {
        items: {
          type: "string",
        },
        type: "array",
      },
    },
    type: "object",
  },
  VodDeleteTranscodesRequest: {
    additionalProperties: false,
    description: "删除媒体文件请求",
    properties: {
      CallbackArgs: {
        type: "string",
      },
      FileIds: {
        type: "string",
      },
      Vid: {
        type: "string",
      },
    },
    type: "object",
  },
  VodDeleteTranscodesResult: {
    additionalProperties: false,
    description: "删除媒体文件响应",
    properties: {
      NotExistFileIds: {
        items: {
          type: "string",
        },
        type: "array",
      },
    },
    type: "object",
  },
  VodGetMediaInfosRequest: {
    additionalProperties: false,
    description: "查询媒资信息请求",
    properties: {
      Vids: {
        type: "string",
      },
    },
    type: "object",
  },
  VodGetMediaInfosResult: {
    additionalProperties: false,
    description: "查询媒资信息响应",
    properties: {
      MediaInfoList: {
        items: {
          additionalProperties: false,
          properties: {
            BasicInfo: {
              additionalProperties: false,
              properties: {
                CreateTime: {
                  type: "string",
                },
                Description: {
                  type: "string",
                },
                PosterUri: {
                  type: "string",
                },
                PublishStatus: {
                  type: "string",
                },
                SpaceName: {
                  type: "string",
                },
                Tags: {
                  items: {
                    type: "string",
                  },
                  type: "array",
                },
                Title: {
                  type: "string",
                },
                Vid: {
                  type: "string",
                },
              },
              type: "object",
            },
            SourceInfo: {
              additionalProperties: false,
              properties: {
                Bitrate: {
                  type: "number",
                },
                Codec: {
                  type: "string",
                },
                CreateTime: {
                  type: "string",
                },
                Definition: {
                  type: "string",
                },
                Duration: {
                  type: "number",
                },
                FileId: {
                  type: "string",
                },
                FileType: {
                  type: "string",
                },
                Format: {
                  type: "string",
                },
                Fps: {
                  type: "number",
                },
                Height: {
                  type: "number",
                },
                Md5: {
                  type: "string",
                },
                Size: {
                  type: "number",
                },
                StoreUri: {
                  type: "string",
                },
                Width: {
                  type: "number",
                },
              },
              type: "object",
            },
            TranscodeInfos: {
              items: {
                additionalProperties: false,
                properties: {
                  AudioStreamMeta: {
                    additionalProperties: false,
                    properties: {
                      Bitrate: {
                        type: "number",
                      },
                      Codec: {
                        type: "string",
                      },
                      Duration: {
                        type: "number",
                      },
                      SampleRate: {
                        type: "number",
                      },
                    },
                    type: "object",
                  },
                  CreateTime: {
                    type: "string",
                  },
                  Duration: {
                    type: "number",
                  },
                  Encrypt: {
                    type: "boolean",
                  },
                  FileId: {
                    type: "string",
                  },
                  FileType: {
                    type: "string",
                  },
                  Format: {
                    type: "string",
                  },
                  LogoType: {
                    type: "string",
                  },
                  Md5: {
                    type: "string",
                  },
                  Size: {
                    type: "number",
                  },
                  StoreUri: {
                    type: "string",
                  },
                  VideoStreamMeta: {
                    additionalProperties: false,
                    properties: {
                      Bitrate: {
                        type: "number",
                      },
                      Codec: {
                        type: "string",
                      },
                      Definition: {
                        type: "string",
                      },
                      Duration: {
                        type: "number",
                      },
                      Fps: {
                        type: "number",
                      },
                      Height: {
                        type: "number",
                      },
                      Width: {
                        type: "number",
                      },
                    },
                    type: "object",
                  },
                },
                type: "object",
              },
              type: "array",
            },
          },
          type: "object",
        },
        type: "array",
      },
      NotExistVids: {
        items: {
          type: "string",
        },
        type: "array",
      },
    },
    type: "object",
  },
  VodGetMediaListRequest: {
    additionalProperties: false,
    description: "获取音视频列表请求",
    properties: {
      EndTime: {
        type: "string",
      },
      Offset: {
        type: "string",
      },
      Order: {
        type: "string",
      },
      PageSize: {
        type: "string",
      },
      SpaceName: {
        type: "string",
      },
      StartTime: {
        type: "string",
      },
      Status: {
        type: "string",
      },
      Tags: {
        type: "string",
      },
      Vid: {
        type: "string",
      },
    },
    type: "object",
  },
  VodGetMediaListResult: {
    additionalProperties: false,
    description: "获取音视频列表响应",
    properties: {
      MediaInfoList: {
        items: {
          additionalProperties: false,
          properties: {
            BasicInfo: {
              additionalProperties: false,
              properties: {
                CreateTime: {
                  type: "string",
                },
                Description: {
                  type: "string",
                },
                PosterUri: {
                  type: "string",
                },
                PublishStatus: {
                  type: "string",
                },
                SpaceName: {
                  type: "string",
                },
                Tags: {
                  items: {
                    type: "string",
                  },
                  type: "array",
                },
                Title: {
                  type: "string",
                },
                Vid: {
                  type: "string",
                },
              },
              type: "object",
            },
            SourceInfo: {
              additionalProperties: false,
              properties: {
                Bitrate: {
                  type: "number",
                },
                Codec: {
                  type: "string",
                },
                CreateTime: {
                  type: "string",
                },
                Definition: {
                  type: "string",
                },
                Duration: {
                  type: "number",
                },
                FileId: {
                  type: "string",
                },
                FileType: {
                  type: "string",
                },
                Format: {
                  type: "string",
                },
                Fps: {
                  type: "number",
                },
                Height: {
                  type: "number",
                },
                Md5: {
                  type: "string",
                },
                Size: {
                  type: "number",
                },
                StoreUri: {
                  type: "string",
                },
                Width: {
                  type: "number",
                },
              },
              type: "object",
            },
            TranscodeInfos: {
              items: {
                additionalProperties: false,
                properties: {
                  AudioStreamMeta: {
                    additionalProperties: false,
                    properties: {
                      Bitrate: {
                        type: "number",
                      },
                      Codec: {
                        type: "string",
                      },
                      Duration: {
                        type: "number",
                      },
                      SampleRate: {
                        type: "number",
                      },
                    },
                    type: "object",
                  },
                  CreateTime: {
                    type: "string",
                  },
                  Duration: {
                    type: "number",
                  },
                  Encrypt: {
                    type: "boolean",
                  },
                  FileId: {
                    type: "string",
                  },
                  FileType: {
                    type: "string",
                  },
                  Format: {
                    type: "string",
                  },
                  LogoType: {
                    type: "string",
                  },
                  Md5: {
                    type: "string",
                  },
                  Size: {
                    type: "number",
                  },
                  StoreUri: {
                    type: "string",
                  },
                  VideoStreamMeta: {
                    additionalProperties: false,
                    properties: {
                      Bitrate: {
                        type: "number",
                      },
                      Codec: {
                        type: "string",
                      },
                      Definition: {
                        type: "string",
                      },
                      Duration: {
                        type: "number",
                      },
                      Fps: {
                        type: "number",
                      },
                      Height: {
                        type: "number",
                      },
                      Width: {
                        type: "number",
                      },
                    },
                    type: "object",
                  },
                },
                type: "object",
              },
              type: "array",
            },
          },
          type: "object",
        },
        type: "array",
      },
      Offset: {
        type: "number",
      },
      PageSize: {
        type: "number",
      },
      SpaceName: {
        type: "string",
      },
      TotalCount: {
        type: "number",
      },
    },
    type: "object",
  },
  VodGetPlayInfoRequest: {
    additionalProperties: false,
    description: "获取播放信息请求",
    properties: {
      Base64: {
        type: "string",
      },
      CdnType: {
        type: "string",
      },
      Codec: {
        type: "string",
      },
      Definition: {
        type: "string",
      },
      FileType: {
        type: "string",
      },
      Format: {
        type: "string",
      },
      HDRDefinition: {
        type: "string",
      },
      LogoType: {
        type: "string",
      },
      NeedBarrageMask: {
        type: "string",
      },
      NeedThumbs: {
        type: "string",
      },
      Ssl: {
        type: "string",
      },
      UnionInfo: {
        type: "string",
      },
      Vid: {
        type: "string",
      },
    },
    type: "object",
  },
  VodGetPlayInfoResult: {
    additionalProperties: false,
    description: "获取播放信息响应",
    properties: {
      AdaptiveInfo: {
        additionalProperties: false,
        properties: {
          AdaptiveType: {
            type: "string",
          },
          BackupPlayUrl: {
            type: "string",
          },
          MainPlayUrl: {
            type: "string",
          },
        },
        required: ["MainPlayUrl", "BackupPlayUrl", "AdaptiveType"],
        type: "object",
      },
      BarrageMaskUrl: {
        type: "string",
      },
      Duration: {
        type: "number",
      },
      EnableAdaptive: {
        type: "boolean",
      },
      FileType: {
        type: "string",
      },
      PlayInfoList: {
        items: {
          additionalProperties: false,
          properties: {
            BackupPlayUrl: {
              type: "string",
            },
            BarrageMaskOffset: {
              type: "string",
            },
            Bitrate: {
              type: "number",
            },
            CheckInfo: {
              type: "string",
            },
            Codec: {
              type: "string",
            },
            Definition: {
              type: "string",
            },
            FileId: {
              type: "string",
            },
            FileType: {
              type: "string",
            },
            Format: {
              type: "string",
            },
            Height: {
              type: "number",
            },
            IndexRange: {
              type: "string",
            },
            InitRange: {
              type: "string",
            },
            LogoType: {
              type: "string",
            },
            MainPlayUrl: {
              type: "string",
            },
            Md5: {
              type: "string",
            },
            PlayAuth: {
              type: "string",
            },
            PlayAuthId: {
              type: "string",
            },
            Quality: {
              type: "string",
            },
            Size: {
              type: "number",
            },
            Width: {
              type: "number",
            },
          },
          required: [
            "FileId",
            "Md5",
            "FileType",
            "Format",
            "Codec",
            "Definition",
            "MainPlayUrl",
            "BackupPlayUrl",
            "Bitrate",
            "Width",
            "Height",
            "Size",
            "CheckInfo",
            "IndexRange",
            "InitRange",
            "PlayAuth",
            "PlayAuthId",
            "LogoType",
            "Quality",
            "BarrageMaskOffset",
          ],
          type: "object",
        },
        type: "array",
      },
      PosterUrl: {
        type: "string",
      },
      Status: {
        type: "number",
      },
      SubtitleInfoList: {
        items: {
          additionalProperties: false,
          properties: {
            Format: {
              type: "string",
            },
            LanguageId: {
              type: "number",
            },
            SubtitleId: {
              type: "string",
            },
            Version: {
              type: "string",
            },
          },
          required: ["Format", "SubtitleId", "LanguageId", "Version"],
          type: "object",
        },
        type: "array",
      },
      ThumbInfoList: {
        items: {
          additionalProperties: false,
          properties: {
            CaptureNum: {
              type: "number",
            },
            CellHeight: {
              type: "number",
            },
            CellWidth: {
              type: "number",
            },
            Format: {
              type: "string",
            },
            ImgXLen: {
              type: "number",
            },
            ImgYLen: {
              type: "number",
            },
            Interval: {
              type: "number",
            },
            StoreUrls: {
              items: {
                type: "string",
              },
              type: "array",
            },
          },
          required: [
            "CaptureNum",
            "StoreUrls",
            "CellWidth",
            "CellHeight",
            "ImgXLen",
            "ImgYLen",
            "Interval",
            "Format",
          ],
          type: "object",
        },
        type: "array",
      },
      TotalCount: {
        type: "number",
      },
      Version: {
        type: "number",
      },
      Vid: {
        type: "string",
      },
    },
    required: [
      "Version",
      "Vid",
      "Status",
      "PosterUrl",
      "Duration",
      "FileType",
      "EnableAdaptive",
      "TotalCount",
      "AdaptiveInfo",
      "PlayInfoList",
      "ThumbInfoList",
      "SubtitleInfoList",
      "BarrageMaskUrl",
    ],
    type: "object",
  },
  VodGetPrivateDrmPlayAuthRequest: {
    additionalProperties: false,
    description: "签发私有 DRM 加密 AuthToken请求",
    properties: {
      DrmType: {
        type: "string",
      },
      PlayAuthIds: {
        type: "string",
      },
      UnionInfo: {
        type: "string",
      },
      Vid: {
        type: "string",
      },
    },
    type: "object",
  },
  VodGetRecommendedPosterRequest: {
    additionalProperties: false,
    description: "获取封面候选结果请求",
    properties: {
      Vids: {
        type: "string",
      },
    },
    type: "object",
  },
  VodGetRecommendedPosterResult: {
    additionalProperties: false,
    description: "获取封面候选结果响应",
    properties: {
      NotExistVids: {
        items: {
          type: "string",
        },
        type: "array",
      },
      StoreUriGroups: {
        items: {
          additionalProperties: false,
          properties: {
            StoreUris: {
              items: {
                type: "string",
              },
              type: "array",
            },
            Vid: {
              type: "string",
            },
          },
          type: "object",
        },
        type: "array",
      },
    },
    type: "object",
  },
  VodGetSubtitleInfoListRequest: {
    additionalProperties: false,
    description: "获取字幕文件请求",
    properties: {
      FileIds: {
        type: "string",
      },
      Formats: {
        type: "string",
      },
      LanguageIds: {
        type: "string",
      },
      Languages: {
        type: "string",
      },
      Offset: {
        type: "string",
      },
      PageSize: {
        type: "string",
      },
      Ssl: {
        type: "string",
      },
      Status: {
        type: "string",
      },
      SubtitleIds: {
        type: "string",
      },
      Tag: {
        type: "string",
      },
      Title: {
        type: "string",
      },
      Vid: {
        type: "string",
      },
    },
    type: "object",
  },
  VodGetSubtitleInfoListResult: {
    additionalProperties: false,
    description: "获取字幕文件响应",
    properties: {
      FileSubtitleInfoList: {
        items: {
          additionalProperties: false,
          properties: {
            FileId: {
              type: "string",
            },
            SubtitleInfoList: {
              items: {
                additionalProperties: false,
                properties: {
                  CreateTime: {
                    type: "string",
                  },
                  FileId: {
                    type: "string",
                  },
                  Format: {
                    type: "string",
                  },
                  Language: {
                    type: "string",
                  },
                  LanguageId: {
                    type: "number",
                  },
                  Source: {
                    type: "string",
                  },
                  Status: {
                    type: "string",
                  },
                  StoreUri: {
                    type: "string",
                  },
                  SubtitleId: {
                    type: "string",
                  },
                  SubtitleUrl: {
                    type: "string",
                  },
                  Tag: {
                    type: "string",
                  },
                  Title: {
                    type: "string",
                  },
                  Version: {
                    type: "string",
                  },
                  Vid: {
                    type: "string",
                  },
                },
                type: "object",
              },
              type: "array",
            },
          },
          type: "object",
        },
        type: "array",
      },
      NotExistFileIds: {
        items: {
          type: "string",
        },
        type: "array",
      },
      Offset: {
        type: "number",
      },
      PageSize: {
        type: "number",
      },
      TotalCount: {
        type: "number",
      },
      Vid: {
        type: "string",
      },
    },
    type: "object",
  },
  VodQueryUploadTaskInfoRequest: {
    additionalProperties: false,
    description: "查询URL上传任务状态请求",
    properties: {
      JobIds: {
        type: "string",
      },
    },
    type: "object",
  },
  VodQueryUploadTaskInfoResult: {
    additionalProperties: false,
    description: "查询URL上传任务状态响应",
    properties: {
      Data: {
        additionalProperties: false,
        properties: {
          MediaInfoList: {
            items: {
              additionalProperties: false,
              properties: {
                AccountId: {
                  type: "string",
                },
                JobId: {
                  type: "string",
                },
                RequestId: {
                  type: "string",
                },
                SourceInfo: {
                  additionalProperties: false,
                  properties: {
                    Bitrate: {
                      type: "number",
                    },
                    Codec: {
                      type: "string",
                    },
                    CreateTime: {
                      type: "string",
                    },
                    Definition: {
                      type: "string",
                    },
                    Duration: {
                      type: "number",
                    },
                    FileId: {
                      type: "string",
                    },
                    FileType: {
                      type: "string",
                    },
                    Format: {
                      type: "string",
                    },
                    Fps: {
                      type: "number",
                    },
                    Height: {
                      type: "number",
                    },
                    Md5: {
                      type: "string",
                    },
                    Size: {
                      type: "number",
                    },
                    StoreUri: {
                      type: "string",
                    },
                    Width: {
                      type: "number",
                    },
                  },
                  type: "object",
                },
                SourceUrl: {
                  type: "string",
                },
                SpaceName: {
                  type: "string",
                },
                State: {
                  type: "string",
                },
                Vid: {
                  type: "string",
                },
              },
              type: "object",
            },
            type: "array",
          },
          NotExistJobIds: {
            items: {
              type: "string",
            },
            type: "array",
          },
        },
        type: "object",
      },
    },
    type: "object",
  },
  VodStartWorkflowRequest: {
    additionalProperties: false,
    description: "触发工作流请求",
    properties: {
      CallbackArgs: {
        type: "string",
      },
      Input: {
        additionalProperties: false,
        properties: {
          Condition: {
            type: "boolean",
          },
          OverrideParams: {
            additionalProperties: false,
            properties: {
              Logo: {
                items: {
                  additionalProperties: false,
                  properties: {
                    TemplateId: {
                      type: "string",
                    },
                    Vars: {
                      type: "string",
                    },
                  },
                  type: "object",
                },
                type: "array",
              },
              Snapshot: {
                items: {
                  additionalProperties: false,
                  properties: {
                    OffsetTime: {
                      type: "number",
                    },
                    OffsetTimeList: {
                      items: {
                        type: "number",
                      },
                      type: "array",
                    },
                    TemplateId: {
                      items: {
                        type: "string",
                      },
                      type: "array",
                    },
                  },
                  type: "object",
                },
                type: "array",
              },
              TranscodeAudio: {
                items: {
                  additionalProperties: false,
                  properties: {
                    Clip: {
                      additionalProperties: false,
                      properties: {
                        EndTime: {
                          type: "number",
                        },
                        StartTime: {
                          type: "number",
                        },
                      },
                      type: "object",
                    },
                    TemplateId: {
                      items: {
                        type: "string",
                      },
                      type: "array",
                    },
                  },
                  type: "object",
                },
                type: "array",
              },
              TranscodeVideo: {
                items: {
                  additionalProperties: false,
                  properties: {
                    Clip: {
                      additionalProperties: false,
                      properties: {
                        EndTime: {
                          type: "number",
                        },
                        StartTime: {
                          type: "number",
                        },
                      },
                      type: "object",
                    },
                    TemplateId: {
                      items: {
                        type: "string",
                      },
                      type: "array",
                    },
                  },
                  type: "object",
                },
                type: "array",
              },
            },
            type: "object",
          },
        },
        type: "object",
      },
      Priority: {
        type: "number",
      },
      TemplateId: {
        type: "string",
      },
      Vid: {
        type: "string",
      },
    },
    type: "object",
  },
  VodStartWorkflowResult: {
    additionalProperties: false,
    description: "触发工作流响应",
    properties: {
      RunId: {
        type: "string",
      },
      Etc: {
        type: "number",
      },
    },
    type: "object",
  },
  VodUpdateMediaInfoRequest: {
    additionalProperties: false,
    description: "修改媒资信息请求",
    properties: {
      Description: {
        type: "string",
      },
      PosterUri: {
        type: "string",
      },
      Tags: {
        type: "string",
      },
      Title: {
        type: "string",
      },
      Vid: {
        type: "string",
      },
    },
    type: "object",
  },
  VodUpdateMediaInfoResult: reponseSchema,
  VodUpdateMediaPublishStatusRequest: {
    additionalProperties: false,
    description: "修改媒资发布状态请求",
    properties: {
      Status: {
        type: "string",
      },
      Vid: {
        type: "string",
      },
    },
    type: "object",
  },
  VodUpdateMediaPublishStatusResult: reponseSchema,
  VodUpdateSubtitleInfoRequest: {
    additionalProperties: false,
    description: "修改字幕信息请求",
    properties: {
      FileId: {
        type: "string",
      },
      Format: {
        type: "string",
      },
      Language: {
        type: "string",
      },
      Tag: {
        type: "string",
      },
      Title: {
        type: "string",
      },
      Vid: {
        type: "string",
      },
    },
    type: "object",
  },
  VodUpdateSubtitleInfoResult: reponseSchema,
  VodUpdateSubtitleStatusRequest: {
    additionalProperties: false,
    description: "修改字幕发布状态请求",
    properties: {
      FileIds: {
        type: "string",
      },
      Formats: {
        type: "string",
      },
      Languages: {
        type: "string",
      },
      Status: {
        type: "string",
      },
      Vid: {
        type: "string",
      },
    },
    type: "object",
  },
  VodUpdateSubtitleStatusResult: {
    additionalProperties: false,
    description: "修改字幕发布状态响应",
    properties: {
      NotExistFileIds: {
        items: {
          type: "string",
        },
        type: "array",
      },
    },
    type: "object",
  },
  VodUploadMediaByUrlRequest: {
    additionalProperties: false,
    description: "URL批量拉取上传请求",
    properties: {
      SpaceName: {
        type: "string",
      },
      URLSets: {
        items: {
          additionalProperties: false,
          properties: {
            CallbackArgs: {
              type: "string",
            },
            Category: {
              type: "string",
            },
            Description: {
              type: "string",
            },
            FileName: {
              type: "string",
            },
            FileExtension: {
              type: "string",
            },
            Md5: {
              type: "string",
            },
            SourceUrl: {
              type: "string",
            },
            Tags: {
              type: "string",
            },
            TemplateId: {
              type: "string",
            },
            Title: {
              type: "string",
            },
          },
          type: "object",
        },
        type: "array",
      },
    },
    type: "object",
  },
  VodUploadMediaByUrlResult: {
    additionalProperties: false,
    description: "URL批量拉取上传响应",
    properties: {
      Data: {
        items: {
          additionalProperties: false,
          properties: {
            JobId: {
              type: "string",
            },
            SourceUrl: {
              type: "string",
            },
          },
          type: "object",
        },
        type: "array",
      },
    },
    type: "object",
  },
  VodGetPlayAuthTokenResult: {
    type: "string",
  },
  VodGetPrivateDrmAuthTokenResult: {
    type: "string",
  },
  VodGetUploadTokenResult: {
    properties: {
      CurrentTime: {
        type: "string",
      },
      ExpiredTime: {
        type: "string",
      },
      SessionToken: {
        type: "string",
      },
      AccessKeyId: {
        type: "string",
      },
      SecretAccessKey: {
        type: "string",
      },
    },
    type: "object",
  },
};
