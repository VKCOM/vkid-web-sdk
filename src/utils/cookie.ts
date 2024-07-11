import { nanoid } from 'nanoid/non-secure';

import { COOKIE_EXPIRES_TIME_15_MIN } from '#/constants';

function getCookie(name: string) {
  try {
    let matches = document.cookie.match(new RegExp(
      '(?:^|; )' + ('vkid_sdk:' + name).replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)',
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  } catch (e) {
    return undefined;
  }
}

type ParamValue = string;

interface SetCookieParams {
  expires?: number;
  value?: ParamValue;
}

function setCookie(name: string, params: SetCookieParams) {
  try {
    const expireTime = new Date(new Date().getTime() + (params.expires || COOKIE_EXPIRES_TIME_15_MIN)).toUTCString();
    const allowedDomain = location.host.split('.').slice(-2).join('.');

    document.cookie = [
      `vkid_sdk:${name}=${encodeURIComponent(params.value || '')}`,
      `expires=${expireTime}`,
      'path=/',
      `domain=.${allowedDomain}`,
      'SameSite=Strict',
      'Secure',
    ].join('; ');
  } catch (e) {}
}

function clearCookie(name: string) {
  const allowedDomain = location.host.split('.').slice(-2).join('.');
  try {
    document.cookie = [
      `vkid_sdk:${name}=`,
      'expires=Thu, 01 Jan 1970 00:00:00 UTC',
      'path=/',
      'SameSite=Strict',
      'Secure',
      `domain=.${allowedDomain}`,
    ].join('; ');
  } catch (e) {}
}

export function cookie(name: string, params: SetCookieParams): string {
  if (params.value) {
    setCookie(name, params);
    return params.value;
  }

  let value;
  value = getCookie(name);

  if (!value) {
    value = nanoid(48);
    setCookie(name, { ...params, value });
  }

  return value;
}

export const state = (value?: ParamValue) => cookie('state', { value });
export const codeVerifier = (value?: ParamValue) => cookie('codeVerifier', { value });

export const clearStateCookie = () => clearCookie('state');
export const clearCodeVerifierCookie = () => clearCookie('codeVerifier');

const COOKIE_EXPIRES_TIME_1_YEAR = 31_536_000_000;

export function setExtIdCookie(value?: string) {
  if (!value) {
    return;
  }
  try {
    const expireTime = new Date(new Date().getTime() + COOKIE_EXPIRES_TIME_1_YEAR).toUTCString();
    const allowedDomain = location.host.split('.').slice(-2).join('.');

    document.cookie = [
      `vkidExtId=${encodeURIComponent(value || '')}`,
      `expires=${expireTime}`, // 1 year
      'path=/',
      `domain=.${allowedDomain}`, // .domain.com
      'SameSite=Strict',
      'Secure',
    ].join('; ');
  } catch (e) {}
}
