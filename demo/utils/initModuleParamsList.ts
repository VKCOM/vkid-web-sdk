import { Languages, Scheme, ConfigAuthMode, ConfigResponseMode, FloatingOneTapContentId, OneTapContentId, OneTapSkin, OAuthName, Prompt } from '@vkid/sdk';

import { DemoStore } from '#demo/types';

const langOptions = [
  { value: Languages.RUS, text: 'RUS' },
  { value: Languages.UKR, text: 'UKR' },
  { value: Languages.BEL, text: 'BEL' },
  { value: Languages.KAZ, text: 'KAZ' },
  { value: Languages.UZB, text: 'UZB' },
  { value: Languages.ENG, text: 'ENG' },
  { value: Languages.SPA, text: 'SPA' },
  { value: Languages.GERMAN, text: 'GERMAN' },
  { value: Languages.POL, text: 'POL' },
  { value: Languages.FRA, text: 'FRA' },
  { value: Languages.TURKEY, text: 'TURKEY' },
];

const schemeOptions = [
  { value: Scheme.LIGHT, text: 'Light' },
  { value: Scheme.DARK, text: 'Dark' },
];

const modeOptions = [
  { value: ConfigAuthMode.InNewTab, text: 'Новая вкладка' },
  { value: ConfigAuthMode.Redirect, text: 'Текущая вкладка' },
  { value: ConfigAuthMode.InNewWindow, text: 'Новое окно' },
];

const responseModeOptions = [
  { value: ConfigResponseMode.Redirect, text: 'Redirect' },
  { value: ConfigResponseMode.Callback, text: 'Callback' },
];

const floatingOneTapContentIdOptions = [
  { value: FloatingOneTapContentId.SIGN_IN_TO_SERVICE, text: 'Войти в сервис' },
  { value: FloatingOneTapContentId.SIGN_IN_TO_ACCOUNT, text: 'Войти в аккаунт' },
  { value: FloatingOneTapContentId.REGISTRATION_FOR_EVENT, text: 'Регистрация на мероприятие' },
  { value: FloatingOneTapContentId.SUBMIT_APPLICATIONS, text: 'Подача заявки' },
  { value: FloatingOneTapContentId.MAKE_ORDER_WITH_SERVICE, text: 'Оформление заказа 1' },
  { value: FloatingOneTapContentId.MAKE_ORDER_WITHOUT_SERVICE, text: 'Оформление заказа 2' },
  { value: FloatingOneTapContentId.FAST_REGISTRATION, text: 'Быстрая регистрация в сервисе' },
];

const buttonOneTapContentIdOptions = [
  { value: OneTapContentId.SIGN_IN, text: 'Войти' },
  { value: OneTapContentId.SIGN_UP, text: 'Записаться' },
  { value: OneTapContentId.GET, text: 'Получить' },
  { value: OneTapContentId.OPEN, text: 'Открыть' },
  { value: OneTapContentId.CALCULATE, text: 'Рассчитать' },
  { value: OneTapContentId.ORDER, text: 'Заказать' },
  { value: OneTapContentId.PLACE_ORDER, text: 'Оформить заказ' },
  { value: OneTapContentId.SUBMIT_REQUEST, text: 'Оставить заявку' },
  { value: OneTapContentId.PARTICIPATE, text: 'Участвовать' },
];

const onetapSkinOptions = [
  { value: OneTapSkin.Primary, text: 'Основной' },
  { value: OneTapSkin.Secondary, text: 'Вторичный' },
];

const oauthesOptions = [
  { value: '', text: 'Нет' },
  { value: OAuthName.MAIL, text: 'Mail.ru' },
  { value: OAuthName.OK, text: 'OK.ru' },
  { value: OAuthName.MAIL + ',' + OAuthName.OK, text: 'Mail.ru + OK.ru' },
];

const fastAuthEnabledOnetapOptions = [
  { value: '1', text: 'Вкл' },
  { value: '', text: 'Выкл' },
];

const fastAuthEnabledFloatingOnetapOptions = [
  { value: '1', text: 'Вкл' },
  { value: '', text: 'Выкл' },
];

const promptOptions = [
  { value: Prompt.Login, text: 'Login' },
  { value: Prompt.Consent, text: 'Consent' },
  { value: Prompt.None, text: 'None' },
  { value: Prompt.SelectAccount, text: 'Select account' },
];

export const initModuleParamsList = (store: DemoStore) => {
  const html = `<details open>
  <summary>Параметры модулей</summary>
  <label for="lang">Язык:</label>
  <select id="lang" name="lang">
    ${langOptions.map(({ text, value }) => `<option ${store.lang === value ? 'selected' : ''} value="${value}">${text}</option>`).join('')}
  </select>
  <br />
  <label for="scheme">Тема:</label>
  <select id="scheme" name="scheme">
    ${schemeOptions.map(({ text, value }) => `<option ${store.scheme === value ? 'selected' : ''} value="${value}">${text}</option>`).join('')}
  </select>
  <br />
  <label for="mode">Режим открытия авторизации:</label>
  <select id="mode" name="mode">
    ${modeOptions.map(({ text, value }) => `<option ${store.mode === value ? 'selected' : ''} value="${value}">${text}</option>`).join('')}
  </select>
  <br />
  <label for="responseMode">Режим получения данных:</label>
  <select id="responseMode" name="responseMode">
    ${responseModeOptions.map(({ text, value }) => `<option ${store.responseMode === value ? 'selected' : ''} value="${value}">${text}</option>`).join('')}
  </select>
  <br />
  <label for="floatingOneTapContentId">Тип текстов в шторке:</label>
  <select id="floatingOneTapContentId" name="floatingOneTapContentId">
    ${floatingOneTapContentIdOptions.map(({ text, value }) => `<option ${store.floatingOneTapContentId === value ? 'selected' : ''} value="${value}">${text}</option>`).join('')}
  </select>
  <br />
  <label for="buttonOneTapContentId">Тип текстов в вантапе:</label>
  <select id="buttonOneTapContentId" name="buttonOneTapContentId">
    ${buttonOneTapContentIdOptions.map(({ text, value }) => `<option ${store.buttonOneTapContentId === value ? 'selected' : ''} value="${value}">${text}</option>`).join('')}
  </select>
  <br />
  <label for="onetapSkin">Скин вантапа</label>
  <select id="onetapSkin" name="onetapSkin">
    ${onetapSkinOptions.map(({ text, value }) => `<option ${store.onetapSkin === value ? 'selected' : ''} value="${value}">${text}</option>`).join('')}
  </select>
  <br />
  <label for="oauthes">ОАусы вантапов:</label>
  <select id="oauthes" name="oauthes">
    ${oauthesOptions.map(({ text, value }) => `<option ${store.oauthes === value ? 'selected' : ''} value="${value}">${text}</option>`).join('')}
  </select>
  <br />
  <details>
    <summary>"Продолжить как" в вантапах</summary>
    <br />
    <label for="fastAuthEnabledOnetap">Кнопка</label>
    <select id="fastAuthEnabledOnetap" name="fastAuthEnabledOnetap">
      ${fastAuthEnabledOnetapOptions.map(({ text, value }) => `<option ${store.fastAuthEnabledOnetap === value ? 'selected' : ''} value="${value}">${text}</option>`).join('')}
    </select>
    <br />
    <label for="fastAuthEnabledFloatingOnetap">Шторка</label>
    <select id="fastAuthEnabledFloatingOnetap" name="fastAuthEnabledFloatingOnetap">
      ${fastAuthEnabledFloatingOnetapOptions.map(({ text, value }) => `<option ${store.fastAuthEnabledFloatingOnetap === value ? 'selected' : ''} value="${value}">${text}</option>`).join('')}
    </select>
    <br />
  </details>
  <br />
  <div class="prompt">
    <details>
      <summary>Prompt</summary>
        ${promptOptions.map(({ text, value }) => `<label for="${value}">
            <input ${store.prompt?.includes(value) ? 'checked' : ''} type="checkbox" name="${value}" id="${value}">${text}</label><br />`).join('')}
      </div>
    </details>
  <br />
  <button onclick="localStorage.removeItem('vkid_demo:store'); location.reload()">Сбросить</button>
</details>
  `;
  document.querySelector('.VkIdWebSdk_controls')?.insertAdjacentHTML('beforeend', html);
};
