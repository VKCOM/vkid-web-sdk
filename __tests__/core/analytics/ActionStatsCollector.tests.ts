import {
  ProductionStatsEventScreen,
  ActionStatsCollector,
  ProductionStatsCollector,
  ProductionStatsEventTypes,
  ProductionStatsTypeActions,
} from '#/core/analytics';
import { Config } from '#/core/config';
import { request } from '#/utils/request';

import { wait } from '../../utils';

const requestMocked = jest.mocked(request);

describe('ActionStatsCollector', () => {
  beforeEach(() => {
    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'ActionStatsCollector')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  it('Log event', async () => {
    const config = new Config();
    const productStatsCollector = new ProductionStatsCollector(config);
    const actionStatsCollector = new ActionStatsCollector(productStatsCollector);

    void actionStatsCollector.logEvent({
      screen: ProductionStatsEventScreen.NOWHERE,
      event: {
        type: ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM,
        [ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM]: {
          event_type: 'screen_proceed',
        },
      },
    });

    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining({
      screen: ProductionStatsEventScreen.NOWHERE,
      type: ProductionStatsEventTypes.TYPE_ACTION,
      [ProductionStatsEventTypes.TYPE_ACTION]: {
        type: ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM,
        [ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM]: {
          event_type: 'screen_proceed',
        },
      },
    }));
  });
});
