type SnackbarType = 'auth_success' | 'auth_error' | 'init_error';

let isActiveSnackbar = false;

const snackbarText: Record<SnackbarType, string> = {
  'auth_success': 'Успешная авторизация',
  'auth_error': 'Ошибка авторизации',
  'init_error': 'Ошибка инициализации',
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

const snackbarIcon: Record<SnackbarType, string> = {
  'auth_success': successIcon,
  'auth_error': errorIcon,
  'init_error': errorIcon,
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

export const showAuthErrorSnackbar = () => {
  showSnackbar('auth_error');
};

export const showInitErrorSnackbar = () => {
  showSnackbar('init_error');
};
