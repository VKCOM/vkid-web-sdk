[@vkid/sdk - v1.0.2](../README.md) / [Modules](../modules.md) / [widgets/floatingOneTap](../modules/widgets_floatingOneTap.md) / FloatingOneTapParams

# Interface: FloatingOneTapParams

[widgets/floatingOneTap](../modules/widgets_floatingOneTap.md).FloatingOneTapParams

## Hierarchy

- `Omit`<`WidgetParams`, ``"container"``\>

  ↳ **`FloatingOneTapParams`**

## Table of contents

### Properties

- [appName](widgets_floatingOneTap.FloatingOneTapParams.md#appname)
- [contentId](widgets_floatingOneTap.FloatingOneTapParams.md#contentid)
- [indent](widgets_floatingOneTap.FloatingOneTapParams.md#indent)
- [lang](widgets_floatingOneTap.FloatingOneTapParams.md#lang)
- [oauthList](widgets_floatingOneTap.FloatingOneTapParams.md#oauthlist)
- [scheme](widgets_floatingOneTap.FloatingOneTapParams.md#scheme)
- [showAlternativeLogin](widgets_floatingOneTap.FloatingOneTapParams.md#showalternativelogin)

## Properties

### appName

• **appName**: `string`

Имя приложения из конфигурации приложения VK ID

___

### contentId

• `Optional` **contentId**: [`FloatingOneTapContentId`](../enums/widgets_floatingOneTap.FloatingOneTapContentId.md)

Тип отображаемого контента

___

### indent

• `Optional` **indent**: [`FloatingOneTapIndent`](widgets_floatingOneTap.FloatingOneTapIndent.md)

Отступы от границ окна

___

### lang

• `Optional` **lang**: [`Languages`](../enums/types.Languages.md)

Локализация

#### Inherited from

Omit.lang

___

### oauthList

• `Optional` **oauthList**: [`OAuthName`](../enums/widgets_oauthList.OAuthName.md)[]

Список внешних сервисов авторизации

___

### scheme

• `Optional` **scheme**: [`Scheme`](../enums/types.Scheme.md)

Цветовая схема виджета

#### Inherited from

Omit.scheme

___

### showAlternativeLogin

• `Optional` **showAlternativeLogin**: `boolean` \| ``0`` \| ``1``

Отображение кнопки входа другим способом
