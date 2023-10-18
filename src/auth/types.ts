import { Languages } from '#/types';

export interface AuthParams {
  /**
   * Цветовая тема, в которой будет отображена страница авторизации
   */
  scheme?: 'bright_light' | 'space_gray';

  /**
   * Локализация, в которой будет отображена страница авторизации
   */
  lang?: Languages;

  /**
   * Дополнительные параметры
   */
  [key: string]: any;
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
