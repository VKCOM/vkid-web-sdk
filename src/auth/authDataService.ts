import { DataService } from '#/core/dataService';
import { state } from '#/utils/cookie';

import { AUTH_ERROR_TEXT } from './constants';
import { AuthError, AuthErrorCode, AuthResponse } from './types';

export class AuthDataService extends DataService<AuthResponse, AuthError> {
  private readonly state = state();

  public readonly sendSuccessData = (payload: AuthResponse) => {
    this.sendSuccess({
      type: payload.type,
      code: payload.code,
      state: payload.state,
      device_id: payload.device_id,
      expires_in: payload.expires_in,
      ext_id: payload.ext_id,
    });
  }

  public readonly sendNewTabHasBeenClosed = () => {
    this.sendError({
      code: AuthErrorCode.NewTabHasBeenClosed,
      error: AUTH_ERROR_TEXT[AuthErrorCode.NewTabHasBeenClosed],
      state: this.state,
    });
  }

  // TODO: Типизировать details
  public readonly sendAuthorizationFailed = (details: any) => {
    this.sendError({
      code: AuthErrorCode.AuthorizationFailed,
      error: AUTH_ERROR_TEXT[AuthErrorCode.AuthorizationFailed],
      error_description: JSON.stringify(details),
      state: this.state,
    });
  }

  public readonly sendEventNotSupported = () => {
    this.sendError({
      code: AuthErrorCode.EventNotSupported,
      error: AUTH_ERROR_TEXT[AuthErrorCode.EventNotSupported],
      state: this.state,
    });
  }

  public readonly sendCannotCreateNewTab = () => {
    this.sendError({
      code: AuthErrorCode.CannotCreateNewTab,
      error: AUTH_ERROR_TEXT[AuthErrorCode.CannotCreateNewTab],
      state: this.state,
    });
  }

  public readonly sendStateMismatchError = () => {
    this.sendError({
      code: AuthErrorCode.StateMismatch,
      error: AUTH_ERROR_TEXT[AuthErrorCode.StateMismatch],
      state: this.state,
    });
  }
}
