import { acep } from "@volcengine/openapi";

export async function main() {
  const newService = acep;
  const res = await newService.GetListPod({
    product_id: '1426095758716702720'
  })
  console.log(res)
}
