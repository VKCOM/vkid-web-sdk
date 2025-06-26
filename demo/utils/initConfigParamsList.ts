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
   <style>
        #limitBlock {
            display: none;
        }
        input:checked ~ #limitBlock {
            display: flex;
            flex-direction: column;
        }
    </style>
  <label for="communitySubscriptionLimitData">
    <input type="checkbox" ${store.groupSubscriptionsLimit ? 'checked' : ''} name="community_subscription_limit" id="communitySubscriptionLimitData">Включить лимит показа подписки на сообщество:
    <br />
    <div id="limitBlock">
        <br />
        <label for="input_period">Период (в днях):</label>
        <input value="${store.groupSubscriptionsLimit?.periodInDays ?? ''}" type="text" id="communitySubscriptionLimitPeriod">
        <label for="input_count">Максимальное число показов:</label>
        <input value="${store.groupSubscriptionsLimit?.maxSubscriptionsToShow ?? ''}" type="text" id="communitySubscriptionLimitCount">
    </div>
  </label>
</details>
  `;
  document.querySelector('.VkIdWebSdk_controls')?.insertAdjacentHTML('beforeend', html);
};
