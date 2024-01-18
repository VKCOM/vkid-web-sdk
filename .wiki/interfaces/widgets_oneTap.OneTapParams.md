[@vkid/sdk - v1.0.2](../README.md) / [Modules](../modules.md) / [widgets/oneTap](../modules/widgets_oneTap.md) / OneTapParams

# Interface: OneTapParams

[widgets/oneTap](../modules/widgets_oneTap.md).OneTapParams

## Hierarchy

- `WidgetParams`

  ↳ **`OneTapParams`**

## Table of contents

### Properties

- [container](widgets_oneTap.OneTapParams.md#container)
- [lang](widgets_oneTap.OneTapParams.md#lang)
- [oauthList](widgets_oneTap.OneTapParams.md#oauthlist)
- [scheme](widgets_oneTap.OneTapParams.md#scheme)
- [showAlternativeLogin](widgets_oneTap.OneTapParams.md#showalternativelogin)
- [skin](widgets_oneTap.OneTapParams.md#skin)
- [styles](widgets_oneTap.OneTapParams.md#styles)

## Properties

### container

• **container**: `HTMLElement`

HTML элемент, в который будет вставлен виджет

#### Inherited from

WidgetParams.container

___

### lang

• `Optional` **lang**: [`Languages`](../enums/types.Languages.md)

Локализация

#### Inherited from

WidgetParams.lang

___

### oauthList

• `Optional` **oauthList**: [`OAuthName`](../enums/widgets_oauthList.OAuthName.md)[]

Список внешних сервисов авторизации

___

### scheme

• `Optional` **scheme**: [`Scheme`](../enums/types.Scheme.md)

Цветовая схема виджета

#### Inherited from

WidgetParams.scheme

___

### showAlternativeLogin

• `Optional` **showAlternativeLogin**: `boolean` \| ``0`` \| ``1``

Отображение кнопки входа другим способом

___

### skin

• `Optional` **skin**: ``"primary"`` \| ``"secondary"``

Стиль отображения кнопки

___

### styles

• `Optional` **styles**: [`OneTapStyles`](widgets_oneTap.OneTapStyles.md)

Настройки внешнего вида
