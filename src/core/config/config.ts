import { LOGIN_DOMAIN, OAUTH_DOMAIN, VKID_DOMAIN } from '#/constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isNumber, isRequired, validator } from '#/core/validator';

import { ConfigAuthMode, ConfigData, PKSE, Prompt } from './types';

export class Config {
  private store: ConfigData = {
    app: 0,
    redirectUrl: '',
    mode: ConfigAuthMode.InNewTab,
    codeVerifier: '',
    state: '',
    prompt: [Prompt.Default],

    __loginDomain: LOGIN_DOMAIN,
    __oauthDomain: OAUTH_DOMAIN,
    __vkidDomain: VKID_DOMAIN,
  };

  @validator<ConfigData>({ app: [isRequired, isNumber], redirectUrl: [isRequired] })
  public init(config: Pick<ConfigData, 'app' | 'redirectUrl'> & PKSE & Partial<ConfigData>): this {
    return this.set(config);
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
