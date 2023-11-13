import './styles.css';
import * as VKID from '@vkid/sdk';
import { WidgetEvents } from '@vkid/sdk/core/widget/events';
import { OneTap } from '@vkid/sdk/widgets/oneTap';
import { OneTapPublicEvents } from '@vkid/sdk/widgets/oneTap/events';

import {
  showAuthSuccessSnackbar,
  showAuthErrorSnackbar,
  showInitErrorSnackbar,
} from '#demo/components/snackbar';

const authButtonIds = ['authIconButton', 'authButton', 'authButtonWithIcon'];

VKID.Config.set({ app: 7303035 });

const handleAuthSuccess = (response: any) => {
  console.info(response);

  if (response.token) {
    showAuthSuccessSnackbar();
  } else {
    showAuthErrorSnackbar();
  }
};

const handleAuthError = (error: any) => {
  console.error(error);
  showAuthErrorSnackbar();
};

const handleClick = () => {
  VKID.Auth.login()
    .then(handleAuthSuccess)
    .catch(handleAuthError);
};

authButtonIds.forEach((item) => {
  const button = document.getElementById(item);

  button && (button.onclick = handleClick);
});

const createOneTap = (lang = VKID.Languages.RUS) => {
  const oneTapEl = document.getElementById('oneTap') as HTMLElement;
  const oneTapAuthSuccess = (response: any) => {
    console.info(response);
    showAuthSuccessSnackbar();
  };

  const oneTap = new OneTap();
  oneTap.on(OneTapPublicEvents.LOGIN_SUCCESS, oneTapAuthSuccess);
  oneTap.on(OneTapPublicEvents.LOGIN_FAILED, showAuthErrorSnackbar);
  oneTap.on(WidgetEvents.ERROR, showInitErrorSnackbar);
  oneTap.render({ container: oneTapEl, showAlternativeLogin: true, lang });

  return oneTap;
};

let oneTap = createOneTap();

function handleLangChange() {
  oneTap.close();
  oneTap = createOneTap(this.value);
}

const langEl = document.getElementById('lang');
if (langEl) {
  langEl.addEventListener('change', handleLangChange);
}
