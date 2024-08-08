import { Languages, Scheme } from '#/types';

import { FloatingOneTapContentId } from '../types';

export interface ScreenProceedParams {
  lang: Languages;
  scheme: Scheme;
  contentId: FloatingOneTapContentId;
}
