import type { Batch } from "./batch";
import { withRecover } from "./utils";
import type { Sender } from "./sender";

/**
 * 简单的异步发送线程池，实现基于 MaxSenderCount 的并发控制。
 */
export class ThreadPool {
  private readonly sender: Sender;
  private readonly maxConcurrency: number;

  private queue: Batch[] = [];
  private activeCount = 0;
  private stopped = false;
  private forceQuit = false;
  private stopResolve?: () => void;

  constructor(sender: Sender, maxConcurrency: number) {
    this.sender = sender;
    this.maxConcurrency = Math.max(1, Math.floor(maxConcurrency) || 1);
  }

  /**
   * 提交一个批次到线程池中异步发送。
   */
  submit(batch: Batch | undefined | null): void {
    if (!batch || this.forceQuit) return;
    this.queue.push(batch);
    this.drain();
  }

  /**
   * 优雅关闭：等待队列消费完且所有发送任务结束。
   */
  async stopGracefully(): Promise<void> {
    this.stopped = true;
    if (this.activeCount === 0 && this.queue.length === 0) {
      return;
    }
    await new Promise<void>((resolve) => {
      this.stopResolve = resolve;
    });
  }

  /**
   * 强制关闭：清空待发送队列，不再等待未完成任务。
   */
  stopForce(): void {
    this.stopped = true;
    this.forceQuit = true;
    this.queue = [];
    if (this.stopResolve) {
      this.stopResolve();
      this.stopResolve = undefined;
    }
  }

  private drain(): void {
    while (!this.stopped && this.activeCount < this.maxConcurrency && this.queue.length > 0) {
      const batch = this.queue.shift();
      if (!batch) return;

      this.activeCount += 1;
      this.sender
        .send(batch)
        .catch(() => {
          // 发送内部错误已在 Sender 中记录，这里不再向外抛出。
        })
        .finally(() => {
          withRecover(() => {
            this.activeCount -= 1;
            if (
              this.stopped &&
              this.activeCount === 0 &&
              this.queue.length === 0 &&
              this.stopResolve
            ) {
              this.stopResolve();
              this.stopResolve = undefined;
            } else {
              this.drain();
            }
          });
        });
    }
  }
}
