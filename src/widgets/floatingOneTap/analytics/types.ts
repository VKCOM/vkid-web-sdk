import { Languages, Scheme } from '#/types';

import { FloatingOneTapContentId } from '../types';

export interface ScreenProcessedParams {
  lang: Languages;
  scheme: Scheme;
  contentId: FloatingOneTapContentId;
}
