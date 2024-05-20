import { ProductionStatsEventScreen } from '#/core/analytics';
import { ProductionStatsEventTypes, ProductionStatsTypeActions, RegistrationStatsEventParams } from '#/core/analytics/types';
import { Config } from '#/core/config';
import { request } from '#/utils/request';
import { OneTapStatsCollector } from '#/widgets/oneTap/analytics';

import { wait } from '../../../utils';

const requestMocked = jest.mocked(request);

let statsCollector: OneTapStatsCollector;

const getEvent = (event: RegistrationStatsEventParams) => ({
  screen: ProductionStatsEventScreen.NOWHERE,
  type: ProductionStatsEventTypes.TYPE_ACTION,
  [ProductionStatsEventTypes.TYPE_ACTION]: {
    type: ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM,
    [ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM]: event,
  },
});

describe('OneTapStatsCollector', () => {
  beforeAll(() => {
    const config = new Config();
    statsCollector = new OneTapStatsCollector(config);
  });

  beforeEach(() => {
    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'OneTapStatsCollector')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  it('Log FrameLoadingFailed', async () => {
    void statsCollector.sendFrameLoadingFailed();
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getEvent({
      event_type: 'iframe_loading_failed',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }],
    })));
  });

  it('Log NoSessionFound', async () => {
    void statsCollector.sendNoSessionFound();
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getEvent({
      event_type: 'no_session_found',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }],
    })));
  });

  it('Log OneTapButtonNoUserShow', async () => {
    void statsCollector.sendOneTapButtonNoUserShow();
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getEvent({
      event_type: 'onetap_button_no_user_show',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'button_type',
        value: 'default',
      }],
    })));
  });

  it('Log OneTapButtonNoUserTap', async () => {
    void statsCollector.sendOneTapButtonNoUserTap();
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getEvent({
      event_type: 'onetap_button_no_user_tap',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'button_type',
        value: 'default',
      }],
    })));
  });

  it('Log SDK Init', async () => {
    void statsCollector.sendSdkInit();
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getEvent({
      event_type: 'sdk_init',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }],
    })));
  });
});
