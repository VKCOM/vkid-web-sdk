import { LOGIN_DOMAIN, OAUTH_DOMAIN, VKID_DOMAIN } from '#/constants';

import { ConfigAuthMode, ConfigData } from './types';

export class Config {
  private store: ConfigData = {
    app: 0,
    redirectUrl: '',
    mode: ConfigAuthMode.Redirect,

    __loginDomain: LOGIN_DOMAIN,
    __oauthDomain: OAUTH_DOMAIN,
    __vkidDomain: VKID_DOMAIN,
  };

  public set(config: Partial<ConfigData>): this {
    this.store = { ...this.store, ...config };

    return this;
  }

  public get(): ConfigData {
    return this.store;
  }
}
