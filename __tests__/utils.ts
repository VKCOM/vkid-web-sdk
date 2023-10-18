const BRIDGE_MESSAGE_TYPE_SDK = 'vk-sak-sdk';

export const dispatchPostMessageEvent = (origin: string, source: Window, data: any) => {
  window.dispatchEvent(
    new MessageEvent('message', {
      origin,
      source,
      data: {
        type: BRIDGE_MESSAGE_TYPE_SDK,
        ...data,
      },
    }),
  );
};

export const wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time));
