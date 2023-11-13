import { Languages } from '#/types';

export type WidgetState = 'loading' | 'loaded' | 'not_loaded';

export interface WidgetElements {
  root: HTMLElement;
  iframe: HTMLIFrameElement;
}

export interface WidgetParams {
  /**
   * HTML элемент, в который будет вставлено окно с кнопкой
   */
  container: HTMLElement;
  /**
   * Цветовая схема виджета
   */
  scheme?: 'light' | 'dark';
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
  InternalError = 1
}

export type WidgetErrorText = Record<WidgetErrorCode, string>;

export interface WidgetError {
  code: WidgetErrorCode;
  text: string;
  details?: Record<string, any>;
}
