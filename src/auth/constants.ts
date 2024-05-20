import { AuthErrorCode, AuthErrorText } from '#/auth/types';

export const OAUTH2_CODE_TYPE = 'code_v2';
export const OAUTH2_RESPONSE_TYPE = 'code';

export const AUTH_ERROR_TEXT: AuthErrorText = {
  [AuthErrorCode.EventNotSupported]: 'Event is not supported',
  [AuthErrorCode.CannotCreateNewTab]: 'Cannot create new tab. Try checking your browser settings',
  [AuthErrorCode.NewTabHasBeenClosed]: 'New tab has been closed',
  [AuthErrorCode.AuthorizationFailed]: 'Authorization failed with an error',
  [AuthErrorCode.StateMismatch]: 'The received state does not match the expected state',
};

export const OAUTH2_RESPONSE = 'oauth2_authorize_response';
