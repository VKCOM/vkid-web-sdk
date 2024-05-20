import { AuthDataService } from '#/auth/authDataService';
import { AUTH_ERROR_TEXT } from '#/auth/constants';
import { AuthErrorCode, AuthResponse } from '#/auth/types';
import { state } from '#/utils/cookie';

describe('AuthDataService', () => {
  beforeEach(() => {
    reporter
      .addLabel('Layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'AuthDataService')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  test('Must return data on successful completion', async () => {
    const dataService = new AuthDataService();
    const successData: AuthResponse = {
      code: 'code',
      state: 'state',
      type: 'code_v2',
      device_id: 'device_id',
    };
    dataService.sendSuccessData(successData);

    const data = await dataService.value;
    expect(data).toEqual({
      code: 'code',
      type: 'code_v2',
      state: 'state',
      device_id: 'device_id',
    });
  });

  test('Must return error: new tab has been closed', async () => {
    const dataService = new AuthDataService();
    const error = {
      code: AuthErrorCode.NewTabHasBeenClosed,
      error: AUTH_ERROR_TEXT[AuthErrorCode.NewTabHasBeenClosed],
      state: state(),
    };

    dataService.sendNewTabHasBeenClosed();

    try {
      await dataService.value;
    } catch (e) {
      expect(e).toEqual(error);
    }
  });

  test('Must return error: event not supported', async () => {
    const dataService = new AuthDataService();
    const error = {
      code: AuthErrorCode.EventNotSupported,
      error: AUTH_ERROR_TEXT[AuthErrorCode.EventNotSupported],
      state: state(),
    };

    dataService.sendEventNotSupported();

    try {
      await dataService.value;
    } catch (e) {
      expect(e).toEqual(error);
    }
  });

  test('Must return error: cannot create new tab', async () => {
    const dataService = new AuthDataService();
    const error = {
      code: AuthErrorCode.CannotCreateNewTab,
      error: AUTH_ERROR_TEXT[AuthErrorCode.CannotCreateNewTab],
      state: state(),
    };

    dataService.sendCannotCreateNewTab();

    try {
      await dataService.value;
    } catch (e) {
      expect(e).toEqual(error);
    }
  });

  test('Must return error: authorization failed', async () => {
    const dataService = new AuthDataService();
    const additionally = {
      additionally: 'additionally',
    };
    const error = {
      code: AuthErrorCode.AuthorizationFailed,
      error: AUTH_ERROR_TEXT[AuthErrorCode.AuthorizationFailed],
      state: state(),
      error_description: additionally,
    };

    dataService.sendAuthorizationFailed(additionally);

    try {
      await dataService.value;
    } catch (e) {
      expect(e).toEqual({ ...error, error_description: JSON.stringify(additionally) });
    }
  });
});
