import { RegistrationStatsCollector, ProductionStatsEventScreen } from '#/core/analytics';

import { TEXT_TYPE } from './constants';
import { ScreenProcessedParams } from './types';

export class FloatingOneTapStatsCollector extends RegistrationStatsCollector {
  private getFields() {
    return [{
      name: 'sdk_type',
      value: 'vkid',
    }];
  }

  public sendScreenProcessed(params: ScreenProcessedParams) {
    void this.logEvent(ProductionStatsEventScreen.NOWHERE, {
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
    void this.logEvent(ProductionStatsEventScreen.FLOATING_ONE_TAP, {
      event_type: 'iframe_loading_failed',
      fields: this.getFields(),
    });
  }

  public sendNoUserButtonShow() {
    void this.logEvent(ProductionStatsEventScreen.FLOATING_ONE_TAP, {
      event_type: 'no_user_button_show',
      fields: this.getFields(),
    });
  }

  public sendNoUserButtonTap() {
    return this.logEvent(ProductionStatsEventScreen.FLOATING_ONE_TAP, {
      event_type: 'no_user_button_tap',
      fields: this.getFields(),
    });
  }

  public sendSdkInit() {
    void this.logEvent(ProductionStatsEventScreen.FLOATING_ONE_TAP, {
      event_type: 'sdk_init',
      fields: this.getFields(),
    });
  }
}
