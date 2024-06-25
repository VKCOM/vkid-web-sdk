import { ActionStatsCollector } from './ActionStatsCollector';
import { ProductionStatsEventScreen, ProductionStatsTypeActions, RegistrationStatsEvent, RegistrationStatsEventParams } from './types';

export class RegistrationStatsCollector {
  private readonly actionStatsCollector: ActionStatsCollector;

  public constructor(actionStatsCollector: ActionStatsCollector) {
    this.actionStatsCollector = actionStatsCollector;
  }

  public logEvent(screen: ProductionStatsEventScreen, event: RegistrationStatsEventParams) {
    const statsEvent: RegistrationStatsEvent = {
      type: ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM,
      [ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM]: event,
    };

    return this.actionStatsCollector.logEvent({ screen, event: statsEvent });
  }
}
