import { vodOpenapi } from "../lib";
import { allSchemaValidateFuncs } from "./schema/vod";
import { responseErrorSchemaValidate } from "./schema/response";
// import fs from "fs";

const reqInfo = (n) => {
  return n === 0 ? "异常" : "正常";
};

const requestInfo = {
  UploadMedia: [
    {
      FilePath: "/Users/admin/Downloads/1.wav",
      SpaceName: "",
    }, // 异常
    {
      FilePath: "/Users/admin/Downloads/test60.MP4",
      SpaceName: "2332",
    }, // 正常
  ], // 媒资上传
  UploadMaterial: [
    {
      FilePath: "/Users/admin/Downloads/subtitle.vtt",
      SpaceName: "2332",
      FileType: "object",
      Functions: JSON.stringify([]),
    }, // 异常
    {
      FilePath: "/Users/admin/Downloads/subtitle.vtt",
      SpaceName: "2332",
      FileType: "object",
      Functions: JSON.stringify([
        { Name: "GetMeta" },
        {
          Name: "AddOptionInfo",
          Input: {
            Title: "vod_test_字幕",
            Tags: "test",
            Description: "素材测试，字幕文件",
            Category: "subtitle",
            Format: "vtt",
            RecordType: 2,
          },
        },
      ]),
    }, // 上传字幕
    {
      FilePath: "/Users/admin/Downloads/1.wav",
      SpaceName: "2332",
      FileType: "media",
      Functions: JSON.stringify([
        { Name: "GetMeta" },
        {
          Name: "AddOptionInfo",
          Input: {
            Title: "vod_test_音频",
            Tags: "test",
            Description: "素材测试，音频文件",
            Category: "audio",
            Format: "wav",
            RecordType: 2,
          },
        },
      ]),
    }, // 上传音频
    {
      FilePath: "/Users/admin/Downloads/font.ttf",
      SpaceName: "2332",
      FileType: "object",
      Functions: JSON.stringify([
        { Name: "GetMeta" },
        {
          Name: "AddOptionInfo",
          Input: {
            Title: "vod_test_字体",
            Tags: "test",
            Description: "素材测试，字体文件",
            Category: "font",
            Format: "ttf",
            RecordType: 2,
          },
        },
      ]),
    }, // 上传字体
    {
      FilePath: "/Users/admin/Downloads/dog.gif",
      SpaceName: "2332",
      FileType: "image",
      Functions: JSON.stringify([
        { Name: "GetMeta" },
        {
          Name: "AddOptionInfo",
          Input: {
            Title: "vod_test_动图",
            Tags: "test",
            Description: "素材测试，动图文件",
            Category: "dynamic_img",
            Format: "gif",
            RecordType: 2,
          },
        },
      ]),
    }, // 上传动图
  ], // 素材上传
  ApplyUploadInfo: [
    {}, // 异常
    { SpaceName: "2332" },
  ], // 正常 获取上传地址与凭证
  CommitUploadInfo: [
    {}, // 异常
    {
      SpaceName: "2332",
      SessionKey:
        "eyJleHRyYSI6InZpZGM9bGZcdTAwMjZ2dHM9MTY0MTI2ODA4NDg1NjEwMzgwM1x1MDAyNmhvc3Q9dG9iLXVwbG9hZC15LnZvbGN2b2QuY29tXHUwMDI2ZWRnZV9ub2RlPWxmIiwiZmlsZVR5cGUiOiJ2aWRlbyIsInNjZW5lIjoiIiwidG9rZW4iOiJleUpvYjNOMElqb2lkRzlpTFhWd2JHOWhaQzE1TG5admJHTjJiMlF1WTI5dElpd2libTl1WTJVaU9pSnRlbEJEZFhGRllpSXNJblZ3Ykc5aFpGOXphV2R1SWpvaU5sZEtTRWs1VVZWTk5EUkRRa3RSVEVVelIxYzZRbTVTT1RabFRVOXRWMHBsU3pkMFEzVndUMDlzWDFVeVYyeEtTV0ZuYm5WalZWVjVlR2RwU1RnMFdUMDZXa2RXYUZwSGVIQmliVlUyU1VSRk1rNUVSWHBPVkZFd1QwUlJQVHBOYlVVeVdWUk5lazVFVlRKWlZFVjVUa1JXYUZsNmF6Vk9hbWQ1V1ZkTk1rMUhTVEZOVjBsNFdWUnJQU0o5OjM1MzUyNzZjZWViMjg5YWY2ZTJiMDlmZjY1NjE3OTQ1YTliYzIxMDg4Y2Q2ZGE1Mzg5MjUwYTJjMDEwNzg2YjEiLCJ1cmkiOiJ0b3MtY24tdi1lNzdkYmEvMmE2YTMzNDU2YTEyNDVhYzk5NjgyYWM2MGI1MWIxYTkiLCJ2aWQiOiJ2MDI2YTRnMTAwMDFjNzlzNnQ2djh2MjMxbWl1NjZzZyJ9",
    }, // 正常
  ], // 确认上传, sk 从获取上传地址和凭证接口下发
  UploadMediaByUrl: [
    {
      SpaceName: "2332",
      URLSets: [
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://sf1-xgcdn-tos.pstatp.com/obj/livetest-online/byte_style.mp4" },
      ],
    }, // 异常
    {
      SpaceName: "2332",
      URLSets: [
        { SourceUrl: "http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4" },
        { SourceUrl: "http://sf1-xgcdn-tos.pstatp.com/obj/livetest-online/byte_style.mp4" },
      ],
    }, // 正常
  ], // URL批量拉取上传
  QueryUploadTaskInfo: [
    { JobIds: "asdasdnaiusdbnuiabiu" }, // 异常
    { JobIds: "1378661c1f8145bca91fa222cf93e123" }, // 正常
  ], // 查询URL批量上传任务状态
  GetMediaInfos: [
    { Vids: "9090" }, // 异常
    { Vids: "v02d03g10000c7a4dndfj62njkb1v7kg" }, // 正常
  ], //  查询媒资信息
  UpdateMediaInfo: [
    { Vid: "9090" }, // 异常
    {
      Vid: "v02d03g10000c7a5pmtfj62njkb1v8j0",
      Tags: "kkkkk,llllll",
      Title: "测试api视频",
    }, // 正常
  ], //  修改媒资信息
  UpdateMediaPublishStatus: [
    { Vid: "v02b69630000bvlerrqqiqbima3etllg", Status: "Publisheddd" }, // 异常
    { Vid: "v02d03g10000c7a4dndfj62njkb1v7kg", Status: "Published" }, // 正常
  ], //  修改媒资发布状态
  GetRecommendedPoster: [
    { Vids: "error_vid" }, // 异常
    { Vids: "v02b69360000bvcnqke7bom7ct9mmd60" }, // 正常
  ], //  获取封面候选结果
  DeleteMedia: [
    { Vids: "error id" }, // 异常
    { Vids: "v03d03g10000c74mem2o9fh2r026hej0" }, // 正常
  ], //  批量删除完整媒资
  DeleteTranscodes: [
    { Vid: "v0c2beec007ac07sv" }, // 异常
    {
      Vid: "v02d03g10000c71cdt74jha8eghjbkag",
      FileIds: "254e5adb17104130914eda2d147ee885",
    }, // 正常
  ], //  删除媒体文件
  GetMediaList: [
    { SpaceName: "bucunzai" }, // 异常
    {
      SpaceName: "vod-v2-test",
      Status: "Published",
      Order: "Desc",
      StartTime: "1999-01-01T00:00:00Z",
      EndTime: "2021-04-01T00:00:00Z",
      Offset: "5",
      Pagesize: "100",
    }, // 正常
  ], //  获取音视频列表
  GetSubtitleInfoList: [
    {
      FileIds: "60ed2756f0964838841d264069917391",
      Formats: "webvtt",
    }, // 异常
    {
      Vid: "v02b69g10000c36483dqeondlu4u07ng",
      FileIds: "60ed2756f0964838841d264069917391",
      Formats: "webvtt",
      Languages: "eng-US",
      LanguageIds: "2",
      Status: "Published",
      Ssl: "1",
      SubtitleIds: "789607250",
      Title: "",
      Tag: "",
      Offset: "0",
      PageSize: "3",
    }, // 正常
  ], //  获取字幕文件
  UpdateSubtitleStatus: [
    { FileIds: "1f218b8a466e4f8f977963bf56da9e1c", Formats: "webvtt" }, // 异常
    {
      Vid: "v02b69g10000c36483dqeondlu4u07ng",
      Status: "Published",
      FileIds: "1f218b8a466e4f8f977963bf56da9e1c",
      Formats: "webvtt",
      Languages: "eng-US",
    }, // 正常
  ], //  修改字幕发布状态
  UpdateSubtitleInfo: [
    {
      FileId: "1f218b8a466e4f8f977963bf56da9e1c",
      Format: "webvtt",
      Language: "eng-US",
      Title: "title1",
      Tag: "tag1",
    }, // 异常
    {
      Vid: "v02b69g10000c36483dqeondlu4u07ng",
      FileId: "1f218b8a466e4f8f977963bf56da9e1c",
      Format: "webvtt",
      Language: "eng-US",
      Title: "title1",
      Tag: "tag1",
    }, // 正常
  ], // 修改字幕信息
  StartWorkflow: [
    {
      vid: "v02b69f20000bv8aopfr75enf2hrkl6g",
      TemplateId: "",
      Priority: 0,
      CallbackArgs: "your callback args",
    }, // 异常
    {
      vid: "v02b69f20000bv8aopfr75enf2hrkl6g",
      TemplateId: "736cb773a1e6461f8a10f6aa6104d340",
      Priority: 0,
      CallbackArgs: "your callback args",
    }, // 正常
  ], // 触发工作流
  GetPlayAuthToken: [{ Vid: "" }, { Vid: "v02d03g10000c75cqri0i8vvo4c2fntg" }], //  签发 PlayAuthToken
  GetPrivateDrmAuthToken: [{ Vid: "" }, { Vid: "v02d03g10000c75cqri0i8vvo4c2fntg" }], //  签发私有 DRM 加密 AuthToken
  GetPlayInfo: [
    { Vid: "v02b69630000bvl9nt2qiqbima3bhj1g" }, // 异常
    { Vid: "v02d03g10000c6n15d1ct673l4l12si0" }, // 正常
    { Vid: "v02b69a20000bvpb3hb5d3uj9i3g0reg", NeedThumbs: 1 }, // 下发雪碧图
    { Vid: "v02b69g10000c1n6vomoa0nk2rlurvg0", NeedBarrageMask: 1 }, // 蒙版弹幕
    { Vid: "v02b69g10000c1n6vomoa0nk2rlurvg0", CdnType: 0 }, // PCDN
    {
      Vid: "v02b69g10000c59bihbc77uchbft68d0",
      Definition: "360p",
      HDRDefinition: "all",
      Codec: "h265",
    }, // 下发HDR流
  ], //  获取播放信息
  GetUploadToken: ["6", 6000], //  本地签发临时上传凭证
};

const vodOpenapiService = vodOpenapi.defaultService;
vodOpenapiService.setAccessKeyId("ak");
vodOpenapiService.setSecretKey("sk");

const resJson = {};
Object.keys(requestInfo).forEach((request) => {
  requestInfo[request].forEach((params, index) => {
    test(`vod:${request}`, async () => {
      const response = await vodOpenapiService[request](params);
      if (resJson[request]) {
        resJson[request][reqInfo(index)] = response;
      } else {
        resJson[request] = {
          [reqInfo(index)]: response,
        };
      }
      if (index === 0) {
        // 异常情况大多报错
        expect(responseErrorSchemaValidate(response)).toBe(true);
      } else {
        const validateResult = allSchemaValidateFuncs[`Vod${request}ResultSchemaValidate`](
          response
        );
        expect(validateResult).toBe(true);
      }
    });
  });
});

// 等所有test测试用例执行完毕后执行该钩子函数
// afterAll(() => {
//   fs.writeFile("./VodResponse.json", JSON.stringify(resJson, null, 2), (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     //文件写入成功。
//   });
// });
