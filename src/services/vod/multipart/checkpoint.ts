import fs from "fs";
import path from "path";
import { promisify } from "util";
import { VodCheckpointRecord } from "../types";

const fsStat = promisify(fs.stat);
const fsReadFile = promisify(fs.readFile);
const fsWriteFile = promisify(fs.writeFile);
const fsMkdir = promisify(fs.mkdir);
const fsUnlink = promisify(fs.unlink);

/**
 * 生成默认 checkpoint 文件路径
 */
export function getDefaultCheckpointFilePath(spaceName: string, filePath: string): string {
  const crypto = require("crypto");
  const hash = crypto.createHash("md5").update(`${spaceName}.${filePath}`).digest("hex");
  const fileName = path.basename(filePath);
  const normalizedPath = `${fileName}.${hash}.upload`;
  return normalizedPath.replace(/[\\/]/g, "");
}

/**
 * Checkpoint 信息
 */
export interface CheckpointRichInfo {
  filePath?: string;
  record?: VodCheckpointRecord;
}

/**
 * 加载 checkpoint
 */
export async function loadCheckpoint(
  checkpoint: string | VodCheckpointRecord | undefined
): Promise<CheckpointRichInfo> {
  if (!checkpoint) {
    return {};
  }

  // 如果是对象，直接返回
  if (typeof checkpoint === "object") {
    return { record: checkpoint };
  }

  // 如果是文件路径
  if (typeof checkpoint === "string") {
    try {
      const stat = await fsStat(checkpoint);
      const isDirectory = stat.isDirectory() || checkpoint.endsWith("/");

      if (isDirectory) {
        // 目录路径，需要生成文件名（实际使用时需要传入完整路径）
        throw new Error(
          "Directory checkpoint path not supported. Please provide a full file path."
        );
      }

      // 读取 checkpoint 文件
      const content = await fsReadFile(checkpoint, "utf-8");
      const record = JSON.parse(content) as VodCheckpointRecord;
      return { filePath: checkpoint, record };
    } catch (err: any) {
      // 文件不存在，将创建新的 checkpoint
      if (err.code === "ENOENT") {
        return { filePath: checkpoint };
      }
      throw err;
    }
  }

  return {};
}

/**
 * 保存 checkpoint
 */
export async function saveCheckpoint(
  filePath: string | undefined,
  record: VodCheckpointRecord
): Promise<void> {
  if (!filePath) {
    return;
  }

  try {
    const dirPath = path.dirname(filePath);
    if (dirPath !== "." && dirPath !== "") {
      await fsMkdir(dirPath, { recursive: true });
    }
    await fsWriteFile(filePath, JSON.stringify(record, null, 2), "utf-8");
  } catch (err) {
    console.warn("保存 checkpoint 文件失败:", err);
  }
}

/**
 * 删除 checkpoint
 */
export async function removeCheckpoint(filePath: string | undefined): Promise<void> {
  if (!filePath) {
    return;
  }

  try {
    await fsUnlink(filePath);
  } catch (err: any) {
    if (err.code !== "ENOENT") {
      console.warn("删除 checkpoint 文件失败:", err.message);
    }
  }
}

/**
 * 校验 checkpoint 有效性
 */
export async function validateCheckpoint(
  record: VodCheckpointRecord | undefined,
  filePath?: string,
  fileSize?: number,
  partSize?: number
): Promise<boolean> {
  if (!record) {
    return false;
  }

  // 校验文件信息（仅文件路径上传）
  if (filePath && record.file_info) {
    try {
      const stat = await fsStat(filePath);
      if (
        stat.mtimeMs !== record.file_info.last_modified ||
        stat.size !== record.file_info.file_size
      ) {
        console.warn("文件已被修改，checkpoint 无效");
        return false;
      }
    } catch (err) {
      console.warn("无法读取文件信息，checkpoint 无效");
      return false;
    }
  }

  // 校验分片大小
  if (partSize && record.part_size !== partSize) {
    console.warn("分片大小不匹配，checkpoint 无效");
    return false;
  }

  // 校验文件大小（如果提供）
  if (fileSize && record.total_size !== fileSize) {
    console.warn("文件大小不匹配，checkpoint 无效");
    return false;
  }

  return true;
}
