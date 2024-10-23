export enum MyTrackerStatus {
  OFF = 0,
  ON = 1,
  IN_PROGRESS = 2,
}

interface VKIDSDKGetConfig {
  tracker_id: number;
  active: MyTrackerStatus;
  result: 'success' | 'error';
}

export interface VKIDSDKGetConfigResponse {
  response: VKIDSDKGetConfig;
}
