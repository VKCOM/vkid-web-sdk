import { BridgeMessage } from '#/core/bridge';
import { WidgetParams } from '#/core/widget';

import { CommunitySubscriptionEvents, CommunitySubscriptionInternalEvents } from './events';

export interface CommunitySubscriptionParams extends Omit<WidgetParams, 'container'> {
  /**
   * ID группы, на которую надо подписаться
   */
  groupId: number;

  /**
   * Access Token пользователя, который получен в результате авторизации с доступом groups
   */
  accessToken: string;
}

export enum CommunitySubscriptionErrorCode {
  /**
   * Пользователь не имеет аккаунта ВКонтакте
   */
  IsServiceAccount = 200,

  /**
   * Ошибка при получении данных группы
   */
  GroupNotFound,

  /**
   * Группа закрыта
   */
  GroupClosed,

  /**
   * Пользователь уже подписан на группу
   */
  AlreadyMember,

  /**
   * Access Token был получен без scope 'groups'
   */
  ScopeMissing,

  /**
   * Неизвестная ошибка при выполнении запроса
   */
  UnknownError,
  /**
   * Неправильные параметры в запросе
   */
  BadRequest,
  /**
   * Достигнут лимит показа окна подписки
   */
  RemoteLimitReached,
}

export type CommunitySubscriptionErrorText = Record<CommunitySubscriptionErrorCode, string>;

export interface CommunitySubscriptionError {
  code?: CommunitySubscriptionErrorCode;
  error?: CommunitySubscriptionErrorText;
  error_data?: any;
}

export type CommunitySubscriptionBridgeMessage = BridgeMessage<CommunitySubscriptionEvents | CommunitySubscriptionInternalEvents, CommunitySubscriptionError>;

export type LimitDisplayLocalStorageObjType = Date[];
