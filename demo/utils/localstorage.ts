import * as VKID from '#/index';
import { ConfigAuthMode } from '#/index';

import { DemoStore } from '#demo/types';

export const saveDemoStoreInLS = (store: DemoStore) => {
  try {
    localStorage.setItem('vkid_demo:store', JSON.stringify(store));
  } catch (e) {}
};

export const vkidDomainLS = (domain?: string) => {
  try {
    if (domain) {
      localStorage.setItem('vkid_demo:vkidDomain', domain);
      return;
    }
    return localStorage.getItem('vkid_demo:vkidDomain');
  } catch (e) {}
};

export const getDemoStoreFromLS = (): DemoStore => {
  const defaultDemoStore: DemoStore = {
    app: 51988436,
    state: '',
    codeVerifier: '',
    codeChallenge: '',
    contentId: VKID.FloatingOneTapContentId.SIGN_IN_TO_SERVICE,
    lang: VKID.Languages.RUS,
    scheme: VKID.Scheme.LIGHT,
    onetapSkin: 'primary',
    oauthes: '',
    mode: ConfigAuthMode.Redirect,

    enable_oauthList: true,
    enable_basicAuth: true,
    enable_oneTap: true,
    enable_floatingOneTap: true,
    prompt: [],
    deviceId: '',
    vkidDomain: '',
    scope: '',
    fastAuthEnabledOnetap: '1',
    fastAuthEnabledFloatingOnetap: '1',
  };

  try {
    const stringStore = localStorage.getItem('vkid_demo:store');
    if (stringStore) {
      const lsStore = JSON.parse(stringStore);
      return { ...defaultDemoStore, ...lsStore };
    }
    saveDemoStoreInLS(defaultDemoStore);
  } catch (e) {}
  return defaultDemoStore;
};

