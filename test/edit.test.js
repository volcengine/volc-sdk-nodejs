import { Service } from "../lib";
import { getDirectEditResultReponseSchemaValidate } from "./schema/edit";

const defaultConfig = {
  serviceName: "edit",
  defaultVersion: "2018-01-01",
};
const editService = new Service(defaultConfig);

test("edit:GetDirectEditResult", async () => {
  const response = await editService.fetchOpenAPI({
    Action: "GetDirectEditResult",
    Version: "2018-01-01",
    method: 'POST',
    headers: {
      "content-type": "application-json",
    },
    data: {
      ReqIds: ['979a0b0ca97c45b2b06e61b522b0cd7e'],
    }
  });
  const validateResult = getDirectEditResultReponseSchemaValidate(response);
  expect(validateResult).toBe(true);
});
