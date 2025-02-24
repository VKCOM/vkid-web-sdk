import { Languages } from '#/types';

import { anotherTimeButtonLang, getFriendsPlural, getSubscribersPlural, subscribeButtonLang } from '../langs/mainScreenLangs';

import { AvatarFallback, CloseIcon, spinnerIcon, verifiedIcon, vkLogoSmallIcon } from './icons';

interface CreateMainScreenElementParams {
  id: string;
  onSubmit: VoidFunction;
  onClose: (isFromButton?: boolean) => void;
  userAvatarUrls?: string[];
  groupAvatarUrl: string;
  membersCount: number;
  friendsCount?: number;
  description: string;
  title: string;
  isVerified?: boolean;
  lang: Languages;
}

export function createMainScreenElement({
  id,
  onClose,
  onSubmit,
  userAvatarUrls,
  friendsCount,
  membersCount,
  title,
  description,
  groupAvatarUrl,
  isVerified,
  lang,
}: CreateMainScreenElementParams) {
  const modalDiv = document.createElement('div');
  modalDiv.className = `VkIdSdk_CommunitySubscription_modal_${id}`;
  modalDiv.onclick = (e) => e.stopPropagation();

  const closeButtonSpan = document.createElement('span');
  closeButtonSpan.className = `VkIdSdk_CommunitySubscription_modal_close_${id}`;
  closeButtonSpan.innerHTML = CloseIcon;
  closeButtonSpan.onclick = () => onClose();
  modalDiv.appendChild(closeButtonSpan);

  const avatarDiv = document.createElement('div');
  avatarDiv.className = `VkIdSdk_CommunitySubscription_avatar_${id}`;

  const avatarImg = document.createElement('img');
  avatarImg.src = groupAvatarUrl;
  avatarImg.alt = 'group avatar';
  avatarImg.className = `VkIdSdk_CommunitySubscription_avatar_img_${id}`;
  avatarDiv.appendChild(avatarImg);

  const vkLogoSmallDiv = document.createElement('div');
  vkLogoSmallDiv.innerHTML = vkLogoSmallIcon(id);
  avatarDiv.appendChild(vkLogoSmallDiv);
  modalDiv.appendChild(avatarDiv);

  const headingDiv = document.createElement('div');
  headingDiv.className = `VkIdSdk_CommunitySubscription_heading_${id}`;
  const headingSpan = document.createElement('span');
  headingSpan.className = `VkIdSdk_CommunitySubscription_heading_text_${id}`;
  headingSpan.textContent = title;
  headingDiv.appendChild(headingSpan);

  if (isVerified) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = verifiedIcon(id);
    const icon = tempDiv.firstChild;
    if (icon) {
      headingDiv.appendChild(icon);
    }
  }

  modalDiv.appendChild(headingDiv);

  if (description) {
    const descriptionP = document.createElement('p');
    descriptionP.className = `VkIdSdk_CommunitySubscription_description_${id}`;
    descriptionP.textContent = description;
    modalDiv.appendChild(descriptionP);
  }

  const usersDiv = document.createElement('div');
  usersDiv.className = `VkIdSdk_CommunitySubscription_users_${id}`;

  const avatarsDiv = document.createElement('div');
  avatarsDiv.className = `VkIdSdk_CommunitySubscription_users_avatars_${id}`;

  for (let i = 0; i < 3; i++) {
    const avatarUrl = userAvatarUrls?.[i];
    let avatarElement;

    if (!avatarUrl) {
      avatarElement = document.createElement('div');
      avatarElement.innerHTML = AvatarFallback;
    } else {
      avatarElement = document.createElement('img');
      avatarElement.src = avatarUrl;
      avatarElement.alt = 'user avatar';
    }
    avatarElement.className = `VkIdSdk_CommunitySubscription_users_avatars_img_${id}`;
    avatarsDiv.appendChild(avatarElement);
  }

  const userTextDiv = document.createElement('div');
  const userTextCountSpan = document.createElement('span');
  userTextCountSpan.className = `VkIdSdk_CommunitySubscription_users_text_count_${id}`;
  let membersCountText = '';
  switch (true) {
    case membersCount < 1000:
      membersCountText = membersCount.toString();
      break;
    case membersCount >= 1000 && membersCount < 100000:
      membersCountText = (membersCount / 1000).toFixed(1) + 'K';
      break;
    case membersCount >= 100000 && membersCount < 1000000:
      membersCountText = (membersCount / 1000).toFixed(0) + 'K';
      break;
    case membersCount >= 1000000:
      membersCountText = (membersCount / 1000000).toFixed(1) + 'M';
      break;
  }
  userTextCountSpan.textContent = membersCountText.replace('.0', '');
  userTextDiv.className = `VkIdSdk_CommunitySubscription_users_text_${id}`;
  userTextDiv.textContent = getSubscribersPlural(lang, membersCount);
  if (friendsCount) {
    userTextDiv.textContent += ` · ${friendsCount}${getFriendsPlural(lang, friendsCount)}`;
  }
  userTextDiv.prepend(userTextCountSpan);
  usersDiv.appendChild(avatarsDiv);
  usersDiv.appendChild(userTextDiv);

  modalDiv.appendChild(usersDiv);

  const subscribeButton = document.createElement('button');
  subscribeButton.className = `VkIdSdk_CommunitySubscription_button_${id} VkIdSdk_CommunitySubscription_button_primary_${id}`;
  subscribeButton.textContent = subscribeButtonLang[lang];
  subscribeButton.onclick = () => onSubmit();
  modalDiv.appendChild(subscribeButton);

  const laterButton = document.createElement('button');
  laterButton.className = `VkIdSdk_CommunitySubscription_button_${id} VkIdSdk_CommunitySubscription_button_secondary_${id}`;
  laterButton.textContent = anotherTimeButtonLang[lang];
  laterButton.onclick = () => onClose(true);
  modalDiv.appendChild(laterButton);

  const backdropDiv = document.createElement('div');
  backdropDiv.className = `VkIdSdk_CommunitySubscription_container_${id} show`;
  backdropDiv.onclick = () => onClose();
  backdropDiv.appendChild(modalDiv);

  return {
    modalDiv: backdropDiv,
    setLoading: () => {
      subscribeButton.innerHTML = spinnerIcon(id);
    },
  };
}
