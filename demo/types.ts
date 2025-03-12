import { TokenResult } from '#/auth/types';
import { ConfigAuthMode, ConfigResponseMode, Prompt } from '#/core/config';
import { Languages, Scheme } from '#/types';
import { FloatingOneTapContentId } from '#/widgets/floatingOneTap';
import { OneTapContentId } from '#/widgets/oneTap';

export interface DemoStore {
  app: number;
  state: string;
  codeVerifier: string;
  codeChallenge: string;
  floatingOneTapContentId: FloatingOneTapContentId;
  buttonOneTapContentId: OneTapContentId;
  lang: Languages;
  scheme: Scheme;
  onetapSkin: 'primary' | 'secondary';
  oauthes: '' | 'mail_ru' |'ok_ru' | 'mail_ru,ok_ru';
  mode: ConfigAuthMode;
  responseMode: ConfigResponseMode;
  enable_oauthList: boolean;
  enable_basicAuth: boolean;
  enable_oneTap: boolean;
  enable_floatingOneTap: boolean;
  enable_communitySubscription: boolean;
  prompt: Prompt[];
  authResult?: TokenResult & { updated_at: Date };
  deviceId: string;
  scope: string;
  fastAuthEnabledOnetap: '' | '1';
  fastAuthEnabledFloatingOnetap: '' | '1';
  groupId: number;
}
