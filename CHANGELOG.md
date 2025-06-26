# Changelog

## Изменения Web VK ID SDK
### 2.6.0 (25-06-2025)

#### Added
+ Добавили окно подписки на сообщество — с его помощью вы можете предложить пользователю после авторизации в сервисе подписаться на ваше сообщество ВКонтакте. Подписка на сообщество позволяет выстраивать прямой контакт с аудиторией и даёт бизнесу ряд преимуществ, например рост органического трафика за счёт вовлечения аудитории ВКонтакте, возможность информировать подписчиков о новостях, акциях и обновлениях. Подробнее о подключении окна подписки читайте в [документации](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/group-subscription/group-subscription-web).
### 2.5.2 (12-03-2025)

#### Fixed
+ Исправлено отображение иконки VK ID в обновлённой версии шторки авторизации.
### 2.5.1 (11-03-2025)

#### Changed
+ Обновлен текст в виджете «Mail», когда он используется как единственный дополнительный способ схода. Теперь в кнопке авторизации с помощью Mail используется текст «Войти с Mail». 
+ Сделали небольшой редизайн в SDK: теперь шторка авторизации выглядит более акцентно.
### 2.5.0 (18-02-2025)

#### Fixed
+ Поработали над внутренними улучшениями SDK.
### 2.4.1 (13-01-2025)

#### Changed
+ Ранее, если у сайта был домен, на который браузер не может установить cookie (publicsuffix-домен), авторизация могла завершаться с ошибкой обмена кода на токены из-за разных codeVerifier. Теперь в таких случаях при авторизации в режиме callback — responseMode: VKID.ConfigResponseMode.Callback — параметр codeVerifier будет сохраняться в переменную для обеспечения доступа к нему.

### 2.4.0 (22-10-2024)

#### Added
+ [VK ID SDK] Для новых пользователей сервиса авторизации добавили возможность подключения аналитики MyTracker. С ней вы сможете изучать аналитику данных по пользователям, которые выполнили вход в приложение через VK ID: получать наглядные отчёты, анализировать поведение аудитории и оптимизировать свои маркетинговые стратегии. 

#### Fixed
+ [VK ID SDK] Исправлено написание буквы _с_ в тексте «Войти с VK ID» кнопки One Tap: теперь используется буква русского алфавита, а не латинского. 

### 2.3.3 (09-10-2024)

#### Fixed

- Поработали над внутренними улучшениями SDK.

### 2.3.2 (10-09-2024)

#### Fixed

- Поработали над внутренними улучшениями SDK.
  <br />

### 2.3.1 (09-09-2024)

#### Fixed

- Исправлено отображение логотипа Почты Mail на экранах SDK. Теперь логотип выглядит корректно.
  <br />

### 2.3.0 (27-08-2024)

#### Changed

- Поддержали ребрендинг Почты Mail: в SDK обновлены все экраны с логотипом Почты, а также изменено название сервиса с Mail.ru на Mail. Доработки в коде из-за ребрендинга не требуются.
- Поддержали доступность цветов в [шторке авторизации](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-drawer/floating-onetap-web).

#### Fixed

- Ранее, если для скругления [кнопки One Tap](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-button/onetap-web) вы устанавливали значение `borderRadius: 0`, она могла отображаться некорректно. Исправлено. Теперь при отсуствии скругления кнопка отображается правильно.
- Исправления со скруглением, аналогичные кнопке One Tap, сделаны для [виджета 3 в 1](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/widget-3-1/three-in-one-web).
  <br />

### 2.2.0 (08-08-2024)

#### Added

- Для всех модулей — кнопки One Tap, шторки авторизации, виджета 3 в 1, пользовательской кнопки — добавлена возможность открыть [авторизацию в новом окне](https://vkcom.github.io/vkid-web-sdk/docs/enums/core_config.ConfigAuthMode.html).
- Добавлена возможность выбрать текст кнопки One Tap, который увидит пользователь. Это позволяет адаптировать кнопку для разных сценариев — например, для получения услуги отобразить текст «Записаться с VK ID» . Подробнее о настройке текста в кнопке читайте в [документации](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-button/onetap-web).
- Добавлен сценарий «Быстрая регистрация» в [шторку авторизации](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-drawer/floating-onetap-web). Если вы используете его, в заголовке шторки будет отображаться текст «Быстрая регистрация в `название сервиса`».
  <br />

### 2.1.0 (24-07-2024)

#### Added

- Для удобства в [AuthResponse](https://vkcom.github.io/vkid-web-sdk/docs/interfaces/auth.AuthResponse.html) добавлен параметр `expires_in`, который показывает срок жизни кода авторизации в секундах.

#### Fixed

- Исправлена проверка `state` в случаях, когда нельзя устанавливать cookie на домен.
  <br />

### 2.0.0 (25-06-2024)

#### Added

- [VK ID](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/intro/plan) теперь поддерживает авторизацию по [протоколу OAuth 2.1](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-10). За счет работы авторизации на передовом стандарте обеспечивается высокая защита пользовательских данных. <br />
- Для пользователя добавлена возможность входа через аккаунты «Одноклассников» и Mail.ru. Для отображения кнопок входа через эти сервисы интегрируйте [виджет 3 в 1](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/intro/main#Vidzhet-3-v-1) — блок с кнопками будет располагаться на окне авторизации вашего сервиса — или подключите [дополнительные OAuth](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/intro/main#Podklyuchenie-dopolnitelnyh-OAuth) — для показа кнопок на окне авторизации VK ID. <br />
  Если у вас уже подключена авторизация с «Одноклассниками» или Mail.ru с использованием запросов back-2-back и вы хотите заменить ее на виджет OAuth, воспользуйтесь [инструкцией по миграции на новый сервис авторизации](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/migration/migration-to-three-in-one).
- В классы **OneTap** и **FloatingOneTap** добавлен параметр `fastAuthEnabled`, который отвечает за отображение кнопки **Продолжить как (имя пользователя)**. Если параметр принимает значение false, то быстрая авторизация отключается: фото профиля и имя пользователя не подтягиваются. При этом если пользователь нажимает кнопку One Tap, открывается окно аутентификации. Подробнее о параметре читайте в разделах документации про [кнопку One Tap](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-button/onetap-web#Spisok-parametrov) или [шторку авторизации](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-drawer/floating-onetap-web#Spisok-parametrov).

#### Breaking changes

- Интерфейсы **AuthResponse**, **Config** изменены. Для перехода с SDK предыдущей версии и поддержки этих изменений воспользуйтесь [инструкцией](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/migration/web/migration-web).

### Исправления
- Breaking changes: изменения в публичных интерфейсах AuthResponse, Config.
- Убран модуль AgreementsDialog
- Исправлена ошибка, возникающая при наличии query параметров в redirectUrl

## 1.1.0

### Новое
- Добавлена возможность открытия авторизации в новой вкладке для всех модулей.

### Исправления
- Исправлен конфликт `css tokens`, который приводил к некорректному отображению стилей.

## 1.0.3

### Исправления
- Исправлены текста в [шторке авторизации](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-drawer/floating-onetap-web)
- Исправлено падение сборки в проектах не использующих babel

## 1.0.2

### Исправления
- Исправлено изменение высоты в [шторке авторизации](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-drawer/floating-onetap-web)

## 1.0.1

### Исправления 
- Исправлен возврат параметра `uuid` для [базовой авторизации](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/custom-button/custom-button-web)
- Корректное открытие авторизации при клике на "Войти в другой аккаунт" в [авторизации по кнопке One Tap](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-button/onetap-web) и [авторизации с помощью шторки One Tap](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-drawer/floating-onetap-web)

## 1.0.0

### Новое

- Добавлена [базовая авторизация](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/custom-button/custom-button-web)
- Добавлена [авторизация по кнопке One Tap](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-button/onetap-web)
- Добавлена [авторизация с помощью шторки One Tap](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-drawer/floating-onetap-web)
