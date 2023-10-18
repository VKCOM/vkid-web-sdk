// @ts-ignore-next-line пробрасываем версию из package.json в rollup.config
export const VERSION: string = env.VERSION;
// @ts-ignore-next-line пробрасываем тип сборки из rollup.config
export const PRODUCTION = env.PRODUCTION;
// @ts-ignore-next-line пробрасываем тип сборки из rollup.config
export const DOMAIN = 'vk.com';

export const LOGIN_DOMAIN = `login.${DOMAIN}`;
export const OAUTH_DOMAIN = `oauth.${DOMAIN}`;
export const VKID_DOMAIN = `id.${DOMAIN}`;
export const ALLOWED_DOMAINS = ['vk.com', 'vk.ru'];
export const DEFAULT_DOMAIN = 'vk.com';
export const DOMAIN_FILE_URL = 'https://vk.ru/domain.txt';
