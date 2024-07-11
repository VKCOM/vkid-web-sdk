import { AuthStatsFlowSource, AuthToken } from '#/auth/types';

export interface RedirectPayload {
  code: string;
  type: AuthToken;
  state: string;
  device_id: string;
  expires_in: number;
}

export interface StatsInfoParams {
  flow_source?: AuthStatsFlowSource;
  session_id?: string;
}
