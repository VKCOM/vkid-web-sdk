import { AuthToken } from '#/auth/types';

export interface RedirectPayload {
  code: string;
  type: AuthToken;
  state: string;
  device_id: string;
}
