import { BridgeMessage } from '#/core/bridge';
import { WidgetEvents, WidgetParams } from '#/core/widget';
import { RedirectPayload } from '#/utils/url';
import { OAuthName } from '#/widgets/oauthList';

import { OneTapInternalEvents } from './events';

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

export enum OneTapSkin {
  Primary = 'primary',
  Secondary = 'secondary',
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
  skin?: OneTapSkin;
  /**
   * Список внешних сервисов авторизации
   */
  oauthList?: OAuthName[];
  /**
   * Отображение состояния кнопки "Продолжить как"
   * @defaultValue `true`
   */
  fastAuthEnabled?: boolean;
}

export interface OneTapBridgeFullAuthParams {
  uuid: string;
  screen?: string;
  sdk_oauth?: OAuthName;
}

type OneTapBridgeParams = OneTapBridgeFullAuthParams | RedirectPayload;
type OneTapEvents = OneTapInternalEvents | WidgetEvents;

export type OneTapBridgeMessage = BridgeMessage<OneTapEvents, OneTapBridgeParams>;

