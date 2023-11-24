import { WidgetParams } from '#/core/widget';

export enum OAuthName {
  OK = 'ok_ru',
  MAIL = 'mail_ru',
  VK = 'vkid',
}

export interface OAuthListStyles {
  /**
   * Высота кнопки
   */
  height?: 32 | 34 | 36 | 38 | 40 | 42 | 44 | 46 | 48 | 50 | 52 | 54 | 56;
  /**
   * Скругление иконок
   */
  borderRadius?: number;
}

export interface OAuthListParams extends WidgetParams {
  /**
   * Настройки внешнего вида
   */
  styles?: OAuthListStyles;
  /**
   * Список внешних сервисов авторизации
   */
  oauthList: OAuthName[];
}
