export enum BridgeEvents {
  MESSAGE = 'message',
  UNSUPPORTED_MESSAGE = 'unsupported_message',
}

export interface BridgeMessageData<H, P = Record<string, any>> {
  handler: H;
  params: P;
}

export interface BridgeMessage<H, P = Record<string, any>> extends BridgeMessageData<H, P> {
  type: string;
}

export interface BridgeConfig {
  iframe: HTMLIFrameElement;
  origin: string;
}
