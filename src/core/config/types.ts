export interface ConfigData {
  app: number;
  redirectUrl: string;
  state?: string;

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
