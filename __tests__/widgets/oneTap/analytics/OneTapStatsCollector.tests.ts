import { ProductionStatsEventScreen, ProductionStatsEventTypes, ProductionStatsTypeActions, RegistrationStatsEventParams } from '#/core/analytics';
import { Config } from '#/core/config';
import { Languages, Scheme } from '#/types';
import { request } from '#/utils/request';
import { OneTapContentId, OneTapSkin } from '#/widgets/oneTap';
import { OneTapStatsCollector } from '#/widgets/oneTap/analytics';
import { TEXT_TYPE } from '#/widgets/oneTap/analytics/constants';

import { wait } from '../../../utils';

const requestMocked = jest.mocked(request);

let statsCollector: OneTapStatsCollector;

const getRegistrationEvent = (event: RegistrationStatsEventParams) => ({
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
    statsCollector.setUniqueSessionId('id');
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
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'iframe_loading_failed',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }],
    })));
  });

  it('Log NoSessionFound', async () => {
    void statsCollector.sendNoSessionFound();
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'no_session_found',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }],
    })));
  });

  it('Log OneTapButtonNoUserShow', async () => {
    void statsCollector.sendOneTapButtonNoUserShow();
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'onetap_button_no_user_show',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
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
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'onetap_button_no_user_tap',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }, {
        name: 'button_type',
        value: 'default',
      }],
    })));
  });

  it('Log ScreenProceed', async () => {
    void statsCollector.sendScreenProceed({
      lang: Languages.RUS,
      scheme: Scheme.DARK,
      skin: OneTapSkin.Secondary,
      contentId: OneTapContentId.CALCULATE,
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'screen_proceed',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }, {
        name: 'theme_type',
        value: Scheme.DARK,
      }, {
        name: 'style_type',
        value: OneTapSkin.Secondary,
      }, {
        name: 'language',
        value: Languages.RUS.toString(),
      }, {
        name: 'text_type',
        value: TEXT_TYPE[OneTapContentId.CALCULATE],
      }],
    })));
  });
});
