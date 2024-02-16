import { ConfigAuthMode } from '#/core/config';
import { Languages, Scheme } from '#/types';
import { FloatingOneTapContentId } from '#/widgets/floatingOneTap';

export interface DemoStore {
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
}
