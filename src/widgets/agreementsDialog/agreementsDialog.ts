import { BridgeMessage } from '#/core/bridge';
import { Widget, WidgetEvents } from '#/core/widget';

import { AgreementsDialogInternalEvents } from './events';
import { getAgreementsDialogTemplate } from './template';

export class AgreementsDialog extends Widget {
  protected vkidAppName = 'user_policy_agreements';
  protected templateRenderer = getAgreementsDialogTemplate;

  protected onBridgeMessageHandler(event: BridgeMessage<AgreementsDialogInternalEvents | WidgetEvents>) {
    switch (event.handler) {
      case AgreementsDialogInternalEvents.DECLINE: {
        this.close();
        break;
      }
      case AgreementsDialogInternalEvents.ACCEPT: {
        this.events.emit(AgreementsDialogInternalEvents.ACCEPT, event);
        break;
      }
      default:
        super.onBridgeMessageHandler(event);
        break;
    }
  }
}
