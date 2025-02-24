import {
  ActionStatsCollector,
  ProductionStatsCollector,
  ProductionStatsEventScreen,
  RegistrationStatsCollector,
} from '#/core/analytics';
import { RegistrationStatsEventTypes } from '#/core/analytics/types';
import { Config } from '#/core/config';
import { Languages, Scheme } from '#/types';

export class CommunitySubscriptionStatsCollector {
  private readonly registrationStatsCollector: RegistrationStatsCollector;
  private readonly appId: number;
  private groupId: number;
  private lang: Languages;
  private scheme: Scheme;

  public constructor(config: Config, accessToken: string) {
    const productStatsCollector = new ProductionStatsCollector(config, accessToken);
    const actionStatsCollector = new ActionStatsCollector(productStatsCollector);
    this.registrationStatsCollector = new RegistrationStatsCollector(actionStatsCollector);
    this.appId = config.get().app;
  }

  public setStatsAdditionalData(params: { groupId: number; lang: Languages; scheme: Scheme }) {
    const { lang, groupId, scheme } = params;
    this.groupId = groupId;
    this.lang = lang;
    this.scheme = scheme;
  }

  private getFields() {
    return [{
      name: 'language',
      value: this.lang.toString(),
    }, {
      name: 'theme_type',
      value: this.scheme,
    }, {
      name: 'group_id',
      value: this.groupId.toString(),
    }];
  }

  private sendEvent(eventType: RegistrationStatsEventTypes) {
    void this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.NOWHERE, {
      event_type: eventType,
      fields: this.getFields(),
      app_id: this.appId,
    });
  }

  public sendModalWindowShow() {
    this.sendEvent('community_follow_modal_window_show');
  }
  public sendClick() {
    this.sendEvent('community_follow_click');
  }
  public sendNextTimeClick() {
    this.sendEvent('community_follow_next_time_click');
  }
  public sendClose() {
    this.sendEvent('community_follow_close');
  }
  public sendErrorShow() {
    this.sendEvent('community_follow_error_show');
  }
  public sendErrorRetryClick() {
    this.sendEvent('community_follow_error_retry_click');
  }
  public sendErrorCancelClick() {
    this.sendEvent('community_follow_error_cancel_click');
  }
  public sendErrorClose() {
    this.sendEvent('community_follow_error_close');
  }
  public sendSuccess() {
    this.sendEvent('community_follow_success');
  }
}
