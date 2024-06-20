import { querystring } from '@vkontakte/vkjs';

import { VERSION } from '#/constants';
import { Config, ConfigData } from '#/core/config';

import { RedirectPayload, StatsInfoParams } from './types';

export const getVKIDUrl = (module: string, params: Record<string, any>, config: ConfigData): string => {
  const queryParams: Record<string, any> = {
    ...params,
    v: VERSION,
    sdk_type: 'vkid',
    app_id: config.app,
    redirect_uri: config.redirectUrl,

    debug: config.__debug ? 1 : null,
    localhost: config.__localhost ? 1 : null,
  };

  const queryParamsString = querystring.stringify(queryParams, { skipNull: true });

  return `https://${config.__vkidDomain}/${module}?${queryParamsString}`;
};

export const getRedirectWithPayloadUrl = (payload: RedirectPayload, config: Config): string => {
  const redirectUrlFromConfig = config.get().redirectUrl;
  const containsQuery = redirectUrlFromConfig.includes('?');
  const params = Object.keys(payload).map((key: keyof RedirectPayload) => encodeURIComponent(key) + '=' + encodeURIComponent(payload[key])).join('&');
  return `${redirectUrlFromConfig}${containsQuery ? '&' : '?'}${params}`;
};

export const encodeStatsInfo = (params: StatsInfoParams) => {
  const hasParams = Object.values(params).filter(Boolean).length;

  if (hasParams) {
    return btoa(JSON.stringify(params));
  }
};
