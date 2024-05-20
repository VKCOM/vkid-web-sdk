import { ProductionStatsEventScreen } from '#/core/analytics';
import { ProductionStatsCollector } from '#/core/analytics/ProductionStatsCollector';
import { ProductionStatsEvent, ProductionStatsEventTypes, ProductionStatsTypeActions } from '#/core/analytics/types';
import { Config } from '#/core/config';
import { request } from '#/utils/request';

import { wait } from '../../utils';

const requestMocked = jest.mocked(request);

describe('ProductionStatsCollector', () => {
  beforeEach(() => {
    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'ProductionStatsCollector')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  it('Check base event', async () => {
    const config = new Config();
    const productStatsCollector = new ProductionStatsCollector(config);

    expect(productStatsCollector.getBaseEvent(ProductionStatsEventScreen.NOWHERE)).toMatchObject(expect.objectContaining({
      prev_event_id: 0,
      prev_nav_id: 0,
      url: window.location.href,
      screen: ProductionStatsEventScreen.NOWHERE,
    }));
  });

  it('Log event', async () => {
    const config = new Config();
    const productStatsCollector = new ProductionStatsCollector(config);
    const event: ProductionStatsEvent = {
      id: 10,
      timestamp: '0000',
      url: 'url',
      screen: ProductionStatsEventScreen.NOWHERE,
      type: ProductionStatsEventTypes.TYPE_ACTION,
      [ProductionStatsEventTypes.TYPE_ACTION]: {
        type: ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM,
        [ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM]: {
          event_type: 'screen_proceed',
        },
      },
    };

    void productStatsCollector.logEvent(event);

    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toEqual(event);
  });

  it('Log batching event', async () => {
    const config = new Config();
    const productStatsCollector = new ProductionStatsCollector(config);
    const event: ProductionStatsEvent = {
      id: 10,
      timestamp: '0000',
      url: 'url',
      screen: ProductionStatsEventScreen.NOWHERE,
      type: ProductionStatsEventTypes.TYPE_ACTION,
      [ProductionStatsEventTypes.TYPE_ACTION]: {
        type: ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM,
        [ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM]: {
          event_type: 'screen_proceed',
        },
      },
    };

    void productStatsCollector.logEvent(event);
    void productStatsCollector.logEvent(event);

    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events);

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toEqual([event, event]);
  });
});
