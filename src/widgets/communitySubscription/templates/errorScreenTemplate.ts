import { Languages } from '#/types';

import { cancelButtonLang, failDescriptionLang, failTitleLang, retryButtonLang } from '../langs/errorScreenLangs';

import { CloseIcon, errorSvg } from './icons';

interface CreateErrorScreenElementParams {
  id: string;
  onRetry: VoidFunction;
  onClose: (isFromButton?: boolean) => void;
  lang: Languages;
}

export function createErrorScreenElement({ id, onClose, onRetry, lang }: CreateErrorScreenElementParams) {
  const modalDiv = document.createElement('div');
  modalDiv.className = `VkIdSdk_CommunitySubscription_modal_${id}`;
  modalDiv.onclick = (e) => e.stopPropagation();

  const closeButtonSpan = document.createElement('span');
  closeButtonSpan.className = `VkIdSdk_CommunitySubscription_modal_close_${id}`;
  closeButtonSpan.innerHTML = CloseIcon;
  closeButtonSpan.onclick = () => onClose();
  modalDiv.appendChild(closeButtonSpan);

  const errorIcon = errorSvg(id);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = errorIcon;
  if (tempDiv.firstChild) {
    modalDiv.appendChild(tempDiv.firstChild);
  }

  const headingDiv = document.createElement('div');
  headingDiv.className = `VkIdSdk_CommunitySubscription_heading_${id}`;
  const headingSpan = document.createElement('span');
  headingSpan.className = `VkIdSdk_CommunitySubscription_heading_text_${id}`;
  headingSpan.textContent = failTitleLang[lang];
  headingDiv.appendChild(headingSpan);
  modalDiv.appendChild(headingDiv);

  const description = document.createElement('p');
  description.className = `VkIdSdk_CommunitySubscription_description_${id} centered_${id}`;
  description.textContent = failDescriptionLang[lang];
  modalDiv.appendChild(description);

  const retryButton = document.createElement('button');
  retryButton.className = `VkIdSdk_CommunitySubscription_button_${id} VkIdSdk_CommunitySubscription_button_primary_${id}`;
  retryButton.textContent = retryButtonLang[lang];
  retryButton.onclick = () => onRetry();
  modalDiv.appendChild(retryButton);

  const declineButton = document.createElement('button');
  declineButton.className = `VkIdSdk_CommunitySubscription_button_${id} VkIdSdk_CommunitySubscription_button_secondary_${id}`;
  declineButton.textContent = cancelButtonLang[lang];
  declineButton.onclick = () => onClose(true);
  modalDiv.appendChild(declineButton);

  const backdropDiv = document.createElement('div');
  backdropDiv.className = `VkIdSdk_CommunitySubscription_container_${id} show`;
  backdropDiv.onclick = () => onClose();
  backdropDiv.appendChild(modalDiv);

  return {
    modalDiv: backdropDiv,
  };
}
