import { AuthErrorCode, AuthErrorText, AuthToken } from '#/auth/types';

export const AUTH_RESPONSE_TOKEN: AuthToken = 'silent_token';

export const AUTH_ERROR_TEXT: AuthErrorText = {
  [AuthErrorCode.EventNotSupported]: 'Event is not supported',
  [AuthErrorCode.CannotCreateNewTab]: 'Cannot create new tab. Try checking your browser settings',
  [AuthErrorCode.NewTabHasBeenClosed]: 'New tab has been closed',
  [AuthErrorCode.AuthorizationFailed]: 'Authorization failed with an error',
};

export const AUTH_VK_CONNECT_RESPONSE = 'vk_connect_response';
