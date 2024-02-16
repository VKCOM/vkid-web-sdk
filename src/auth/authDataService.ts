import { DataService } from '#/core/dataService';

import { AUTH_ERROR_TEXT } from './constants';
import { AuthError, AuthErrorCode, AuthResponse } from './types';

export class AuthDataService extends DataService<AuthResponse, AuthError> {
  // TODO: Типизировать payload
  public readonly sendSuccessData = (payload: any) => {
    this.sendSuccess({
      type: payload.type,
      token: payload.token,
      ttl: payload.ttl,
    });
  }

  public readonly sendNewTabHasBeenClosed = () => {
    this.sendError({
      code: AuthErrorCode.NewTabHasBeenClosed,
      text: AUTH_ERROR_TEXT[AuthErrorCode.NewTabHasBeenClosed],
    });
  }

  // TODO: Типизировать details
  public readonly sendAuthorizationFailed = (details: any) => {
    this.sendError({
      code: AuthErrorCode.AuthorizationFailed,
      text: AUTH_ERROR_TEXT[AuthErrorCode.AuthorizationFailed],
      details,
    });
  }

  public readonly sendEventNotSupported = () => {
    this.sendError({
      code: AuthErrorCode.EventNotSupported,
      text: AUTH_ERROR_TEXT[AuthErrorCode.EventNotSupported],
    });
  }

  public readonly sendCannotCreateNewTab = () => {
    this.sendError({
      code: AuthErrorCode.CannotCreateNewTab,
      text: AUTH_ERROR_TEXT[AuthErrorCode.CannotCreateNewTab],
    });
  }
}
