import * as VKID from '#/index';

import { DemoStore } from '#demo/types';
import { saveDemoStoreInLS } from '#demo/utils/localstorage';

export const initTokenManager = (demoStore: DemoStore) => {
  const tokenManagerSectionElement = document.querySelector('.tokenManager');
  if (tokenManagerSectionElement) {
    tokenManagerSectionElement.remove();
  }
  const html = `<section class="tokenManager">
<p>Последнее обновление: ${new Date(demoStore.authResult?.updated_at || 0).toUTCString()}</p>
<div class="tokenManager_list">
  <span>AT: ${demoStore.authResult?.access_token?.slice(0, 15)}...</span>
  <span>RT: ${demoStore.authResult?.refresh_token?.slice(0, 15)}...</span>
  <span>IDT: ${demoStore.authResult?.id_token?.slice(0, 15)}...</span>
</div>
<div class="tokenManager_buttons">
  <button id="tokenManager_button_refresh">refresh</button>
  <button id="tokenManager_button_logout">logout</button>
  <button id="tokenManager_button_idt">public_info by IDT</button>
  <button id="tokenManager_button_at">user_info by AT</button>
</div>
<div class="tokenManager_user">
<img src="https://pp.userapi.com/nKpB1Qq39oLk0_S8_C9PolGFFUpM5n8FnzKC7A/ucP1cjlkpZk.png" alt="avatar" id="tokenManager_user_avatar" width="24" height="24">
<span id="tokenManager_user_name"></span>
</div>
</section>
`;
  if (!demoStore.authResult) {
    return;
  }

  document.querySelector('.VkIdWebSdk__content')?.insertAdjacentHTML('beforeend', html);

  const refreshButtonElement = document.getElementById('tokenManager_button_refresh');
  if (refreshButtonElement) {
    refreshButtonElement.onclick = () => {
      VKID.Auth.refreshToken(demoStore.authResult?.refresh_token || '', demoStore.deviceId)
        .then((result) => {
          const authResult = demoStore.authResult || {};
          Object.assign(authResult, { ...result, updated_at: Date.now() });
          Object.assign(demoStore, { authResult });
          saveDemoStoreInLS(demoStore);

          // eslint-disable-next-line no-console
          console.log('refresh token result:', result);
          initTokenManager(demoStore);
        })
        .catch((e) => console.error('refresh token error:', e));
    };
  }

  const logoutButtonElement = document.getElementById('tokenManager_button_logout');
  if (logoutButtonElement) {
    logoutButtonElement.onclick = () => {
      VKID.Auth.logout(demoStore.authResult?.access_token || '')
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log('invalidate AT:', demoStore.authResult?.access_token?.slice(0, 8), res);
          initTokenManager(demoStore);
        })
        .catch((e) => console.error('logout error:', e));
    };
  }

  const publicInfoButtonElement = document.getElementById('tokenManager_button_idt');
  if (publicInfoButtonElement) {
    publicInfoButtonElement.onclick = () => {
      VKID.Auth.publicInfo(demoStore.authResult?.id_token || '')
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log('public_info id_token result:', res);

          const user = res.user;
          const userElement = document.getElementById('tokenManager_user_name');
          const avatarElement = document.getElementById('tokenManager_user_avatar');
          if (userElement && avatarElement) {
            userElement.innerText = `${user.first_name} ${user.last_name}, ${user.phone}, ${user.email}`;
            avatarElement.setAttribute('src', user.avatar);
          }
        })
        .catch((e) => console.error('public_info error:', e));
    };
  }

  const userInfoButtonElement = document.getElementById('tokenManager_button_at');
  if (userInfoButtonElement) {
    userInfoButtonElement.onclick = () => {
      VKID.Auth.userInfo(demoStore.authResult?.access_token || '')
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log('user_info access_token result:', res);

          const user = res.user;
          const userElement = document.getElementById('tokenManager_user_name');
          const avatarElement = document.getElementById('tokenManager_user_avatar');
          if (userElement && avatarElement) {
            userElement.innerText = `${user.first_name} ${user.last_name}, ${user.phone}, ${user.email}`;
            avatarElement.setAttribute('src', user.avatar || '');
          }
        })
        .catch((e) => console.error('user_info error:', e));
    };
  }
};
