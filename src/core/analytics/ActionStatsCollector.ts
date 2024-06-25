import { ProductionStatsCollector } from './ProductionStatsCollector';
import { ActionStatsEvent, ActionStatsParams, ProductionStatsEventTypes } from './types';

export class ActionStatsCollector {
  private readonly productStatsCollector: ProductionStatsCollector;

  public constructor(productStatsCollector: ProductionStatsCollector) {
    this.productStatsCollector = productStatsCollector;
  }

  public logEvent(params: ActionStatsParams) {
    const statsEvent: ActionStatsEvent = {
      ...this.productStatsCollector.getBaseEvent(params.screen),
      type: ProductionStatsEventTypes.TYPE_ACTION,
      [ProductionStatsEventTypes.TYPE_ACTION]: params.event,
    };

    return this.productStatsCollector.logEvent(statsEvent);
  }
}
