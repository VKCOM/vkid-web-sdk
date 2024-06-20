import { OAUTH2_RESPONSE, OAUTH2_RESPONSE_TYPE } from '#/auth/constants';
import { AuthStatsFlowSource } from '#/auth/types';
import { Auth, AuthParams, AuthResponse, Config, ConfigAuthMode, Languages, Prompt, Scheme } from '#/index';
import { codeVerifier as codeVerifierCookie, state as stateCookie } from '#/utils/cookie';
import { encodeStatsInfo } from '#/utils/url';

import { version } from '../../package.json';
import { WINDOW_LOCATION_HOST } from '../constants';

const APP_ID = 100;

const openFn = jest.fn();
const closeFn = jest.fn();
const assignFn = jest.fn();
const eventListenerFn = jest.fn();
const fetchFn = jest.fn();

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
        host: WINDOW_LOCATION_HOST,
      },
      writable: true,
    });
    window.addEventListener = eventListenerFn;
    window.fetch = fetchFn;
  });

  beforeEach(() => {
    Config.init({ app: APP_ID, redirectUrl: 'https://id.vk.com', state: 'state', codeVerifier: 'codeVerifier', mode: ConfigAuthMode.Redirect });
    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'Auth')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  test('Should redirect to url with default fields', async () => {
    await Auth.login();
    expect(assignFn).toHaveBeenCalled();

    const callArgs: string[] = assignFn.mock.calls[0];
    const searchParams = new URLSearchParams(new URL(callArgs[0]).search);

    const expectArr = [
      expect(searchParams.get('code_challenge')).toEqual('stringified_SHA256-STRING'),
      expect(searchParams.get('code_challenge_method')).toEqual('s256'),
      expect(searchParams.get('client_id')).toEqual(Config.get().app.toString()),
      expect(searchParams.get('response_type')).toEqual(OAUTH2_RESPONSE_TYPE),
      expect(searchParams.get('state')).toEqual(Config.get().state),
      expect(searchParams.get('v')).toEqual(`\"${version}\"`),
      expect(searchParams.get('sdk_type')).toEqual('vkid'),
      expect(searchParams.get('app_id')).toEqual(APP_ID.toString()),
      expect(searchParams.get('redirect_uri')).toEqual(Config.get().redirectUrl),
      expect(searchParams.get('prompt')).toEqual(''),
      expect(searchParams.get('stats_info')).toEqual(encodeStatsInfo({
        flow_source: AuthStatsFlowSource.AUTH,
        session_id: 'abc',
      })),
    ];

    expect([...new Set(searchParams.keys())].length).toEqual(expectArr.length);
  });

  test('Should redirect to url with additional fields', async () => {
    const params: AuthParams = {
      scheme: Scheme.LIGHT,
      lang: Languages.RUS,
      screen: 'phone',
      statsFlowSource: AuthStatsFlowSource.BUTTON_ONE_TAP,
    };

    await Auth.login(params);
    expect(assignFn).toHaveBeenCalled();

    const callArgs: string[] = assignFn.mock.calls[0];
    const searchParams = new URLSearchParams(new URL(callArgs[0]).search);

    const expectArr = [
      expect(searchParams.get('lang_id')).toEqual(params.lang?.toString()),
      expect(searchParams.get('scheme')).toEqual(params.scheme),
      expect(searchParams.get('code_challenge')).toEqual('stringified_SHA256-STRING'),
      expect(searchParams.get('code_challenge_method')).toEqual('s256'),
      expect(searchParams.get('client_id')).toEqual(Config.get().app.toString()),
      expect(searchParams.get('response_type')).toEqual(OAUTH2_RESPONSE_TYPE),
      expect(searchParams.get('state')).toEqual(Config.get().state),
      expect(searchParams.get('redirect_state')).toEqual(Config.get().state),
      expect(searchParams.get('v')).toEqual(`\"${version}\"`),
      expect(searchParams.get('sdk_type')).toEqual('vkid'),
      expect(searchParams.get('app_id')).toEqual(APP_ID.toString()),
      expect(searchParams.get('redirect_uri')).toEqual(Config.get().redirectUrl),
      expect(searchParams.get('prompt')).toEqual(''),
      expect(searchParams.get('stats_info')).toEqual(encodeStatsInfo({
        flow_source: AuthStatsFlowSource.BUTTON_ONE_TAP,
        session_id: 'abc',
      })),
      expect(searchParams.get('screen')).toEqual(params.screen),
      expect(searchParams.get('oauth_version')).toEqual('2'),
    ];

    expect([...new Set(searchParams.keys())].length).toEqual(expectArr.length);
  });

  test('Opens a window with default fields', () => {
    Config.update({ mode: ConfigAuthMode.InNewTab });
    Auth.login().catch(console.error);
    expect(openFn).toHaveBeenCalled();

    const callArgs: string[] = openFn.mock.calls[0];
    const searchParams = new URLSearchParams(new URL(callArgs[0]).search);

    const expectArr = [
      expect(searchParams.get('code_challenge')).toEqual('stringified_SHA256-STRING'),
      expect(searchParams.get('code_challenge_method')).toEqual('s256'),
      expect(searchParams.get('client_id')).toEqual(Config.get().app.toString()),
      expect(searchParams.get('response_type')).toEqual(OAUTH2_RESPONSE_TYPE),
      expect(searchParams.get('state')).toEqual(Config.get().state),
      expect(searchParams.get('v')).toEqual(`\"${version}\"`),
      expect(searchParams.get('sdk_type')).toEqual('vkid'),
      expect(searchParams.get('app_id')).toEqual(APP_ID.toString()),
      expect(searchParams.get('redirect_uri')).toEqual(Config.get().redirectUrl),
      expect(searchParams.get('prompt')).toEqual(''),
      expect(searchParams.get('stats_info')).toEqual(encodeStatsInfo({
        flow_source: AuthStatsFlowSource.AUTH,
        session_id: 'abc',
      })),
    ];

    expect([...new Set(searchParams.keys())].length).toEqual(expectArr.length);
  });

  test('Opens a window with additional fields', () => {
    Config.update({ mode: ConfigAuthMode.InNewTab, prompt: [Prompt.Login, Prompt.Consent] });
    const params: AuthParams = {
      scheme: Scheme.LIGHT,
      lang: Languages.RUS,
    };

    Auth.login(params).catch(console.error);
    expect(openFn).toHaveBeenCalled();

    const callArgs: string[] = openFn.mock.calls[0];
    const searchParams = new URLSearchParams(new URL(callArgs[0]).search);

    const expectArr = [
      expect(searchParams.get('lang_id')).toEqual(params.lang?.toString()),
      expect(searchParams.get('scheme')).toEqual(params.scheme),
      expect(searchParams.get('code_challenge')).toEqual('stringified_SHA256-STRING'),
      expect(searchParams.get('code_challenge_method')).toEqual('s256'),
      expect(searchParams.get('client_id')).toEqual(Config.get().app.toString()),
      expect(searchParams.get('response_type')).toEqual(OAUTH2_RESPONSE_TYPE),
      expect(searchParams.get('state')).toEqual(Config.get().state),
      expect(searchParams.get('v')).toEqual(`\"${version}\"`),
      expect(searchParams.get('sdk_type')).toEqual('vkid'),
      expect(searchParams.get('app_id')).toEqual(APP_ID.toString()),
      expect(searchParams.get('redirect_uri')).toEqual(Config.get().redirectUrl),
      expect(searchParams.get('prompt')).toEqual([Prompt.Login, Prompt.Consent].join(' ').trim()),
      expect(searchParams.get('stats_info')).toEqual(encodeStatsInfo({
        flow_source: AuthStatsFlowSource.AUTH,
        session_id: 'abc',
      })),
    ];

    expect([...new Set(searchParams.keys())].length).toEqual(expectArr.length);
  });

  test('Must redirect with payload', async () => {
    Config.update({ mode: ConfigAuthMode.InNewTab, redirectUrl: 'https://id.vk.com?query=123' });

    const response: AuthResponse = {
      code: 'code',
      type: 'code_v2',
      state: 'state',
      device_id: 'device_id',
    };
    const opener = {
      closed: false,
      close: closeFn,
    };
    openFn.mockReturnValue(opener);
    eventListenerFn.mockImplementation((event, callback) => {
      callback({
        origin: 'id.vk.com',
        source: opener,
        data: {
          action: `${OAUTH2_RESPONSE}state`,
          payload: response,
        },
      });
    });

    await Auth.login();
    expect(openFn).toHaveBeenCalled();
    expect(closeFn).toHaveBeenCalled();
    expect(assignFn).toHaveBeenCalled();

    const callArgs: string[] = assignFn.mock.calls[0];
    const searchParams = new URLSearchParams(new URL(callArgs[0]).search);

    const expectArr = [
      expect(searchParams.get('type')).toEqual('code_v2'),
      expect(searchParams.get('code')).toEqual('code'),
      expect(searchParams.get('state')).toEqual('state'),
      expect(searchParams.get('device_id')).toEqual('device_id'),
      expect(searchParams.get('query')).toEqual('123'),
    ];

    expect([...new Set(searchParams.keys())].length).toEqual(expectArr.length);
  });

  test('Should fetch oauth2/auth with authorization_code exchange params', async () => {
    await Auth.login();
    const { redirectUrl, app, codeVerifier, state } = Config.get();
    const mockResponse = { json() {
      return Promise.resolve(JSON.parse('{ "state": "state" }'));
    } };
    fetchFn.mockImplementation(() => Promise.resolve(mockResponse));

    await Auth.exchangeCode('code', 'deviceId');

    const searchParams = new URLSearchParams(new URL(fetchFn.mock.calls[0][0]).search);
    const expectArr = [
      expect(searchParams.get('grant_type')).toEqual('authorization_code'),
      expect(searchParams.get('redirect_uri')).toEqual(redirectUrl),
      expect(searchParams.get('client_id')).toEqual(app.toString()),
      expect(searchParams.get('code_verifier')).toEqual(codeVerifier),
      expect(searchParams.get('state')).toEqual(state),
      expect(searchParams.get('device_id')).toEqual('deviceId'),
    ];

    expect([...new Set(searchParams.keys())].length).toEqual(expectArr.length);
    expect(fetchFn).lastCalledWith(expect.any(String), {
      body: new URLSearchParams({ code: 'code' }),
      method: 'POST',
    });
  });

  test('Should set state and codeVerifier params to cookie after login()', async () => {
    codeVerifierCookie('1');
    stateCookie('1');

    await Auth.login();
    const { codeVerifier, state } = Config.get();

    expect(codeVerifier).toEqual(codeVerifierCookie());
    expect(state).toEqual(stateCookie());
  });

  test('Should clear state and codeVerifier params to cookie after exchangeCode()', async () => {
    const mockResponse = { json() {
      return Promise.resolve(JSON.parse('{ "state": "state", "access_token": "access_token", "refresh_token": "refresh_token" }'));
    } };
    fetchFn.mockImplementation(() => Promise.resolve(mockResponse));

    await Auth.exchangeCode('code', 'deviceId');
    expect(document.cookie).toBeFalsy();
  });

  test('Should fetch oauth2/auth with refresh_token params', async () => {
    const { redirectUrl, app, state } = Config.get();

    await Auth.refreshToken('refreshToken', 'deviceId');

    const searchParams = new URLSearchParams(new URL(fetchFn.mock.calls[0][0]).search);
    const expectArr = [
      expect(searchParams.get('grant_type')).toEqual('refresh_token'),
      expect(searchParams.get('redirect_uri')).toEqual(redirectUrl),
      expect(searchParams.get('client_id')).toEqual(app.toString()),
      expect(searchParams.get('state')).toEqual(state),
      expect(searchParams.get('device_id')).toEqual('deviceId'),
    ];

    expect([...new Set(searchParams.keys())].length).toEqual(expectArr.length);
    expect(fetchFn).lastCalledWith(expect.any(String), {
      body: new URLSearchParams({ refresh_token: 'refreshToken' }),
      method: 'POST',
    });
  });

  test('Should fetch oauth2/logout with logout params', async () => {
    const { app } = Config.get();

    await Auth.logout('accessToken');

    const searchParams = new URLSearchParams(new URL(fetchFn.mock.calls[0][0]).search);
    const expectArr = [
      expect(searchParams.get('client_id')).toEqual(app.toString()),
    ];

    expect([...new Set(searchParams.keys())].length).toEqual(expectArr.length);
    expect(fetchFn).lastCalledWith(expect.any(String), {
      body: new URLSearchParams({ access_token: 'accessToken' }),
      method: 'POST',
    });
  });

  test('Should fetch oauth2/user_info with user_info params', async () => {
    const { app } = Config.get();

    await Auth.userInfo('accessToken');

    const searchParams = new URLSearchParams(new URL(fetchFn.mock.calls[0][0]).search);
    const expectArr = [
      expect(searchParams.get('client_id')).toEqual(app.toString()),
    ];

    expect([...new Set(searchParams.keys())].length).toEqual(expectArr.length);
    expect(fetchFn).lastCalledWith(expect.any(String), {
      body: new URLSearchParams({ access_token: 'accessToken' }),
      method: 'POST',
    });
  });

  test('Should fetch oauth2/public_info with public_info params', async () => {
    const { app } = Config.get();

    await Auth.publicInfo('idToken');

    const searchParams = new URLSearchParams(new URL(fetchFn.mock.calls[0][0]).search);
    const expectArr = [
      expect(searchParams.get('client_id')).toEqual(app.toString()),
    ];

    expect([...new Set(searchParams.keys())].length).toEqual(expectArr.length);
    expect(fetchFn).lastCalledWith(expect.any(String), {
      body: new URLSearchParams({ id_token: 'idToken' }),
      method: 'POST',
    });
  });
});
