import { DemoStore } from '#demo/types';

export const initConfigParamsList = (store: DemoStore) => {
  const html = `<details open>
  <summary>Параметры конфига</summary>
  <br />
  <label for="input_app">appId:</label>
  <input value="${store.app}" type="text" id="input_app">
  <br />
  <label for="input_state">state:</label>
  <input value="${store.state}" type="text" id="input_state">
  <br />
  <label for="input_codeVerifier">codeVerifier:</label>
  <input value="${store.codeVerifier}" type="text" id="input_codeVerifier">
  <br />
  <label for="input_codeChallenge">codeChallenge:</label>
  <input value="${store.codeChallenge}" type="text" id="input_codeChallenge">
  <br />
  <label for="input_scope">scope:</label>
  <input value="${store.scope}" type="text" id="input_scope">
  <label for="input_groupId">groupId:</label>
  <input value="${store.groupId}" type="text" id="input_groupId">
</details>
  `;
  document.querySelector('.VkIdWebSdk_controls')?.insertAdjacentHTML('beforeend', html);
};
