import { AuthDataService } from '#/auth/authDataService';
import { AUTH_ERROR_TEXT } from '#/auth/constants';
import { AuthErrorCode } from '#/auth/types';

describe('AuthDataService', () => {
  beforeEach(() => {
    reporter
      .addLabel('Layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'AuthDataService')
      .addLabel('Suite', 'Units');
  });

  test('Must return data on successful completion', async () => {
    const dataService = new AuthDataService();
    const successData = {
      additionally: 'additionally',
      token: 'token',
      type: 'type',
      ttl: 600,
    };
    dataService.sendSuccessData(successData);

    const data = await dataService.value;
    expect(data).toEqual({
      token: 'token',
      type: 'type',
      ttl: 600,
    });
  });

  test('Must return error: new tab has been closed', async () => {
    const dataService = new AuthDataService();
    const error = {
      code: AuthErrorCode.NewTabHasBeenClosed,
      text: AUTH_ERROR_TEXT[AuthErrorCode.NewTabHasBeenClosed],
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
      text: AUTH_ERROR_TEXT[AuthErrorCode.EventNotSupported],
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
      text: AUTH_ERROR_TEXT[AuthErrorCode.CannotCreateNewTab],
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
      text: AUTH_ERROR_TEXT[AuthErrorCode.AuthorizationFailed],
    };

    dataService.sendAuthorizationFailed(additionally);

    try {
      await dataService.value;
    } catch (e) {
      expect(e).toEqual({ ...error, details: additionally });
    }
  });
});
