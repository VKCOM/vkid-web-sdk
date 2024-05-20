import { BRIDGE_MESSAGE_TYPE_SDK } from '#/core/bridge/bridge';
import { WidgetEvents } from '#/core/widget';
import { Config, FloatingOneTapContentId, Languages, OAuthName } from '#/index';
import { FloatingOneTap } from '#/widgets/floatingOneTap';
import { FloatingOneTapBridgeMessage } from '#/widgets/floatingOneTap/types';

import { WINDOW_LOCATION_URL } from '../../constants';
import { wait } from '../../utils';

const APP_ID = 100;

let iframeElement: HTMLIFrameElement;
let floatingOneTap: TestFloatingOneTap;

const openFn = jest.fn();
const removeEventListenerFn = jest.fn();

class TestFloatingOneTap extends FloatingOneTap {
  public onBridgeMessageHandler(event: FloatingOneTapBridgeMessage) {
    super.onBridgeMessageHandler(event);
  }
}

describe('FloatingOneTap', () => {
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
    floatingOneTap = new TestFloatingOneTap();

    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'FloatingOneTap')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  afterEach(() => {
    floatingOneTap.close();
  });

  test('Check iframe url params', () => {
    floatingOneTap.render({
      appName: 'VK ID Demo',
      showAlternativeLogin: true,
    });
    iframeElement = document.body.querySelector('iframe') as HTMLIFrameElement;

    expect(iframeElement).toBeTruthy();

    const frameSrc = iframeElement.getAttribute('src') as string;
    const location = new URL(frameSrc);
    const searchParams = new URLSearchParams(location.search);

    expect(location.href.split('?')[0]).toEqual('https://id.vk.com/floating_one_tap_auth');

    const expectArr = [
      expect(searchParams.get('scheme')).toEqual('light'),
      expect(searchParams.get('lang_id')).toEqual('0'),
      expect(searchParams.get('show_alternative_login')).toEqual('1'),
      expect(searchParams.get('content_id')).toEqual('0'),
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
    floatingOneTap.render({
      appName: 'VK ID Demo',
      showAlternativeLogin: 1,
      lang: Languages.ENG,
    });
    iframeElement = document.body.querySelector('iframe') as HTMLIFrameElement;
    const frameSrc = iframeElement.getAttribute('src') as string;
    expect(frameSrc).toContain('lang_id=3');
  });

  test('The content_id parameter must be set', () => {
    floatingOneTap.render({
      appName: 'VK ID Demo',
      showAlternativeLogin: 1,
      contentId: FloatingOneTapContentId.MAKE_ORDER_WITH_SERVICE,
    });
    iframeElement = document.body.querySelector('iframe') as HTMLIFrameElement;
    const frameSrc = iframeElement.getAttribute('src') as string;
    expect(frameSrc).toContain('content_id=4');
  });

  test('Must be in the loading state', () => {
    floatingOneTap.render({
      appName: 'VK ID Demo',
      showAlternativeLogin: 1,
    });
    const oneTapEl = document.querySelector('[data-test-id="floatingOneTap"]');
    expect(oneTapEl?.getAttribute('data-state')).toEqual('loading');
  });

  test('Must be in not_loaded state', () => {
    floatingOneTap.render({
      appName: 'VK ID Demo',
      showAlternativeLogin: 1,
    });

    floatingOneTap.onBridgeMessageHandler({
      type: BRIDGE_MESSAGE_TYPE_SDK,
      handler: WidgetEvents.ERROR,
      params: { uuid: 'token' },
    });

    const oneTapEl = document.querySelector('[data-test-id="floatingOneTap"]');
    expect(oneTapEl?.getAttribute('data-state')).toEqual('not_loaded');
  });

  test('Must be in a state of loaded', async () => {
    floatingOneTap.render({
      appName: 'VK ID Demo',
      showAlternativeLogin: 1,
    });

    floatingOneTap.onBridgeMessageHandler({
      type: BRIDGE_MESSAGE_TYPE_SDK,
      handler: WidgetEvents.LOAD,
      params: { uuid: 'token' },
    });

    const oneTapEl = document.querySelector('[data-test-id="floatingOneTap"]');
    await wait(400);
    expect(oneTapEl?.getAttribute('data-state')).toEqual('loaded');
  });

  test('Must render oauthlist if oauthList param exists', async () => {
    floatingOneTap.render({
      appName: 'VK ID Demo',
      oauthList: [OAuthName.MAIL, OAuthName.OK],
    });
    await wait(0);
    const oneTapEl = document.querySelector('[data-test-id="floatingOneTap"]') as HTMLElement;
    const oauthListEl = oneTapEl.querySelector('[data-test-id="oauthList"]');
    expect(oauthListEl).toBeTruthy();
  });

  test('Must not render oauthlist if only OAuthName.VK', async () => {
    floatingOneTap.render({
      appName: 'VK ID Demo',
      oauthList: [OAuthName.VK],
    });
    await wait(0);
    const oneTapEl = document.querySelector('[data-test-id="floatingOneTap"]') as HTMLElement;
    const oauthListEl = oneTapEl.querySelector('[data-test-id="oauthList"]');
    expect(oauthListEl).toBeFalsy();
  });

  test('Must not render oauthlist if oauthList param not exists', async () => {
    floatingOneTap.render({
      appName: 'VK ID Demo',
    });
    await wait(0);
    const oneTapEl = document.querySelector('[data-test-id="floatingOneTap"]') as HTMLElement;
    const oauthListEl = oneTapEl.querySelector('[data-test-id="oauthList"]');
    expect(oauthListEl).toBeFalsy();
  });
});
