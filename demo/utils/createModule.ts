import * as VKID from '@vkid/sdk';

import { showAuthInfoSnackbar, showInitErrorSnackbar } from '#demo/components/snackbar';
import { DemoStore } from '#demo/types';
import { handleCallbackAuth } from '#demo/utils/handleAuth';

export const createOneTap = (demoStore: DemoStore) => {
  const container = document.getElementById('oneTap') as HTMLElement;

  const params: VKID.OneTapParams = {
    container: container,
    showAlternativeLogin: true,
    lang: Number(demoStore.lang),
    scheme: demoStore.scheme,
    skin: demoStore.onetapSkin as VKID.OneTapParams['skin'],
    oauthList: demoStore.oauthes ? demoStore.oauthes.split(',') as VKID.OAuthName[] : undefined,
    fastAuthEnabled: !!demoStore.fastAuthEnabledOnetap,
    contentId: Number(demoStore.buttonOneTapContentId),
  };

  const oneTap = new VKID.OneTap();
  oneTap.on(VKID.WidgetEvents.ERROR, showInitErrorSnackbar)
    .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, handleCallbackAuth)
    .on(VKID.OneTapInternalEvents.AUTHENTICATION_INFO, showAuthInfoSnackbar)
    .render(params);

  return oneTap;
};

export const createFloatingOneTap = (demoStore: DemoStore) => {
  const params = {
    appName: 'VK ID Demo',
    showAlternativeLogin: true,
    lang: Number(demoStore.lang),
    scheme: demoStore.scheme,
    oauthList: demoStore.oauthes ? demoStore.oauthes.split(',') as VKID.OAuthName[] : undefined,
    fastAuthEnabled: !!demoStore.fastAuthEnabledFloatingOnetap,
    contentId: Number(demoStore.floatingOneTapContentId),
  };

  const floatingOneTap = new VKID.FloatingOneTap();
  floatingOneTap
    .on(VKID.FloatingOneTapInternalEvents.LOGIN_SUCCESS, handleCallbackAuth)
    .on(VKID.WidgetEvents.ERROR, showInitErrorSnackbar)
    .render(params);

  return floatingOneTap;
};

export const createCommunitySubscription = (demoStore: DemoStore) => {
  const params = {
    lang: Number(demoStore.lang),
    scheme: demoStore.scheme,
    groupId: demoStore.groupId,
    accessToken: demoStore.authResult?.access_token as string,
  };

  const communitySubscription = new VKID.CommunitySubscription();
  params.accessToken && communitySubscription
    .on(VKID.WidgetEvents.ERROR, (e: VKID.CommunitySubscriptionError) => {
      console.error('Community Subscription Error', e);
      showInitErrorSnackbar();
    })
    .render(params);

  return communitySubscription;
};

export const createOAuthList = (demoStore: DemoStore) => {
  const container = document.getElementById('oauthList') as HTMLElement;

  const oauthList = new VKID.OAuthList();
  oauthList
    .on(VKID.OAuthListInternalEvents.LOGIN_SUCCESS, handleCallbackAuth)
    .on(VKID.WidgetEvents.ERROR, showInitErrorSnackbar)
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
