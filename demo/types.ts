import { TokenResult } from '#/auth/types';
import { ConfigAuthMode, Prompt } from '#/core/config';
import { Languages, Scheme } from '#/types';
import { FloatingOneTapContentId } from '#/widgets/floatingOneTap';

export interface DemoStore {
  app: number;
  state: string;
  codeVerifier: string;
  codeChallenge: string;
  contentId: FloatingOneTapContentId;
  lang: Languages;
  scheme: Scheme;
  onetapSkin: 'primary' | 'secondary';
  oauthes: '' | 'mail_ru' |'ok_ru' | 'mail_ru,ok_ru';
  mode: ConfigAuthMode;
  enable_oauthList: boolean;
  enable_basicAuth: boolean;
  enable_oneTap: boolean;
  enable_floatingOneTap: boolean;
  prompt: Prompt[];
  authResult?: TokenResult & { updated_at: Date };
  deviceId: string;
  vkidDomain: string;
  scope: string;
}
