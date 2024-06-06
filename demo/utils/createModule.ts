import * as VKID from '#/index';
import { OAuthName } from '#/index';
import { OneTapInternalEvents } from '#/widgets/oneTap/events';

import { showAuthInfoSnackbar, showInitErrorSnackbar } from '#demo/components/snackbar';
import { DemoStore } from '#demo/types';

export const createOneTap = (demoStore: DemoStore) => {
  const container = document.getElementById('oneTap') as HTMLElement;

  const params: VKID.OneTapParams = {
    container: container,
    showAlternativeLogin: true,
    lang: Number(demoStore.lang),
    scheme: demoStore.scheme,
    skin: demoStore.onetapSkin as VKID.OneTapParams['skin'],
    oauthList: demoStore.oauthes ? demoStore.oauthes.split(',') as OAuthName[] : undefined,
    fastAuthEnabled: !!demoStore.fastAuthEnabledOnetap,
  };

  const oneTap = new VKID.OneTap();
  oneTap.on(VKID.WidgetEvents.ERROR, showInitErrorSnackbar)
    .on(OneTapInternalEvents.AUTHENTICATION_INFO, showAuthInfoSnackbar)
    .render(params);

  return oneTap;
};

export const createFloatingOneTap = (demoStore: DemoStore) => {
  const params = {
    appName: 'VK ID Demo',
    showAlternativeLogin: true,
    contentId: Number(demoStore.contentId),
    lang: Number(demoStore.lang),
    scheme: demoStore.scheme,
    oauthList: demoStore.oauthes ? demoStore.oauthes.split(',') as OAuthName[] : undefined,
    fastAuthEnabled: !!demoStore.fastAuthEnabledFloatingOnetap,
  };

  const floatingOneTap = new VKID.FloatingOneTap();
  floatingOneTap.on(VKID.WidgetEvents.ERROR, showInitErrorSnackbar)
    .render(params);

  return floatingOneTap;
};

export const createOAuthList = (demoStore: DemoStore) => {
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
