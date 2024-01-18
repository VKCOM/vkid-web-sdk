import { VERSION } from '#/constants';
import { BridgeMessage } from '#/core/bridge';
import { BRIDGE_MESSAGE_TYPE_SDK } from '#/core/bridge/bridge';
import { Widget, WidgetEvents } from '#/core/widget';
import { Config } from '#/index';

const APP_ID = 100;

let container: HTMLElement;
let iframeElement: HTMLIFrameElement;

const onHandlerFn = jest.fn();

class TestWidget extends Widget {
  public onBridgeMessageHandler(event: BridgeMessage<WidgetEvents>) {
    super.onBridgeMessageHandler(event);
  }
}

let widget: TestWidget;

describe('Data Policy', () => {
  beforeEach(() => {
    Config.set({ app: APP_ID });
    widget = new TestWidget();

    container = document.createElement('div', {});
    document.body.append(container);

    widget.render({ container });
    iframeElement = container.querySelector('iframe') as HTMLIFrameElement;

    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'Data Policy')
      .addLabel('Suite', 'Units');
  });

  afterEach(() => {
    widget.close();
    container.remove();
  });

  test('Check iframe url params', () => {
    expect(iframeElement).toBeTruthy();

    const frameSrc = iframeElement.getAttribute('src');
    const urlParams = new URL(frameSrc ?? '').searchParams;

    expect(urlParams.get('v')).toContain(VERSION);
    expect(urlParams.get('app_id')).toContain(APP_ID.toString());
    expect(urlParams.get('origin')).toContain(location.protocol + '//' + location.host);
    expect(urlParams.get('code_challenge_method')).toContain('s256');
    expect(frameSrc).toContain('id.vk.');
    expect(frameSrc).toContain('uuid');
  });

  test('Should remove root after close()', () => {
    widget.close();
    expect(container.querySelector('iframe') as HTMLIFrameElement).toBeFalsy();
  });

  test('Should hide root after hide()', () => {
    widget.on(WidgetEvents.HIDE, onHandlerFn);

    widget.hide();
    const root = container.querySelector('[data-test-id="widget"]') as HTMLIFrameElement;

    expect(root.style.display).toBe('none');
    expect(onHandlerFn).toBeCalled();
  });

  test('Should show root after show()', () => {
    const root = container.querySelector('[data-test-id="widget"]') as HTMLIFrameElement;
    root.style.display = 'none';
    widget.show();
    expect(root.style.display).toBe('block');
  });

  test('should handle internal CLOSE event and emit public', () => {
    widget.on(WidgetEvents.CLOSE, onHandlerFn);

    widget.onBridgeMessageHandler({
      type: BRIDGE_MESSAGE_TYPE_SDK,
      handler: WidgetEvents.CLOSE,
      params: {},
    });

    expect(onHandlerFn).toBeCalled();
  });

  test('Should handle internal LOAD event and emit public', () => {
    widget.on(WidgetEvents.LOAD, onHandlerFn);

    widget.onBridgeMessageHandler({
      type: BRIDGE_MESSAGE_TYPE_SDK,
      handler: WidgetEvents.LOAD,
      params: {},
    });

    expect(onHandlerFn).toBeCalled();
  });

  test('Should handle internal ERROR event and emit public', () => {
    widget.on(WidgetEvents.ERROR, onHandlerFn);

    widget.onBridgeMessageHandler({
      type: BRIDGE_MESSAGE_TYPE_SDK,
      handler: WidgetEvents.ERROR,
      params: { msg: 1 },
    });

    expect(onHandlerFn).toBeCalledWith({ code: 1, text: 'internal error', details: { msg: 1 } });
  });
});
