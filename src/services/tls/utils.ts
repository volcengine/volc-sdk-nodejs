import fs from "fs";
import path from "path";

export function getDefaultOption() {
  const defaultOptions = {
    host: process.env.VOLCENGINE_ENDPOINT,
    region: process.env.VOLCENGINE_REGION,
    protocol: "https:",
    accessKeyId: process.env.VOLCENGINE_ACCESS_KEY_ID,
    secretKey: process.env.VOLCENGINE_ACCESS_KEY_SECRET,
  };
  try {
    // Read aksk from ~/.volc/config. Priority is lower than environment variables
    if (process.env.HOME && !(defaultOptions.accessKeyId && defaultOptions.secretKey)) {
      const homeConfigPath = path.resolve(process.env.HOME, ".volc/config");
      if (fs.existsSync(homeConfigPath)) {
        const configData = JSON.parse(fs.readFileSync(homeConfigPath, { encoding: "utf-8" }));
        if (!defaultOptions.accessKeyId && configData.VOLCENGINE_ACCESS_KEY_ID) {
          defaultOptions.accessKeyId = configData.VOLCENGINE_ACCESS_KEY_ID;
        }
        if (!defaultOptions.secretKey && configData.VOLCENGINE_ACCESS_KEY_SECRET) {
          defaultOptions.secretKey = configData.VOLCENGINE_ACCESS_KEY_SECRET;
        }
        if (!defaultOptions.host && configData.VOLCENGINE_ENDPOINT) {
          defaultOptions.host = configData.VOLCENGINE_ENDPOINT;
        }
        if (!defaultOptions.region && configData.VOLCENGINE_REGION) {
          defaultOptions.region = configData.VOLCENGINE_REGION;
        }
      }
    }
  } catch {}
  return defaultOptions;
}
