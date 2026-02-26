import * as fs from "fs";
import { promisify } from "util";
import pLimit from "p-limit";
import {
  VodCheckpointRecord,
  VodCheckpointPart,
  VodUploadEvent,
  VodUploadEventType,
} from "../types";
import {
  loadCheckpoint,
  saveCheckpoint,
  removeCheckpoint,
  validateCheckpoint,
  getDefaultCheckpointFilePath,
} from "./checkpoint";
import { MinChunkSize } from "../constants";

// // 考虑到filename可能包含中文 因此url encode下 否则分片上传会失败
// function getEncodedUri(originUri: string): string {
//   if (!originUri) return ''
//   const arr = originUri.split('/')
//   return arr.map((v) => encodeURIComponent(v)).join('/')
// }

const fsStat = promisify(fs.stat);
const fsOpen = promisify(fs.open);
const fsRead = promisify(fs.read);
const fsClose = promisify(fs.close);

/**
 * 分片任务
 */
interface PartTask {
  partNumber: number;
  offset: number;
  partSize: number;
}

/**
 * 断点续传上传参数
 */
export interface ResumableUploadParams {
  // 基础参数
  spaceName: string;
  filePath: string;
  fileType: string;
  fileName?: string;
  fileExtension?: string;

  // 上传凭证
  sessionKey: string;
  host: string;
  oid: string;
  auth: string;

  // 配置参数
  partSize?: number;
  maxConcurrency?: number;
  checkpoint?: string | VodCheckpointRecord;
  onProgress?: (percent: number, checkpoint: VodCheckpointRecord) => void;
  onUploadEvent?: (event: VodUploadEvent) => void;
  cancelToken?: any;

  // 上传方法（从外部注入，复用现有方法）
  initUploadPart: (
    host: string,
    oid: string,
    auth: string,
    isLargeFile: boolean
  ) => Promise<string>;
  queryUploadParts?: (
    host: string,
    oid: string,
    auth: string,
    uploadID: string,
    isLargeFile: boolean,
    fileName?: string
  ) => Promise<Array<{ partNumber: number; crc32: string; etag: string }>>;
  uploadPart: (
    host: string,
    oid: string,
    auth: string,
    uploadID: string,
    partNumber: number,
    data: Buffer,
    isLargeFile: boolean
  ) => Promise<string>;
  uploadMergePart: (
    host: string,
    oid: string,
    auth: string,
    uploadID: string,
    checkSumList: string[],
    isLargeFile: boolean,
    startFromOne?: boolean
  ) => Promise<void>;
}

/**
 * 计算安全的分片大小
 */
function calculateSafePartSize(totalSize: number, expectPartSize: number): number {
  const MIN_PART_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_PART_NUMBER = 10000;

  let partSize = expectPartSize || MinChunkSize;

  // 确保分片大小 >= 5MB（最后一片除外）
  if (partSize < MIN_PART_SIZE) {
    partSize = MIN_PART_SIZE;
  }

  // 确保分片数量 <= 10000
  const minSize = Math.ceil(totalSize / MAX_PART_NUMBER);
  if (partSize < minSize) {
    partSize = minSize;
  }

  return partSize;
}

/**
 * 生成所有分片任务
 * @param totalSize 文件总大小
 * @param partSize 分片大小
 * @param isLargeFile 是否为大文件（大文件 partNumber 从 1 开始，非大文件从 0 开始）
 */
function generatePartTasks(totalSize: number, partSize: number, isLargeFile = false): PartTask[] {
  const tasks: PartTask[] = [];
  for (let i = 0; ; ++i) {
    const offset = i * partSize;
    const currPartSize = Math.min(partSize, totalSize - offset);

    // 根据 isLargeFile 决定 partNumber 的起始值
    // 大文件：partNumber 从 1 开始
    // 非大文件：partNumber 从 0 开始（与原有 chunkUpload 逻辑一致）
    const partNumber = isLargeFile ? i + 1 : i;

    tasks.push({
      partNumber,
      offset,
      partSize: currPartSize,
    });

    if ((i + 1) * partSize >= totalSize) {
      break;
    }
  }
  return tasks;
}

/**
 * 断点续传上传（文件路径方式）
 */
export async function resumableUploadFromFile(params: ResumableUploadParams): Promise<void> {
  const {
    spaceName,
    filePath,
    fileType,
    fileName,
    fileExtension,
    sessionKey,
    host,
    oid,
    auth,
    partSize: expectPartSize,
    maxConcurrency = 4,
    checkpoint,
    onProgress,

    onUploadEvent,
    cancelToken,
    initUploadPart,
    queryUploadParts,
    uploadPart,
    uploadMergePart,
  } = params;

  // 获取文件信息
  const fileStat = await fsStat(filePath);
  const fileSize = fileStat.size;
  // 大文件认定方式：只要文件大小 > MinChunkSize（需要分片上传），就认为是大文件
  // 这样 PartNumber 会从 1 开始，与 chunkUpload 的逻辑保持一致
  const isLargeFile = fileSize > MinChunkSize;

  // 计算实际分片大小
  const actualPartSize = calculateSafePartSize(fileSize, expectPartSize || MinChunkSize);

  // 加载 checkpoint
  const checkpointInfo = await loadCheckpoint(checkpoint);
  let checkpointRecord = checkpointInfo.record;
  // checkpointFilePath 优先级：loadCheckpoint 返回的路径 > checkpoint 字符串 > 默认路径（如果 checkpointRecord 存在）
  let checkpointFilePath =
    checkpointInfo.filePath ||
    (checkpoint && typeof checkpoint === "string" ? checkpoint : undefined);

  // 如果 checkpointFilePath 仍为空但 checkpointRecord 存在，使用默认路径
  if (!checkpointFilePath && checkpointRecord) {
    checkpointFilePath = getDefaultCheckpointFilePath(
      checkpointRecord.space_name,
      checkpointRecord.file_path || filePath
    );
  }

  // 校验 checkpoint
  const isValidCheckpoint = await validateCheckpoint(
    checkpointRecord,
    filePath,
    fileSize,
    actualPartSize
  );

  if (!isValidCheckpoint) {
    checkpointRecord = undefined;
  }

  // 统一生成所有分片任务（单一数据源，避免分支内重复生成导致不一致）
  const allTasks = generatePartTasks(fileSize, actualPartSize, isLargeFile);

  // 初始化或恢复上传（uploadID 在恢复分支或 if (!checkpointRecord) 中必被赋值）
  let uploadID!: string;
  let partsInfo: VodCheckpointPart[] = [];
  let shouldTriggerInitEvent = true; // 标记是否应该触发初始化事件

  if (checkpointRecord) {
    // 从 checkpoint 恢复
    uploadID = checkpointRecord.upload_id;
    // 优先从服务器查询已上传的分片列表（如果支持）
    if (queryUploadParts) {
      try {
        const serverParts = await queryUploadParts(
          host,
          oid,
          auth,
          uploadID,
          isLargeFile,
          fileName
        );

        if (serverParts.length > 0) {
          // 1) 使用 allTasks 映射服务端 partList，得到“已完成”的 partsInfo
          // 如果服务端不返回 crc32，优先从本地 checkpoint 查找
          const localPartsMap = new Map<number, VodCheckpointPart>();
          if (checkpointRecord.parts_info) {
            checkpointRecord.parts_info.forEach((p) => {
              localPartsMap.set(p.part_number, p);
            });
          }

          const completedPartNumbers = new Set(serverParts.map((p) => p.partNumber));
          partsInfo = serverParts
            .map((serverPart) => {
              const task = allTasks.find((t) => t.partNumber === serverPart.partNumber);

              // 优先使用服务端返回的 crc32，如果没有则从本地 checkpoint 查找
              let crc32Value = serverPart.crc32 || "";
              if (!crc32Value) {
                const localPart = localPartsMap.get(serverPart.partNumber);
                if (localPart?.crc32) {
                  crc32Value = localPart.crc32;
                }
              }

              // 如果仍然没有 crc32，标记为未完成（需要重新上传）
              const isCompleted = !!crc32Value;

              if (!task) {
                const partIndex = serverPart.partNumber - (isLargeFile ? 1 : 0);
                const offset = partIndex * actualPartSize;
                const partSize = Math.min(actualPartSize, fileSize - offset);
                return {
                  part_number: serverPart.partNumber,
                  part_size: partSize,
                  offset: offset,
                  crc32: crc32Value,
                  is_completed: isCompleted,
                };
              }
              return {
                part_number: serverPart.partNumber,
                part_size: task.partSize,
                offset: task.offset,
                crc32: crc32Value,
                is_completed: isCompleted,
              };
            })
            .sort((a, b) => a.part_number - b.part_number);

          // 2) 用 allTasks 补全未完成的分片，保证 partsInfo 与 allTasks 一一对应
          allTasks.forEach((task) => {
            if (!completedPartNumbers.has(task.partNumber)) {
              partsInfo.push({
                part_number: task.partNumber,
                part_size: task.partSize,
                offset: task.offset,
                crc32: "",
                is_completed: false,
              });
            }
          });
          partsInfo.sort((a, b) => a.part_number - b.part_number);

          checkpointRecord.parts_info = partsInfo;
          checkpointRecord.server_part_list = serverParts.map((part) => ({
            partNumber: part.partNumber,
            crc32: part.crc32 || "",
            etag: part.etag || "",
          }));

          if (checkpointFilePath) {
            await saveCheckpoint(checkpointFilePath, checkpointRecord);
          }
        } else {
          partsInfo = checkpointRecord.parts_info || [];
        }
      } catch (_err) {
        // queryUploadParts 失败：删除本地 checkpoint，后续走新任务初始化
        if (checkpointFilePath) {
          await removeCheckpoint(checkpointFilePath);
        }
        checkpointRecord = undefined;
      }
    } else {
      partsInfo = checkpointRecord.parts_info || [];
    }

    // 恢复成功且未在 catch 中被清空时，才触发恢复的初始化事件
    if (checkpointRecord && shouldTriggerInitEvent) {
      onUploadEvent?.({
        type: VodUploadEventType.InitUploadPartSucceed,
        spaceName,
        uploadId: uploadID,
      });
      shouldTriggerInitEvent = false;
    }
  }

  if (!checkpointRecord) {
    // 新任务 或 queryUploadParts 失败后重新初始化
    try {
      uploadID = await initUploadPart(host, oid, auth, isLargeFile);
    } catch (err: unknown) {
      onUploadEvent?.({
        type: VodUploadEventType.InitUploadPartFailed,
        spaceName,
        uploadId: "",
        err: err instanceof Error ? err : new Error(String(err)),
      });
      throw err;
    }

    // 使用统一生成的 allTasks 初始化 checkpoint 分片信息（未完成状态）
    checkpointRecord = {
      space_name: spaceName,
      file_path: filePath,
      file_name: fileName,
      file_extension: fileExtension,
      file_type: fileType,
      upload_id: uploadID,
      session_key: sessionKey,
      host,
      oid,
      auth,
      part_size: actualPartSize,
      total_size: fileSize,
      file_info: {
        last_modified: fileStat.mtimeMs,
        file_size: fileSize,
      },
      parts_info: allTasks.map((task) => ({
        part_number: task.partNumber,
        part_size: task.partSize,
        offset: task.offset,
        crc32: "",
        is_completed: false,
      })),
    };

    // 只有在创建新任务时才触发初始化事件
    if (shouldTriggerInitEvent) {
      onUploadEvent?.({
        type: VodUploadEventType.InitUploadPartSucceed,
        spaceName,
        uploadId: uploadID,
      });
      shouldTriggerInitEvent = false; // 防止重复触发
    }

    // 保存初始化的 checkpoint（包含所有分片信息）
    if (checkpointFilePath) {
      await saveCheckpoint(checkpointFilePath, checkpointRecord);
    }
  }

  // 过滤已上传的分片
  const uploadedPartSet = new Set(
    partsInfo.filter((p) => p.is_completed).map((p) => p.part_number)
  );

  const remainingTasks = allTasks.filter((task) => !uploadedPartSet.has(task.partNumber));

  // 创建 partsInfo Map 用于快速查找
  // 如果是从 checkpoint 恢复，需要确保所有分片都在 Map 中（包括未完成的）
  const partsInfoMap = new Map<number, VodCheckpointPart>();
  partsInfo.forEach((p) => partsInfoMap.set(p.part_number, p));

  // 如果是从 checkpoint 恢复，但 checkpoint 中没有所有分片的信息（旧版本 checkpoint），
  // 需要补充缺失的分片信息
  if (checkpointRecord && partsInfo.length < allTasks.length) {
    allTasks.forEach((task) => {
      if (!partsInfoMap.has(task.partNumber)) {
        // 添加缺失的分片信息，标记为未完成
        partsInfoMap.set(task.partNumber, {
          part_number: task.partNumber,
          part_size: task.partSize,
          offset: task.offset,
          crc32: "",
          is_completed: false,
        });
      }
    });
    // 更新 checkpoint 记录
    checkpointRecord.parts_info = Array.from(partsInfoMap.values()).sort(
      (a, b) => a.part_number - b.part_number
    );
    // 保存更新后的 checkpoint
    if (checkpointFilePath) {
      await saveCheckpoint(checkpointFilePath, checkpointRecord);
    }
    // 更新 partsInfo
    partsInfo = checkpointRecord.parts_info;
  }

  // 初始化 checkSumList（用于合并）
  const checkSumList: string[] = new Array(allTasks.length);
  // 填充已上传分片的 CRC32
  // 注意：checkpoint 中的 part_number 可能是从 1 开始的（旧版本），也可能是从 0 开始的（新版本）
  // 我们需要根据 allTasks 中的 partNumber 来映射

  partsInfo.forEach((p) => {
    if (p.is_completed) {
      // 查找对应的任务索引
      const taskIndex = allTasks.findIndex((task) => task.partNumber === p.part_number);
      if (taskIndex >= 0) {
        checkSumList[taskIndex] = p.crc32;
      }
    }
  });

  // 并行上传分片
  const limit = pLimit(maxConcurrency);

  // 标记是否已完成合并，防止合并后再次触发进度回调
  let mergeCompleted = false;

  // 记录上次报告的进度，防止进度回调重复触发相同值
  let lastReportedPercent = -1;

  // 用于跟踪正在上传的分片，防止重复上传
  const uploadingPartSet = new Set<number>();

  const updateCheckpoint = async (part: VodCheckpointPart) => {
    // 如果已经完成合并，不再更新进度
    if (mergeCompleted) {
      return;
    }

    // 原子性更新：先更新内存中的 Map，再保存到文件（仅在分片上传成功时调用）
    partsInfoMap.set(part.part_number, part);
    checkpointRecord!.parts_info = Array.from(partsInfoMap.values()).sort(
      (a, b) => a.part_number - b.part_number
    );

    // 从正在上传的集合中移除（已标记为完成）
    uploadingPartSet.delete(part.part_number);

    // 保存到文件（异步操作，但不阻塞）
    if (checkpointFilePath) {
      // 不等待文件写入完成，避免阻塞并发上传
      saveCheckpoint(checkpointFilePath, checkpointRecord!).catch((err) => {
        console.warn(`保存 checkpoint 失败:`, err);
      });
    }

    // 仅当分片上传成功时更新进度：按已完成分片数 / 总分片数
    const completedParts = checkpointRecord!.parts_info.filter((p) => p.is_completed).length;
    const percent = completedParts / allTasks.length;

    // 只在进度增加时触发回调，避免重复触发相同进度值
    const currentPercentFloor = Math.floor(percent * 10000) / 10000;
    const lastPercentFloor = Math.floor(lastReportedPercent * 10000) / 10000;

    if (currentPercentFloor > lastPercentFloor && !mergeCompleted) {
      lastReportedPercent = percent;
      onProgress?.(percent, checkpointRecord!);
    }
  };

  try {
    await Promise.all(
      remainingTasks.map((task) =>
        limit(async () => {
          // 检查取消
          if (cancelToken?.reason) {
            onUploadEvent?.({
              type: VodUploadEventType.UploadPartAborted,
              spaceName,
              uploadId: uploadID,
            });
            throw new Error("上传已取消");
          }

          // ========== 双重检查：防止重复上传 ==========
          // 1. 检查内存中的 partsInfoMap（最快，同步检查）
          const existingPart = partsInfoMap.get(task.partNumber);
          if (existingPart?.is_completed) {
            // 更新 checkSumList（如果还没有）
            const taskIndex = allTasks.findIndex((t) => t.partNumber === task.partNumber);
            if (taskIndex >= 0 && existingPart.crc32) {
              checkSumList[taskIndex] = existingPart.crc32;
            }
            return;
          }

          // 2. 检查是否正在上传（防止并发重复上传）
          if (uploadingPartSet.has(task.partNumber)) {
            return;
          }

          // 3. 标记为正在上传
          uploadingPartSet.add(task.partNumber);

          try {
            // 读取分片数据
            const fd = await fsOpen(filePath, "r");
            try {
              const buffer = Buffer.alloc(task.partSize);
              await fsRead(fd, buffer, 0, task.partSize, task.offset);

              // 再次检查：在上传前最后一次检查（防止并发竞态）
              const finalCheck = partsInfoMap.get(task.partNumber);
              if (finalCheck?.is_completed) {
                // 更新 checkSumList
                const taskIndex = allTasks.findIndex((t) => t.partNumber === task.partNumber);
                if (taskIndex >= 0 && finalCheck.crc32) {
                  checkSumList[taskIndex] = finalCheck.crc32;
                }
                return;
              }

              // 上传分片
              let crc32Value: string;
              try {
                crc32Value = await uploadPart(
                  host,
                  oid,
                  auth,
                  uploadID,
                  task.partNumber,
                  buffer,
                  isLargeFile
                );
              } catch (err: any) {
                // 上传失败，从正在上传集合中移除
                uploadingPartSet.delete(task.partNumber);
                // 如果是 404 错误，说明 uploadID 已过期
                // 提供明确的错误信息，提示用户删除 checkpoint 重新上传
                if (err.message?.includes("404") || err.response?.status === 404) {
                  const errorMsg =
                    `UploadID 已过期或无效。` +
                    `UploadID: ${uploadID}, ` +
                    `PartNumber: ${task.partNumber}, ` +
                    `错误: ${err.message}` +
                    `\n解决方案: 删除 checkpoint 文件重新上传。` +
                    `Checkpoint 路径: ${checkpointFilePath || "内存中的 checkpoint"}`;
                  throw new Error(errorMsg);
                }
                // 其他错误，直接抛出
                throw err;
              }

              // 更新 checkpoint
              const part: VodCheckpointPart = {
                part_number: task.partNumber,
                part_size: task.partSize,
                offset: task.offset,
                crc32: crc32Value,
                is_completed: true,
              };

              // 根据 task 的索引来设置 checkSumList
              const taskIndex = allTasks.findIndex((t) => t.partNumber === task.partNumber);

              if (taskIndex >= 0) {
                checkSumList[taskIndex] = crc32Value;
              } else {
                throw new Error(`Cannot find taskIndex for part_number ${task.partNumber}`);
              }
              await updateCheckpoint(part);

              onUploadEvent?.({
                type: VodUploadEventType.UploadPartSucceed,
                spaceName,
                uploadId: uploadID,
                partInfo: {
                  partNumber: task.partNumber,
                  partSize: task.partSize,
                  offset: task.offset,
                },
              });
            } finally {
              await fsClose(fd);
            }
          } finally {
            // 确保在上传完成或失败后，从正在上传集合中移除
            uploadingPartSet.delete(task.partNumber);
          }
        })
      )
    );

    // 合并分片
    // 根据 isLargeFile 决定合并请求的格式：
    // - 大文件：partNumber 从 1 开始
    // - 非大文件：partNumber 从 0 开始（与原有 chunkUpload 逻辑一致）

    // 验证 checkSumList 的完整性
    const missingIndices: number[] = [];
    const missingPartNumbers: number[] = [];
    checkSumList.forEach((crc, index) => {
      if (!crc) {
        missingIndices.push(index);
        const partNumber = allTasks[index]?.partNumber;
        if (partNumber !== undefined) {
          missingPartNumbers.push(partNumber);
        }
      }
    });

    try {
      // 输出详细的合并信息用于调试
      await uploadMergePart(host, oid, auth, uploadID, checkSumList, isLargeFile, false);
    } catch (mergeErr: unknown) {
      const err =
        mergeErr instanceof Error
          ? mergeErr
          : new Error(mergeErr !== undefined && mergeErr !== null ? String(mergeErr) : "合并失败");
      onUploadEvent?.({
        type: VodUploadEventType.UploadMergePartFailed,
        spaceName,
        uploadId: uploadID,
        err,
      });
      // 如果是 400 错误且提示 invalid merge parts，可能是 uploadID 过期或格式不对
      if (
        err.message?.includes("InvalidMergeParts") ||
        err.message?.includes("invalid merge parts") ||
        (mergeErr as { response?: { status?: number } })?.response?.status === 400
      ) {
        const wrapErr = new Error(
          `合并失败: uploadID 可能已过期或无效。` +
            `UploadID: ${uploadID}, ` +
            `Parts count: ${checkSumList.length}, ` +
            `Completed: ${checkSumList.filter((c) => c).length}, ` +
            `IsLargeFile: ${isLargeFile}, ` +
            `建议: 删除 checkpoint 文件重新上传。` +
            `错误详情: ${err.message}`
        );
        (wrapErr as Error & { isMergeFailure?: boolean }).isMergeFailure = true;
        throw wrapErr;
      }
      (err as Error & { isMergeFailure?: boolean }).isMergeFailure = true;
      throw err;
    }

    // 标记合并已完成，防止后续的进度回调
    mergeCompleted = true;

    onUploadEvent?.({
      type: VodUploadEventType.UploadMergePartSucceed,
      spaceName,
      uploadId: uploadID,
    });

    // 合并完成后，仅当本次未上传任何分片（恢复时已全部完成）时触发 100% 进度
    // 若本次有分片上传成功，100% 已在最后一次 updateCheckpoint 中触发
    if (onProgress && lastReportedPercent < 1.0) {
      lastReportedPercent = 1.0;
      onProgress(1.0, checkpointRecord!);
    }
    // 删除 checkpoint（合并成功后必须删除）
    if (checkpointFilePath) {
      await removeCheckpoint(checkpointFilePath);
    } else if (checkpointRecord) {
      // 如果 checkpointFilePath 为空但 checkpointRecord 存在，使用默认路径删除
      const defaultPath = getDefaultCheckpointFilePath(
        checkpointRecord.space_name,
        checkpointRecord.file_path || filePath
      );
      await removeCheckpoint(defaultPath);
    }
  } catch (err: unknown) {
    const isAborted = err instanceof Error && err.message === "上传已取消";
    const isMergeFailure = Boolean(
      err && typeof err === "object" && (err as Error & { isMergeFailure?: boolean }).isMergeFailure
    );
    if (!isAborted && !isMergeFailure) {
      onUploadEvent?.({
        type: VodUploadEventType.UploadPartFailed,
        spaceName,
        uploadId: uploadID,
        err: err instanceof Error ? err : new Error(String(err)),
      });
    }
    throw err;
  }
}
