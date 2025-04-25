import Signer from "../src/base/sign";
import { RequestObj, Credentials } from "../src/base/types";
const { VOLC_ACCESSKEY = "", VOLC_SECRETKEY = "", TEST_SIGNER = "" } = process.env;

if (TEST_SIGNER) {
  const date = new Date(1662609419724);
  describe("getSignUrl", () => {
    const caseTable: {
      name: string;
      requestObj: RequestObj;
      serviceName: string;
      credentials: Credentials;
      expected: string;
    }[] = [
      {
        name: "result",
        requestObj: {
          method: "POST",
          region: "cn-north-1",
          params: {
            Action: "AssumeRole",
            Version: "2018-01-01",
            RoleTrn: "trn:iam::2000001050:role/STSRole",
            RoleSessionName: "test",
          },
        },
        serviceName: "sts",
        credentials: {
          accessKeyId: VOLC_ACCESSKEY,
          secretKey: VOLC_SECRETKEY,
        },
        expected: `Action=AssumeRole&RoleSessionName=test&RoleTrn=trn%3Aiam%3A%3A2000001050%3Arole%2FSTSRole&Version=2018-01-01&X-Algorithm=HMAC-SHA256&X-Credential=akfsrq251-9xaf44f-xxaff-fadbaa%2F20220908%2Fcn-north-1%2Fsts%2Frequest&X-Date=20220908T035659Z&X-NotSignBody=&X-SignedHeaders=&X-SignedQueries=Action%3BRoleSessionName%3BRoleTrn%3BVersion%3BX-Algorithm%3BX-Credential%3BX-Date%3BX-NotSignBody%3BX-SignedHeaders&X-Signature=`,
      },
    ];

    for (const c of caseTable) {
      it(c.name, function () {
        const signer = new Signer(c.requestObj, c.serviceName);
        const queryString = signer.getSignUrl(c.credentials, date);
        const queryStrWithoutSig = queryString.replace(/X-Signature=[^&]+/, "X-Signature=");
        expect(queryStrWithoutSig).toEqual(c.expected);
      });
    }
  });
}

test("x-content-sha256", () => {
  const buffer = Buffer.from("hello world");
  const hash = "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9";
  const request = {
    body: buffer,
    method: "POST",
    region: "cn-north-1",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const signer = new Signer(request, "sts");
  signer.addAuthorization({
    accessKeyId: VOLC_ACCESSKEY,
    secretKey: VOLC_SECRETKEY,
  });
  const computedHash = request.headers["X-Content-Sha256"];
  expect(computedHash).toEqual(hash);
});