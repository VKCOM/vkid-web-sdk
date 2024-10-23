import { LOGIN_DOMAIN, OAUTH_DOMAIN, VKID_DOMAIN } from '#/constants';
import { ActionStatsCollector, ProductionStatsCollector, SakSessionStatsCollector } from '#/core/analytics';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isNumber, isRequired, validator } from '#/core/validator';
import { MyTrackerService } from '#/services/MyTrackerService';

import { ConfigAuthMode, ConfigData, ConfigResponseMode, PKSE, Prompt } from './types';

export class Config {
  private readonly sakSessionStatsCollector: SakSessionStatsCollector;
  private store: ConfigData = {
    app: 0,
    redirectUrl: '',
    mode: ConfigAuthMode.InNewTab,
    responseMode: ConfigResponseMode.Redirect,
    codeVerifier: '',
    state: '',
    prompt: [Prompt.Default],

    __loginDomain: LOGIN_DOMAIN,
    __oauthDomain: OAUTH_DOMAIN,
    __vkidDomain: VKID_DOMAIN,
  };
  private readonly myTrackerService: MyTrackerService;

  public constructor() {
    const productStatsCollector = new ProductionStatsCollector(this);
    const actionStatsCollector = new ActionStatsCollector(productStatsCollector);
    this.sakSessionStatsCollector = new SakSessionStatsCollector(actionStatsCollector);
    this.myTrackerService = new MyTrackerService(this);
  }

  @validator<ConfigData>({ app: [isRequired, isNumber], redirectUrl: [isRequired] })
  public init(config: Pick<ConfigData, 'app' | 'redirectUrl'> & PKSE & Partial<ConfigData>): this {
    this.set(config);
    this.sakSessionStatsCollector.sendSdkInit(config.source);
    this.myTrackerService.init();
    return this;
  }

  public update(config: Partial<ConfigData>): this {
    return this.set(config);
  }

  private set(config: Partial<ConfigData>): this {
    this.store = { ...this.store, ...config };
    return this;
  }

  public get(): ConfigData {
    return this.store;
  }
}
