import { Languages, Scheme } from '#/types';

export interface AuthParams {
  /**
   * Цветовая тема, в которой будет отображена страница авторизации
   */
  scheme?: Scheme;

  /**
   * Локализация, в которой будет отображена страница авторизации
   */
  lang?: Languages;

  /**
   * @ignore
   */
  action?: AuthAction;

  /**
   * @ignore
   */
  screen?: string;
}

export enum AuthErrorCode {
  /**
   * Неизвестное событие
   */
  EventNotSupported = 100,

  /**
   * Новая вкладка не создалась
   */
  CannotCreateNewTab = 101,

  /**
   * Новая вкладка была закрыта
   */
  NewTabHasBeenClosed = 102,

  /**
   * Авторизация завершилась ошибкой
   */
  AuthorizationFailed = 103,
}

export type AuthErrorText = Record<AuthErrorCode, string>;

export interface AuthError {
  /**
   * Код ошибки
   */
  code: AuthErrorCode;

  /**
   * Текст ошибки
   */
  text: string;

  /**
   * Расширенная информация об ошибке
   */
  details?: any;
}

export type AuthToken = 'silent_token';

export interface AuthResponse {
  /**
   * Токен, полученный после прохождения авторизации
   */
  token: string;

  /**
   * Вид токена
   */
  type: AuthToken;

  /**
   * Время жизни токена
   */
  ttl: number;
}

type AuthActionNames = 'sdk_oauth';

interface AuthAction {
  name: AuthActionNames;
  params: any;
}

export interface AuthQueryParams {
  uuid?: string;
  lang_id?: Languages;
  scheme?: Scheme;
  screen?: string;
  response_type: string; // и под токены
  action?: string;
  origin?: string;
}
