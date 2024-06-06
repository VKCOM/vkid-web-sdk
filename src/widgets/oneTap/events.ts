export enum OneTapInternalEvents {
  LOGIN_SUCCESS = 'onetap: success login',
  SHOW_FULL_AUTH = 'onetap: show full auth',
  START_AUTHORIZE = 'onetap: start authorize',
  NOT_AUTHORIZED = 'onetap: not authorized',
  /**
   * Событие вызывается при наличии аутентификации пользователя.
   * В качестве payload передается флаг is_online: boolean.
   */
  AUTHENTICATION_INFO = 'onetap: authentication_info',
}
