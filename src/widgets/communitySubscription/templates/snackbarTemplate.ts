import { Languages } from '#/types';

import { snackbarLang } from '../langs/snackbarLangs';

import { SuccessIcon } from './icons';

export const createSnackbarElement = (id: string, lang: Languages) => {
  const snackbarDiv = document.createElement('div');
  snackbarDiv.className = `VkIdSdk_CommunitySubscription_snackbar_${id} show`;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = SuccessIcon;
  const iconElement = tempDiv.firstChild as HTMLElement;
  snackbarDiv.appendChild(iconElement);

  const textSpan = document.createElement('span');
  textSpan.className = `VkIdSdk_CommunitySubscription_snackbar_text_${id}`;
  textSpan.textContent = snackbarLang[lang];

  snackbarDiv.appendChild(textSpan);

  return snackbarDiv;
};
