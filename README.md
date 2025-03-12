<div align="center">
  <h1 align="center">
    <img width="150" class="figure" src="https://unpkg.com/@vkid/sdk@0.0.1-alpha/logo.svg"/>
  </h1>
  <p align="center">
    <a href="LICENSE">
      <img src="https://img.shields.io/npm/l/@vkid/sdk?maxAge=3600">
    </a>
    <a href="https://npmjs.com/package/@vkid/sdk">
      <img src="https://img.shields.io/npm/v/@vkid/sdk/latest.svg?maxAge=3600">
    </a>
    <a href="https://npmjs.com/package/@vkid/sdk">
      <img alt="npm" src="https://img.shields.io/npm/dw/%40vkid%2Fsdk">
    </a>
    <a href="https://npmjs.com/package/@vkid/sdk">
      <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/%40vkid%2Fsdk@latest">
    </a>
  </p>
  <p align="center">
    VK ID SDK — это библиотека для безопасной и удобной авторизации пользователей в вашем сервисе через VK ID.
  </p>
</div>

---

ℹ️ VK ID SDK поддерживает авторизацию по протоколу [OAuth 2.1](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-10), а также способы входа через аккаунты Одноклассников и Mail.

---

## Установка

**NPM:**

```sh
npm i @vkid/sdk@^2.0.0
```

**YARN:**

```sh
yarn add @vkid/sdk@^2.0.0
```

**PNPM:**

```sh
pnpm add @vkid/sdk@^2.0.0
```

**CDN:**

```html
<script src="https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js"></script>
```

> Обратите внимание: Для работы авторизации нужен APP_ID. Вы получите его, когда [создадите](https://id.vk.com/business/go/docs/ru/vkid/latest/vk-id/connection/create-application) приложение в кабинете подключения VK ID.

## Пример

<details>
  <summary>Базовая авторизация</summary>

```javascript
import * as VKID from '@vkid/sdk';

VKID.Config.init({
  app: APP_ID,
  redirectUrl: 'https://example.com',
  state: 'state',
  codeVerifier: 'codeVerifier',
  scope: 'phone email',
});


const authButton = document.getElementById('vk_auth_button');

authButton.onclick = () => {
  // После авторизации будет редирект на адрес, указанный в параметре redirectUrl
  VKID.Auth.login()
    .catch(console.error);
};
```
Подробнее - в документации по [ссылке](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/custom-button/custom-button-web).
</details>

<details>
  <summary>Кнопка OneTap</summary>

```javascript
import * as VKID from '@vkid/sdk';

VKID.Config.init({
  app: APP_ID,
  redirectUrl: 'https://example.com',
  state: 'state',
  codeVerifier: 'codeVerifier',
  scope: 'phone email',
});

const oneTap = new VKID.OneTap();

const container = document.getElementById('VkIdSdkOneTap');

if (container) {
  oneTap
    .render({ container })
    .on(VKID.WidgetEvents.ERROR, console.error);
}
```
Подробнее - в документации по [ссылке](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-button/onetap-web).
</details>

<details>
  <summary>Шторка OneTap</summary>

```javascript
import * as VKID from '@vkid/sdk';

VKID.Config.init({
  app: APP_ID,
  redirectUrl: 'https://example.com',
  state: 'state',
  codeVerifier: 'codeVerifier',
  scope: 'phone email',
});

const floatingOneTap = new VKID.FlotingOneTap();

floatingOneTap
  .render({ appName: APP_NAME })
  .on(VKID.WidgetEvents.ERROR, console.error);

```
Подробнее - в документации по [ссылке](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-drawer/floating-onetap-web).
</details>

<details>
  <summary>Виджет 3 в 1</summary>

```javascript
import * as VKID from '@vkid/sdk';

VKID.Config.init({
  app: APP_ID,
  redirectUrl: 'https://example.com',
  state: 'state',
  codeVerifier: 'codeVerifier',
  scope: 'phone email',
});

const oauthList = new VKID.OAuthList();

const container = document.getElementById('VkIdSdkOAuthList');

const oauthListNames = [
  VKID.OAuthName.VK,
  VKID.OAuthName.MAIL,
  VKID.OAuthName.OK,
];

if (container) {
  oauthList
    .render({ container, oauthList: oauthListNames })
    .on(VKID.WidgetEvents.ERROR, handleError);
}

```
Подробнее - в документации по [ссылке](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/widget-3-1/three-in-one-web).
</details>

## Документация

- [Что такое VK ID](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/intro/start-page)
- [Создание приложения](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/create-application)
- [Требования к дизайну](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/guidelines/design-rules-oauth)
- [Спецификация](https://vkcom.github.io/vkid-web-sdk/docs)

## Contributing

Проект VK ID SDK имеет открытый исходный код на GitHub, и вы можете присоединиться к его доработке — мы будем благодарны за внесение улучшений и исправление возможных ошибок.

### Code of Conduct

Если вы собираетесь вносить изменения в проект VK ID SDK, следуйте правилам [разработки](CODE_OF_CONDUCT.md). Они помогут понять, какие действия возможны, а какие недопустимы.

### Contributing Guide

В [руководстве](CONTRIBUTING.md) вы можете подробно ознакомиться с процессом разработки и узнать, как предлагать улучшения и исправления, а ещё — как добавлять и тестировать свои изменения в VK ID SDK.
Также рекомендуем ознакомиться с общими [правилами оформления кода](CODE_STYLE.md) в проекте.
