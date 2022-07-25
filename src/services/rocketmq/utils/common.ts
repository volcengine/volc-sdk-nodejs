export function isString(v: any): v is string {
  return typeof v === "string";
}

export class Queue<T> {
  private readonly _queue: Array<T> = [];

  constructor() {}

  peek() {
    return this._queue[0] || null;
  }

  remove() {
    return this._queue.shift() || null;
  }

  add(element: T) {
    this._queue.push(element);
  }

  get count() {
    return this._queue.length;
  }
}

export class Resolver<R = void> {
  promise: Promise<R>;

  resolve: (data: R) => void;

  reject: (e: any) => void;

  constructor() {
    this.promise = new Promise<R>((rs, rj) => {
      this.resolve = rs;
      this.reject = rj;
    });
  }
}
