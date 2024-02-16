import * as VKID from '#/index';
import { ConfigAuthMode } from '#/index';

import { DemoStore } from '#demo/types';

export const saveDemoStoreInLS = (store: DemoStore) => {
  try {
    localStorage.setItem('vkid_demo:store', JSON.stringify(store));
  } catch (e) {}
};

export const getDemoStoreFromLS = (): DemoStore => {
  const defaultDemoStore: DemoStore = {
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
  };

  try {
    const stringStore = localStorage.getItem('vkid_demo:store');
    if (stringStore) {
      return JSON.parse(stringStore);
    }
    saveDemoStoreInLS(defaultDemoStore);
  } catch (e) {}
  return defaultDemoStore;
};

