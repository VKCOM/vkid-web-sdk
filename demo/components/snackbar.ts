type SnackbarType = 'auth_success' | 'auth_error' | 'init_error' | 'authentication_online' | 'authentication_offline';

let isActiveSnackbar = false;

const snackbarText: Record<SnackbarType, string> = {
  'auth_success': 'Успешная авторизация',
  'auth_error': 'Ошибка авторизации',
  'init_error': 'Ошибка инициализации',
  'authentication_online': 'Пользователь аутентифицирован',
  'authentication_offline': 'Пользователь не аутентифицирован',
};

const successIcon = `
<svg class="VkIdWebSdk__snackbar_icon" aria-hidden="true" display="block" viewBox="0 0 28 28" width="28" height="28">
  <linearGradient id="check_circle_fill_28_a" x1="-14" x2="14" y1="14" y2="42" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#50c750"></stop>
    <stop offset="1" stop-color="#32b332"></stop>
  </linearGradient>
  <path fill="url(#check_circle_fill_28_a)" d="M0 14C0 6.268 6.268 0 14 0s14 6.268 14 14-6.268 14-14 14S0 21.732 0 14z"></path>
  <path fill="#fff" fill-rule="evenodd" d="M20.707 9.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 1 1 1.414-1.414L12 16.586l7.293-7.293a1 1 0 0 1 1.414 0z" clip-rule="evenodd"></path>
</svg>
`;

const errorIcon = `
<svg class="VkIdWebSdk__snackbar_icon" aria-hidden="true" display="block" viewBox="0 0 28 28" width="28" height="28">
  <linearGradient id="cancel_circle_fill_red_28_a" x1="-14" x2="14" y1="14" y2="42" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#ff5263"></stop>
    <stop offset="1" stop-color="#ff3347"></stop>
  </linearGradient>
  <path fill="url(#cancel_circle_fill_red_28_a)" d="M0 14C0 6.268 6.268 0 14 0s14 6.268 14 14-6.268 14-14 14S0 21.732 0 14z"></path>
  <path fill="#fff" fill-rule="evenodd" d="M9.293 10.707a1 1 0 0 1 1.414-1.414L14 12.586l3.293-3.293a1 1 0 1 1 1.414 1.414L15.414 14l3.293 3.293a1 1 0 0 1-1.414 1.414L14 15.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L12.586 14z" clip-rule="evenodd"></path>
</svg>
`;

const infoIcon = `
<svg class="VkIdWebSdk__snackbar_icon" aria-hidden="true" display="block" viewBox="0 0 28 28" width="28" height="28">
  <linearGradient id="lightbulb_circle_fill_yellow_28" x1="-14" x2="14" y1="14" y2="42" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#ffb73d"/>
    <stop offset="1" stop-color="#ffa000"/>
  </linearGradient>
  <path fill="url(#lightbulb_circle_fill_yellow_28)" d="M0 14C0 6.268 6.268 0 14 0s14 6.268 14 14-6.268 14-14 14S0 21.732 0 14"/>
  <path fill="#fff" fill-rule="evenodd" d="M14.005 5h.002c.548 0 .992.444.992.992v.005l-.004 1.008a1 1 0 0 1-1 .995h-.002a.99.99 0 0 1-.992-.992v-.005l.004-1.008a1 1 0 0 1 1-.995m6.363 2.64a.99.99 0 0 1 0 1.404l-.002.004-.716.709a1 1 0 0 1-1.411-.003l-.001-.002a.99.99 0 0 1 0-1.403l.003-.003.716-.71a1 1 0 0 1 1.41.004M23 14.007v-.002a1 1 0 0 0-.995-1l-1.008-.004h-.005a.99.99 0 0 0-.992.992v.002a1 1 0 0 0 .995 1l1.008.004h.005a.99.99 0 0 0 .992-.992m-18-.012v-.002c0-.548.444-.992.992-.992h.005l1.008.004a1 1 0 0 1 .995 1v.002a.99.99 0 0 1-.992.992h-.005l-1.008-.004a1 1 0 0 1-.995-1M7.641 7.63l-.001.001a1 1 0 0 0-.003 1.411l.709.716.003.003a.993.993 0 0 0 1.404 0 1 1 0 0 0 .004-1.412l-.71-.716-.002-.003a.99.99 0 0 0-1.404 0M14 20.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2m4-6.5a4 4 0 0 1-2.5 3.71V18c0 .466 0 .699-.076.883a1 1 0 0 1-.541.54c-.184.077-.417.077-.883.077s-.699 0-.883-.076a1 1 0 0 1-.54-.541c-.077-.184-.077-.417-.077-.883v-.29A4.001 4.001 0 1 1 18 14" clip-rule="evenodd"/>
</svg>`;

const snackbarIcon: Record<SnackbarType, string> = {
  'auth_success': successIcon,
  'auth_error': errorIcon,
  'init_error': errorIcon,
  'authentication_online': infoIcon,
  'authentication_offline': infoIcon,
};

const showSnackbar = (type: SnackbarType) => {
  if (!isActiveSnackbar) {
    isActiveSnackbar = true;
    const defaultStyle = `VkIdWebSdk__snackbar VkIdWebSdk__snackbar_${type}`;
    const snackbar = document.createElement('div');
    snackbar.className = defaultStyle;
    snackbar.innerHTML = `${snackbarIcon[type]} ${snackbarText[type]}`;

    setTimeout(() => {
      snackbar.className += ' VkIdWebSdk__snackbar_active';
    }, 100);

    setTimeout(() => {
      snackbar.className = defaultStyle;
    }, 3000);

    setTimeout(() => {
      snackbar.remove();
      isActiveSnackbar = false;
    }, 3400);

    document.body.appendChild(snackbar);
  }
};

export const showAuthSuccessSnackbar = () => {
  showSnackbar('auth_success');
};

export const showAuthErrorSnackbar = (e?: unknown) => {
  e && console.error(e);
  showSnackbar('auth_error');
};

export const showInitErrorSnackbar = () => {
  showSnackbar('init_error');
};

export const showAuthInfoSnackbar = ({ is_online }: { is_online: boolean }) => {
  is_online ? showSnackbar('authentication_online') : showSnackbar('authentication_offline');
};
