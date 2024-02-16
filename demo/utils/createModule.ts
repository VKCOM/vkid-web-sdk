import * as VKID from '#/index';
import { OAuthName } from '#/index';

import { showInitErrorSnackbar } from '#demo/components/snackbar';
import { DemoStore } from '#demo/types';

export const createOneTap = (demoStore: DemoStore) => {
  const container = document.getElementById('oneTap') as HTMLElement;

  const params = {
    container: container,
    showAlternativeLogin: true,
    contentId: Number(demoStore.contentId),
    lang: Number(demoStore.lang),
    scheme: demoStore.scheme,
    skin: demoStore.onetapSkin,
    oauthList: demoStore.oauthes ? demoStore.oauthes.split(',') as OAuthName[] : undefined,
  };

  const oneTap = new VKID.OneTap();
  oneTap.on(VKID.WidgetEvents.ERROR, showInitErrorSnackbar)
    .render(params as VKID.OneTapParams);

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
