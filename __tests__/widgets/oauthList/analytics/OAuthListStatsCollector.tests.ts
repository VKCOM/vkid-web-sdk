import {
  ProductionStatsEventScreen,
  RegistrationStatsEventParams,
  ProductionStatsEventTypes,
  ProductionStatsTypeActions,
} from '#/core/analytics';
import { Config } from '#/core/config';
import { request } from '#/utils/request';
import { OAuthName } from '#/widgets/oauthList';
import { MultibrandingStatsProviders, OAuthListStatsCollector } from '#/widgets/oauthList/analytics';

import { wait } from '../../../utils';

const requestMocked = jest.mocked(request);

let statsCollector: OAuthListStatsCollector;

const getRegistrationEvent = (event: RegistrationStatsEventParams) => ({
  screen: ProductionStatsEventScreen.MULTIBRANDING,
  type: ProductionStatsEventTypes.TYPE_ACTION,
  [ProductionStatsEventTypes.TYPE_ACTION]: {
    type: ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM,
    [ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM]: event,
  },
});

describe('OAuthListStatsCollector', () => {
  beforeAll(() => {
    const config = new Config();
    statsCollector = new OAuthListStatsCollector(config);
    statsCollector.setUniqueSessionId('id');
  });

  beforeEach(() => {
    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'OAuthListStatsCollector')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  it('Log all selected providers', async () => {
    const providers = new Set([
      OAuthName.VK,
      OAuthName.OK,
      OAuthName.MAIL,
    ]);

    void statsCollector.sendMultibrandingOauthAdded({
      screen: ProductionStatsEventScreen.MULTIBRANDING,
      fields: [{
        name: MultibrandingStatsProviders.VK,
        value: (+providers.has(OAuthName.VK)).toString(),
      }, {
        name: MultibrandingStatsProviders.OK,
        value: (+providers.has(OAuthName.OK)).toString(),
      }, {
        name: MultibrandingStatsProviders.MAIL,
        value: (+providers.has(OAuthName.MAIL)).toString(),
      }],
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'multibranding_oauth_added',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }, {
        name: 'vk',
        value: '1',
      }, {
        name: 'ok',
        value: '1',
      }, {
        name: 'mail',
        value: '1',
      }],
    })));
  });

  it('Log the selected provider "OK"', async () => {
    const providers = new Set([
      OAuthName.OK,
    ]);

    void statsCollector.sendMultibrandingOauthAdded({
      screen: ProductionStatsEventScreen.MULTIBRANDING,
      fields: [{
        name: MultibrandingStatsProviders.VK,
        value: (+providers.has(OAuthName.VK)).toString(),
      }, {
        name: MultibrandingStatsProviders.OK,
        value: (+providers.has(OAuthName.OK)).toString(),
      }, {
        name: MultibrandingStatsProviders.MAIL,
        value: (+providers.has(OAuthName.MAIL)).toString(),
      }],
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'multibranding_oauth_added',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }, {
        name: 'vk',
        value: '0',
      }, {
        name: 'ok',
        value: '1',
      }, {
        name: 'mail',
        value: '0',
      }],
    })));
  });

  it('Log the selected provider "Mail"', async () => {
    const providers = new Set([
      OAuthName.MAIL,
    ]);

    void statsCollector.sendMultibrandingOauthAdded({
      screen: ProductionStatsEventScreen.MULTIBRANDING,
      fields: [{
        name: MultibrandingStatsProviders.VK,
        value: (+providers.has(OAuthName.VK)).toString(),
      }, {
        name: MultibrandingStatsProviders.OK,
        value: (+providers.has(OAuthName.OK)).toString(),
      }, {
        name: MultibrandingStatsProviders.MAIL,
        value: (+providers.has(OAuthName.MAIL)).toString(),
      }],
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'multibranding_oauth_added',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }, {
        name: 'vk',
        value: '0',
      }, {
        name: 'ok',
        value: '0',
      }, {
        name: 'mail',
        value: '1',
      }],
    })));
  });

  it('Log the selected provider "VK"', async () => {
    const providers = new Set([
      OAuthName.VK,
    ]);

    void statsCollector.sendMultibrandingOauthAdded({
      screen: ProductionStatsEventScreen.MULTIBRANDING,
      fields: [{
        name: MultibrandingStatsProviders.VK,
        value: (+providers.has(OAuthName.VK)).toString(),
      }, {
        name: MultibrandingStatsProviders.OK,
        value: (+providers.has(OAuthName.OK)).toString(),
      }, {
        name: MultibrandingStatsProviders.MAIL,
        value: (+providers.has(OAuthName.MAIL)).toString(),
      }],
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'multibranding_oauth_added',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }, {
        name: 'vk',
        value: '1',
      }, {
        name: 'ok',
        value: '0',
      }, {
        name: 'mail',
        value: '0',
      }],
    })));
  });

  it('Log the display of the "OK" button', async () => {
    void statsCollector.sendOkButtonShow({
      screen: ProductionStatsEventScreen.MULTIBRANDING,
      isIcon: false,
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'ok_button_show',
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

  it('Log the display of the "Mail" button', async () => {
    void statsCollector.sendMailButtonShow({
      screen: ProductionStatsEventScreen.MULTIBRANDING,
      isIcon: false,
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'mail_button_show',
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

  it('Log the display of the "VK" button', async () => {
    void statsCollector.sendVkButtonShow({
      screen: ProductionStatsEventScreen.MULTIBRANDING,
      isIcon: false,
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'vk_button_show',
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

  it('Log the display of the "OK" icon', async () => {
    void statsCollector.sendOkButtonShow({
      screen: ProductionStatsEventScreen.MULTIBRANDING,
      isIcon: true,
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'ok_button_show',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }, {
        name: 'button_type',
        value: 'icon',
      }],
    })));
  });

  it('Log the display of the "Mail" icon', async () => {
    void statsCollector.sendMailButtonShow({
      screen: ProductionStatsEventScreen.MULTIBRANDING,
      isIcon: true,
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'mail_button_show',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }, {
        name: 'button_type',
        value: 'icon',
      }],
    })));
  });

  it('Log the display of the "VK" icon', async () => {
    void statsCollector.sendVkButtonShow({
      screen: ProductionStatsEventScreen.MULTIBRANDING,
      isIcon: true,
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'vk_button_show',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }, {
        name: 'button_type',
        value: 'icon',
      }],
    })));
  });

  it('Log clicking on the "OK" button', async () => {
    void statsCollector.sendOkButtonTap({
      screen: ProductionStatsEventScreen.MULTIBRANDING,
      isIcon: false,
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'ok_button_tap',
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

  it('Log clicking on the "Mail" button', async () => {
    void statsCollector.sendMailButtonTap({
      screen: ProductionStatsEventScreen.MULTIBRANDING,
      isIcon: false,
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'mail_button_tap',
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

  it('Log clicking on the "VK" button', async () => {
    void statsCollector.sendVkButtonTap({
      screen: ProductionStatsEventScreen.MULTIBRANDING,
      isIcon: false,
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'vk_button_tap',
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

  it('Log clicking on the "OK" icon', async () => {
    void statsCollector.sendOkButtonTap({
      screen: ProductionStatsEventScreen.MULTIBRANDING,
      isIcon: true,
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'ok_button_tap',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }, {
        name: 'button_type',
        value: 'icon',
      }],
    })));
  });

  it('Log clicking on the "Mail" icon', async () => {
    void statsCollector.sendMailButtonTap({
      screen: ProductionStatsEventScreen.MULTIBRANDING,
      isIcon: true,
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'mail_button_tap',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }, {
        name: 'button_type',
        value: 'icon',
      }],
    })));
  });

  it('Log clicking on the "VK" icon', async () => {
    void statsCollector.sendVkButtonTap({
      screen: ProductionStatsEventScreen.MULTIBRANDING,
      isIcon: true,
    });
    await wait(0);

    const events = JSON.parse((requestMocked.mock.lastCall?.[1] as any).events)[0];

    expect(request).toBeCalledWith('stat_events_vkid_sdk', expect.any(Object));
    expect(events).toMatchObject(expect.objectContaining(getRegistrationEvent({
      event_type: 'vk_button_tap',
      fields: [{
        name: 'sdk_type',
        value: 'vkid',
      }, {
        name: 'unique_session_id',
        value: 'id',
      }, {
        name: 'button_type',
        value: 'icon',
      }],
    })));
  });
});
