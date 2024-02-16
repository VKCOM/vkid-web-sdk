import './styles.css';
import * as VKID from '@vkid/sdk';

import { initHandleAuth } from './utils/handleAuth';
import { initAuthButtons } from './utils/initAuthButtons';
import { initFloatingOneTap } from './utils/initFloatingOneTap';
import { initModuleEnabledList } from './utils/initModuleEnabledList';
import { initModuleParamsList } from './utils/initModuleParamsList';
import { initOauthList } from './utils/initOauthList';
import { initOneTap } from './utils/initOneTap';
import { getDemoStoreFromLS, saveDemoStoreInLS } from './utils/localstorage';

let demoStore = getDemoStoreFromLS();

/**
 * General settings
 */
VKID.Config.set({
  app: 7303035,
  state: 'test',
  redirectUrl: `${window.location.protocol}//${window.location.hostname}${window.location.pathname}`,
  mode: demoStore.mode,
});

initHandleAuth();
initModuleParamsList(demoStore);
initModuleEnabledList(demoStore);
document.querySelector('html')?.setAttribute('data-scheme', demoStore.scheme);

/**
 * Custom auth
 */
initAuthButtons(demoStore);

/**
 * Widgets integration
 */
const createOneTap = initOneTap(demoStore);
let oneTap = demoStore.enable_oneTap && createOneTap();
const resetOneTap = () => {
  if (oneTap) {
    oneTap.close();
    oneTap = createOneTap();
  }
};

const createFloatingOneTap = initFloatingOneTap(demoStore);
let floatingOneTap = demoStore.enable_floatingOneTap && createFloatingOneTap();
const resetFloatingOneTap = () => {
  if (floatingOneTap) {
    floatingOneTap.close();
    floatingOneTap = createFloatingOneTap();
  }
};

const createOauthList = initOauthList(demoStore);
let oauthList = demoStore.enable_oauthList && createOauthList();
const resetOauthList = () => {
  if (oauthList) {
    oauthList.close();
    oauthList = createOauthList();
  }
};

function handleSelectParamsChange() {
  demoStore = Object.assign(demoStore, { [this.name]: this.value });
  saveDemoStoreInLS(demoStore);

  resetOneTap();
  resetOauthList();
  resetFloatingOneTap();

  document.querySelector('html')?.setAttribute('data-scheme', demoStore.scheme);
}
['lang', 'scheme', 'contentId', 'oauthes', 'onetapSkin'].forEach((item) => {
  document.getElementById(item)?.addEventListener('change', handleSelectParamsChange);
});

function handleConfigParamsChange() {
  VKID.Config.set({
    [this.name]: this.value,
  });
  demoStore = Object.assign(demoStore, { [this.name]: this.value });
  saveDemoStoreInLS(demoStore);
}
const modeEl = document.getElementById('mode');
modeEl && modeEl.addEventListener('change', handleConfigParamsChange);

function handleModuleEnabledCheckboxChange() {
  demoStore = Object.assign(demoStore, { [this.name]: this.checked });
  saveDemoStoreInLS(demoStore);
}
['enable_oauthList', 'enable_basicAuth', 'enable_oneTap', 'enable_floatingOneTap'].forEach((name) => {
  document.getElementById(name)?.addEventListener('change', handleModuleEnabledCheckboxChange);
});
