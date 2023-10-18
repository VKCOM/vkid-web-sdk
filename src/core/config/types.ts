export interface ConfigData {
  app: number;

  loginDomain: string;
  oauthDomain: string;
  vkidDomain: string;

  __localhost?: boolean;
  __debug?: boolean;
}
