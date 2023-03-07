import { cdn } from "@volcengine/openapi";

export async function main(AccessKeyId, SecretKey) {
    // 使用默认的service实例 也可以创建一个新实例 const CdnService = new cdn.CdnService();
    const CdnService = cdn.defaultService;

    // 设置ak、sk
    CdnService.setAccessKeyId(AccessKeyId);
    CdnService.setSecretKey(SecretKey);

    // 预定义OpenAPI请求
    const body = {
        IP: "1.1.1.1",
    };
    await CdnService.DescribeIPInfo(body);
    // 无需传入body的OpenAPI请求
    // 以下两种皆可
    await CdnService.DescribeContentQuota();
    await CdnService.DescribeContentQuota({});

    // 自定义OpenAPI请求
    await CdnService.fetchOpenAPI({
        Action: "DescribeIPInfo",
        Version: "2021-03-01",
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        data: {
            IP: "1.1.1.1",
        },
    });
}
