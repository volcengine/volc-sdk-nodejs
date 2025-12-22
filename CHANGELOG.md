2025-12-22 Bumped to version v1.34.0
- tls:
  - 新增接口与存量接口参数补齐

2025-12-11 Bumped to version v1.33.0
- tls:
  - 新增接口以及类型

2025-08-28 Bumped to version v1.32.0
- imagex:
  - codegen 新增一批接口

2025-08-14 Bumped to version v1.31.1
- imagex:
  - codegen 生成一批新接口
- add @types/node devDependencies

2025-05-22 Bumped to version v1.30.2
- tls:
  - demo js订正，不涉及逻辑代码变更

2025-04-24 Bumped to version v1.30.1
- tls:
  - 增加接口入参 region 校验，优化报错输出文案

2025-04-10 Bumped to version v1.30.0
- vod:
  - 支持流上传
- imagex:
  - 支持分片上传，通过`UploadImages`方法的`chunkUpload`参数进行指定。
  - 支持指定上传文件的存储类型。
  - 修正`UploadImages`指定`SkipCommit`为`true`时返回值的格式。

2025-03-31 Bumped to version v1.29.0
- imagex:
  - 新增一批API

2025-03-20 Bumped to version v1.28.1
- vikingdb:
  - 向量库创建数据集传参修复

2025-03-06 Bumped to version v1.28.0
- vikingdb:
  - 补充向量库sdk

2025-02-13 Bumped to version v1.27.1
- fix: Upgrade protobufjs to fix CVE-2023-36665

2024-12-26 Bumped to version v1.27.0
- imagex:
  - 上传文件时，使用https
  - 默认 host 修改为 imagex.volcengineapi.com

2024-12-16 Bumped to version v1.26.0
- vod:
  - 上传切换https协议

2024-11-28 Bumped to version v1.25.0
- imagex:
  - 新增一批接口，对齐火山引擎文档

2024-11-14 Bumped to version v1.24.0
- imagex:
  - 新增豆包 AIGC 相关 API

2024-10-17 Bumped to version v1.23.0
- vikingdb:
  - 向量数据库创建数据集新增支持自动主键；当创建的数据集没有指定主键时，系统会自动分配一个主键

2024-09-26 Bumped to version v1.22.0
- vikingdb
  - 新建数据集时，Text 字段类型 Pipeline 新增支持 `text_doubao_embedding`、`text_split_doubao_embedding`、`text_doubao_embedding_and_m3` 和 `text_split_doubao_embedding_and_m3`
  - Embedding ModuleName 新增支持 `doubao-embedding` 和 `doubao-embedding-and-m3`

2024-09-05 Bumped to version v1.21.0
- tls:
  - 新增 trace 接口

2024-08-22 Bumped to version v1.20.1
- vikingdb:
  - fix: must type 检索字段错误
- imagex:
  - fix: 去除get请求的body参数

2024-08-08 Bumped to version v1.20.0
- imagex:
  - 上传文件支持通过 ContentTypes 参数指定对应文件类型（ContentType）
  - 数据查询部分 API 新增 query 参数

2024-06-13 Bumped to version v1.19.0
- vikingdb :
  - 新增向量数据库 Nodejs SDK，包含数据集、索引、搜索数据、检索、Embedding 相关 API

2024-05-14 Bumped to version v1.18.3
- imagex:
  - 支持指定文件上传中 API 调用的超时时间
  - 优化文件上传报错信息

2024-05-07 Bumped to version v1.18.2
- imagex:
  - 修复文件上传问题

2024-04-18 Bumped to version v1.18.1
- 升级 crypto-js 解决安全问题
- vod:
  - 点播demo获取aksk优化

2024-04-09 Bumped to version v1.18.0
- imagex:
  - UploadImages 方法入参调整，参考服务端的部分实现，支持传入 ApplyImageUpload 和 CommitImageUpload 的所有参数
  - 补充 & 处理 UploadImages 方法内的报错信息
  - 补充 API 列表

2024-04-01 Bumped to version v1.17.0
- imagex:
  - add more imagex api 
  - upload auth supports type and size limit

2024-01-11 Bumped to version v1.16.0
- maas:
  - V1 增加 Embeddings 接口
  - 适配 V2 接口
- tls:
  - 修改 defaultOption

2023-12-28 Bumped to version v1.15.0
- rocketmq: 支持多副本

2023-12-18 Bumped to version v1.14.1
- maas: 修复 timeout 参数问题

2023-11-23 Bumped to version v1.14.0
- tls: 修复测试报错问题
- maas: 新增 tokenization & classification

2023-11-15 Bumped to version v1.13.0
- sms: 新增视频短信模板返回值参数

2023-10-19 Bumped to version v1.12.0
- maas: function_call && web references

2023-10-12 Bumped to version v1.11.2
- tls: fix tls lz4

2023-08-24 Bumped to version v1.11.1
- maas: optimize stream api

2023-08-18 Bumped to version v1.11.0
- feat: Add maas api

2023-06-15 Bumped to version v1.10.2
- chore: Add node version requirements
- fix: Upgrade protobufjs to fix high-risk vulnerabilities

2023-06-15 Bumped to version v1.10.0
- vod: support sharded upload

2023-05-25 Bumped to version v1.9.3
- base: fix type issue

2023-05-25 Bumped to version v1.9.2
- livesaas: remove unused url

2023-05-12 Bumped to version v1.9.1
- fix build issue

2023-05-11 Bumped to version v1.9.0
- add sms openapi

2023-04-28 Bumped to version v1.8.1
- add LICENSE file

2023-03-07 Bumped to version v1.8.0
- add cdn openapi

2023-02-10 Bumped to version v1.7.1
- tls：修复 TS 类型错误

2022-12-29 Bumped to version v1.7.0
- vod: 上传支持传入 FileName 和 FileExtension

2022-11-30 Bumped to version v1.6.1
- rocketmq: 新版实例topic&group不拼接命名空间
- 新增 sts 服务

2022-11-24 Bumped to version v1.6.0
- rtc: upgrade openapi version

2022-09-23 Bumped to version v1.5.2
- remove bad npm mirror url

2022-09-08 Bumped to version v1.5.0
- service: add billing service
- signer: add getSignUrl method 

2022-08-25 Bumped to version v1.4.1
- edit: fix content type
- add: livesaas 

2022-08-10 Bumped to version v1.4.0
- tls: 修复 lz4 在数据很小时，不压缩的问题
- live: casterplayer token

2022-08-04 Bumped to version v1.3.0
- add live api
- add RTC readme file


2022-06-30 Bumped to version v1.2.3
- fix tls installation issue

2022-05-19 Bumped to version v1.2.2
- fix tls service issue

2022-05-13 Bumped to version v1.2.1
- fix ts compile error

2022-05-12 Bumped to version v1.2.0
- 增加 tls api
- 修复 formdata 签名问题
- 修复 query 为空签名失败问题

2022-03-31 Bumped to version v1.1.4
- 增加版权声明文件

2022-01-18 Bumped to version v1.1.3
- 增加一些点播 API

2021-12-16 Bumped to version v1.1.2
- 调整GetUploadAuth参数storeKeys为非必填项
- 修复js项目缺少tslib的问题
- 增加点播sdk

2021-09-15 Bumped to version v1.1.1
- 添加 `openAPI` 签名方法和使用文档

2021-09-13 Bumped to version v1.1.0
- 添加rtc api

2021-08-26 Bumped to version v1.0.10
- 添加云游戏相关 api

2021-08-06 Bumped to version v1.0.9
- 增加 i18n unit test

2021-07-15 Bumped to version v1.0.8
- 增加 i18n OpenAPI

2021-07-12 Bumped to version v1.0.7
- 增加 imagex 签名算法.

2021-03-02 Bumped to version v1.0.6
- 支持下发 ststoken.
- 新增 imagex 获取临时上传token接口. 

2021-03-02 Bumped to version v1.0.5
- Fix json content type bug.

2021-03-02 Bumped to version v1.0.4
- Fix nodejs sign bug.

2021-02-05 Bumped to version v1.0.3
- Fix nodejs sign bug.

2021-02-04 Bumped to version v1.0.2
- Add cloud-edit api.

2021-01-28 Bumped to version v1.0.1
- Add more imagex api.

2021-01-11 Bumped to version v1.0.0
- Add visual sdk.

