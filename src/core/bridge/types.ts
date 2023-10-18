export enum BridgeEvents {
  MESSAGE = 'message',
  UNSUPPORTED_MESSAGE = 'unsupported_message',
}

export interface BridgeMessageData<H> {
  handler: H;
  params: Record<string, any>;
}

export interface BridgeMessage<H> extends BridgeMessageData<H> {
  type: string;
}

export interface BridgeConfig {
  iframe: HTMLIFrameElement;
  origin: string;
}
