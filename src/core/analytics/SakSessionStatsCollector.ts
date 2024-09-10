import { ActionStatsCollector } from './ActionStatsCollector';
import { ProductionStatsEventScreen, ProductionStatsTypeActions, SakSessionAdditionalInfo, SakSessionStatsEvent, SakSessionStatsEventParams } from './types';

export class SakSessionStatsCollector {
  private readonly actionStatsCollector: ActionStatsCollector;

  public constructor(actionStatsCollector: ActionStatsCollector) {
    this.actionStatsCollector = actionStatsCollector;
  }

  public logEvent(event: SakSessionStatsEventParams) {
    const statsEvent: SakSessionStatsEvent = {
      type: ProductionStatsTypeActions.TYPE_SAK_SESSION_EVENT_ITEM,
      [ProductionStatsTypeActions.TYPE_SAK_SESSION_EVENT_ITEM]: event,
    };

    return this.actionStatsCollector.logEvent({
      screen: ProductionStatsEventScreen.NOWHERE,
      event: statsEvent,
    });
  }

  public sendSdkInit(additionalInfo?: SakSessionAdditionalInfo) {
    void this.logEvent({
      step: 'vkid_sdk_init',
      additional_info: additionalInfo,
    });
  }
}
