import './styles.css';
import * as VKID from '@vkid/sdk';
import { ConfigData } from '@vkid/sdk';

import { API_DOMAIN, VKID_DOMAIN } from '#/constants';

import { initHandleAuth } from './utils/handleAuth';
import { initAuthButtons } from './utils/initAuthButtons';
import { initConfigParamsList } from './utils/initConfigParamsList';
import { initFloatingOneTap } from './utils/initFloatingOneTap';
import { initModuleEnabledList } from './utils/initModuleEnabledList';
import { initModuleParamsList } from './utils/initModuleParamsList';
import { initOauthList } from './utils/initOauthList';
import { initOneTap } from './utils/initOneTap';
import { apiDomainLS, getDemoStoreFromLS, saveDemoStoreInLS, vkidDomainLS } from './utils/localstorage';
import { initTokenManager } from './utils/tokenManager';

import { initCommunitySubscription } from '#demo/utils/initCommunitySubscription';

let demoStore = getDemoStoreFromLS();
const vkidDomain = vkidDomainLS();
const apiDomain = apiDomainLS();

/**
 * General settings
 */
VKID.Config.init({
  app: +demoStore.app,
  state: demoStore.state,
  scope: demoStore.scope,
  codeVerifier: demoStore.codeVerifier,
  redirectUrl: `${window.location.protocol}//${window.location.hostname}${window.location.pathname}`,
  mode: demoStore.mode,
  responseMode: demoStore.responseMode,
  prompt: demoStore.prompt,
  __vkidDomain: vkidDomain || VKID_DOMAIN,
  __apiDomain: apiDomain || API_DOMAIN,
});

if (demoStore.codeChallenge) {
  VKID.Config.update({ codeChallenge: demoStore.codeChallenge });
}

initHandleAuth(demoStore);
initConfigParamsList(demoStore);
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

const createCommunitySubscription = initCommunitySubscription(demoStore);
let communitySubscription = demoStore.enable_communitySubscription && createCommunitySubscription();
const resetCommunitySubscription = () => {
  if (communitySubscription) {
    communitySubscription.close();
    communitySubscription = createCommunitySubscription();
  }
};

initTokenManager(demoStore);

function handleSelectParamsChange() {
  demoStore = Object.assign(demoStore, { [this.name]: this.value });
  saveDemoStoreInLS(demoStore);

  resetOneTap();
  resetOauthList();
  resetFloatingOneTap();
  resetCommunitySubscription();

  document.querySelector('html')?.setAttribute('data-scheme', demoStore.scheme);
}
['lang', 'scheme', 'floatingOneTapContentId', 'buttonOneTapContentId', 'oauthes', 'onetapSkin', 'fastAuthEnabledOnetap', 'fastAuthEnabledFloatingOnetap'].forEach((item) => {
  document.getElementById(item)?.addEventListener('change', handleSelectParamsChange);
});

function handleConfigParamsChange() {
  VKID.Config.update({
    [this.name]: this.value,
  });
  demoStore = Object.assign(demoStore, { [this.name]: this.value });
  saveDemoStoreInLS(demoStore);
}
['mode', 'responseMode'].forEach((name) => {
  const modeEl = document.getElementById(name);
  modeEl && modeEl.addEventListener('change', handleConfigParamsChange);
});

function handleModuleEnabledCheckboxChange() {
  demoStore = Object.assign(demoStore, { [this.name]: this.checked });
  saveDemoStoreInLS(demoStore);
}
['enable_oauthList', 'enable_basicAuth', 'enable_oneTap', 'enable_floatingOneTap', 'enable_communitySubscription'].forEach((name) => {
  document.getElementById(name)?.addEventListener('change', handleModuleEnabledCheckboxChange);
});

function handlePromptCheckboxChange() {
  const promptRes: VKID.Prompt[] = [];

  const promptDiv = document.querySelector('.prompt');
  const promptInputs = promptDiv ? Array.from(promptDiv.getElementsByTagName('input')) : [];
  promptInputs.forEach((input) => {
    if (input.checked) {
      promptRes.push(input.name as VKID.Prompt);
    }
  });

  VKID.Config.update({ prompt: promptRes });
  demoStore = Object.assign(demoStore, { prompt: promptRes });
  saveDemoStoreInLS(demoStore);
}

const promptDiv = document.querySelector('.prompt');
const promptInputs = promptDiv ? Array.from(promptDiv.getElementsByTagName('input')) : [];
promptInputs.forEach((el) => {
  el.addEventListener('change', handlePromptCheckboxChange);
});

function handleConfigInputChange(e: InputEvent) {
  const target = e.target as HTMLInputElement;
  const value = target.value;
  const name = target.id.split('_')[1];
  demoStore = Object.assign(demoStore, { [name]: value });
  saveDemoStoreInLS(demoStore);
  VKID.Config.update({ [name as keyof ConfigData]: value });
}
['input_app', 'input_state', 'input_codeVerifier', 'input_codeChallenge', 'input_scope', 'input_groupId'].forEach((inputId) => {
  document.getElementById(inputId)?.addEventListener('input', handleConfigInputChange);
});

