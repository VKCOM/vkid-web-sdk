import { BridgeMessage } from '#/core/bridge';
import { BRIDGE_MESSAGE_TYPE_SDK } from '#/core/bridge/bridge';
import { WidgetEvents } from '#/core/widget';
import { Config, Languages } from '#/index';
import { Scheme } from '#/types';
import { OneTap } from '#/widgets/oneTap';
import { OneTapInternalEvents } from '#/widgets/oneTap/events';

const APP_ID = 100;

let container: HTMLElement;
let iframeElement: HTMLIFrameElement;
let oneTap: TestOneTap;

const openFn = jest.fn();
const removeEventListenerFn = jest.fn();

class TestOneTap extends OneTap {
  public onBridgeMessageHandler(event: BridgeMessage<OneTapInternalEvents | WidgetEvents>) {
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
    Config.set({ app: APP_ID, redirectUrl: 'test', state: 'test' });
    oneTap = new TestOneTap();

    container = document.createElement('div', {});
    document.body.append(container);

    reporter
      .addLabel('Layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'OneTap')
      .addLabel('Suite', 'Units');
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
    const location = frameSrc.split(/[?&]/);

    const expectArr = [
      expect(location[0]).toEqual('https://id.vk.com/button_one_tap_auth'),
      expect(location[1]).toEqual('style_height=44'),
      expect(location[2]).toEqual('style_border_radius=8'),
      expect(location[3]).toEqual('show_alternative_login=1'),
      expect(location[4]).toEqual('button_skin=primary'),
      expect(location[5]).toEqual('scheme=light'),
      expect(location[6]).toEqual('lang_id=0'),
      expect(location[7]).toEqual('code_challenge=stringified_SHA256-STRING'),
      expect(location[8]).toEqual('code_challenge_method=s256'),
      expect(location[9]).toEqual('origin=https%3A%2F%2Frnd-service.ru'),
      expect(frameSrc).toContain('uuid'),
      expect(frameSrc).toContain('v'),
      expect(location[12]).toEqual('sdk_type=vkid'),
      expect(location[13]).toEqual('app_id=100'),
      expect(location[14]).toEqual('redirect_uri=test'),
      expect(location[15]).toEqual('redirect_state=test'),
    ];

    expect(location.length).toEqual(expectArr.length);
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
      skin: 'secondary',
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
      skin: 'secondary',
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
      params: { someData: 'token' },
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
      params: { someData: 'token' },
    });

    const oneTapEl = document.querySelector('[data-test-id="oneTap"]');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, 400);
    });
    expect(oneTapEl?.getAttribute('data-state')).toEqual('loaded');
  });
});
