import { showAuthErrorSnackbar, showAuthSuccessSnackbar } from '#demo/components/snackbar';

export const initHandleAuth = () => {
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
};
