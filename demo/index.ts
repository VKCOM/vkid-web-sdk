import './styles.css';
import * as VKID from '@vkid/sdk';

import {
  showAuthSuccessSnackbar,
  showAuthErrorSnackbar,
  showInitErrorSnackbar,
} from '#demo/components/snackbar';

const authButtonIds = ['authIconButton', 'authButtonWithIcon'];

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

  const oneTap = new VKID.OneTap();
  oneTap.on(VKID.OneTapPublicEvents.LOGIN_SUCCESS, oneTapAuthSuccess);
  oneTap.on(VKID.OneTapPublicEvents.LOGIN_FAILED, showAuthErrorSnackbar);
  oneTap.on(VKID.WidgetEvents.ERROR, showInitErrorSnackbar);
  oneTap.render({ container: oneTapEl, showAlternativeLogin: true, lang });

  return oneTap;
};

let oneTap = createOneTap();

const createOAuthList = (lang = VKID.Languages.RUS) => {
  const container = document.getElementById('oauthList') as HTMLElement;
  const oouthListAuthSuccess = (response: any) => {
    console.info(response);
    showAuthSuccessSnackbar();
  };

  const oauthList = new VKID.OAuthList();
  oauthList.on(VKID.OAuthListPublicEvents.LOGIN_SUCCESS, oouthListAuthSuccess);
  oauthList.on(VKID.OAuthListPublicEvents.LOGIN_FAILED, showAuthErrorSnackbar);
  oauthList.on(VKID.WidgetEvents.ERROR, showInitErrorSnackbar);
  oauthList.render({
    container,
    lang,
    oauthList: [
      VKID.OAuthName.VK,
      VKID.OAuthName.MAIL,
      VKID.OAuthName.OK,
    ],
  });

  return oauthList;
};

let oauthList = createOAuthList();

function handleLangChange() {
  oneTap.close();
  oneTap = createOneTap(this.value);

  oauthList.close();
  oauthList = createOAuthList(this.value);
}

const langEl = document.getElementById('lang');
if (langEl) {
  langEl.addEventListener('change', handleLangChange);
}
