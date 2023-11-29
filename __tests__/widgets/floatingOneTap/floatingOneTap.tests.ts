import { BridgeMessage } from '#/core/bridge';
import { BRIDGE_MESSAGE_TYPE_SDK } from '#/core/bridge/bridge';
import { WidgetEvents } from '#/core/widget';
import { Config, FloatingOneTapContentId, Languages } from '#/index';
import { FloatingOneTap } from '#/widgets/floatingOneTap';
import { FloatingOneTapInternalEvents } from '#/widgets/floatingOneTap/events';

const APP_ID = 100;

let iframeElement: HTMLIFrameElement;
let floatingOneTap: TestFloatingOneTap;

const openFn = jest.fn();
const removeEventListenerFn = jest.fn();

class TestFloatingOneTap extends FloatingOneTap {
  public onBridgeMessageHandler(event: BridgeMessage<FloatingOneTapInternalEvents | WidgetEvents>) {
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
    Config.set({ app: APP_ID, redirectUrl: 'test', state: 'test' });
    floatingOneTap = new TestFloatingOneTap();

    reporter
      .addLabel('Layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'FloatingOneTap')
      .addLabel('Suite', 'Units');
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
    const location = frameSrc.split(/[?&]/);

    const expectArr = [
      expect(location[0]).toEqual('https://id.vk.com/floating_one_tap_auth'),
      expect(location[1]).toEqual('scheme=light'),
      expect(location[2]).toEqual('lang_id=0'),
      expect(location[3]).toEqual('show_alternative_login=1'),
      expect(location[4]).toEqual('content_id=0'),
      expect(location[5]).toEqual('code_challenge=stringified_SHA256-STRING'),
      expect(location[6]).toEqual('code_challenge_method=s256'),
      expect(location[7]).toEqual('origin=https%3A%2F%2Frnd-service.ru'),
      expect(frameSrc).toContain('uuid'),
      expect(frameSrc).toContain('v'),
      expect(location[10]).toEqual('sdk_type=vkid'),
      expect(location[11]).toEqual('app_id=100'),
      expect(location[12]).toEqual('redirect_uri=test'),
      expect(location[13]).toEqual('redirect_state=test'),
    ];

    expect(location.length).toEqual(expectArr.length);
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
      params: { someData: 'token' },
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
      params: { someData: 'token' },
    });

    const oneTapEl = document.querySelector('[data-test-id="floatingOneTap"]');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, 400);
    });
    expect(oneTapEl?.getAttribute('data-state')).toEqual('loaded');
  });
});
