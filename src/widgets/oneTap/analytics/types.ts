import { Languages, Scheme } from '#/types';
import { OneTapContentId, OneTapSkin } from '#/widgets/oneTap';

export type OneTapStatsButtonType = 'default' | 'icon';

export interface ScreenProceedParams {
  lang: Languages;
  scheme: Scheme;
  contentId: OneTapContentId;
  skin: OneTapSkin;
}
