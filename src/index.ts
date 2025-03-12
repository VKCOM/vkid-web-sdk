import {
  Auth,
  AuthParams,
  AuthError,
  AuthResponse,
  AuthErrorCode,
  LogoutResult,
  PublicInfoResult,
  TokenResult,
  UserInfoResult,
} from './auth';
import { Config, ConfigData, ConfigAuthMode, ConfigResponseMode, ConfigSource, Prompt } from './core/config';
import { Widget } from './core/widget';
export { Languages, Scheme } from './types';

const globalConfig = new Config();
export { globalConfig as Config, ConfigAuthMode, ConfigResponseMode, ConfigSource, Prompt };
export type { ConfigData };

/** Export Auth */
Auth.config = globalConfig;
const globalAuth = new Auth();
export { globalAuth as Auth, AuthErrorCode };
export type {
  AuthParams,
  AuthError,
  AuthResponse,
  LogoutResult,
  PublicInfoResult,
  TokenResult,
  UserInfoResult,
};

/** Export Core Widget */
Widget.config = globalConfig;
Widget.auth = globalAuth;
export { WidgetEvents } from './core/widget';

/** Export OneTap */
export { OneTap, OneTapSkin, OneTapContentId, OneTapInternalEvents } from './widgets/oneTap';
export type { OneTapParams, OneTapStyles } from './widgets/oneTap';

/** Export FloatingOneTap */
export { FloatingOneTap, FloatingOneTapContentId, FloatingOneTapInternalEvents } from './widgets/floatingOneTap';
export type { FloatingOneTapParams } from './widgets/floatingOneTap';

/** Export OAuthList */
export { OAuthList, OAuthName, OAuthListInternalEvents } from './widgets/oauthList';
export type { OAuthListParams, OAuthListStyles } from './widgets/oauthList';
