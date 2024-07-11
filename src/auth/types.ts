import { OAUTH2_CODE_TYPE } from '#/auth/constants';
import { Languages, Scheme } from '#/types';
import { OAuthName } from '#/widgets/oauthList';

export enum AuthStatsFlowSource {
  AUTH = 'from_custom_auth',
  BUTTON_ONE_TAP = 'from_one_tap',
  FLOATING_ONE_TAP = 'from_floating_one_tap',
  MULTIBRANDING = 'from_multibranding'
}

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
  provider?: OAuthName;
  /**
   * @ignore
   */
  screen?: string;
  /**
   * @ignore
   */
  statsFlowSource?: AuthStatsFlowSource;
  /**
   * @ignore
   */
  uniqueSessionId?: string;
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
  /**
   * Проверка стейта завершилась с ошибкой
   */
  StateMismatch = 104,
}

export type AuthErrorText = Record<AuthErrorCode, string>;

export type AuthToken = typeof OAUTH2_CODE_TYPE;

export interface AuthResponse {
  /**
   * Код, полученный после прохождения авторизации
   */
  code: string;

  /**
   * Вид токена
   */
  type: AuthToken;

  /**
   * Состояние, указанное в конфиге
   */
  state: string;

  /**
   * Идентификатор устройства, использовавшийся для создания кода
   */
  device_id: string;

  /**
   * Срок жизни кода авторизации в секундах
   */
  expires_in: number;

  /**
   * @ignore
   */
  ext_id?: string;
}

export interface AuthQueryParams {
  uuid?: string;
  lang_id?: Languages;
  scheme?: Scheme;
  response_type: string;
  code_challenge: string;
  code_challenge_method: string;
  scope?: string;
  origin?: string;
  client_id: number;
  state?: string;
  provider?: OAuthName;
  screen?: string;
  oauth_version?: number;
  prompt: string;
  stats_info?: string;
}

export interface AuthError {
  /**
   * Текст ошибки
   */
  error: string;

  /**
   * Расширенная информация об ошибке
   */
  error_description?: string;

  /**
   * Страница HTML с человеко-понятным описанием ошибки.
   */
  error_uri?: string;

  /**
   * Строка переданная в изначальном запросе.
   */
  state?: string;

  /**
   * Код ошибки, возникшей во время работы SDK
   */
  code?: AuthErrorCode;
}

export interface TokenResult {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  state: string;
  token_type: string;
  user_id: number;
  scope: string;
}

export interface LogoutResult {
  response: number;
}

interface UserData {
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  user_id: string;
}

export interface PublicInfoResult {
  user: UserData;
}

export interface UserInfoResult {
  user: Partial<UserData>;
}
