import { ActionStatsCollector, ProductionStatsCollector, ProductionStatsEventScreen, RegistrationStatsCollector } from '#/core/analytics';
import { Config } from '#/core/config';

export class AuthStatsCollector {
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

  public sendCustomAuthStart(provider?: string) {
    const fields = this.getFields();
    if (provider) {
      fields.push({
        name: 'oauth_service',
        value: provider,
      });
    }
    return this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.NOWHERE, {
      event_type: 'custom_auth_start',
      fields,
    });
  }
}
