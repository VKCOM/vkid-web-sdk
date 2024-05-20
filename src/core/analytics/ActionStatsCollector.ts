import { ProductionStatsCollector } from './ProductionStatsCollector';
import { ActionStatsEvent, ActionStatsEventItem, ProductionStatsEventScreen, ProductionStatsEventTypes } from './types';

export class ActionStatsCollector {
  private readonly productStatsCollector: ProductionStatsCollector;

  public constructor(productStatsCollector: ProductionStatsCollector) {
    this.productStatsCollector = productStatsCollector;
  }

  public logEvent(screen: ProductionStatsEventScreen, event: ActionStatsEventItem) {
    const statsEvent: ActionStatsEvent = {
      ...this.productStatsCollector.getBaseEvent(screen),
      type: ProductionStatsEventTypes.TYPE_ACTION,
      [ProductionStatsEventTypes.TYPE_ACTION]: event,
    };

    return this.productStatsCollector.logEvent(statsEvent);
  }
}
