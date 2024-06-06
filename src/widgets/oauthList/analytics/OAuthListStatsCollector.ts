import { RegistrationStatsCollector } from '#/core/analytics';
import { MultibrandingButtonShowParams, MultibrandingButtonTapParams, MultibrandingOauthAddedParams, MultibrandingOauthParamsScreen } from '#/widgets/oauthList/analytics/types';

export class OAuthListStatsCollector extends RegistrationStatsCollector {
  private uniqueSessionId: string;

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
    void this.logEvent(screen, {
      event_type: 'multibranding_oauth_added',
      fields: [...this.getFields(), ...fields],
    });
  }

  public sendOkButtonShow({ screen, isIcon }: MultibrandingButtonShowParams) {
    void this.logEvent(screen, {
      event_type: 'ok_button_show',
      fields: [...this.getFields(), {
        name: 'button_type',
        value: isIcon ? 'icon' : 'default',
      }],
    });
  }

  public sendVkButtonShow({ screen, isIcon }: MultibrandingButtonShowParams) {
    void this.logEvent(screen, {
      event_type: 'vk_button_show',
      fields: [...this.getFields(), {
        name: 'button_type',
        value: isIcon ? 'icon' : 'default',
      }],
    });
  }

  public sendMailButtonShow({ screen, isIcon }: MultibrandingButtonShowParams) {
    void this.logEvent(screen, {
      event_type: 'mail_button_show',
      fields: [...this.getFields(), {
        name: 'button_type',
        value: isIcon ? 'icon' : 'default',
      }],
    });
  }

  public sendVkButtonTap({ screen, isIcon }: MultibrandingButtonTapParams) {
    return this.logEvent(screen, {
      event_type: 'vk_button_tap',
      fields: [...this.getFields(), {
        name: 'button_type',
        value: isIcon ? 'icon' : 'default',
      }],
    });
  }

  public sendOkButtonTap({ screen, isIcon }: MultibrandingButtonTapParams) {
    return this.logEvent(screen, {
      event_type: 'ok_button_tap',
      fields: [...this.getFields(), {
        name: 'button_type',
        value: isIcon ? 'icon' : 'default',
      }],
    });
  }

  public sendMailButtonTap({ screen, isIcon }: MultibrandingButtonTapParams) {
    return this.logEvent(screen, {
      event_type: 'mail_button_tap',
      fields: [...this.getFields(), {
        name: 'button_type',
        value: isIcon ? 'icon' : 'default',
      }],
    });
  }

  public sendSdkInit(screen: MultibrandingOauthParamsScreen) {
    void this.logEvent(screen, {
      event_type: 'sdk_init',
      fields: this.getFields(),
    });
  }
}
