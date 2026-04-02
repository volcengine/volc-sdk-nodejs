import type { Batch } from "./batch";

/**
 * 基于 nextRetryMs 的小顶堆重试队列。
 *
 * - 按 nextRetryMs 升序出队；
 * - 支持一次性弹出所有元素（优雅退出时使用）。
 */
export class RetryQueue {
  private heap: Batch[] = [];

  add(batch: Batch): void {
    if (!batch) return;
    this.heapPush(batch);
  }

  /**
   * 获取需要重试的批次列表。
   *
   * @param drainAll 为 true 时，忽略 nextRetryMs，弹出所有批次；
   *                 为 false 时，仅弹出 nextRetryMs 小于等于当前时间的批次。
   */
  getRetryBatches(drainAll: boolean): Batch[] {
    const result: Batch[] = [];
    const now = Date.now();

    if (drainAll) {
      while (this.heap.length > 0) {
        result.push(this.heapPop());
      }
      return result;
    }

    while (this.heap.length > 0) {
      const top = this.heap[0];
      if (top.nextRetryMs <= now) {
        result.push(this.heapPop());
      } else {
        break;
      }
    }

    return result;
  }

  clear(): void {
    this.heap = [];
  }

  private heapPush(item: Batch): void {
    this.heap.push(item);
    this.siftUp(this.heap.length - 1);
  }

  private heapPop(): Batch {
    const last = this.heap.pop() as Batch;
    if (this.heap.length === 0) return last;
    const top = this.heap[0];
    this.heap[0] = last;
    this.siftDown(0);
    return top;
  }

  private siftUp(index: number): void {
    let i = index;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.heap[parent].nextRetryMs <= this.heap[i].nextRetryMs) break;
      this.swap(i, parent);
      i = parent;
    }
  }

  private siftDown(index: number): void {
    const length = this.heap.length;
    let i = index;
    let swapped = true;
    while (swapped) {
      swapped = false;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let smallest = i;

      if (left < length && this.heap[left].nextRetryMs < this.heap[smallest].nextRetryMs) {
        smallest = left;
      }
      if (right < length && this.heap[right].nextRetryMs < this.heap[smallest].nextRetryMs) {
        smallest = right;
      }
      if (smallest !== i) {
        this.swap(i, smallest);
        i = smallest;
        swapped = true;
      }
    }
  }

  private swap(i: number, j: number): void {
    const tmp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = tmp;
  }
}
