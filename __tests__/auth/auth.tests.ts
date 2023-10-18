import { AUTH_ERROR_TEXT, AUTH_RESPONSE_TOKEN, AUTH_VK_CONNECT_RESPONSE } from '#/auth/constants';
import { AuthErrorCode, AuthResponse } from '#/auth/types';
import { Auth, AuthParams, Config, Languages } from '#/index';

import { version } from '../../package.json';
import { WINDOW_LOCATION_HOST } from '../constants';

const APP_ID = 100;

const openFn = jest.fn();
const closeFn = jest.fn();
const eventListenerFn = jest.fn();

describe('Auth', () => {
  beforeAll(() => {
    window.open = openFn;
    window.addEventListener = eventListenerFn;
  });

  beforeEach(() => {
    Config.set({ app: APP_ID });
  });

  test('Opens a window with default fields', async () => {
    try {
      await Auth.login();
    } catch (e) {
      expect(openFn).toHaveBeenCalled();

      const callArgs: string[] = openFn.mock.calls[0];
      const location = new URL(callArgs[0]);

      expect(location.search).toEqual(`?origin=https%3A%2F%2F${WINDOW_LOCATION_HOST}&response_type=${AUTH_RESPONSE_TOKEN}&v=%22${version}%22&app_id=${APP_ID}&sdk_type=vkid`);
    }
  });

  test('Opens a window with additional fields', async () => {
    const params: AuthParams = {
      scheme: 'bright_light',
      lang: '0' as Languages,
    };

    try {
      await Auth.login(params);
    } catch (e) {
      expect(openFn).toHaveBeenCalled();

      const callArgs: string[] = openFn.mock.calls[0];
      const location = new URL(callArgs[0]);

      expect(location.search).toEqual(`?scheme=${params.scheme}&lang_id=${params.lang}&origin=https%3A%2F%2F${WINDOW_LOCATION_HOST}&response_type=${AUTH_RESPONSE_TOKEN}&v=%22${version}%22&app_id=${APP_ID}&sdk_type=vkid`);
    }
  });

  test('Must return error: cannot create new tab', async () => {
    const error = {
      code: AuthErrorCode.CannotCreateNewTab,
      text: AUTH_ERROR_TEXT[AuthErrorCode.CannotCreateNewTab],
    };

    try {
      await Auth.login();
    } catch (e) {
      expect(e).toEqual(error);
    }
  });

  test('Must return error: new tab has been closed', async () => {
    openFn.mockReturnValue({
      closed: true,
      close: closeFn,
    });
    const error = {
      code: AuthErrorCode.NewTabHasBeenClosed,
      text: AUTH_ERROR_TEXT[AuthErrorCode.NewTabHasBeenClosed],
    };

    try {
      await Auth.login();
    } catch (e) {
      expect(e).toEqual(error);
      expect(closeFn).toHaveBeenCalled();
    }
  });

  test('Must return error: event not supported', async () => {
    const opener = {
      closed: false,
      close: closeFn,
    };
    openFn.mockReturnValue(opener);
    eventListenerFn.mockImplementation((event, callback) => {
      callback({
        origin: 'vk.com',
        source: opener,
        data: {
          payload: {},
        },
      });
    });

    const error = {
      code: AuthErrorCode.EventNotSupported,
      text: AUTH_ERROR_TEXT[AuthErrorCode.EventNotSupported],
    };

    try {
      await Auth.login();
    } catch (e) {
      expect(closeFn).toHaveBeenCalled();
      expect(e).toEqual(error);
    }
  });

  test('Must return data', async () => {
    const response: AuthResponse = {
      token: 'token',
      type: 'silent_token',
      ttl: 500,
    };
    const opener = {
      closed: false,
      close: closeFn,
    };
    openFn.mockReturnValue(opener);
    eventListenerFn.mockImplementation((event, callback) => {
      callback({
        origin: 'vk.com',
        source: opener,
        data: {
          action: AUTH_VK_CONNECT_RESPONSE,
          payload: response,
        },
      });
    });

    try {
      const res = await Auth.login();
      expect(closeFn).toHaveBeenCalled();
      expect(res).toEqual(response);
    } catch (e) {
    }
  });
});
