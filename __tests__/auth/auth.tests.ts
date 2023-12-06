import { AUTH_RESPONSE_TOKEN } from '#/auth/constants';
import { Auth, AuthParams, Config, Languages } from '#/index';

import { version } from '../../package.json';

const APP_ID = 100;

const openFn = jest.fn();
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
    Config.set({ app: APP_ID, redirectUrl: 'test', state: 'test' });
    reporter
      .addLabel('Layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'Auth')
      .addLabel('Suite', 'Units');
  });

  test('Should redirect to url with default fields', async () => {
    Auth.login();
    expect(assignFn).toHaveBeenCalled();

    const callArgs: string[] = assignFn.mock.calls[0];
    const location = new URL(callArgs[0]).search.split(/[?&]/);

    const expectArr = [
      expect(location[0]).toEqual(''),
      expect(location[1]).toEqual(`response_type=${AUTH_RESPONSE_TOKEN}`),
      expect(location[2]).toContain('uuid'),
      expect(location[3]).toEqual(`v=%22${version}%22`),
      expect(location[4]).toEqual('sdk_type=vkid'),
      expect(location[5]).toEqual(`app_id=${APP_ID}`),
      expect(location[6]).toEqual('redirect_uri=test'),
      expect(location[7]).toEqual('redirect_state=test'),
    ];

    expect(location.length).toEqual(expectArr.length);
  });

  test('Should redirect to url with additional fields', async () => {
    const params: AuthParams = {
      scheme: 'bright_light',
      lang: '0' as Languages,
      screen: 'phone',
    };

    Auth.login(params);
    expect(assignFn).toHaveBeenCalled();

    const callArgs: string[] = assignFn.mock.calls[0];
    const location = new URL(callArgs[0]).search.split(/[?&]/);

    const expectArr = [
      expect(location[0]).toEqual(''),
      expect(location[1]).toEqual(`lang_id=${params.lang}`),
      expect(location[2]).toEqual(`scheme=${params.scheme}`),
      expect(location[3]).toEqual('screen=phone'),
      expect(location[4]).toEqual(`response_type=${AUTH_RESPONSE_TOKEN}`),
      expect(location[5]).toContain('uuid'),
      expect(location[6]).toEqual(`v=%22${version}%22`),
      expect(location[7]).toEqual('sdk_type=vkid'),
      expect(location[8]).toEqual(`app_id=${APP_ID}`),
      expect(location[9]).toEqual('redirect_uri=test'),
      expect(location[10]).toEqual('redirect_state=test'),
    ];

    expect(location.length).toEqual(expectArr.length);
  });
});
