import { ProductionStatsEventScreen, RegistrationStatsCollector, ActionStatsCollector, ProductionStatsCollector } from '#/core/analytics';
import { Config } from '#/core/config';

import { TEXT_TYPE } from './constants';
import { OneTapStatsButtonType, ScreenProceedParams } from './types';

export class OneTapStatsCollector {
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

  public sendFrameLoadingFailed() {
    void this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.NOWHERE, {
      event_type: 'iframe_loading_failed',
      fields: this.getFields(),
    });
  }

  public sendNoSessionFound() {
    void this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.NOWHERE, {
      event_type: 'no_session_found',
      fields: this.getFields(),
    });
  }

  public sendOneTapButtonNoUserShow(buttonType: OneTapStatsButtonType = 'default') {
    void this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.NOWHERE, {
      event_type: 'onetap_button_no_user_show',
      fields: [...this.getFields(), {
        name: 'button_type',
        value: buttonType,
      }],
    });
  }

  public sendOneTapButtonNoUserTap(buttonType: OneTapStatsButtonType = 'default') {
    return this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.NOWHERE, {
      event_type: 'onetap_button_no_user_tap',
      fields: [...this.getFields(), {
        name: 'button_type',
        value: buttonType,
      }],
    });
  }

  public sendScreenProceed(params: ScreenProceedParams) {
    void this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.NOWHERE, {
      event_type: 'screen_proceed',
      fields: [...this.getFields(), {
        name: 'theme_type',
        value: params.scheme,
      }, {
        name: 'style_type',
        value: params.skin,
      }, {
        name: 'language',
        value: params.lang.toString(),
      }, {
        name: 'text_type',
        value: TEXT_TYPE[params.contentId],
      }],
    });
  }
}
