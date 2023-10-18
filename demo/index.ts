import './styles.css';
import * as VKID from '@vkid/sdk';
import { OneTap } from '@vkid/sdk/widgets/oneTap';
import { OneTapPublicEvents } from '@vkid/sdk/widgets/oneTap/events';

import { showSuccessSnackbar, showErrorSnackbar } from '#demo/components/snackbar';

const authButtonIds = ['authIconButton', 'authButton', 'authButtonWithIcon'];

VKID.Config.set({ app: 7303035 });

const handleSuccess = (response: any) => {
  console.info(response);

  if (response.token) {
    showSuccessSnackbar();
  } else {
    showErrorSnackbar();
  }
};

const handleError = (error: any) => {
  console.error(error);
  showErrorSnackbar();
};

const handleClick = () => {
  VKID.Auth.login()
    .then(handleSuccess)
    .catch(handleError);
};

authButtonIds.forEach((item) => {
  const button = document.getElementById(item);

  button && (button.onclick = handleClick);
});

const oneTapEl = document.getElementById('oneTap') as HTMLElement;
const oneTapSuccess = (response: any) => {
  console.info(response);
  showSuccessSnackbar();
};
const oneTap = new OneTap();
oneTap.on(OneTapPublicEvents.LOGIN_SUCCESS, oneTapSuccess);
oneTap.on(OneTapPublicEvents.LOGIN_FAILED, showErrorSnackbar);
oneTap.render({ container: oneTapEl, showAlternativeLogin: true });
