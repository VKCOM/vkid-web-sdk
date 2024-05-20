import type { Config } from '#/core/config';

import { ActionStatsCollector } from './ActionStatsCollector';
import { ProductionStatsCollector } from './ProductionStatsCollector';
import { ProductionStatsEventScreen, ProductionStatsTypeActions, RegistrationStatsEvent, RegistrationStatsEventParams } from './types';

export class RegistrationStatsCollector {
  private readonly productStatsCollector: ProductionStatsCollector;
  private readonly actionStatsCollector: ActionStatsCollector;

  public constructor(config: Config) {
    this.productStatsCollector = new ProductionStatsCollector(config);
    this.actionStatsCollector = new ActionStatsCollector(this.productStatsCollector);
  }

  public logEvent(screen: ProductionStatsEventScreen, event: RegistrationStatsEventParams) {
    const statsEvent: RegistrationStatsEvent = {
      type: ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM,
      [ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM]: event,
    };

    return this.actionStatsCollector.logEvent(screen, statsEvent);
  }
}
