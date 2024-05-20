import type { Config } from '#/core/config';
import { getStatsUrl, request } from '#/utils/request';

import { ProductionStatsBaseEvent, ProductionStatsEvent, ProductionStatsEventScreen } from './types';

export class ProductionStatsCollector {
  public static readonly MAX_INT32 = 2147483647;
  private timeoutId: number | null = null;
  private lastEvent: ProductionStatsEvent;
  private readonly config: Config;
  private stackEvents: ProductionStatsEvent[] = [];

  public constructor(config: Config) {
    this.config = config;
  }

  private getIntId(): number {
    return Math.floor(Math.random() * ProductionStatsCollector.MAX_INT32);
  }

  private getCurrentTime(isMicrosec = true): string {
    const strTime = Date.now().toString(10);

    if (isMicrosec) {
      return strTime + '000';
    }

    return strTime;
  }

  private sendStats(event: ProductionStatsEvent) {
    this.stackEvents.push(event);
    this.timeoutId && window.clearTimeout(this.timeoutId);

    return new Promise((res, rej) => {
      this.timeoutId = window.setTimeout(() => {
        const params = {
          events: JSON.stringify(this.stackEvents),
        };
        this.stackEvents = [];
        const url = getStatsUrl('stat_events_vkid_sdk', this.config);

        request(url, params)
          .then(res)
          .catch(rej);
      }, 0);
    });
  }

  public getBaseEvent(screen?: ProductionStatsEventScreen): ProductionStatsBaseEvent {
    return {
      id: this.getIntId(),
      prev_event_id: this.lastEvent?.id || 0,
      prev_nav_id: 0,

      timestamp: this.getCurrentTime(),
      url: window.location.href,
      screen,
    };
  }

  public logEvent(event: ProductionStatsEvent) {
    this.lastEvent = event;

    return this.sendStats(event);
  }
}
