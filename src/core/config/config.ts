import { LOGIN_DOMAIN, OAUTH_DOMAIN, VKID_DOMAIN } from '#/constants';

import { ConfigData } from './types';

export class Config {
  private store: ConfigData = {
    app: 0,
    loginDomain: LOGIN_DOMAIN,
    oauthDomain: OAUTH_DOMAIN,
    vkidDomain: VKID_DOMAIN,
  };

  public set(config: Partial<ConfigData>): this {
    this.store = { ...this.store, ...config };

    return this;
  }

  public get(): ConfigData {
    return this.store;
  }
}
