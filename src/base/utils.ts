import debug from "debug";
import packageInfo from "../../package.json";
export const packageName = packageInfo.name;
export const packageVersion = packageInfo.version;
export function createDebug(moduleName: string): debug.Debugger {
  return debug(`${packageName}:${moduleName}`);
}
