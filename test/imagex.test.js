import { Service, imagex } from "../lib";
import { previewImageUploadFileReponseSchemaValidate, uploadImagesReponseSchemaValidate } from "./schema/imagex";
import path from 'path';

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
      ServiceId: '7zcoejbqou',
      StoreUri: 'tos-cn-i-7zcoejbqou/732c6acc5637408a96bb67d59bf0de85',
    }
  });
  const validateResult = previewImageUploadFileReponseSchemaValidate(response);
  expect(validateResult).toBe(true);
});

test("imagex:UploadImages", async () => {
  const imagexService = imagex.defaultService;
  const response = await imagexService.UploadImages({
    serviceId: '7zcoejbqou',
    files: [path.resolve(__dirname, 'imagex_test_pic.png')],
    fileKeys: ['sdk_test_1']
  });
  const validateResult = uploadImagesReponseSchemaValidate(response);
  expect(validateResult).toBe(true);
});
