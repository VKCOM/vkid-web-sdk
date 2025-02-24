import * as VKID from '@vkid/sdk';

import { DemoStore } from '#demo/types';

export const saveDemoStoreInLS = (store: DemoStore) => {
  try {
    localStorage.setItem('vkid_demo:store', JSON.stringify(store));
  } catch (e) {}
};

const domainLS = (name: string, value?: string) => {
  try {
    if (value) {
      localStorage.setItem(`vkid_demo:${name}Domain`, value);
      return;
    }
    return localStorage.getItem(`vkid_demo:${name}Domain`);
  } catch (e) {}
};

export const vkidDomainLS = (value?: string) => domainLS('vkid', value);
export const apiDomainLS = (value?: string) => domainLS('api', value);

export const getDemoStoreFromLS = (): DemoStore => {
  const defaultDemoStore: DemoStore = {
    app: 51988436,
    state: '',
    codeVerifier: '',
    codeChallenge: '',
    floatingOneTapContentId: VKID.FloatingOneTapContentId.SIGN_IN_TO_SERVICE,
    buttonOneTapContentId: VKID.OneTapContentId.SIGN_IN,
    lang: VKID.Languages.RUS,
    scheme: VKID.Scheme.LIGHT,
    onetapSkin: 'primary',
    oauthes: '',
    mode: VKID.ConfigAuthMode.InNewTab,
    responseMode: VKID.ConfigResponseMode.Redirect,

    enable_oauthList: true,
    enable_basicAuth: true,
    enable_oneTap: true,
    enable_floatingOneTap: true,
    enable_communitySubscription: false,
    prompt: [],
    deviceId: '',
    scope: '',
    fastAuthEnabledOnetap: '1',
    fastAuthEnabledFloatingOnetap: '1',
    groupId: 141632613,
  };

  try {
    const stringStore = localStorage.getItem('vkid_demo:store');
    if (stringStore) {
      const lsStore = JSON.parse(stringStore);
      return {
        ...defaultDemoStore,
        ...lsStore,
        lang: Number(lsStore.lang),
        floatingOneTapContentId: Number(lsStore.floatingOneTapContentId),
        buttonOneTapContentId: Number(lsStore.buttonOneTapContentId),
      };
    }
    saveDemoStoreInLS(defaultDemoStore);
  } catch (e) {}
  return defaultDemoStore;
};

