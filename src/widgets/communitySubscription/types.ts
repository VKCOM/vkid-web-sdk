import { WidgetParams } from '#/core/widget';
import { GroupsJoinResponse } from '#/services/CommunitySubscriptionService';

import { CommunitySubscriptionStatsCollector } from './analytics';

export interface CommunitySubscriptionGroupParams {
  userAvatarUrls?: string[];
  title: string;
  description: string;
  friendsCount?: number;
  membersCount: number;
  groupAvatarUrl: string;
  isVerified: boolean;
  userId: number;
  groupId: number;
}

export interface CommunitySubscriptionTemplateParams extends Pick<WidgetParams, 'scheme' | 'lang'>, CommunitySubscriptionGroupParams {
  closeWidget: VoidFunction;
  groupsJoin: () => Promise<GroupsJoinResponse>;
  onSuccess: () => void;
  onError: (e: any) => void;
  communitySubscriptionStatsCollector: CommunitySubscriptionStatsCollector;
}

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
}

export type CommunitySubscriptionErrorText = Record<CommunitySubscriptionErrorCode, string>;

export interface CommunitySubscriptionError {
  code: CommunitySubscriptionErrorCode;
  error: CommunitySubscriptionErrorText;
  error_data: any;
}
