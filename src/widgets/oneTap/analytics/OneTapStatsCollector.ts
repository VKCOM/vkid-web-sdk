import { RegistrationStatsCollector, ProductionStatsEventScreen } from '#/core/analytics';

import { OneTapStatsButtonType } from './types';

export class OneTapStatsCollector extends RegistrationStatsCollector {
  private getFields() {
    return [{
      name: 'sdk_type',
      value: 'vkid',
    }];
  }

  public sendFrameLoadingFailed() {
    void this.logEvent(ProductionStatsEventScreen.NOWHERE, {
      event_type: 'iframe_loading_failed',
      fields: this.getFields(),
    });
  }

  public sendNoSessionFound() {
    void this.logEvent(ProductionStatsEventScreen.NOWHERE, {
      event_type: 'no_session_found',
      fields: this.getFields(),
    });
  }

  public sendOneTapButtonNoUserShow(buttonType: OneTapStatsButtonType = 'default') {
    void this.logEvent(ProductionStatsEventScreen.NOWHERE, {
      event_type: 'onetap_button_no_user_show',
      fields: [...this.getFields(), {
        name: 'button_type',
        value: buttonType,
      }],
    });
  }

  public sendOneTapButtonNoUserTap(buttonType: OneTapStatsButtonType = 'default') {
    return this.logEvent(ProductionStatsEventScreen.NOWHERE, {
      event_type: 'onetap_button_no_user_tap',
      fields: [...this.getFields(), {
        name: 'button_type',
        value: buttonType,
      }],
    });
  }

  public sendSdkInit() {
    void this.logEvent(ProductionStatsEventScreen.NOWHERE, {
      event_type: 'sdk_init',
      fields: this.getFields(),
    });
  }
}
