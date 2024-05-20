import { Languages, Scheme } from '#/types';

export enum WidgetState {
  LOADING = 'loading',
  LOADED = 'loaded',
  NOT_LOADED = 'not_loaded',
}

export interface WidgetElements {
  root: HTMLElement;
  iframe: HTMLIFrameElement;
}

export interface WidgetParams {
  /**
   * HTML элемент, в который будет вставлен виджет
   */
  container: HTMLElement;
  /**
   * Цветовая схема виджета
   */
  scheme?: Scheme;
  /**
   * Локализация
   */
  lang?: Languages;
}

export enum WidgetErrorCode {
  /**
   * Не загрузился iframe
   */
  TimeoutExceeded = 0,
  /**
   * Внутренняя ошибка
   */
  InternalError = 1,
  /**
   * Ошибка авторизации
   */
  AuthError = 2
}

export type WidgetErrorText = Record<WidgetErrorCode, string>;

export interface WidgetError {
  code: WidgetErrorCode;
  text: string;
  details?: Record<string, any>;
}
