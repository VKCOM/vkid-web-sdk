import { BRIDGE_MESSAGE_TYPE_SDK } from '#/core/bridge/bridge';
import { WidgetEvents } from '#/core/widget';
import { Config, Languages, OAuthName, OneTapSkin } from '#/index';
import { Scheme } from '#/types';
import { OneTap } from '#/widgets/oneTap';
import { OneTapBridgeMessage } from '#/widgets/oneTap/types';

import { WINDOW_LOCATION_URL } from '../../constants';
import { wait } from '../../utils';

const APP_ID = 100;

let container: HTMLElement;
let iframeElement: HTMLIFrameElement;
let oneTap: TestOneTap;

const openFn = jest.fn();
const removeEventListenerFn = jest.fn();

class TestOneTap extends OneTap {
  public onBridgeMessageHandler(event: OneTapBridgeMessage) {
    super.onBridgeMessageHandler(event);
  }
}

describe('OneTap', () => {
  beforeAll(() => {
    window.open = openFn;
    window.addEventListener = jest.fn().mockImplementation((event, callback) => {
      if (event === 'DOMContentLoaded') {
        setTimeout(callback, 0);
      }
    });
    window.removeEventListener = removeEventListenerFn;
  });

  beforeEach(() => {
    Config.init({ app: APP_ID, redirectUrl: 'test', state: 'test', codeVerifier: 'codeVerifier' });
    oneTap = new TestOneTap();

    container = document.createElement('div', {});
    document.body.append(container);

    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'OneTap')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  afterEach(() => {
    oneTap.close();
    container.remove();
  });

  test('Check iframe url params', () => {
    oneTap.render({ container, showAlternativeLogin: true });
    iframeElement = container.querySelector('iframe') as HTMLIFrameElement;

    expect(iframeElement).toBeTruthy();

    const frameSrc = iframeElement.getAttribute('src') as string;
    const location = new URL(frameSrc);
    const searchParams = new URLSearchParams(location.search);

    expect(location.href.split('?')[0]).toEqual('https://id.vk.com/button_one_tap_auth');

    const expectArr = [
      expect(searchParams.get('style_height')).toEqual('44'),
      expect(searchParams.get('style_border_radius')).toEqual('8'),
      expect(searchParams.get('show_alternative_login')).toEqual('1'),
      expect(searchParams.get('button_skin')).toEqual('primary'),
      expect(searchParams.get('scheme')).toEqual('light'),
      expect(searchParams.get('lang_id')).toEqual('0'),
      expect(searchParams.get('providers')).toEqual(''),
      expect(searchParams.get('origin')).toEqual(WINDOW_LOCATION_URL),
      expect(searchParams.get('code_challenge')).toEqual('stringified_SHA256-STRING'),
      expect(searchParams.get('code_challenge_method')).toEqual('s256'),
      expect(searchParams.get('v')).toBeTruthy(),
      expect(searchParams.get('sdk_type')).toEqual('vkid'),
      expect(searchParams.get('app_id')).toEqual('100'),
      expect(searchParams.get('redirect_uri')).toEqual('test'),
      expect(searchParams.get('oauth_version')).toEqual('2'),
      expect(searchParams.get('state')).toEqual(Config.get().state),
    ];

    expect([...new Set(searchParams.keys())].length).toEqual(expectArr.length);
  });

  test('The lang_id parameter must be set', () => {
    oneTap.render({
      container,
      showAlternativeLogin: 1,
      lang: Languages.ENG,
    });
    iframeElement = container.querySelector('iframe') as HTMLIFrameElement;
    const frameSrc = iframeElement.getAttribute('src') as string;
    expect(frameSrc).toContain('lang_id=3');
  });

  test('Should use the light theme and the main default skin', () => {
    oneTap.render({
      container,
      showAlternativeLogin: 1,
    });
    const oneTapEl = document.querySelector('[data-test-id="oneTap"]');
    expect(oneTapEl?.getAttribute('data-scheme')).toEqual('light');
    expect(oneTapEl?.getAttribute('data-skin')).toEqual('primary');
  });

  test('Should use a light theme and a secondary skin', () => {
    oneTap.render({
      container,
      showAlternativeLogin: 1,
      skin: OneTapSkin.Secondary,
    });
    const oneTapEl = document.querySelector('[data-test-id="oneTap"]');
    expect(oneTapEl?.getAttribute('data-scheme')).toEqual('light');
    expect(oneTapEl?.getAttribute('data-skin')).toEqual('secondary');
  });

  test('Should use a dark theme and a primary skin', () => {
    oneTap.render({
      container,
      showAlternativeLogin: 1,
      scheme: Scheme.DARK,
    });
    const oneTapEl = document.querySelector('[data-test-id="oneTap"]');
    expect(oneTapEl?.getAttribute('data-scheme')).toEqual('dark');
    expect(oneTapEl?.getAttribute('data-skin')).toEqual('primary');
  });

  test('Should use a dark theme and a secondary skin', () => {
    oneTap.render({
      container,
      showAlternativeLogin: 1,
      scheme: Scheme.DARK,
      skin: OneTapSkin.Secondary,
    });
    const oneTapEl = document.querySelector('[data-test-id="oneTap"]');
    expect(oneTapEl?.getAttribute('data-scheme')).toEqual('dark');
    expect(oneTapEl?.getAttribute('data-skin')).toEqual('secondary');
  });

  test('Must be in the loading state', () => {
    oneTap.render({
      container,
      showAlternativeLogin: 1,
    });
    const oneTapEl = document.querySelector('[data-test-id="oneTap"]');
    expect(oneTapEl?.getAttribute('data-state')).toEqual('loading');
  });

  test('Must be in not_loaded state', () => {
    oneTap.render({
      container,
      showAlternativeLogin: 1,
    });

    oneTap.onBridgeMessageHandler({
      type: BRIDGE_MESSAGE_TYPE_SDK,
      handler: WidgetEvents.ERROR,
      params: { uuid: 'token' },
    });

    const oneTapEl = document.querySelector('[data-test-id="oneTap"]');
    expect(oneTapEl?.getAttribute('data-state')).toEqual('not_loaded');
  });

  test('Must be in a state of loaded', async () => {
    oneTap.render({
      container,
      showAlternativeLogin: 1,
    });

    oneTap.onBridgeMessageHandler({
      type: BRIDGE_MESSAGE_TYPE_SDK,
      handler: WidgetEvents.LOAD,
      params: { uuid: 'token' },
    });

    const oneTapEl = document.querySelector('[data-test-id="oneTap"]');
    await wait(400);
    expect(oneTapEl?.getAttribute('data-state')).toEqual('loaded');
  });

  test('Must render oauthlist if oauthList param exists', async () => {
    oneTap.render({
      container,
      oauthList: [OAuthName.MAIL, OAuthName.OK],
    });
    await wait(0);
    const oneTapEl = document.querySelector('[data-test-id="oneTap"]');
    const oauthListEl = oneTapEl?.querySelector('[data-test-id="oauthList"]');
    expect(oauthListEl).toBeTruthy();
  });

  test('Must not render oauthlist if only OAuthName.VK', async () => {
    oneTap.render({
      container,
      oauthList: [OAuthName.VK],
    });
    await wait(0);
    const oneTapEl = document.querySelector('[data-test-id="oneTap"]');
    const oauthListEl = oneTapEl?.querySelector('[data-test-id="oauthList"]');
    expect(oauthListEl).toBeFalsy();
  });

  test('Must not render oauthlist if oauthList param not exists', async () => {
    oneTap.render({
      container,
    });
    await wait(0);
    const oneTapEl = document.querySelector('[data-test-id="oneTap"]');
    const oauthListEl = oneTapEl?.querySelector('[data-test-id="oauthList"]');
    expect(oauthListEl).toBeFalsy();
  });
});
