import { AuthStatsCollector } from '#/auth/analytics/AuthStatsCollector';
import {
  ProductionStatsEventScreen,
  RegistrationStatsEventParams,
  ProductionStatsEventTypes,
  ProductionStatsTypeActions,
} from '#/core/analytics';
import { Config } from '#/core/config';
import { request } from '#/utils/request';

import { wait } from '../../utils';

const requestMocked = jest.mocked(request);

let statsCollector: AuthStatsCollector;

const getRegistrationEvent = (event: RegistrationStatsEventParams) => ({
  screen: ProductionStatsEventScreen.NOWHERE,
  type: ProductionStatsEventTypes.TYPE_ACTION,
  [ProductionStatsEventTypes.TYPE_ACTION]: {
    type: ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM,
    [ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM]: event,
  },
});

describe('AuthStatsCollector', () => {
  beforeAll(() => {
    const config = new Config();
    statsCollector = new AuthStatsCollector(config);
    statsCollector.setUniqueSessionId('id');
  });

  beforeEach(() => {
    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'AuthStatsCollector')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  it('Log custom auth click', async () => {
    void statsCollector.sendCustomAuthStart();
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'custom_auth_start',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }],
    })));
  });

  it('Log custom auth click with provider "ok_ru"', async () => {
    void statsCollector.sendCustomAuthStart('ok_ru');
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'custom_auth_start',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }, {
        name: 'oauth_service',
        value: 'ok_ru',
      }],
    })));
  });

  it('Log custom auth click with provider "mail_ru"', async () => {
    void statsCollector.sendCustomAuthStart('mail_ru');
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'custom_auth_start',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }, {
        name: 'oauth_service',
        value: 'mail_ru',
      }],
    })));
  });

  it('Log custom auth click with provider "vkid"', async () => {
    void statsCollector.sendCustomAuthStart('vkid');
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'custom_auth_start',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }, {
        name: 'oauth_service',
        value: 'vkid',
      }],
    })));
  });
});
