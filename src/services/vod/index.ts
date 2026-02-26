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
import { Readable } from "stream";

// 进程级chunk上传并发数限制
const maxLimit = pLimit(20);

const fsStat = fsPromises ? fsPromises.stat : promisify(fs.stat);
const fsOpen = promisify(fs.open);
const fsRead = promisify(fs.read);
const fsClose = promisify(fs.close);

// 获取文件流的大小
const _getStreamSize = async (stream: fs.ReadStream) => {
  if (!(stream instanceof Readable)) {
    return null;
  }
  // 仅当是可统计的文件流时获取大小
  if (typeof stream.path === "string" && stream instanceof Readable) {
    try {
      // 仅当是可统计的文件流时获取大小
      return (await fsStat(stream.path)).size;
    } catch {}
  }
  // 对不可统计的流返回null
  return null;
};

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

  private uploadToBStream = async (params: types.UploadParams): Promise<{ sessionKey: string }> => {
    /* 校验文件是否合法 */
    const {
      SpaceName,
      FileType,
      FileName,
      FileExtension,
      maxConcurrency,
      FileSize, // 流大小
      Content, // 流内容
    } = params;
    if (!FileType || !VALID_TYPE_LIST.includes(FileType)) {
      throw new Error("invalid file type");
    }
    if (!(Content instanceof Readable)) {
      throw new Error(
        "invalid stream content, please use stream content or plasease use file path to upload"
      );
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

    const streamSize = await _getStreamSize(Content as any);
    const size = FileSize ?? streamSize;
    if (!size) {
      throw new Error("invalid FileSize");
    }
    /* 获取文件上传凭证及地址 */
    /* 判断文件大小,选择上传方式 */
    if (size <= MinChunkSize) {
      await this._dynamicUploadWithUnknownSize(Content, host, oid, auth);
    } else {
      await this.chunkedStreamUpload(Content, host, oid, auth, true, maxConcurrency);
    }
    // const cost = dayjs().diff(startTime, "second");
    // const avgSpeed = fileSize / cost;
    return { /*oid,*/ sessionKey /* avgSpeed*/ };
  };

  private _dynamicUploadWithUnknownSize = async (
    stream: Readable,
    host: string,
    oid: string,
    auth: string
  ) => {
    let buffer = Buffer.alloc(0);
    try {
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      // 未超过阈值执行直传
      return this.directUploadStream(buffer, host, oid, auth);
    } finally {
      stream.destroy();
    }
  };

  private chunkedStreamUpload = async (
    stream: Readable,
    host: string,
    oid: string,
    auth: string,
    isLargeFile: boolean,
    maxConcurrency = 4
  ) => {
    const limit = pLimit(maxConcurrency);
    let buffer = Buffer.alloc(0);
    let partNumber = 0;
    const parts: string[] = [];

    try {
      const uploadId = await this.initUploadPart(host, oid, auth, isLargeFile);

      // 流数据处理循环
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);

        // 动态切割分片
        while (buffer.length >= MinChunkSize) {
          const chunkBuffer = buffer.subarray(0, MinChunkSize);
          buffer = buffer.subarray(MinChunkSize);
          partNumber++;

          // 提交分片上传任务
          parts.push(
            await limit(async () => {
              return maxLimit(async () => {
                const check_sum = await this.uploadPart(
                  host,
                  oid,
                  auth,
                  uploadId,
                  partNumber,
                  chunkBuffer,
                  isLargeFile
                );
                return check_sum;
              });
            })
          );
        }
      }

      // 上传最后的分片
      if (buffer.length > 0) {
        partNumber++;
        parts.push(
          await this.uploadPart(host, oid, auth, uploadId, partNumber, buffer, isLargeFile)
        );
      }

      await this.uploadMergePart(host, oid, auth, uploadId, parts, isLargeFile);
    } finally {
      stream.destroy();
    }
  };
  // 直接上传
  private directUploadStream = async (buffer: Buffer, host: string, oid: string, auth: string) => {
    // 根据实际数据大小设置 maxBodyLength，确保不会因为数据大小超过默认限制而失败
    const maxBodyLength = Math.max(buffer.length * 1.5, MinChunkSize * 3) || Infinity;
    await axios(`https://${host}/${getEncodedUri(oid)}`, {
      method: "put",
      headers: {
        "Content-CRC32": crc32(buffer).toString(16).padStart(8, "0"),
        Authorization: auth,
      },
      data: buffer,
      maxBodyLength,
    });
  };
  private uploadToB = async (
    params: types.UploadParams & {
      // 断点续传扩展参数（可选）
      checkpoint?: string | types.VodCheckpointRecord;
      partSize?: number;
      onProgress?: (percent: number, checkpoint: types.VodCheckpointRecord) => void;
      onUploadEvent?: (event: types.VodUploadEvent) => void;
      cancelToken?: any;
    }
  ): Promise<{ sessionKey: string }> => {
    /* 校验文件是否合法 */
    const {
      SpaceName,
      FilePath,
      FileType,
      FileName,
      FileExtension,
      maxConcurrency,
      Content, // 流内容
      // 断点续传扩展参数
      checkpoint,
      partSize,
      onProgress,
      onUploadEvent,
      cancelToken,
    } = params;

    if (Content instanceof Readable) {
      // 如果传入了断点续传参数，给出提示
      if (checkpoint !== undefined || onProgress !== undefined) {
        console.warn("流方式上传暂不支持断点续传，将使用原有上传方式");
      }
      return this.uploadToBStream(params);
    }
    const fileStat = await fsStat(FilePath);
    const fileSize = fileStat.size;
    if (!fileStat.isFile()) {
      throw new Error("no such file on file path");
    }
    if (!FileType || !VALID_TYPE_LIST.includes(FileType)) {
      throw new Error("invalid file type");
    }

    // ========== 判断是否使用断点续传 ==========
    const useResumable = checkpoint !== undefined || onProgress !== undefined;

    let oid: string;
    let auth: string;
    let sessionKey: string;
    let host: string;

    if (useResumable && fileSize > MinChunkSize) {
      // 断点续传：优先使用 checkpoint 中的凭证，避免凭证被更新导致 uploadID 失效
      const { loadCheckpoint } = await import("./multipart/checkpoint");
      const checkpointInfo = await loadCheckpoint(checkpoint);
      const checkpointRecord = checkpointInfo.record;

      const hasValidCredential =
        checkpointRecord?.upload_id &&
        checkpointRecord?.host &&
        checkpointRecord?.oid &&
        checkpointRecord?.auth &&
        checkpointRecord?.session_key;

      if (hasValidCredential) {
        host = checkpointRecord!.host;
        oid = checkpointRecord!.oid;
        auth = checkpointRecord!.auth;
        sessionKey = checkpointRecord!.session_key;
      } else {
        // 无 checkpoint 或凭证不完整，调用 ApplyUploadInfo 获取新凭证
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
        oid = get(uploadAddress, "StoreInfos[0].StoreUri", "");
        auth = get(uploadAddress, "StoreInfos[0].Auth", "");
        sessionKey = get(uploadAddress, "SessionKey", "");
        host = get(uploadAddress, "UploadHosts[0]", "");
      }

      // 使用断点续传上传
      const { resumableUploadFromFile } = await import("./multipart/resumableUpload");
      const progressCb = onProgress;
      await resumableUploadFromFile({
        spaceName: SpaceName,
        filePath: FilePath,
        fileType: FileType,
        fileName: FileName,
        fileExtension: FileExtension,
        sessionKey,
        host,
        oid,
        auth,
        partSize,
        maxConcurrency,
        checkpoint,
        onProgress: progressCb,
        onUploadEvent,
        cancelToken,
        // 注入现有的上传方法
        initUploadPart: this.initUploadPart.bind(this),
        queryUploadParts: this.queryUploadParts.bind(this),
        uploadPart: this.uploadPart.bind(this),
        uploadMergePart: this.uploadMergePart.bind(this),
      });
    } else {
      // 非断点续传：获取文件上传凭证及地址
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
      oid = get(uploadAddress, "StoreInfos[0].StoreUri", "");
      auth = get(uploadAddress, "StoreInfos[0].Auth", "");
      sessionKey = get(uploadAddress, "SessionKey", "");
      host = get(uploadAddress, "UploadHosts[0]", "");

      // 使用原有上传方式（完全向后兼容）
      if (fileSize <= MinChunkSize) {
        await this.directUpload(FilePath, host, oid, auth, fileSize);
      } else {
        await this.chunkUpload(FilePath, host, oid, auth, fileSize, true, maxConcurrency);
      }
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
      // 根据实际数据大小设置 maxBodyLength，确保不会因为文件大小超过默认限制而失败
      const maxBodyLength = Math.max(size * 1.5, MinChunkSize * 3) || Infinity;
      await axios(`https://${host}/${getEncodedUri(oid)}`, {
        method: "put",
        headers: {
          "Content-CRC32": crc32(buffer).toString(16).padStart(8, "0"),
          Authorization: auth,
        },
        data: buffer,
        maxBodyLength,
      });
    } finally {
      await fsClose(fd);
    }
  };

  private createUploadTask = (
    host: string,
    oid: string,
    auth: string,
    uploadId: string | number,
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
      const url = `https://${host}/${getEncodedUri(oid)}?uploads`;
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

  /**
   * 查询已上传的分片列表
   * GET {tosDomain}/{oid}/{fileName}?uploadID={uploadId}
   * 如果命中缓存，会返回已上传的分片列表
   */
  private queryUploadParts = async (
    host: string,
    oid: string,
    auth: string,
    uploadID: string,
    isLargeFile: boolean,
    fileName?: string
  ): Promise<Array<{ partNumber: number; crc32: string; etag: string }>> => {
    try {
      // 拼接文件名到 URL
      let url = `https://${host}/${getEncodedUri(oid)}`;
      if (fileName) {
        url += `/${getEncodedUri(fileName)}`;
      }
      url += `?uploadID=${uploadID}`;

      const headers: any = { Authorization: auth };
      if (isLargeFile) {
        headers["X-Storage-Mode"] = "gateway";
      }
      const res = await axios(url, {
        method: "get",
        headers,
      });
      const partList = get(res, "data.payload.partList", []);

      if (!Array.isArray(partList)) {
        return [];
      }
      // 服务可能返回 partNumber 为 string，统一转为 number
      // crc32 不能丢失：即使是 "0" 或 0 也是有效值，不能用 || '' 判断
      return partList.map((part: any) => {
        const rawPartNumber =
          part.partNumber !== undefined && part.partNumber !== null
            ? part.partNumber
            : part.part_number;
        return {
          partNumber: Number(rawPartNumber) || 0,
          // crc32: 如果存在（包括 0 或 "0"）就保留，否则为空字符串
          crc32: part.crc32 !== undefined && part.crc32 !== null ? String(part.crc32) : "",
          etag: part.etag !== undefined && part.etag !== null ? String(part.etag) : "",
        };
      });
    } catch (err: any) {
      // 如果查询失败（如 404），返回空数组，表示没有已上传的分片
      if (err.response?.status === 404) {
        return [];
      }
      // 其他错误，只记录必要的非敏感信息，避免泄露请求配置和认证信息
      const safeLog = {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response && typeof err.response.data === "object" ? err.response.data : undefined,
        logid: err.response?.headers?.["x-tt-logid"],
      };
      console.warn("[Warning] Failed to query upload parts:", JSON.stringify(safeLog));
      return [];
    }
  };

  private uploadPart = async (
    host: string,
    oid: string,
    auth: string,
    uploadID: string | number,
    partNumber: number,
    data: Buffer,
    isLargeFile: boolean
  ) => {
    try {
      const url = `https://${host}/${getEncodedUri(
        oid
      )}?partNumber=${partNumber}&uploadID=${uploadID}`;
      const check_sum: string = crc32(data).toString(16).padStart(8, "0");
      const headers = { "Content-CRC32": check_sum, Authorization: auth };
      if (isLargeFile) {
        headers["X-Storage-Mode"] = "gateway";
      }
      // 根据实际数据大小设置 maxBodyLength，确保不会因为分片大小超过默认限制而失败
      // 使用数据大小的 1.5 倍作为安全边界，或者 Infinity 表示不限制
      const maxBodyLength = Math.max(data.length * 1.5, MinChunkSize * 3) || Infinity;

      await axios(url, {
        method: "put",
        headers,
        data,
        maxBodyLength,
      });
      return check_sum;
    } catch (err: any) {
      // 提供更详细的错误信息
      let errorMessage = err.response?.data
        ? `Request failed with status ${err.response.status}: ${JSON.stringify(err.response.data)}`
        : err.message || String(err);

      // 如果是 404 错误，可能是 uploadID 过期或 URL 构造错误
      if (err.response?.status === 404) {
        errorMessage +=
          `\n提示: uploadID 可能已过期或无效。` +
          `UploadID: ${uploadID}, ` +
          `PartNumber: ${partNumber}, ` +
          `URL: https://${host}/${getEncodedUri(
            oid
          )}?partNumber=${partNumber}&uploadID=${uploadID}` +
          `\n如果是从 checkpoint 恢复上传，请删除 checkpoint 文件重新上传。`;
      }

      throw new Error("upload part error:" + errorMessage);
    }
  };

  private uploadMergePart = async (
    host: string,
    oid: string,
    auth: string,
    uploadID: string | number,
    checkSumList: string[],
    isLargeFile: boolean,
    startFromOne = false // 兼容旧版本 checkpoint：如果为 true，强制 partNumber 从 1 开始
  ) => {
    try {
      // 验证所有分片的 CRC32 都已准备好
      const missingParts: number[] = [];
      checkSumList.forEach((crc, index) => {
        if (!crc) {
          missingParts.push(index + 1);
        }
      });
      if (missingParts.length > 0) {
        throw new Error(`Missing CRC32 for parts: ${missingParts.join(", ")}. Cannot merge.`);
      }
      const url = `https://${host}/${getEncodedUri(oid)}?uploadID=${uploadID}`;
      // 合并请求格式：
      // - 如果 startFromOne=true，强制从 1 开始（兼容旧版本 checkpoint）
      // - 否则，根据 isLargeFile 决定：大文件从 1 开始，非大文件从 0 开始
      const data = this.generateMergeBody(checkSumList, isLargeFile, startFromOne);
      const headers: any = { Authorization: auth };
      if (isLargeFile) {
        headers["X-Storage-Mode"] = "gateway";
      }
      // 合并请求的数据通常较小，但为了安全起见，根据实际数据大小设置
      const dataSize = Buffer.byteLength(data, "utf8");
      const maxBodyLength = Math.max(dataSize * 2, MinChunkSize * 3) || Infinity;

      const response = await axios(url, {
        method: "put",
        headers,
        data,
        maxBodyLength,
      });

      // 如果响应状态不是 2xx，抛出错误
      if (response.status < 200 || response.status >= 300) {
        throw new Error(
          `Merge request failed with status ${response.status}: ${JSON.stringify(response.data)}`
        );
      }
    } catch (err: any) {
      // 提供更详细的错误信息
      let errorMessage = err.response?.data
        ? `Request failed with status ${err.response.status}: ${JSON.stringify(err.response.data)}`
        : err.message || String(err);

      // 如果是 404 错误，可能是 uploadID 过期
      if (err.response?.status === 404) {
        errorMessage += `\n提示: uploadID 可能已过期。如果是从 checkpoint 恢复上传，请删除 checkpoint 文件重新上传。`;
      }

      throw new Error(`upload merge part error:${errorMessage}`);
    }
  };

  private generateMergeBody = (
    checkSumList: string[],
    isLargeFile = false,
    startFromOne = false
  ) => {
    if (checkSumList.length === 0) {
      throw new Error("crc32 list empty");
    }
    const s: string[] = [];
    for (let i = 0; i < checkSumList.length; i++) {
      // 过滤掉 undefined 和 null 值，确保所有分片都已上传
      if (checkSumList[i]) {
        // 确定分片编号：
        // 1. 如果 startFromOne=true（断点续传），总是从 1 开始
        // 2. 否则，对于大文件从 1 开始，对于非大文件从 0 开始
        const partNumber = startFromOne || isLargeFile ? i + 1 : i;
        s.push(`${partNumber}:${checkSumList[i]}`);
      } else {
        throw new Error(`Missing CRC32 for part ${i + 1}`);
      }
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
        FileSize, // 流大小
        Content, // 流内容
        // ========== 断点续传扩展参数（可选）==========
        checkpoint,
        partSize,
        onProgress,
        onUploadEvent,
        cancelToken,
        // ========== 断点续传扩展参数结束 ==========
      } = req;
      const progressCb = onProgress;
      const { sessionKey } = await this.uploadToB({
        SpaceName,
        FilePath,
        FileType: "media",
        FileName,
        FileExtension,
        maxConcurrency,
        FileSize, // 流大小
        Content, // 流内容
        // 传递断点续传参数
        checkpoint,
        partSize,
        onProgress: progressCb,
        onUploadEvent,
        cancelToken,
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
        FileSize, // 流大小
        Content, // 流内容
        // ========== 断点续传扩展参数（可选）==========
        checkpoint,
        partSize,
        onProgress,
        onUploadEvent,
        cancelToken,
        // ========== 断点续传扩展参数结束 ==========
      } = req;
      const progressCb = onProgress;
      const { sessionKey } = await this.uploadToB({
        SpaceName,
        FilePath,
        FileType,
        FileName,
        FileExtension,
        maxConcurrency,
        FileSize, // 流大小
        Content, // 流内容
        // 传递断点续传参数
        checkpoint,
        partSize,
        onProgress: progressCb,
        onUploadEvent,
        cancelToken,
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
      params: {
        Action: "GetPrivateDrmPlayAuth",
        Version: "2020-08-01",
        ...query,
      },
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
