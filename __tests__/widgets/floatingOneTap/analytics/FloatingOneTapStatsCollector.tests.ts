import { ProductionStatsEventScreen } from '#/core/analytics';
import { ProductionStatsEventTypes, ProductionStatsTypeActions, RegistrationStatsEventParams } from '#/core/analytics/types';
import { Config } from '#/core/config';
import { Languages, Scheme } from '#/types';
import { request } from '#/utils/request';
import { FloatingOneTapContentId } from '#/widgets/floatingOneTap';
import { FloatingOneTapStatsCollector } from '#/widgets/floatingOneTap/analytics';
import { TEXT_TYPE } from '#/widgets/floatingOneTap/analytics/constants';

import { wait } from '../../../utils';

const requestMocked = jest.mocked(request);

let statsCollector: FloatingOneTapStatsCollector;

const getEvent = (event: RegistrationStatsEventParams) => ({
  screen: ProductionStatsEventScreen.FLOATING_ONE_TAP,
  type: ProductionStatsEventTypes.TYPE_ACTION,
  [ProductionStatsEventTypes.TYPE_ACTION]: {
    type: ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM,
    [ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM]: event,
  },
});

describe('FloatingOneTapStatsCollector', () => {
  beforeAll(() => {
    const config = new Config();
    statsCollector = new FloatingOneTapStatsCollector(config);
  });

  beforeEach(() => {
    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'FloatingOneTapStatsCollector')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  it('Log ScreenProcessed', async () => {
    void statsCollector.sendScreenProcessed({
      lang: Languages.RUS,
      scheme: Scheme.DARK,
      contentId: FloatingOneTapContentId.SIGN_IN_TO_ACCOUNT,
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
          screen_to: ProductionStatsEventScreen.FLOATING_ONE_TAP,
          fields: [{
            name: 'sdk_type',
            value: 'vkid',
          }, {
            name: 'theme_type',
            value: Scheme.DARK,
          }, {
            name: 'language',
            value: Languages.RUS.toString(),
          }, {
            name: 'text_type',
            value: TEXT_TYPE[FloatingOneTapContentId.SIGN_IN_TO_ACCOUNT],
          }],
        },
      } }));
  });

  it('Log IframeLoadingFailed', async () => {
    void statsCollector.sendIframeLoadingFailed();
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

  it('Log NoUserButtonShow', async () => {
    void statsCollector.sendNoUserButtonShow();
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getEvent({
      event_type: 'no_user_button_show',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }],
    })));
  });

  it('Log NoUserButtonTap', async () => {
    void statsCollector.sendNoUserButtonTap();
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getEvent({
      event_type: 'no_user_button_tap',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
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
