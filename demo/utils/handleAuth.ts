import { Auth } from '@vkid/sdk';

import { OAUTH2_CODE_TYPE } from '#/auth/constants';

import { showAuthErrorSnackbar, showAuthSuccessSnackbar } from '#demo/components/snackbar';
import { DemoStore } from '#demo/types';
import { saveDemoStoreInLS } from '#demo/utils/localstorage';
import { initTokenManager } from '#demo/utils/tokenManager';

export const initHandleAuth = (demoStore: DemoStore) => {
  const urlParams = new URLSearchParams(window.location.search);
  try {
    const code = urlParams.get('code');
    const deviceId = urlParams.get('device_id');
    const error = urlParams.get('error');
    const responseType = urlParams.get('type');

    if (deviceId && code && responseType === OAUTH2_CODE_TYPE) {
      if (!demoStore.codeChallenge) {
        Auth.exchangeCode(code, deviceId)
          .then((exchangeRes) => {
            Object.assign(demoStore, { authResult: { ...exchangeRes, updated_at: Date.now() }, deviceId });
            saveDemoStoreInLS(demoStore);

            // eslint-disable-next-line no-console
            console.log('exchange auth code result:', exchangeRes);
            showAuthSuccessSnackbar();

            initTokenManager(demoStore);
          })
          .catch((e) => {
            console.error('Ошибка Auth.exchangeCode()', e);
            showAuthErrorSnackbar();
          });
      }
      window.history.pushState({}, document.title, window.location.pathname);
    } else if (error) {
      showAuthErrorSnackbar();
    }
  } catch {}
};
