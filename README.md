<div align="center">
  <h1 align="center">
    <img width="150" class="figure" src="https://unpkg.com/@vkid/sdk@0.0.1-alpha/logo.svg"/>
  </h1>
  <p align="center">
    <!-- Заменить @vkontakte/superappkit на @vkid/sdk -->
    <a href="LICENSE">
      <img src="https://img.shields.io/npm/l/@vkid/sdk?maxAge=3600">
    </a>
    <a href="https://npmjs.com/package/@vkontakte/superappkit">
      <img src="https://img.shields.io/npm/v/@vkid/sdk/latest.svg?maxAge=3600">
    </a>
    <a href="https://npmjs.com/package/@vkid/sdk">
      <img alt="npm" src="https://img.shields.io/npm/dw/%40vkid%2Fsdk">
    </a>
    <a href="https://npmjs.com/package/@vkid/sdk">
      <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/%40vkid%2Fsdk">
    </a>
  </p>
  <p align="center">
    VK ID SDK — это библиотека для безопасной и удобной авторизации пользователей в вашем сервисе через VK ID.
  </p>
</div>

## Демонстрация

Чтобы изучить возможности VK ID SDK, перейдите на [демо-стенд](https://id.vk.com/about/business/demo)

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

## Пример

```javascript
import * as VKID from '@vkid/sdk';

VKID.Config.set({
  app: APP_ID
});

const handleSuccess = (token) => {
  console.log(token);
}

const authButton = document.createElement('button');
authButton.onclick = () => {
  VKID.Auth.login()
    .then(handleSuccess)
    .catch(console.error);
};

document.getElementById('container')
  .appendChild(authButton);
```

> Обратите внимание: Для работы авторизации нужен APP_ID. Вы получите его, когда [создадите](https://id.vk.com/business/go/docs/vkid/latest/create-application) приложение в кабинете подключения VK ID.

## Документация

- [Что такое VK ID](https://id.vk.com/business/go/docs/vkid/latest/start-page)
- [Создание приложения](https://id.vk.com/business/go/docs/vkid/latest/create-application)
- [Требования к дизайну](https://id.vk.com/business/go/docs/vkid/latest/guidelines/design-rules)
- [Спецификация](.wiki/README.md)

## Contributing

Проект VK ID SDK имеет открытый исходный код на GitHub, и вы можете присоединиться к его доработке — мы будем благодарны за внесение улучшений и исправление возможных ошибок.

### Code of Conduct

Если вы собираетесь вносить изменения в проект VK ID SDK, следуйте правилам [разработки](CODE_OF_CONDUCT.md). Они помогут понять, какие действия возможны, а какие недопустимы.

### Contributing Guide

В [руководстве](CONTRIBUTING.md) вы можете подробно ознакомиться с процессом разработки и узнать, как предлагать улучшения и исправления, а ещё — как добавлять и тестировать свои изменения в VK ID SDK.
Также рекомендуем ознакомиться с общими [правилами оформления кода](CODE_STYLE.md) в проекте.
