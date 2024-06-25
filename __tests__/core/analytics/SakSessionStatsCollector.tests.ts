import {
  ProductionStatsEventScreen,
  SakSessionStatsCollector,
  ActionStatsCollector,
  ProductionStatsCollector,
  ProductionStatsEventTypes,
  ProductionStatsTypeActions,
} from '#/core/analytics';
import { Config } from '#/core/config';
import { request } from '#/utils/request';

import { wait } from '../../utils';

const requestMocked = jest.mocked(request);

describe('SakSessionStatsCollector', () => {
  beforeEach(() => {
    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'SakSessionStatsCollector')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  it('Log event', async () => {
    const config = new Config();
    const productionStatsCollector = new ProductionStatsCollector(config);
    const actionStatsCollector = new ActionStatsCollector(productionStatsCollector);
    const sakSessionStatsCollector = new SakSessionStatsCollector(actionStatsCollector);

    void sakSessionStatsCollector.logEvent({
      step: 'vkid_sdk_init',
    });

    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining({
      screen: ProductionStatsEventScreen.NOWHERE,
      type: ProductionStatsEventTypes.TYPE_ACTION,
      [ProductionStatsEventTypes.TYPE_ACTION]: {
        type: ProductionStatsTypeActions.TYPE_SAK_SESSION_EVENT_ITEM,
        [ProductionStatsTypeActions.TYPE_SAK_SESSION_EVENT_ITEM]: {
          step: 'vkid_sdk_init',
        },
      },
    }));
  });

  it('Log SDK Init', async () => {
    const config = new Config();
    const productionStatsCollector = new ProductionStatsCollector(config);
    const actionStatsCollector = new ActionStatsCollector(productionStatsCollector);
    const sakSessionStatsCollector = new SakSessionStatsCollector(actionStatsCollector);

    void sakSessionStatsCollector.sendSdkInit();

    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining({
      screen: ProductionStatsEventScreen.NOWHERE,
      type: ProductionStatsEventTypes.TYPE_ACTION,
      [ProductionStatsEventTypes.TYPE_ACTION]: {
        type: ProductionStatsTypeActions.TYPE_SAK_SESSION_EVENT_ITEM,
        [ProductionStatsTypeActions.TYPE_SAK_SESSION_EVENT_ITEM]: {
          step: 'vkid_sdk_init',
        },
      },
    }));
  });
});
