import { RegistrationStatsCollector, ActionStatsCollector, ProductionStatsCollector } from '#/core/analytics';
import { Config } from '#/core/config';
import { MultibrandingButtonShowParams, MultibrandingButtonTapParams, MultibrandingOauthAddedParams } from '#/widgets/oauthList/analytics/types';

export class OAuthListStatsCollector {
  private readonly registrationStatsCollector: RegistrationStatsCollector;
  private uniqueSessionId: string;

  public constructor(config: Config) {
    const productStatsCollector = new ProductionStatsCollector(config);
    const actionStatsCollector = new ActionStatsCollector(productStatsCollector);
    this.registrationStatsCollector = new RegistrationStatsCollector(actionStatsCollector);
  }

  public setUniqueSessionId(id: string) {
    this.uniqueSessionId = id;
  }

  private getFields() {
    const fields = [{
      name: 'sdk_type',
      value: 'vkid',
    }];

    if (this.uniqueSessionId) {
      fields.push({
        name: 'unique_session_id',
        value: this.uniqueSessionId,
      });
    }

    return fields;
  }

  public sendMultibrandingOauthAdded({ screen, fields }: MultibrandingOauthAddedParams) {
    void this.registrationStatsCollector.logEvent(screen, {
      event_type: 'multibranding_oauth_added',
      fields: [...this.getFields(), ...fields],
    });
  }

  public sendOkButtonShow({ screen, isIcon }: MultibrandingButtonShowParams) {
    void this.registrationStatsCollector.logEvent(screen, {
      event_type: 'ok_button_show',
      fields: [...this.getFields(), {
        name: 'button_type',
        value: isIcon ? 'icon' : 'default',
      }],
    });
  }

  public sendVkButtonShow({ screen, isIcon }: MultibrandingButtonShowParams) {
    void this.registrationStatsCollector.logEvent(screen, {
      event_type: 'vk_button_show',
      fields: [...this.getFields(), {
        name: 'button_type',
        value: isIcon ? 'icon' : 'default',
      }],
    });
  }

  public sendMailButtonShow({ screen, isIcon }: MultibrandingButtonShowParams) {
    void this.registrationStatsCollector.logEvent(screen, {
      event_type: 'mail_button_show',
      fields: [...this.getFields(), {
        name: 'button_type',
        value: isIcon ? 'icon' : 'default',
      }],
    });
  }

  public sendVkButtonTap({ screen, isIcon }: MultibrandingButtonTapParams) {
    return this.registrationStatsCollector.logEvent(screen, {
      event_type: 'vk_button_tap',
      fields: [...this.getFields(), {
        name: 'button_type',
        value: isIcon ? 'icon' : 'default',
      }],
    });
  }

  public sendOkButtonTap({ screen, isIcon }: MultibrandingButtonTapParams) {
    return this.registrationStatsCollector.logEvent(screen, {
      event_type: 'ok_button_tap',
      fields: [...this.getFields(), {
        name: 'button_type',
        value: isIcon ? 'icon' : 'default',
      }],
    });
  }

  public sendMailButtonTap({ screen, isIcon }: MultibrandingButtonTapParams) {
    return this.registrationStatsCollector.logEvent(screen, {
      event_type: 'mail_button_tap',
      fields: [...this.getFields(), {
        name: 'button_type',
        value: isIcon ? 'icon' : 'default',
      }],
    });
  }
}
