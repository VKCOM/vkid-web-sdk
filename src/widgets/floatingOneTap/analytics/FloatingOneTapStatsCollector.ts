import { ProductionStatsEventScreen, RegistrationStatsCollector, ActionStatsCollector, ProductionStatsCollector } from '#/core/analytics';
import { Config } from '#/core/config';

import { TEXT_TYPE } from './constants';
import { ScreenProcessedParams } from './types';

export class FloatingOneTapStatsCollector {
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

  public sendScreenProcessed(params: ScreenProcessedParams) {
    void this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.NOWHERE, {
      event_type: 'screen_proceed',
      screen_to: ProductionStatsEventScreen.FLOATING_ONE_TAP,
      fields: [...this.getFields(), {
        name: 'theme_type',
        value: params.scheme,
      }, {
        name: 'language',
        value: params.lang.toString(),
      }, {
        name: 'text_type',
        value: TEXT_TYPE[params.contentId],
      }],
    });
  }

  public sendIframeLoadingFailed() {
    void this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.FLOATING_ONE_TAP, {
      event_type: 'iframe_loading_failed',
      fields: this.getFields(),
    });
  }

  public sendNoUserButtonShow() {
    void this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.FLOATING_ONE_TAP, {
      event_type: 'no_user_button_show',
      fields: this.getFields(),
    });
  }

  public sendNoUserButtonTap() {
    return this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.FLOATING_ONE_TAP, {
      event_type: 'no_user_button_tap',
      fields: this.getFields(),
    });
  }
}
