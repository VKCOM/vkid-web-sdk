import { querystring } from '@vkontakte/vkjs';

import { VERSION } from '#/constants';
import { Config, ConfigData } from '#/core/config';
import { uuid } from '#/utils/uuid';

export const getVKIDUrl = (module: string, params: Record<string, any>, config: ConfigData): string => {
  const queryParams: Record<string, any> = {
    ...params,
    uuid: uuid(),
    v: VERSION,
    sdk_type: 'vkid',
    app_id: config.app,
    redirect_uri: config.redirectUrl,
    redirect_state: config.state,

    debug: config.__debug ? 1 : null,
    localhost: config.__localhost ? 1 : null,
  };

  const queryParamsString = querystring.stringify(queryParams, { skipNull: true });

  return `https://${config.__vkidDomain}/${module}?${queryParamsString}`;
};

// TODO: добавить типы
export const getRedirectWithPayloadUrl = (payload: any, config: Config): string => {
  let url = `${config.get().redirectUrl}?payload=${encodeURIComponent(JSON.stringify(payload))}`;
  if (config.get().state) {
    url += `&state=${config.get().state}`;
  }

  return url;
};
