import { querystring } from '@vkontakte/vkjs';

import { VERSION } from '#/constants';
import { ConfigData } from '#/core/config';

export const getVKIDUrl = (module: string, params: Record<string, any>, config: ConfigData): string => {
  const queryParams: Record<string, any> = {
    ...params,
    v: VERSION,
    app_id: config.app,
    sdk_type: 'vkid',

    debug: config.__debug ? 1 : null,
    localhost: config.__localhost ? 1 : null,
  };

  const queryParamsString = querystring.stringify(queryParams, { skipNull: true });

  return `https://${config.vkidDomain}/${module}?${queryParamsString}`;
};
