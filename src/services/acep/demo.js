import { acep } from "@volcengine/openapi";
// import path from 'path';
const{ defaultService} = require('./index.js') ;
export async function main(AccessKeyId, SecretKey, SessionToken) {
  const newService = acep;
  const res = await newService.GetListPod({
    product_id: '1426095758716702720'
  })
  console.log(res)
}

// main();

// const{ defaultService} = require('./index.js') ;
// async function main(AccessKeyId, SecretKey, SessionToken) {
//   const newService = defaultService;
//   const res = await newService.GetListPod({
//     product_id: '1426095758716702720'
//   })
//   console.log(res)
// }

// main();