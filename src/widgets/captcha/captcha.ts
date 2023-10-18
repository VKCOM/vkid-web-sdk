import { BridgeMessage } from '#/core/bridge';
import { Widget, WidgetEvents } from '#/core/widget';

import { CaptchaInternalEvents } from './events';
import { getDataPolicyTemplate } from './template';

export class Captcha extends Widget {
  protected vkidAppName = 'auth_captcha';

  protected templateRenderer = getDataPolicyTemplate;

  protected onBridgeMessageHandler(event: BridgeMessage<CaptchaInternalEvents & WidgetEvents>) {
    switch (event.handler) {
      case CaptchaInternalEvents.CAPTCHA_SUCCESS:
        this.events.emit(CaptchaInternalEvents.CAPTCHA_SUCCESS, event);
        this.close();
        break;
      default:
        super.onBridgeMessageHandler(event);
        break;
    }
  }
}
