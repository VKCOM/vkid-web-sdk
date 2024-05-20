import { Widget } from '#/core/widget';

import { AgreementsDialogInternalEvents, AgreementsDialogPublicEvents } from './events';
import { getAgreementsDialogTemplate } from './template';
import { AgreementsDialogBridgeMessage, AgreementsDialogParams } from './types';

export class AgreementsDialog extends Widget<AgreementsDialogParams> {
  protected vkidAppName = 'user_policy_agreements';
  protected templateRenderer = getAgreementsDialogTemplate;

  protected onBridgeMessageHandler(event: AgreementsDialogBridgeMessage) {
    switch (event.handler) {
      case AgreementsDialogInternalEvents.DECLINE: {
        this.close();
        break;
      }
      case AgreementsDialogInternalEvents.ACCEPT: {
        this.events.emit(AgreementsDialogPublicEvents.ACCEPT, event);
        break;
      }
      default:
        super.onBridgeMessageHandler(event);
        break;
    }
  }
}
