import { customAlphabet } from 'nanoid/non-secure';

import { Auth } from '#/auth';
import { Bridge, BridgeEvents, BridgeMessage } from '#/core/bridge';
import { Config, ConfigData } from '#/core/config';
import { Dispatcher } from '#/core/dispatcher';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isRequired, validator } from '#/core/validator';
import { generateCodeChallenge } from '#/utils/oauth';
import { getVKIDUrl } from '#/utils/url';

import { WIDGET_ERROR_TEXT } from './constants';
import { WidgetEvents } from './events';
import { getWidgetTemplate } from './template';
import { WidgetElements, WidgetError, WidgetErrorCode, WidgetParams, WidgetState } from './types';

const MODULE_LOAD_TIMEOUT = 5000;
const MODULE_CHANGE_STATE_TIMEOUT = 300;
const CODE_CHALLENGE_METHOD = 's256';

export class Widget<P = Record<string, any>> extends Dispatcher {
  public static __config: Config;
  public static __auth: Auth;

  protected readonly id: string = customAlphabet('qazwsxedcrfvtgbyhnujmikol', 6)();

  protected vkidAppName = '';
  protected config: Config;
  protected timeoutTimer: any;
  protected bridge: Bridge<any>;
  protected container: HTMLElement;
  protected templateRenderer = getWidgetTemplate;

  protected elements: WidgetElements;

  public constructor() {
    super();
    this.config = Widget.__config;
  }

  @validator<WidgetParams>({ container: [isRequired] })
  public render(params: WidgetParams & P): this {
    this.container = params.container;
    this.renderTemplate();
    this.registerElements();
    this.loadWidgetFrame(params);

    return this;
  }

  public close() {
    clearTimeout(this.timeoutTimer);
    this.elements?.root?.remove();
    this.bridge?.destroy();
    this.events.emit(WidgetEvents.CLOSE);
  }

  public show(): this {
    if (this.elements.root) {
      this.elements.root.style.display = 'block';
      this.events.emit(WidgetEvents.SHOW);
    }

    return this;
  }

  public hide(): this {
    if (this.elements.root) {
      this.elements.root.style.display = 'none';
      this.events.emit(WidgetEvents.HIDE);
    }

    return this;
  }

  /**
   * Метод вызывается перед началом загрузки iframe с VK ID приложением
   */
  protected onStartLoadHandler() {
    this.setState('loading');
    this.timeoutTimer = setTimeout(() => {
      this.onErrorHandler({
        code: WidgetErrorCode.TimeoutExceeded,
        text: WIDGET_ERROR_TEXT[WidgetErrorCode.TimeoutExceeded],
      });
    }, MODULE_LOAD_TIMEOUT);
    this.events.emit(WidgetEvents.START_LOAD);
  }

  /**
   * Метод вызывается после того, как полностью загружен iframe с VK ID приложением
   */
  protected onLoadHandler() {
    clearTimeout(this.timeoutTimer);
    setTimeout(() => {
      // Задержка избавляет от моргания замены шаблона на iframe
      this.setState('loaded');
    }, MODULE_CHANGE_STATE_TIMEOUT);
    this.events.emit(WidgetEvents.LOAD);
  }

  /**
   * Метод вызывается, когда во время работы/загрузки VK ID приложения произошла ошибка
   */
  protected onErrorHandler(error: WidgetError) {
    clearTimeout(this.timeoutTimer);
    this.setState('not_loaded');
    this.events.emit(WidgetEvents.ERROR, error);
    this.elements?.iframe?.remove();
  }

  /**
   * Метод вызывается при сообщениях от VK ID приложения
   */
  protected onBridgeMessageHandler(event: BridgeMessage<any>) {
    switch (event.handler) {
      case WidgetEvents.LOAD: {
        this.onLoadHandler();
        break;
      }
      case WidgetEvents.CLOSE: {
        this.close();
        break;
      }
      case WidgetEvents.ERROR: {
        this.onErrorHandler({
          code: WidgetErrorCode.InternalError,
          text: WIDGET_ERROR_TEXT[WidgetErrorCode.InternalError],
          details: event.params,
        });
        break;
      }
      default:
        break;
    }
  }

  // <Дополнительные хелперы>
  protected renderTemplate() {
    this.container.insertAdjacentHTML('beforeend', this.templateRenderer(this.id));
  }

  protected loadWidgetFrame(params: WidgetParams) {
    this.onStartLoadHandler();
    this.bridge = new Bridge({
      iframe: this.elements.iframe,
      origin: `https://${this.config.get().vkidDomain}`,
    });
    this.bridge.on(BridgeEvents.MESSAGE, (event: BridgeMessage<any>) => this.onBridgeMessageHandler(event));

    this.elements.iframe.src = this.getWidgetFrameSrc(this.config.get(), params);
  }

  protected getWidgetFrameSrc(config: ConfigData, params: WidgetParams): string {
    const { container, ...otherParams } = params;
    const queryParams = {
      ...otherParams,
      code_challenge: generateCodeChallenge(),
      code_challenge_method: CODE_CHALLENGE_METHOD,
      origin: location.protocol + '//' + location.host,
      uuid: this.id,
    };

    return getVKIDUrl(this.vkidAppName, queryParams, config);
  }

  protected setState(state: WidgetState) {
    this.elements.root.setAttribute('data-state', state);
  }

  protected registerElements() {
    const root = document.getElementById(this.id) as HTMLElement;

    this.elements = {
      root,
      iframe: root.querySelector('iframe') as HTMLIFrameElement,
    };
  }
}
