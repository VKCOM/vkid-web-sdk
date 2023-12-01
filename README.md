<div align="center">
  <h1 align="center">
    <img width="150" class="figure" src="https://unpkg.com/@vkid/sdk@0.0.1-alpha/logo.svg"/>
  </h1>
  <p align="center">
    <a href="https://npmjs.com/package/@vkid/sdk">
      <img src="https://img.shields.io/badge/stability-beta-red">
    </a>
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

:information_source: VK ID SDK сейчас находится в бета-тестировании. О проблемах вы можете сообщить с помощью <a href="https://github.com/VKCOM/vkid-web-sdk/issues">issues репозитория</a>.

---

## Установка

**NPM:**

```sh
npm i @vkid/sdk
```

**YARN:**

```sh
yarn add @vkid/sdk
```

**PNPM:**

```sh
pnpm add @vkid/sdk
```

**CDN:**

```html
<script src="https://unpkg.com/@vkid/sdk@latest/dist-sdk/umd/index.js"></script>
```

> Обратите внимание: Для работы авторизации нужен APP_ID. Вы получите его, когда [создадите](https://id.vk.com/business/go/docs/ru/vkid/latest/vk-id/connection/create-application) приложение в кабинете подключения VK ID.

## Пример

<details>
  <summary>Базовая авторизация</summary>

```javascript
import * as VKID from '@vkid/sdk';

VKID.Config.set({
  app: APP_ID,
  redirectUrl: 'https://example.com'
});


const authButton = document.createElement('button');
authButton.onclick = () => {
  VKID.Auth.login(); // После авторизации будет редирект на адрес, указанный в параметре redirect_uri
};

document.getElementById('container').appendChild(authButton);
```
</details>

<details>
  <summary>OneTap</summary>

```javascript
import * as VKID from '@vkid/sdk';

VKID.Config.set({
  app: APP_ID,
  redirectUrl: 'https://example.com'
});

const oneTap = new VKID.OneTap();

const container = document.getElementById('VkIdSdkOneTap');

if (container) {
  oneTap.render({ container });
}
```
</details>

## Документация

- [Что такое VK ID](https://id.vk.com/business/go/docs/ru/vkid/latest/vk-id/intro/start-page)
- [Создание приложения](https://id.vk.com/business/go/docs/ru/vkid/latest/vk-id/connection/create-application)
- [Требования к дизайну](https://id.vk.com/business/go/docs/ru/vkid/archive/1.60/vk-id/guidelines/design-rules)
- [Спецификация](.wiki/README.md)

## Contributing

Проект VK ID SDK имеет открытый исходный код на GitHub, и вы можете присоединиться к его доработке — мы будем благодарны за внесение улучшений и исправление возможных ошибок.

### Code of Conduct

Если вы собираетесь вносить изменения в проект VK ID SDK, следуйте правилам [разработки](CODE_OF_CONDUCT.md). Они помогут понять, какие действия возможны, а какие недопустимы.

### Contributing Guide

В [руководстве](CONTRIBUTING.md) вы можете подробно ознакомиться с процессом разработки и узнать, как предлагать улучшения и исправления, а ещё — как добавлять и тестировать свои изменения в VK ID SDK.
Также рекомендуем ознакомиться с общими [правилами оформления кода](CODE_STYLE.md) в проекте.
