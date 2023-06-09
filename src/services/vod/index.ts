import Service from "../../base/service";
import { ServiceOptions, FetchParams, SecurityToken2 } from "../../base/types";
import * as types from "./types";
import { getDefaultOption } from "../../base/utils";
import Signer, { queryParamsToString } from "../../base/sign";
import { promisify } from "util";
import { crc32 } from "crc";
import fs, { promises as fsPromises } from "fs";
import get from "lodash.get";
import axios from "axios";
import { MinChunkSize, VALID_TYPE_LIST } from "./constants";
import pLimit from "p-limit";

// 进程级chunk上传并发数限制
const maxLimit = pLimit(20);

const fsStat = fsPromises ? fsPromises.stat : promisify(fs.stat);
const fsOpen = promisify(fs.open);
const fsRead = promisify(fs.read);
const fsClose = promisify(fs.close);

// 考虑到filename可能包含中文 因此url encode下 否则分片上传会失败
function getEncodedUri(originUri: string): string {
  if (!originUri) return "";
  const arr = originUri.split("/");
  return arr.map((v) => encodeURIComponent(v)).join("/");
}

export class VodService extends Service {
  constructor(options?: ServiceOptions) {
    super({
      defaultVersion: "2020-08-01",
      host: "vod.volcengineapi.com",
      serviceName: "vod",
      ...options,
    });
  }

  private uploadToB = async (params: types.UploadParams): Promise<{ sessionKey: string }> => {
    /* 校验文件是否合法 */
    const { SpaceName, FilePath, FileType, FileName, FileExtension, maxConcurrency } = params;
    const fileStat = await fsStat(FilePath);
    const fileSize = fileStat.size;
    if (!fileStat.isFile()) {
      throw new Error("no such file on file path");
    }
    if (!FileType || !VALID_TYPE_LIST.includes(FileType)) {
      throw new Error("invalid file type");
    }

    /* 获取文件上传凭证及地址 */
    const applyReq: types.VodApplyUploadInfoRequest = {
      SpaceName,
      FileType: FileType || "media",
      FileName,
      FileExtension,
    };
    const applyRes = await this.ApplyUploadInfo(applyReq);
    if (applyRes.ResponseMetadata.Error) {
      throw new Error(JSON.stringify(applyRes));
    }
    const uploadAddress = get(applyRes, "Result.Data.UploadAddress");
    const oid = get(uploadAddress, "StoreInfos[0].StoreUri", "");
    const auth = get(uploadAddress, "StoreInfos[0].Auth", "");
    const sessionKey = get(uploadAddress, "SessionKey", "");
    const host = get(uploadAddress, "UploadHosts[0]", "");
    // const startTime = dayjs();

    /* 判断文件大小,选择上传方式 */
    if (fileSize <= MinChunkSize) {
      await this.directUpload(FilePath, host, oid, auth, fileSize);
    } else {
      await this.chunkUpload(FilePath, host, oid, auth, fileSize, true, maxConcurrency);
    }
    // const cost = dayjs().diff(startTime, "second");
    // const avgSpeed = fileSize / cost;
    return { /*oid,*/ sessionKey /* avgSpeed*/ };
  };

  // 直接上传
  private directUpload = async (
    filePath: string,
    host: string,
    oid: string,
    auth: string,
    size: number
  ) => {
    let fd = 0;
    try {
      const bufferInit = Buffer.alloc(size);
      fd = await fsOpen(filePath, "r");
      const { buffer } = await fsRead(fd, bufferInit, 0, size, 0);
      await axios(`http://${host}/${getEncodedUri(oid)}`, {
        method: "put",
        headers: {
          "Content-CRC32": crc32(buffer).toString(16).padStart(8, "0"),
          Authorization: auth,
        },
        data: buffer,
        maxBodyLength: MinChunkSize * 2,
      });
    } finally {
      await fsClose(fd);
    }
  };

  private createUploadTask = (
    host: string,
    oid: string,
    auth: string,
    uploadId: number,
    isLargeFile: boolean,
    fd: number,
    chunkSize: number,
    position: number,
    partNum: number
  ) => {
    // 被maxLimit包裹后，无论同时上传多少个文件，最多20个分片并发上传，避免占用内存过多
    return maxLimit(async () => {
      const bufferInit = Buffer.alloc(chunkSize);
      const { buffer } = await fsRead(fd, bufferInit, 0, chunkSize, position);
      const part = await this.uploadPart(host, oid, auth, uploadId, partNum, buffer, isLargeFile);
      return part;
    });
  };

  // 大文件分片上传
  private chunkUpload = async (
    filePath: string,
    host: string,
    oid: string,
    auth: string,
    size: number,
    isLargeFile: boolean,
    maxConcurrency = 4
  ) => {
    const limit = pLimit(maxConcurrency);
    let fd = 0;
    try {
      const uploadId = await this.initUploadPart(host, oid, auth, isLargeFile); // 获取上传id
      const n = Math.floor(size / MinChunkSize); // 向下取整
      const lastSize = size % MinChunkSize;
      const lastNum = n - 1;
      const parts: string[] = []; // 存储校验和列表
      fd = await fsOpen(filePath, "r");
      const tasks: Promise<void>[] = [];
      for (let i = 0; i < lastNum; i++) {
        let partNum = i;
        if (isLargeFile) {
          partNum = i + 1;
        }
        // 被limit包裹后，确保每个文件同时最多上传maxConcurrency个分片
        tasks.push(
          limit(
            this.createUploadTask,
            host,
            oid,
            auth,
            uploadId,
            isLargeFile,
            fd,
            MinChunkSize,
            i * MinChunkSize,
            partNum
          ).then((part) => {
            parts[i] = part;
          })
        );
      }
      tasks.push(
        limit(
          this.createUploadTask,
          host,
          oid,
          auth,
          uploadId,
          isLargeFile,
          fd,
          MinChunkSize + lastSize,
          lastNum * MinChunkSize,
          isLargeFile ? lastNum + 1 : lastNum
        ).then((part) => {
          parts[lastNum] = part;
        })
      );
      await Promise.all(tasks);
      await this.uploadMergePart(host, oid, auth, uploadId, parts, isLargeFile);
    } finally {
      await fsClose(fd);
    }
  };

  private initUploadPart = async (
    host: string,
    oid: string,
    auth: string,
    isLargeFile: boolean
  ) => {
    try {
      const url = `http://${host}/${getEncodedUri(oid)}?uploads`;
      const headers = { Authorization: auth };
      if (isLargeFile) {
        headers["X-Storage-Mode"] = "gateway";
      }
      const res = await axios(url, {
        method: "put",
        headers,
      });
      const uploadID = get(res, "data.payload.uploadID", "");
      if (uploadID.length === 0) {
        throw new Error("get empty uploadID");
      }
      return uploadID;
    } catch (err) {
      throw new Error("init upload error:" + err);
    }
  };

  private uploadPart = async (
    host: string,
    oid: string,
    auth: string,
    uploadID: number,
    partNumber: number,
    data: Buffer,
    isLargeFile: boolean
  ) => {
    try {
      const url = `http://${host}/${getEncodedUri(
        oid
      )}?partNumber=${partNumber}&uploadID=${uploadID}`;
      const check_sum: string = crc32(data).toString(16).padStart(8, "0");
      const headers = { "Content-CRC32": check_sum, Authorization: auth };
      if (isLargeFile) {
        headers["X-Storage-Mode"] = "gateway";
      }
      await axios(url, {
        method: "put",
        headers,
        data,
        maxBodyLength: MinChunkSize * 2,
      });
      return check_sum;
    } catch (err) {
      throw new Error("upload part error:" + err);
    }
  };

  private uploadMergePart = async (
    host: string,
    oid: string,
    auth: string,
    uploadID: number,
    checkSumList: string[],
    isLargeFile: boolean
  ) => {
    try {
      const url = `http://${host}/${getEncodedUri(oid)}?uploadID=${uploadID}`;
      const data = this.generateMergeBody(checkSumList);
      const headers = { Authorization: auth };
      if (isLargeFile) {
        headers["X-Storage-Mode"] = "gateway";
      }
      await axios(url, {
        method: "put",
        headers,
        data,
        maxBodyLength: MinChunkSize * 3,
      });
    } catch (err) {
      throw new Error("upload merge part error:" + err);
    }
  };

  private generateMergeBody = (checkSumList: string[]) => {
    if (checkSumList.length === 0) {
      throw new Error("crc32 list empty");
    }
    const s: string[] = [];
    for (let i = 0; i < checkSumList.length; i++) {
      s.push(`${i}:${checkSumList[i]}`);
    }
    return s.join(",");
  };

  /**
   * 媒资上传
   */

  // 媒资上传
  UploadMedia = async (req: types.VodUploadMediaRequest) => {
    try {
      const defaultMediaFunctions = [{ Name: "GetMeta" }];
      const {
        SpaceName,
        FilePath = "",
        Functions = JSON.stringify(defaultMediaFunctions),
        CallbackArgs = "",
        FileName = "",
        FileExtension = "",
        maxConcurrency = 4,
      } = req;
      const { sessionKey } = await this.uploadToB({
        SpaceName,
        FilePath,
        FileType: "media",
        FileName,
        FileExtension,
        maxConcurrency,
      });
      const commitQuery = {
        SpaceName,
        SessionKey: sessionKey,
        Functions,
        CallbackArgs,
      };
      const commitRes = await this.CommitUploadInfo(commitQuery);
      if (commitRes.ResponseMetadata.Error) {
        throw new Error(JSON.stringify(commitRes));
      }
      return commitRes;
    } catch (err) {
      throw new Error("Upload Media Error: " + err);
    }
  };

  // 素材上传
  UploadMaterial = async (req: types.VodUploadMaterialRequest) => {
    try {
      const {
        SpaceName,
        FilePath = "",
        Functions = "",
        CallbackArgs = "",
        FileType = "",
        FileName = "",
        FileExtension = "",
        maxConcurrency = 4,
      } = req;
      const { sessionKey } = await this.uploadToB({
        SpaceName,
        FilePath,
        FileType,
        FileName,
        FileExtension,
        maxConcurrency,
      });
      const commitQuery = {
        SpaceName,
        SessionKey: sessionKey,
        Functions,
        CallbackArgs,
      };
      const commitRes = await this.CommitUploadInfo(commitQuery);
      if (commitRes.ResponseMetadata.Error) {
        throw new Error(JSON.stringify(commitRes));
      }
      return commitRes;
    } catch (err) {
      throw new Error("Upload Material Error: " + err);
    }
  };

  // 获取上传地址与凭证
  ApplyUploadInfo = this.createAPI<types.VodApplyUploadInfoRequest, types.VodApplyUploadInfoResult>(
    "ApplyUploadInfo",
    { Version: "2022-01-01" }
  );

  // 确认上传
  CommitUploadInfo = this.createAPI<
    types.VodCommitUploadInfoRequest,
    types.VodCommitUploadInfoResult
  >("CommitUploadInfo", { Version: "2022-01-01" });

  // URL批量拉取上传
  UploadMediaByUrl = (req: types.VodUploadMediaByUrlRequest) => {
    Object.keys(req).forEach((key) => {
      if (Array.isArray(req[key])) {
        req[key] = JSON.stringify(req[key]);
      }
    });
    return this.createAPI<types.VodUploadMediaByUrlRequest, types.VodUploadMediaByUrlResult>(
      "UploadMediaByUrl"
    )(req);
  };

  // 查询URL批量上传任务状态
  QueryUploadTaskInfo = this.createAPI<
    types.VodQueryUploadTaskInfoRequest,
    types.VodQueryUploadTaskInfoResult
  >("QueryUploadTaskInfo");

  /**
   * 媒资管理
   */

  //  查询媒资信息
  GetMediaInfos = this.createAPI<types.VodGetMediaInfosRequest, types.VodGetMediaInfosResult>(
    "GetMediaInfos"
  );

  //  修改媒资信息
  UpdateMediaInfo = this.createAPI<types.VodUpdateMediaInfoRequest, undefined>("UpdateMediaInfo");

  //  修改媒资发布状态
  UpdateMediaPublishStatus = this.createAPI<types.VodUpdateMediaPublishStatusRequest, undefined>(
    "UpdateMediaPublishStatus"
  );

  //  获取封面候选结果
  GetRecommendedPoster = this.createAPI<
    types.VodGetRecommendedPosterRequest,
    types.VodGetRecommendedPosterResult
  >("GetRecommendedPoster");

  //  批量删除完整媒资
  DeleteMedia = this.createAPI<types.VodDeleteMediaRequest, types.VodDeleteMediaResult>(
    "DeleteMedia"
  );

  //  删除媒体文件
  DeleteTranscodes = this.createAPI<
    types.VodDeleteTranscodesRequest,
    types.VodDeleteTranscodesResult
  >("DeleteTranscodes");

  //  获取音视频列表
  GetMediaList = this.createAPI<types.VodGetMediaListRequest, types.VodGetMediaListResult>(
    "GetMediaList"
  );

  //  获取字幕文件
  GetSubtitleInfoList = this.createAPI<
    types.VodGetSubtitleInfoListRequest,
    types.VodGetSubtitleInfoListResult
  >("GetSubtitleInfoList");

  //  修改字幕发布状态
  UpdateSubtitleStatus = this.createAPI<
    types.VodUpdateSubtitleStatusRequest,
    types.VodUpdateSubtitleStatusResult
  >("UpdateSubtitleStatus");

  // 修改字幕信息
  UpdateSubtitleInfo = this.createAPI<types.VodUpdateSubtitleInfoRequest, undefined>(
    "UpdateSubtitleInfo"
  );

  /**
   * 媒资处理
   */

  // 触发工作流
  StartWorkflow = this.createAPI<types.VodStartWorkflowRequest, types.VodStartWorkflowResult>(
    "StartWorkflow"
  );

  /**
   * 媒资播放
   */

  // 获取播放信息
  GetPlayInfo = this.createAPI<types.VodGetPlayInfoRequest, types.VodGetPlayInfoResult>(
    "GetPlayInfo"
  );

  //  签发 PlayAuthToken
  // expireSeconds 单位是 s
  GetPlayAuthToken = (query: types.VodGetPlayInfoRequest, expireSeconds?: number): string => {
    if (!query.Vid) throw new Error("传入的 Vid 为空");
    if (expireSeconds) {
      query["X-Expires"] = expireSeconds;
    }
    const getPlayInfoToken = this._signUrl<types.VodGetPlayInfoRequest>({
      method: "GET",
      params: { Action: "GetPlayInfo", Version: "2020-08-01", ...query },
    });
    const ret = { GetPlayInfoToken: getPlayInfoToken, TokenVersion: "V2" };
    const retStr = JSON.stringify(ret).replace("\\u0026", "&");
    return Buffer.from(retStr).toString("base64");
  };

  //  签发私有 DRM 加密 AuthToken
  GetPrivateDrmAuthToken = (
    query: types.VodGetPrivateDrmPlayAuthRequest,
    expireSeconds?: number
  ): string => {
    if (!query.Vid) throw new Error("传入的 Vid 为空");
    if (query.DrmType && ["appdevice", "webdevice"].includes(query.DrmType) && !query.UnionInfo) {
      throw new Error("invalid unionInfo");
    }
    if (expireSeconds) {
      query["X-Expires"] = expireSeconds;
    }
    return this._signUrl<types.VodGetPrivateDrmPlayAuthRequest>({
      method: "GET",
      params: { Action: "GetPrivateDrmPlayAuth", Version: "2020-08-01", ...query },
    });
  };

  GetPrivateDrmPlayAuth = this.createAPI<
    types.VodGetPrivateDrmPlayAuthRequest,
    types.VodGetPrivateDrmPlayAuthResult
  >("GetPrivateDrmPlayAuth");

  // 本地签发临时上传凭证
  GetUploadToken = (expire?: number): SecurityToken2 => {
    const policy = {
      Statement: [
        {
          Effect: "Allow",
          Action: ["Vod:ApplyUploadInfo", "Vod:CommitUploadInfo"],
          Resource: [],
        },
      ],
    };
    return this.signSts2(policy, expire ?? 60 * 60 * 1000);
  };

  private _signUrl = <T>(options: {
    method: string;
    params: FetchParams & T;
    serviceName?: string;
  }) => {
    const { region } = getDefaultOption();
    const sessionToken = this.getSessionToken();
    const accessKeyId = this.getAccessKeyId();
    const secretKey = this.getSecretKey();

    if (!accessKeyId || !secretKey) {
      throw new Error("accessKeyId or secretKey is invalid");
    }

    const { params, method = "GET", serviceName = "Vod" } = options;

    // 使用临时的一个signer来转换utc时间，因为实际上使用signer需要传入params字段
    const date = new Signer({ method: "", region: "" }, "Vod")
      .iso8601(new Date())
      .replace(/[:\-]|\.\d{3}/g, "");

    const credentialScope = [date.substr(0, 8), region, serviceName, "request"].join("/");
    const signedHeaders = "";

    const paramsMap: any = {
      "X-Date": date,
      "X-NotSignBody": "",
      "X-Credential": accessKeyId + "/" + credentialScope,
      "X-Algorithm": "HMAC-SHA256",
      "X-SignedHeaders": signedHeaders,
      "X-SignedQueries": "",
      ...params,
    };

    const sortedQueryMap = Object.keys(paramsMap)
      .sort()
      .reduce((map, curKey) => {
        map[curKey] = paramsMap[curKey];
        return map;
      }, {});

    if (sessionToken) {
      paramsMap["X-Security-Token"] = sessionToken;
    }

    paramsMap["X-SignedQueries"] = Object.keys(sortedQueryMap).join(";");

    const signer = new Signer(
      {
        region,
        method,
        pathname: "/",
        params: paramsMap,
      },
      "Vod"
    );

    const signature = signer.signature({ accessKeyId, secretKey }, date);

    paramsMap["X-Signature"] = signature.toString();

    return queryParamsToString(paramsMap);
  };
}

export const defaultService = new VodService();
