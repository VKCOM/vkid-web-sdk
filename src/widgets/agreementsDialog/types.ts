import { BridgeMessage } from '#/core/bridge';
import { WidgetEvents, WidgetParams } from '#/core/widget';

import { AgreementsDialogInternalEvents } from './events';

export type AgreementsDialogBridgeMessage = BridgeMessage<AgreementsDialogInternalEvents | WidgetEvents>;

export enum AgreementsDialogStatsFlowSource {
  BUTTON_ONE_TAP = 'button_one_tap',
  FLOATING_ONE_TAP = 'floating_one_tap',
}

export interface AgreementsDialogParams extends WidgetParams {
  stats_flow_source: AgreementsDialogStatsFlowSource;
}
