import Ajv from "ajv";
import { createResponseSchema } from "./response";
const ajv = new Ajv();

export const GetPlayInfoResponseSchemaValidate = ajv.compile(
  createResponseSchema({
    type: "object",
    properties: {
      Version: { type: "number" },
      Vid: { type: "string" },
      Status: { type: "number" },
      PosterUrl: { type: "string" },
      Duration: { type: "number" },
      FileType: { type: "string" },
      EnableAdaptive: { type: "boolean" },
      TotalCount: { type: "number" },
      BarrageMaskUrl: { type: "string" },
      AdaptiveInfo: {
        type: "object",
        properties: {
          MainPlayUrl: { type: "string" },
          BackupPlayUrl: { type: "string" },
          AdaptiveType: { type: "string" },
        },
      },
      PlayInfoList: {
        type: "array",
        items: {
          type: "object",
          properties: {
            FileId: { type: "string" },
            Md5: { type: "string" },
            FileType: { type: "string" },
            Format: { type: "string" },
            Codec: { type: "string" },
            Definition: { type: "string" },
            MainPlayUrl: { type: "string" },
            BackupPlayUrl: { type: "string" },
            Bitrate: { type: "number" },
            Width: { type: "number" },
            Height: { type: "number" },
            Size: { type: "number" },
            CheckInfo: { type: "string" },
            IndexRange: { type: "string" },
            InitRange: { type: "string" },
            PlayAuth: { type: "string" },
            PlayAuthId: { type: "string" },
            LogoType: { type: "string" },
            Quality: { type: "string" },
            BarrageMaskOffset: { type: "string" },
          },
        },
      },
      ThumbInfoList: {
        type: "array",
        items: {
          type: "object",
          properties: {
            CaptureNum: { type: "number" },
            StoreUrls: {
              type: "array",
              items: { type: "string" },
            },
            CellWidth: { type: "number" },
            CellHeight: { type: "number" },
            ImgXLen: { type: "number" },
            ImgYLen: { type: "number" },
            Interval: { type: "number" },
            Format: { type: "string" },
          },
        },
      },
      SubtitleInfoList: {
        type: "array",
        items: {
          type: "object",
          properties: {
            Format: { type: "string" },
            SubtitleId: { type: "string" },
            LanguageId: { type: "number" },
            Version: { type: "string" },
          },
        },
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
      "BarrageMaskUrl",
      "AdaptiveInfo",
      "PlayInfoList",
      "ThumbInfoList",
      "SubtitleInfoList",
    ],
  })
);

export const GetUploadTokenResponseSchemaValidate = ajv.compile({
  type: "object",
  properties: {
    CurrentTime: { type: "string" },
    ExpiredTime: { type: "string" },
    SessionToken: { type: "string" },
    AccessKeyId: { type: "string" },
    SecretAccessKey: { type: "string" },
  },
  required: ["CurrentTime", "ExpiredTime", "SessionToken", "AccessKeyId", "SecretAccessKey"],
});
