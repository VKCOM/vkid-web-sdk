# Change Log

## 2.3.2

### Исправления
- Исправления внутренней работы SDK.

## 2.3.1

### Исправления
- Исправлен логотип `Почты Mail`.

## 2.3.0

### Новое
- Поддержан ребрендинг `Почты Mail`.
- Поддержана доступность цветов в [шторке авторизации](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-drawer/floating-onetap-web).

### Исправления
- Правильное отображение [кнопки One Tap](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-button/onetap-web) при установке значения `borderRadius: 0`.
- Правильное отображение [виджета 3 в 1](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/widget-3-1/three-in-one-web) при установке значения `borderRadius: 0`.

## 2.2.0

### Новое
- Добавлена возможность открыть авторизацию в новом окне для всех модулей.
- Добавлена возможность менять текста в [кнопке One Tap](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-button/onetap-web).
- Добавлен новый сценарий "Быстрая регистрация" в [шторку авторизации](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/elements/onetap-drawer/floating-onetap-web). 

## 2.1.0

### Новое
- В AuthResponse добавлен параметр expires_in, показывающий срок жизни кода авторизации в секундах

### Исправления
- Исправлена проверка state в случаях, когда нельзя устанавливать куки на домен

## 2.0.0

### Новое
- Поддержка авторизации по протоколу OAuth 2.1
- Поддержка входа через аккаунты Одноклассников и Mail
- В oneTap и floatingOneTap добавлен параметр fastAuthEnabled, отвечающий за отображение кнопки "Продолжить как"

### Исправления
- Breaking changes: изменения в публичных интерфейсах AuthResponse, Config.
- Убран модуль AgreementsDialog
- Исправлена ошибка, возникающая при наличии query параметров в redirectUrl

## 2.0.0-alpha.3

### Исправления
- Исправлена ошибка, возникающая при наличии query параметров в redirectUrl

## 2.0.0-alpha.2

### Новое
- В oneTap и floatingOneTap добавлен параметр fastAuthEnabled, отвечающий за отображение кнопки "Продолжить как"

### Исправления
- Убран модуль AgreementsDialog
- В refreshToken больше не передается scope

## 2.0.0-alpha

### Новое
- Поддержка авторизации по протоколу OAuth 2.1
- Поддержка входа через аккаунты Одноклассников и Mail
### Исправления
- Breaking changes: изменения в публичных интерфейсах AuthResponse, Config.

## 1.1.0

### Новое
- Добавлена возможность открытия авторизации в новой вкладке для всех модулей.

### Исправления
- Исправлен конфликт `css tokens`, который приводил к некорректному отображению стилей.

## 1.0.3

### Исправления
- Исправлены текста в [шторке авторизации](https://id.vk.com/business/go/docs/ru/vkid/latest/vk-id/connection/web/auth)
- Исправлено падение сборки в проектах не использующих babel

## 1.0.2

### Исправления
- Исправлено изменение высоты в [шторке авторизации](https://id.vk.com/business/go/docs/ru/vkid/latest/vk-id/connection/web/auth)

## 1.0.1

### Исправления 
- Исправлен возврат параметра `uuid` для [базовой авторизации](https://id.vk.com/business/go/docs/ru/vkid/latest/vk-id/connection/web/auth)
- Корректное открытие авторизации при клике на "Войти в другой аккаунт" в [авторизации по кнопке One Tap](https://id.vk.com/business/go/docs/ru/vkid/latest/vk-id/connection/web/onetap) и [авторизации с помощью шторки One Tap](https://id.vk.com/business/go/docs/ru/vkid/latest/vk-id/connection/web/onetap)

## 1.0.0

### Новое

- Добавлена [базовая авторизация](https://id.vk.com/business/go/docs/ru/vkid/latest/vk-id/connection/web/auth)
- Добавлена [авторизация по кнопке One Tap](https://id.vk.com/business/go/docs/ru/vkid/latest/vk-id/connection/web/onetap)
- Добавлена [авторизация с помощью шторки One Tap](https://id.vk.com/business/go/docs/ru/vkid/latest/vk-id/connection/web/onetap)
