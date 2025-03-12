import type { Config } from '#/core/config';
import { getStatsUrl, request } from '#/utils/request';

import { MyTrackerStatus, VKIDSDKGetConfigResponse } from './types';

export class MyTrackerService {
  private readonly config: Config;

  public constructor(config: Config) {
    this.config = config;
  }

  public init() {
    this.getTrackerId()
      .then((response) => {
        if (response?.response?.active === MyTrackerStatus.ON) {
          this.includeOnPage(response.response.tracker_id);
        }
      })
      .catch(console.error);
  }

  private getTrackerId(): Promise<VKIDSDKGetConfigResponse> {
    const url = getStatsUrl('vkid_sdk_get_config', this.config);
    return request(url, {});
  }

  private includeOnPage(trackerId: number) {
    // @ts-expect-error
    const _tmr = window._tmr || (window._tmr = []);
    _tmr.push({
      id: trackerId,
      type: 'pageView',
      start: new Date().getTime(),
    });

    if (document.getElementById('tmr-code')) {
      return;
    }

    const ts = document.createElement('script');
    ts.type = 'text/javascript';
    ts.async = true;
    ts.id = 'tmr-code';
    ts.src = 'https://mytopf.com/js/code.js';

    const s = document.getElementsByTagName('script')[0];
    // @ts-expect-error
    s.parentNode.insertBefore(ts, s);
  }
}
