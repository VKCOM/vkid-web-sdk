import { Languages } from '#/types';

import { OneTapContentId } from '../types';

export type Lang = Record<Languages, string>;
export type Text = Record<OneTapContentId, Lang>;
