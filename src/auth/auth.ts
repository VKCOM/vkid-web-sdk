import { Config } from '#/core/config';
import { getVKIDUrl } from '#/utils/url';

import { AUTH_RESPONSE_TOKEN } from './constants';
import { AuthParams, AuthQueryParams } from './types';

export class Auth {
  public static __config: Config;

  public readonly login = (params?: AuthParams): void => {
    const queryParams: AuthQueryParams = {
      lang_id: params?.lang,
      scheme: params?.scheme,
      screen: params?.screen,
      response_type: AUTH_RESPONSE_TOKEN,
      action: params?.action ? btoa(JSON.stringify(params.action)) : undefined,
    };

    const url = getVKIDUrl('auth', queryParams, Auth.__config.get());
    location.assign(url);
  }
}
