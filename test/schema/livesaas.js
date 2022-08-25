import Ajv from "ajv";
const ajv = new Ajv();

export const GetLivesaasUploadUserTokenSchemaValidate = ajv.compile({
  type: "object",
  properties: {
    AccessKeyId: {
      type: "string",
    },
    SecretAccessKey: {
      type: "string",
    },
    CurrentTime: {
      type: "string",
    },
    ExpiredTime: {
      type: "string",
    },
    SessionToken: {
      type: "string",
    },
  },
  required: ["AccessKeyId", "SecretAccessKey", "CurrentTime", "ExpiredTime", "SessionToken"],
});
