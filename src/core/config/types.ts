export enum ConfigAuthMode {
  Redirect = 'redirect',
  InNewTab = 'new_tab',
  InNewWindow = 'new_window'
}

export enum ConfigResponseMode {
  Redirect = 'redirect',
  Callback = 'callback',
}

/**
 * Если передан codeVerifier, то нельзя передать codeChallenge и наоборот
 * При этом оба параметра необязательные
 */
export type PKSE = (
  | { codeVerifier?: string; codeChallenge?: never }
  | { codeVerifier?: never; codeChallenge: string }
  );

export interface ConfigData {
  app: number;
  redirectUrl: string;
  state?: string;
  codeVerifier?: string;
  codeChallenge?: string;
  scope?: string;

  /**
   * @ignore
   */
  prompt?: Prompt[];

  /**
   * @ignore
   */
  mode?: ConfigAuthMode;

  /**
   * @ignore
   */
  responseMode?: ConfigResponseMode;

  /**
   * @ignore
   */
  __loginDomain?: string;

  /**
   * @ignore
   */
  __oauthDomain?: string;

  /**
   * @ignore
   */
  __vkidDomain?: string;

  /**
   * @ignore
   */
  __localhost?: boolean;

  /**
   * @ignore
   */
  __debug?: boolean;
}

export enum Prompt {
  Default = '',
  None = 'none',
  Login = 'login',
  Consent = 'consent',
  SelectAccount = 'select_account',
}
