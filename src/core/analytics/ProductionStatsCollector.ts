import { VERSION } from '#/constants';
import type { Config } from '#/core/config';
import { getApiUrl, getStatsUrl, request } from '#/utils/request';

import { ProductionStatsBaseEvent, ProductionStatsEvent, ProductionStatsEventScreen } from './types';

export class ProductionStatsCollector {
  public static readonly MAX_INT32 = 2147483647;
  private timeoutId: number | null = null;
  private lastEvent: ProductionStatsEvent;
  private readonly config: Config;
  private stackEvents: ProductionStatsEvent[] = [];
  private readonly accessToken?: string

  public constructor(config: Config, accessToken?: string) {
    this.config = config;
    this.accessToken = accessToken;
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
        let params: Record<string, any> = {
          events: JSON.stringify(this.stackEvents),
          sak_version: VERSION,
        };
        this.stackEvents = [];
        let url = getStatsUrl('stat_events_vkid_sdk', this.config);
        if (this.accessToken) {
          params.access_token = this.accessToken;
          url = getApiUrl('statEvents.addVKID', this.config);
        }

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
