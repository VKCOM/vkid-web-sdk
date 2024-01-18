import { Auth, AuthParams, AuthError, AuthResponse, AuthErrorCode } from './auth';
import { Config, ConfigData } from './core/config';
import { Widget } from './core/widget';
export { Languages, Scheme } from './types';

const globalConfig = new Config();
export { globalConfig as Config };
export type { ConfigData };

/** Export Auth */
Auth.__config = globalConfig;
const globalAuth = new Auth();
export { globalAuth as Auth };
export type { AuthParams, AuthError, AuthResponse, AuthErrorCode };

/** Export Core Widget */
Widget.__config = globalConfig;
Widget.__auth = globalAuth;
export { WidgetEvents } from './core/widget';

/** Export OneTap */
export { OneTap } from './widgets/oneTap';
export type { OneTapParams, OneTapStyles } from './widgets/oneTap';

/** Export FloatingOneTap */
export { FloatingOneTap, FloatingOneTapContentId } from './widgets/floatingOneTap';
export type { FloatingOneTapParams } from './widgets/floatingOneTap';

/** Export OAuthList */
export { OAuthList, OAuthName } from './widgets/oauthList';
export type { OAuthListParams, OAuthListStyles } from './widgets/oauthList';

