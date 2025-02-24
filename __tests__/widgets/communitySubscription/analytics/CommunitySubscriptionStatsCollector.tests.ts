import {
  ProductionStatsEventScreen,
  ProductionStatsEventTypes,
  ProductionStatsTypeActions,
  RegistrationStatsEventParams,
} from '#/core/analytics';
import { Config } from '#/core/config';
import { Languages, Scheme } from '#/types';
import { request } from '#/utils/request';
import { CommunitySubscriptionStatsCollector } from '#/widgets/communitySubscription/analytics';

import { wait } from '../../../utils';

const requestMocked = jest.mocked(request);

let statsCollector: CommunitySubscriptionStatsCollector;

const getRegistrationEvent = (event: RegistrationStatsEventParams) => ({
  screen: ProductionStatsEventScreen.NOWHERE,
  type: ProductionStatsEventTypes.TYPE_ACTION,
  [ProductionStatsEventTypes.TYPE_ACTION]: {
    type: ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM,
    [ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM]: event,
  },
});

const GROUP_ID = 123;
const APP_ID = 456;
const FIELDS = [{
  name: 'language',
  value: Languages.RUS.toString(),
}, {
  name: 'theme_type',
  value: Scheme.LIGHT,
}, {
  name: 'group_id',
  value: GROUP_ID.toString(),
}];

describe('CommunitySubscriptionStatsCollector', () => {
  beforeAll(() => {
    const config = new Config();
    config.update({ app: APP_ID });
    statsCollector = new CommunitySubscriptionStatsCollector(config, 'access_token');
    statsCollector.setStatsAdditionalData({
      groupId: GROUP_ID,
      lang: Languages.RUS,
      scheme: Scheme.LIGHT,
    });
  });

  beforeEach(() => {
    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'CommunitySubscriptionStatsCollector')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  it('Log modal open', async () => {
    void statsCollector.sendModalWindowShow();
    await wait(0);
    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('statEvents.addVKID', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'community_follow_modal_window_show',
      fields: FIELDS,
      app_id: APP_ID,
    })));
  });

  it('Log subscribe button click', async () => {
    void statsCollector.sendClick();
    await wait(0);
    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('statEvents.addVKID', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'community_follow_click',
      fields: FIELDS,
      app_id: APP_ID,
    })));
  });

  it('Log next time button click', async () => {
    void statsCollector.sendNextTimeClick();
    await wait(0);
    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('statEvents.addVKID', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'community_follow_next_time_click',
      fields: FIELDS,
      app_id: APP_ID,
    })));
  });

  it('Log subscribe screen close', async () => {
    void statsCollector.sendClose();
    await wait(0);
    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('statEvents.addVKID', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'community_follow_close',
      fields: FIELDS,
      app_id: APP_ID,
    })));
  });

  it('Log send error screen show', async () => {
    void statsCollector.sendErrorShow();
    await wait(0);
    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('statEvents.addVKID', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'community_follow_error_show',
      fields: FIELDS,
      app_id: APP_ID,
    })));
  });

  it('Log send error screen retry click', async () => {
    void statsCollector.sendErrorRetryClick();
    await wait(0);
    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('statEvents.addVKID', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'community_follow_error_retry_click',
      fields: FIELDS,
      app_id: APP_ID,
    })));
  });

  it('Log send error screen cancel click', async () => {
    void statsCollector.sendErrorCancelClick();
    await wait(0);
    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('statEvents.addVKID', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'community_follow_error_cancel_click',
      fields: FIELDS,
      app_id: APP_ID,
    })));
  });

  it('Log send error screen close', async () => {
    void statsCollector.sendErrorClose();
    await wait(0);
    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('statEvents.addVKID', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'community_follow_error_close',
      fields: FIELDS,
      app_id: APP_ID,
    })));
  });

  it('Log success subscription', async () => {
    void statsCollector.sendSuccess();
    await wait(0);
    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('statEvents.addVKID', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'community_follow_success',
      fields: FIELDS,
      app_id: APP_ID,
    })));
  });
});
