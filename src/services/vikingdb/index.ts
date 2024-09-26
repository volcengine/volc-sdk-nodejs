import type { VikingdbRegion } from "./types";
import { CollectionService } from "./collection";
import { IndexService } from "./index/index";
import { DataService } from "./data";
import { EmbeddingService } from "./embedding";
import { SearchService } from "./search";
import { CustomService } from "./custom";

interface ModuleService {
  collection: CollectionService;
  index: IndexService;
  data: DataService;
  embedding: EmbeddingService;
  search: SearchService;
  custom: CustomService;
}

interface Options {
  ak: string;
  sk: string;
  /**
   * 请求后端 region
   * @default cn-beijing
   */
  region?: VikingdbRegion;
  /**
   * 如果是进行角色扮演请求，需要先通过 AssumeRole 获取临时的 aksk 和 sessionToken
   * @example
   * import { sts, vikingdb } from '@volcengine/volc-sdk-nodejs'
   *
   * const stsService = new sts.StsService({
   *     RoleTrn: 'trn:iam::{accountId}:role/{roleName}',
   *     RoleSessionName: 'TempSessionName',
   * })
   * const { Result } = await stsService.AssumeRole()
   * if (!Result.Credentials) {
   *     return
   * }
   * const vikingdbService = new vikingdb.VikingdbService({
   *     ak: Result.Credentials.AccessKeyId,
   *     sk: Result.Credentials.SecretAccessKey,
   *     sessionToken: Result.Credentials.SessionToken
   * })
   * @link https://www.volcengine.com/docs/6257/86374
   */
  sessionToken?: string;
}

/**
 * @example
 * import { vikingdb } from '@volcengine/volc-sdk-nodejs'
 * const service = new vikingdb.VikingdbService({ ak, sk, region })
 * await service.collection.ListCollections()
 */
export class VikingdbService implements ModuleService {
  readonly collection: CollectionService;
  readonly index: IndexService;
  readonly data: DataService;
  readonly embedding: EmbeddingService;
  readonly search: SearchService;
  readonly custom: CustomService;

  constructor({ ak, sk, region = "cn-beijing", sessionToken }: Options) {
    this.collection = new CollectionService(ak, sk, region, sessionToken);
    this.index = new IndexService(ak, sk, region, sessionToken);
    this.data = new DataService(ak, sk, region, sessionToken);
    this.embedding = new EmbeddingService(ak, sk, region, sessionToken);
    this.search = new SearchService(ak, sk, region, sessionToken);
    this.custom = new CustomService(ak, sk, region, sessionToken);
  }
}

export { collection } from "./collection";
export { index } from "./index/index";
export { data } from "./data";
export { embedding } from "./embedding";
export { search } from "./search";
export {
  VikingdbResponse,
  VikingdbErrorCode,
  VikingdbError,
  VikingdbRequestError,
  FieldType,
} from "./types";
