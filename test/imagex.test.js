import { Service, imagex } from "../lib";
import {
  previewImageUploadFileReponseSchemaValidate,
  uploadImagesReponseSchemaValidate,
} from "./schema/imagex";
import path from "path";
import { readFile } from "fs/promises";
import axios from "axios";

function atob(content) {
  const buff = Buffer.from(content, "base64");
  return buff.toString();
}

const defaultConfig = {
  serviceName: "imagex",
  defaultVersion: "2018-08-01",
};
const imagexService = new Service(defaultConfig);

test("imagex:PreviewImageUploadFile", async () => {
  const response = await imagexService.fetchOpenAPI({
    Action: "PreviewImageUploadFile",
    Version: "2018-08-01",
    query: {
      ServiceId: "7zcoejbqou",
      StoreUri: "tos-cn-i-7zcoejbqou/732c6acc5637408a96bb67d59bf0de85",
    },
  });
  const validateResult = previewImageUploadFileReponseSchemaValidate(response);
  expect(validateResult).toBe(true);
});

test("imagex:UploadImages", async () => {
  const imagexService = imagex.defaultService;
  const response = await imagexService.UploadImages({
    serviceId: "7zcoejbqou",
    files: [path.resolve(__dirname, "imagex_test_pic.png")],
    fileKeys: ["sdk_test_1"],
  });
  const validateResult = uploadImagesReponseSchemaValidate(response);
  expect(validateResult).toBe(true);
});

test("imagex:GetUploadAuthToken", async () => {
  const protocal = "https:";
  const host = "open.volcengineapi.com";

  const imagexService = imagex.defaultService;

  imagexService.setAccessKeyId("ak");
  imagexService.setSecretKey("sk");

  const base64String = imagexService.GetUploadAuthToken({
    ServiceId: "your imagex service id",
    // 默认900 (15min)
    "X-Expires": "60",
  });

  const imageBlob = await readFile(path.resolve(__dirname, "./imagex_test_pic.png"));

  const tokens = JSON.parse(atob(base64String));

  const { ApplyUploadToken, CommitUploadToken } = tokens;

  const {
    data: {
      Result: {
        UploadAddress: {
          UploadHosts: [UploadHost],
          StoreInfos,
          SessionKey,
        },
      },
    },
  } = await axios.get(`${protocal}//${host}?${ApplyUploadToken}`);

  await imagexService.DoUpload([imageBlob], UploadHost, StoreInfos);

  const {
    data: { Result: CommitUploadRes },
  } = await axios.post(`${protocal}//${host}?${CommitUploadToken}`, { SessionKey });

  return CommitUploadRes;
});
