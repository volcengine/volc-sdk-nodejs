

  export interface ResponseMetadata {
      Action: string;
      Region: string;
      RequestId: string;
      Service: string;
      Version: string;
  }

  export interface Launcher {
      id: number;
      package_name: string;
      version_code: number;
      download_url: string;
      md5: string;
      status: number;
      product_type_list?: any;
      launcher_name: string;
  }

  export interface Product {
      product_id: string;
      product_type: number;
      product_name: string;
      account_id: number;
      owner_list: string;
      width: number;
      height: number;
      density: number;
      launcher_id: number;
      audit_status: number;
      rtc_app_id: string;
      rtc_app_key: string;
      create_at: number;
      description: string;
      media_service_id: number;
      media_service_name: string;
      user_name: string;
      user_list?: any;
      launcher: Launcher;
  }

  export interface Row {
      pod_id: string;
      pod_name?: any;
      product_id: string;
      group_id: string;
      instance_no: string;
      business_id: string;
      user_id: string;
      sn: string;
      ip: string;
      host_ip: string;
      status: number;
      width: number;
      height: number;
      dc: string;
      type: number;
      cpu: number;
      cpu_core: number;
      size: number;
      available_size: number;
      memory: number;
      sdk: number;
      package_id: string;
      online_time: number;
      online: number;
      room_id: string;
      expire_at: number;
      product: Product;
      app_id?: any;
  }

  export interface ITheListPodResult {
      row: Row[];
      total: number;
  }

  export interface IListPodResult {
      ResponseMetadata: ResponseMetadata;
      Result: ITheListPodResult;
  }

  export interface IGetListPodParams{
    product_id?: string;
    pod_id?: string;
    offset?: number;
    count?: number;
  }
  export interface IPodStartParams{
    product_id: string;
    pod_id?: string;
    app_id?: string;
    client_user_id: string;
  }
  export interface IThePodStartResult {
    pod_id: string;
    rtc_app_id: string;
    client_user_id: string;
    pod_user_id: string;
    room_id: string;
    token: string;
    width: number;
    height: number;
    rotation: 0 | 270;
    fps: number;
    kbps: number;
  }
  export interface IPodStartResult {
    ResponseMetadata: ResponseMetadata;
    Result: IThePodStartResult;
  }
  
  export interface IPodStopParams{
    pod_id: string;
  }

  export interface IPodStopResult {
    ResponseMetadata: ResponseMetadata;
    Result: null | 'success';
  }
