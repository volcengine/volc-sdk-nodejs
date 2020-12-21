import debug from "debug";

export const packageName = "@volcengine/openapi";
export function createDebug(moduleName: string): debug.Debugger {
  return debug(`${packageName}:${moduleName}`);
}
