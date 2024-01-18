import { WidgetParams } from '#/core/widget';
import { OAuthName } from '#/widgets/oauthList';

export interface OneTapStyles {
  /**
   * Ширина кнопки
   */
  width?: number;
  /**
   * Высота кнопки
   */
  height?: 32 | 34 | 36 | 38 | 40 | 42 | 44 | 46 | 48 | 50 | 52 | 54 | 56;
  /**
   * Скругление кнопки
   */
  borderRadius?: number;
}

export interface OneTapParams extends WidgetParams {
  /**
   * Отображение кнопки входа другим способом
   */
  showAlternativeLogin?: boolean | 0 | 1;
  /**
   * Настройки внешнего вида
   */
  styles?: OneTapStyles;
  /**
   * Стиль отображения кнопки
   */
  skin?: 'primary' | 'secondary';
  /**
   * Список внешних сервисов авторизации
   */
  oauthList?: OAuthName[];
}
