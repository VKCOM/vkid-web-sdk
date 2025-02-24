import type { Config } from '#/core/config';

export const getStatsUrl = (method: string, config: Config) => {
  const { __vkidDomain: domain, app } = config.get();

  return `https://${domain}/${method}?app_id=${app}`;
};

export const getApiUrl = (method: string, config: Config) => {
  const { __apiDomain: domain } = config.get();

  return `https://${domain}/method/${method}`;
};

const makeParams = (params: Record<string, any>): string => {
  const pairs = Object.keys(params).map((key) => {
    let param = params[key];
    key = encodeURIComponent(key || '');
    param = encodeURIComponent(param === undefined ? '' : param);

    return `${key}=${param}`;
  });
  pairs.push('v=5.207');

  return pairs.join('&');
};

export const request = (url: string, params: Record<string, any>) => {
  const paramsString = makeParams(params);

  return fetch(url, {
    method: 'POST',
    body: paramsString,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => res.json());
};
