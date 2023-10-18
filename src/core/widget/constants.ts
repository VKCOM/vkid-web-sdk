import { WidgetErrorCode, WidgetErrorText } from './types';

export const WIDGET_ERROR_TEXT: WidgetErrorText = {
  [WidgetErrorCode.TimeoutExceeded]: 'timeout',
  [WidgetErrorCode.InternalError]: 'internal error',
};
