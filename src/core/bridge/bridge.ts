import { Dispatcher } from '#/core/dispatcher';

import { BridgeMessageData, BridgeConfig, BridgeEvents } from './types';

export const BRIDGE_MESSAGE_TYPE_SDK = 'vk-sak-sdk';

export class Bridge<H> extends Dispatcher {
  private config: BridgeConfig;

  public constructor(config: BridgeConfig) {
    super();
    this.config = config;
    this.handleMessage = this.handleMessage.bind(this);
    // eslint-disable-next-line
    window.addEventListener('message', this.handleMessage);
  }

  public destroy(): void {
    /* Clear references for memory */
    // @ts-ignore-next-line Удаление происходит при десктруктуризации бриджа, поэтому это безопасно.
    delete this.config;
    // eslint-disable-next-line
    window.removeEventListener('message', this.handleMessage);
  }

  public sendMessage(message: BridgeMessageData<H>): void {
    (this.config.iframe.contentWindow as Window)?.postMessage(
      {
        type: BRIDGE_MESSAGE_TYPE_SDK,
        ...message,
      },
      this.config.origin,
    );
  }

  private handleMessage(event: MessageEvent): void {
    const isUnsupportedMessage = !this.config.origin ||
    event.origin !== this.config.origin ||
    event.source !== this.config.iframe.contentWindow ||
    event.data?.type !== BRIDGE_MESSAGE_TYPE_SDK;

    if (isUnsupportedMessage) {
      this.events.emit(BridgeEvents.UNSUPPORTED_MESSAGE, event.data);
      return;
    }

    this.events.emit(BridgeEvents.MESSAGE, event.data);
  }
}
