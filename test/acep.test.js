import { Service } from "../lib";
import { getListPodResultReponseSchemaValidate } from "./schema/acep";
const defaultConfig = {
  serviceName: "ACEP",
  defaultVersion: "2020-10-25",
};
const ACEPService = new Service(defaultConfig);

test("edit:listPodEditResult", async () => {
  const response = await ACEPService.fetchOpenAPI({
    Action: "ListPod",
    Version: "2020-10-25",
    query: {
      product_id: '1426095758716702720',
    }
  });
  const validateResult = getListPodResultReponseSchemaValidate(response);
  expect(validateResult).toBe(true);
});
