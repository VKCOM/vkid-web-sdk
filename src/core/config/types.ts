export enum ConfigAuthMode {
  Redirect = 'redirect',
  InNewTab = 'new_tab'
}

export interface ConfigData {
  app: number;
  redirectUrl: string;
  state?: string;
  mode?: ConfigAuthMode;

  /**
   * @ignore
   */
  __loginDomain: string;

  /**
   * @ignore
   */
  __oauthDomain: string;

  /**
   * @ignore
   */
  __vkidDomain: string;

  /**
   * @ignore
   */
  __localhost?: boolean;

  /**
   * @ignore
   */
  __debug?: boolean;
}
