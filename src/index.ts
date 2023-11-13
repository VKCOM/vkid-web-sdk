import { Auth, AuthParams, AuthError, AuthResponse, AuthErrorCode } from './auth';
import { Config, ConfigData } from './core/config';
import { Widget } from './core/widget';

export { WidgetEvents } from './core/widget/events';
export { Languages } from './types';
export { OneTap, OneTapPublicEvents } from './widgets/oneTap';
export type { OneTapParams } from './widgets/oneTap';

const globalConfig = new Config();
export { globalConfig as Config };
export type { ConfigData };

Auth.__config = globalConfig;
const globalAuth = new Auth();
export { globalAuth as Auth };
export type { AuthParams, AuthError, AuthResponse, AuthErrorCode };

Widget.__config = globalConfig;
Widget.__auth = globalAuth;

