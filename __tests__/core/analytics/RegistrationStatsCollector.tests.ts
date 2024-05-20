import { ProductionStatsEventScreen, RegistrationStatsCollector } from '#/core/analytics';
import { ProductionStatsEventTypes, ProductionStatsTypeActions } from '#/core/analytics/types';
import { Config } from '#/core/config';
import { request } from '#/utils/request';

import { wait } from '../../utils';

const requestMocked = jest.mocked(request);

describe('RegistrationStatsCollector', () => {
  beforeEach(() => {
    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'RegistrationStatsCollector')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  it('Log event', async () => {
    const config = new Config();
    const registrationStatsCollector = new RegistrationStatsCollector(config);

    void registrationStatsCollector.logEvent(ProductionStatsEventScreen.NOWHERE, {
      event_type: 'screen_proceed',
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
