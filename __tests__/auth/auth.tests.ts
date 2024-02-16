import { AUTH_RESPONSE_TOKEN, AUTH_VK_CONNECT_RESPONSE } from '#/auth/constants';
import { Auth, AuthParams, AuthResponse, Config, ConfigAuthMode, Languages, Scheme } from '#/index';

import { version } from '../../package.json';

const APP_ID = 100;

const openFn = jest.fn();
const closeFn = jest.fn();
const assignFn = jest.fn();
const eventListenerFn = jest.fn();

describe('Auth', () => {
  beforeAll(() => {
    window.open = openFn;
    Object.defineProperty(window, 'location', {
      value: {
        hash: {
          endsWith: jest.fn(),
          includes: jest.fn(),
        },
        assign: assignFn,
      },
      writable: true,
    });
    window.addEventListener = eventListenerFn;
  });

  beforeEach(() => {
    Config.set({ app: APP_ID, redirectUrl: 'https://id.vk.com', state: 'test' });
    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'Auth')
      .addLabel('Suite', 'Units');
  });

  test('Should redirect to url with default fields', () => {
    Auth.login();
    expect(assignFn).toHaveBeenCalled();

    const callArgs: string[] = assignFn.mock.calls[0];
    const location = new URL(callArgs[0]).search.split(/[?&]/);

    const expectArr = [
      expect(location[0]).toEqual(''),
      expect(location[1]).toContain('uuid'),
      expect(location[2]).toEqual(`response_type=${AUTH_RESPONSE_TOKEN}`),
      expect(location[3]).toEqual(`v=%22${version}%22`),
      expect(location[4]).toEqual('sdk_type=vkid'),
      expect(location[5]).toEqual(`app_id=${APP_ID}`),
      expect(location[6]).toEqual('redirect_uri=https%3A%2F%2Fid.vk.com'),
      expect(location[7]).toEqual('redirect_state=test'),
    ];

    expect(location.length).toEqual(expectArr.length);
  });

  test('Should redirect to url with additional fields', () => {
    const params: AuthParams = {
      scheme: Scheme.LIGHT,
      lang: Languages.RUS,
      screen: 'phone',
    };

    Auth.login(params);
    expect(assignFn).toHaveBeenCalled();

    const callArgs: string[] = assignFn.mock.calls[0];
    const location = new URL(callArgs[0]).search.split(/[?&]/);

    const expectArr = [
      expect(location[0]).toEqual(''),
      expect(location[1]).toContain('uuid'),
      expect(location[2]).toEqual(`lang_id=${params.lang}`),
      expect(location[3]).toEqual(`scheme=${params.scheme}`),
      expect(location[4]).toEqual('screen=phone'),
      expect(location[5]).toEqual(`response_type=${AUTH_RESPONSE_TOKEN}`),
      expect(location[6]).toEqual(`v=%22${version}%22`),
      expect(location[7]).toEqual('sdk_type=vkid'),
      expect(location[8]).toEqual(`app_id=${APP_ID}`),
      expect(location[9]).toEqual('redirect_uri=https%3A%2F%2Fid.vk.com'),
      expect(location[10]).toEqual('redirect_state=test'),
    ];

    expect(location.length).toEqual(expectArr.length);
  });

  test('Opens a window with default fields', () => {
    Config.set({ mode: ConfigAuthMode.InNewTab });
    Auth.login();
    expect(openFn).toHaveBeenCalled();

    const callArgs: string[] = openFn.mock.calls[0];
    const location = new URL(callArgs[0]).search.split(/[?&]/);

    const expectArr = [
      expect(location[0]).toEqual(''),
      expect(location[1]).toContain('uuid'),
      expect(location[2]).toEqual(`response_type=${AUTH_RESPONSE_TOKEN}`),
      expect(location[3]).toContain('origin'),
      expect(location[4]).toEqual(`v=%22${version}%22`),
      expect(location[5]).toEqual('sdk_type=vkid'),
      expect(location[6]).toEqual(`app_id=${APP_ID}`),
      expect(location[7]).toEqual('redirect_uri=https%3A%2F%2Fid.vk.com'),
      expect(location[8]).toEqual('redirect_state=test'),
    ];

    expect(location.length).toEqual(expectArr.length);
  });

  test('Opens a window with additional fields', () => {
    Config.set({ mode: ConfigAuthMode.InNewTab });
    const params: AuthParams = {
      scheme: Scheme.LIGHT,
      lang: Languages.RUS,
    };

    Auth.login(params);
    expect(openFn).toHaveBeenCalled();

    const callArgs: string[] = openFn.mock.calls[0];
    const location = new URL(callArgs[0]).search.split(/[?&]/);

    const expectArr = [
      expect(location[0]).toEqual(''),
      expect(location[1]).toContain('uuid'),
      expect(location[2]).toEqual(`lang_id=${params.lang}`),
      expect(location[3]).toEqual(`scheme=${params.scheme}`),
      expect(location[4]).toEqual(`response_type=${AUTH_RESPONSE_TOKEN}`),
      expect(location[5]).toContain('origin'),
      expect(location[6]).toEqual(`v=%22${version}%22`),
      expect(location[7]).toEqual('sdk_type=vkid'),
      expect(location[8]).toEqual(`app_id=${APP_ID}`),
      expect(location[9]).toEqual('redirect_uri=https%3A%2F%2Fid.vk.com'),
      expect(location[10]).toEqual('redirect_state=test'),
    ];

    expect(location.length).toEqual(expectArr.length);
  });

  test('Must redirect with payload', async () => {
    Config.set({ mode: ConfigAuthMode.InNewTab });

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
          action: AUTH_VK_CONNECT_RESPONSE + 'abc',
          payload: response,
        },
      });
    });

    await Auth.login();
    expect(openFn).toHaveBeenCalled();
    expect(closeFn).toHaveBeenCalled();
    expect(assignFn).toHaveBeenCalled();

    const callArgs: string[] = assignFn.mock.calls[0];
    const location = new URL(callArgs[0]).search.split(/[?&]/);

    const expectArr = [
      expect(location[0]).toEqual(''),
      expect(location[1]).toEqual('payload=%7B%22type%22%3A%22silent_token%22%2C%22token%22%3A%22token%22%2C%22ttl%22%3A500%7D'),
      expect(location[2]).toEqual('state=test'),
    ];

    expect(location.length).toEqual(expectArr.length);
  });
});
