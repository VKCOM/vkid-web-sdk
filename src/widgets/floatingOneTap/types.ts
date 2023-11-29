import { WidgetParams } from '#/core/widget';

export interface FloatingOneTapIndent {
  /**
   * Отступ от верхней границы окна (не учитывается в мобильном отображении)
   */
  top?: number;
  /**
   * Отступы от правой границы окна (не учитывается в мобильном отображении)
   */
  right?: number;
  /**
   * Отступы от нижней границы окна (учитывается только в мобильном отображении)
   */
  bottom?: number;
}

export enum FloatingOneTapContentId {
  /**
   * Войти или зарегистрироваться
   */
  SIGN_IN_TO_SERVICE = 0,
  /**
   * Войти в учетную запись сервиса
   */
  SIGN_IN_TO_ACCOUNT = 1,
  /**
   * Регистрация на мероприятие
   */
  REGISTRATION_FOR_EVENT = 2,
  /**
   * Подача заявки
   */
  SUBMIT_APPLICATIONS = 3,
  /**
   * Оформление заказа в сервисе
   */
  MAKE_ORDER_WITH_SERVICE = 4,
  /**
   * Оформление заказа
   */
  MAKE_ORDER_WITHOUT_SERVICE = 5,
}

export interface FloatingOneTapParams extends Omit<WidgetParams, 'container'> {
  /**
   * Отступы от границ окна
   */
  indent?: FloatingOneTapIndent;
  /**
   * Тип отображаемого контента
   */
  contentId?: FloatingOneTapContentId;
  /**
   * Отображение кнопки входа другим способом
   */
  showAlternativeLogin?: boolean | 0 | 1;
  /**
   * Имя приложения из конфигурации приложения VK ID
   */
  appName: string;
}
