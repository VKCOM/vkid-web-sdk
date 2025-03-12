import { Languages } from '#/types';
import { createSnackbarElement } from '#/widgets/communitySubscription/templates/snackbarTemplate';

import { createErrorScreenElement } from './templates/errorScreenTemplate';
import { createMainScreenElement } from './templates/mainScreenTemplate';
import { CommunitySubscriptionTemplateParams } from './types';

export const getCommunitySubscriptionTemplate = (params: CommunitySubscriptionTemplateParams) => (id: string) => {
  const { scheme,
    closeWidget,
    groupsJoin,
    userAvatarUrls,
    title,
    description,
    friendsCount,
    membersCount,
    groupAvatarUrl,
    isVerified,
    lang = Languages.RUS,
    communitySubscriptionStatsCollector,
    onSuccess,
    onError,
  } = params;

  const handleLoaded = () => {
    const communitySubscription = document.getElementById(id);
    if (!communitySubscription) {
      return;
    }
    const hideModalAnimated = (onClose?: VoidFunction) => {
      void new Promise<void>((resolve) => {
        document.querySelector(`#${id} .VkIdSdk_CommunitySubscription_container_${id}`)?.classList?.toggle('show');
        setTimeout(resolve, 300);
      }).then(onClose);
    };

    const { modalDiv: errorModalDiv } = createErrorScreenElement({
      id,
      onClose: (isFromButton?: boolean) => {
        isFromButton ? communitySubscriptionStatsCollector.sendErrorCancelClick() : communitySubscriptionStatsCollector.sendErrorClose();
        hideModalAnimated(closeWidget);
      },
      onRetry: onRetry,
      lang,
    });

    const { modalDiv: mainModalDiv, setLoading } = createMainScreenElement({
      id,
      onClose: (isFromButton?: boolean) => {
        isFromButton ? communitySubscriptionStatsCollector.sendClose() : communitySubscriptionStatsCollector.sendNextTimeClick();
        hideModalAnimated(closeWidget);
      },
      onSubmit: () => {
        communitySubscriptionStatsCollector.sendClick();
        onSubscribeClick();
      },
      userAvatarUrls,
      title,
      description,
      friendsCount,
      membersCount,
      groupAvatarUrl,
      isVerified,
      lang,
    });

    function onRetry() {
      communitySubscriptionStatsCollector.sendErrorRetryClick();
      communitySubscription?.removeChild(errorModalDiv);
      communitySubscription?.appendChild(mainModalDiv);
      onSubscribeClick();
    }

    function onSubscribeClick() {
      setLoading();
      groupsJoin()
        .then((res) => {
          if ('error' in res) {
            throw res;
          }
          communitySubscriptionStatsCollector.sendSuccess();
          onSuccess();
          const successSnackBar = createSnackbarElement(id, lang);
          hideModalAnimated(() => {
            communitySubscription?.removeChild(mainModalDiv);
            communitySubscription?.appendChild(successSnackBar);
            setTimeout(() => {
              closeWidget();
            }, 5000);
          });
        }).catch((error) => {
          communitySubscriptionStatsCollector.sendErrorShow();
          onError(error);
          communitySubscription?.removeChild(mainModalDiv);
          communitySubscription?.appendChild(errorModalDiv);
        });
    }

    communitySubscription.appendChild(mainModalDiv);
    communitySubscriptionStatsCollector.sendModalWindowShow();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleLoaded);
  } else {
    setTimeout(handleLoaded, 0);
  }
  return `
<div id="${id}" data-test-id="communitySubscription" data-scheme="${scheme}">
  <style>
    :root #${id} {
      --community-subscription--opacity: 0;
      --community-subscription--title_color: #000;
      --community-subscription--description_color: #6D7885;
      --community-subscription--background_color: #FFF;
      --community-subscription--button_background_color: #2688EB;
      --community-subscription--button_background_color--hover: #097EFF;
      --community-subscription--text_color: #FFF;
      --community-subscription--button_background_color_secondary: rgba(0, 0, 0, 0.04);
      --community-subscription--button_background_color_secondary--hover: rgba(0, 0, 0, 0.08);
      --community-subscription--text_color_secondary: #2688EB;
      --community-subscription--user_avatar_fallback_background_color: #f5f5f5;
    }

    :root #${id}[data-scheme=dark] {
      --community-subscription--title_color: #E1E3E6;
      --community-subscription--description_color: #969A9F;
      --community-subscription--background_color: #1C1D1E;
      --community-subscription--button_background_color: #FFF;
      --community-subscription--button_background_color--hover: #EBEDF0;
      --community-subscription--text_color: #000;
      --community-subscription--button_background_color_secondary: rgba(255, 255, 255, 0.1);
      --community-subscription--button_background_color_secondary--hover: rgba(255, 255, 255, 0.12);
      --community-subscription--text_color_secondary: #FFF;
      --community-subscription--user_avatar_fallback_background_color: #232324;
    }

    :root #${id} .VkIdSdk_CommunitySubscription_container_${id}.show {
      --community-subscription--opacity: 1;
    }

    @keyframes animation-widget-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    #${id} {
      animation: 0.3s animation-widget-fade-in linear;
    }

    #${id} .VkIdSdk_CommunitySubscription_container_${id} {
      opacity: var(--community-subscription--opacity);
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 999999;
      transition: .3s opacity linear;
    }

    #${id} .VkIdSdk_CommunitySubscription_modal_${id} {
      opacity: var(--community-subscription--opacity);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--community-subscription--background_color);
      border-radius: 32px;
      padding: 32px;
      box-sizing: border-box;
      width: 420px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: .3s opacity linear;
    }

     #${id} .VkIdSdk_CommunitySubscription_modal_close_${id} {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    #${id} .VkIdSdk_CommunitySubscription_heading_${id} {
        text-align: center;
        color: var(--community-subscription--title_color);
    }


    #${id} .VkIdSdk_CommunitySubscription_avatar_${id} {
        position: relative;
        width: 72px;
        height: 72px;
    }

    #${id} .VkIdSdk_CommunitySubscription_avatar_logo_${id} {
        position: absolute;
        bottom: 0;
        right: 0;
    }

    #${id} .VkIdSdk_CommunitySubscription_avatar_img_${id} {
        width: 72px;
        height: 72px;
        border-radius: 100%;
    }

    #${id} .VkIdSdk_CommunitySubscription_heading_verified_${id} {
      margin-left: 6px;
      flex: none;
    }

    #${id} .VkIdSdk_CommunitySubscription_heading_${id} {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    #${id} .VkIdSdk_CommunitySubscription_heading_text_${id} {
      font-family: VK Sans Display,-apple-system,system-ui,"Helvetica Neue",Roboto,sans-serif;
      font-size: 23px;
      font-weight: 600;
      line-height: 28px;
      text-align: center;
      margin: 16px 0 12px 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      max-height: 28px;
      word-break: break-all;
    }

    #${id} .VkIdSdk_CommunitySubscription_description_${id} {
      font-family: -apple-system,system-ui,"Helvetica Neue",Roboto,sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0.15px;
      text-align: left;
      color: var(--community-subscription--description_color);
      margin: 0 0 12px 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 60px;
      width: 100%;
    }

    #${id} .VkIdSdk_CommunitySubscription_description_${id}.centered_${id} {
     text-align: center;
    }

    #${id} .VkIdSdk_CommunitySubscription_users_${id} {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%
    }

    #${id} .VkIdSdk_CommunitySubscription_users_avatars_${id} {
      display: flex;
      padding: 6px 0;
      margin-right: 8px;
    }

    #${id} .VkIdSdk_CommunitySubscription_users_avatars_img_${id} {
      width: 32px;
      height: 32px;
      border-radius: 100%;
      outline: 2px solid var(--community-subscription--background_color);
      background: var(--community-subscription--user_avatar_fallback_background_color);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #${id} .VkIdSdk_CommunitySubscription_users_avatars_img_${id}:first-child {
      z-index: 2;
    }

    #${id} .VkIdSdk_CommunitySubscription_users_avatars_img_${id}:nth-child(2) {
      z-index: 1;
      position: relative;
      right: 2px;
    }

    #${id} .VkIdSdk_CommunitySubscription_users_avatars_img_${id}:last-child {
      position: relative;
      right: 4px;
    }

    #${id} .VkIdSdk_CommunitySubscription_users_text_${id} {
      font-family: -apple-system,system-ui,"Helvetica Neue",Roboto,sans-serif;font-size: 15px;
      font-weight: 400;
      line-height: 20px;
      text-align: left;
      color: #6D7885;
    }

    #${id} .VkIdSdk_CommunitySubscription_users_text_count_${id} {
      font-weight: 500;
    }

    #${id} .VkIdSdk_CommunitySubscription_button_${id} {
      border: none;
      overflow: visible;
      -webkit-font-smoothing: inherit;
      -moz-osx-font-smoothing: inherit;
      -webkit-appearance: none;
      cursor: pointer;
      transition: background-color .15s ease-out;
      font-family: -apple-system,system-ui,"Helvetica Neue",Roboto,sans-serif;
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      text-align: center;
      text-underline-position: from-font;
      text-decoration-skip-ink: none;

      border-radius: 12px;
      background: var(--community-subscription--button_background_color);
      color: var(--community-subscription--text_color);
      padding: 10px 16px;
      width: 100%;
      margin: 20px 0 12px;
      height: 44px;
    }

    #${id} .VkIdSdk_CommunitySubscription_button_${id}:hover {
     background: var(--community-subscription--button_background_color--hover);
    }

    #${id} .VkIdSdk_CommunitySubscription_button_${id}.VkIdSdk_CommunitySubscription_button_secondary_${id} {
      background: var(--community-subscription--button_background_color_secondary);
      color: var(--community-subscription--text_color_secondary);
      margin: 0;
    }

    #${id} .VkIdSdk_CommunitySubscription_button_${id}.VkIdSdk_CommunitySubscription_button_secondary_${id}:hover {
      background: var(--community-subscription--button_background_color_secondary--hover);
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    #${id} .VkIdSdk_CommunitySubscription_spinner_${id} {
      animation: spin 0.7s linear infinite;
    }

    #${id} .VkIdSdk_CommunitySubscription_spinner_${id} path {
      fill: var(--community-subscription--text_color);
    }

    @keyframes snackbar {
      from {
        left: calc(-100% - 12px);
      }
      to {
        left: 12px;
      }
    }

    #${id} .VkIdSdk_CommunitySubscription_snackbar_${id} {
      font-family: -apple-system,system-ui,"Helvetica Neue",Roboto,sans-serif;
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
      text-align: left;

      flex-direction: row;
      align-items: center;
      padding: 14px 12px;
      width: 350px;
      height: 56px;
      box-shadow: 0 16px 16px rgba(0, 0, 0, 0.16), 0 0 8px rgba(0, 0, 0, 0.12);
      border-radius: 8px;
      box-sizing: border-box;
      position: fixed;
      bottom: 12px;
      left: 12px;
      display: none;
      z-index: 999999;
      background: var(--community-subscription--background_color);
      color: var(--community-subscription--title_color);
    }

    #${id} .VkIdSdk_CommunitySubscription_snackbar_${id}.show {
      display: flex;
      animation: snackbar 1s ease, snackbar reverse 1s 4s ease;
    }

    #${id} .VkIdSdk_CommunitySubscription_snackbar_${id} svg {
      margin-right: 12px;
    }

    @media (max-width: 1280px) {
      #${id} .VkIdSdk_CommunitySubscription_modal_${id} {
        top: unset;
        bottom: 16px;
        transform: translate(-50%);
      }
    }

    @media (max-width: 480px) {
      #${id} .VkIdSdk_CommunitySubscription_modal_${id} {
        width: calc(100% - 16px);
       }

      #${id} .VkIdSdk_CommunitySubscription_snackbar_${id} {
        width: calc(100% - 24px);
       }
    }
  </style>
</div>`;
};

