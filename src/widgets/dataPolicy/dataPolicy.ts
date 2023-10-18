import { BridgeMessage } from '#/core/bridge';
import { Widget, WidgetEvents } from '#/core/widget';

import { DataPolicyInternalEvents } from './events';
import { getDataPolicyTemplate } from './template';

export class DataPolicy extends Widget {
  protected vkidAppName = 'user_data_policy';
  protected templateRenderer = getDataPolicyTemplate;

  protected onBridgeMessageHandler(event: BridgeMessage<DataPolicyInternalEvents & WidgetEvents>) {
    switch (event.handler) {
      case DataPolicyInternalEvents.WOW__LEGACY_CLOSE: {
        this.close();
        break;
      }
      default:
        super.onBridgeMessageHandler(event);
        break;
    }
  }
}
