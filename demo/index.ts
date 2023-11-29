import './styles.css';
import * as VKID from '@vkid/sdk';

import {
  showAuthSuccessSnackbar,
  showAuthErrorSnackbar,
  showInitErrorSnackbar,
} from '#demo/components/snackbar';

/**
 * General settings
 */
VKID.Config.set({
  app: 7303035,
  state: 'test',
  redirectUrl: `${window.location.protocol}//${window.location.hostname}${window.location.pathname}`,
});

const urlParams = new URLSearchParams(window.location.search);
try {
  const payloadStr = urlParams.get('payload');
  if (payloadStr) {
    const payload = JSON.parse(payloadStr);
    if (payload && payload.token) {
      showAuthSuccessSnackbar();
      window.history.pushState({}, document.title, window.location.pathname);
    } else {
      showAuthErrorSnackbar();
    }
  }
} catch {}

/**
 * Custom auth
 */
const authButtonIds = ['authIconButton', 'authButtonWithIcon'];

authButtonIds.forEach((item) => {
  const button = document.getElementById(item) as HTMLElement;

  button.onclick = () => VKID.Auth.login();
});

let demoStore = {
  contentId: VKID.FloatingOneTapContentId.SIGN_IN_TO_SERVICE,
  lang: VKID.Languages.RUS,
  scheme: VKID.Scheme.LIGHT,
};

/**
 * Widgets integration
 */
const createOneTap = () => {
  const container = document.getElementById('oneTap') as HTMLElement;

  const params = {
    container: container,
    showAlternativeLogin: true,
    contentId: Number(demoStore.contentId),
    lang: Number(demoStore.lang),
    scheme: demoStore.scheme,
  };

  const oneTap = new VKID.OneTap();
  oneTap.on(VKID.WidgetEvents.ERROR, showInitErrorSnackbar)
    .render(params);

  return oneTap;
};

const createFloatingOneTap = () => {
  const params = {
    appName: 'VK ID Demo',
    showAlternativeLogin: true,
    contentId: Number(demoStore.contentId),
    lang: Number(demoStore.lang),
    scheme: demoStore.scheme,
  };

  const floatingOneTap = new VKID.FloatingOneTap();
  floatingOneTap.on(VKID.WidgetEvents.ERROR, showInitErrorSnackbar)
    .render(params);

  return floatingOneTap;
};

const createOAuthList = () => {
  const container = document.getElementById('oauthList') as HTMLElement;

  const oauthList = new VKID.OAuthList();
  oauthList.on(VKID.WidgetEvents.ERROR, showInitErrorSnackbar)
    .render({
      container,
      scheme: demoStore.scheme,
      lang: Number(demoStore.lang),
      oauthList: [
        VKID.OAuthName.VK,
        VKID.OAuthName.MAIL,
        VKID.OAuthName.OK,
      ],
    });

  return oauthList;
};

let oneTap = createOneTap();
let floatingOneTap = createFloatingOneTap();
let oauthList = createOAuthList();

function handleParamsChange() {
  demoStore = Object.assign(demoStore, { [this.name]: this.value });
  oneTap.close();
  oneTap = createOneTap();

  oauthList.close();
  oauthList = createOAuthList();

  floatingOneTap.close();
  floatingOneTap = createFloatingOneTap();
}

const langEl = document.getElementById('lang');
const schemeEl = document.getElementById('scheme');
const contentIdEl = document.getElementById('contentId');
[langEl, schemeEl, contentIdEl].forEach((item) => {
  if (item) {
    item.addEventListener('change', handleParamsChange);
  }
});
