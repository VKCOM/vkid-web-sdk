import type { Config } from '#/core/config';
import { COMMUNITY_SUBSCRIPTION_ERROR_TEXT } from '#/services/CommunitySubscriptionService/constants';
import { getApiUrl, request } from '#/utils/request';
import {
  CommunitySubscriptionErrorCode,
  CommunitySubscriptionGroupParams,
} from '#/widgets/communitySubscription/types';

import {
  AccountGetProfileShortInfoResponse,
  GetGroupInfoResponse,
  GroupsJoinResponse,
} from './types';

export class CommunitySubscriptionService {
  private readonly config: Config;
  private accessToken: string;
  private groupId: number;

  public constructor(config: Config) {
    this.config = config;
  }

  private sendError(code: CommunitySubscriptionErrorCode, errorData?: any) {
    return Promise.reject({
      code: code,
      error: COMMUNITY_SUBSCRIPTION_ERROR_TEXT[code],
      error_data: errorData,
    });
  }

  public async init({ accessToken, groupId }: {
    accessToken: string;
    groupId: number;
  }) {
    this.accessToken = accessToken;
    this.groupId = groupId;

    let response: Record<string, any> = {};

    try {
      const getProfileShortInfoRes = await this.getProfileShortInfo();
      if ('error' in getProfileShortInfoRes) {
        return this.sendError(CommunitySubscriptionErrorCode.UnknownError, getProfileShortInfoRes.error);
      }
      if (getProfileShortInfoRes.response?.is_service_account) {
        return this.sendError(CommunitySubscriptionErrorCode.IsServiceAccount);
      }
      response.userId = getProfileShortInfoRes.response?.id;

      const getGroupInfoRes = await this.getGroupInfo();
      if ('error' in getGroupInfoRes || !getGroupInfoRes.response?.[0]) {
        return this.sendError(CommunitySubscriptionErrorCode.GroupNotFound);
      }

      const [groups, friends, members] = getGroupInfoRes.response;

      // Groups info
      if (groups && 'groups' in groups && groups.groups.length) {
        const groupInfo = groups.groups?.[0];
        if (groupInfo.is_closed || groupInfo.deactivated) {
          return this.sendError(CommunitySubscriptionErrorCode.GroupClosed);
        }
        if (groupInfo.is_member) {
          return this.sendError(CommunitySubscriptionErrorCode.AlreadyMember);
        }
        if (!('is_member' in groupInfo)) {
          return this.sendError(CommunitySubscriptionErrorCode.ScopeMissing);
        }

        response = {
          ...response,
          description: groupInfo.description,
          groupAvatarUrl: groupInfo.photo_100,
          title: groupInfo.name,
          isVerified: groupInfo.verified,
          membersCount: groupInfo.members_count,
          groupId: groupInfo.id,
        };
      }

      // Friends info
      if (friends && 'items' in friends) {
        const friendsPhotos = friends.items.map((friend) => `${friend.photo_50}&${friend.id}`);

        response = {
          ...response,
          userAvatarUrls: friendsPhotos,
          friendsCount: friends.count,
        };
      }

      // Members info
      if (members && 'items' in members) {
        const membersPhotos = members.items.map((member) => `${member.photo_50}&${member.id}`);

        response = {
          ...response,
          userAvatarUrls: Array.from(new Set([...response.userAvatarUrls || [], ...membersPhotos])),
        };
      }

      return response as CommunitySubscriptionGroupParams;
    } catch (e) {
      return this.sendError(CommunitySubscriptionErrorCode.UnknownError, e);
    }
  }

  public getProfileShortInfo(): Promise<AccountGetProfileShortInfoResponse> {
    const url = getApiUrl('account.getProfileShortInfo', this.config);
    return request(url, { access_token: this.accessToken });
  }

  public getGroupInfo(): Promise<GetGroupInfoResponse> {
    const code = `return [API.groups.getById({"group_ids":"${this.groupId}","fields":"description,verified,members_count"}),API.groups.getMembers({"group_id":"${this.groupId}","filter":"friends","fields":"photo_50","count":3}),API.groups.getMembers({"group_id":"${this.groupId}","fields":"photo_50","count":3})];`;
    const url = getApiUrl('execute', this.config);
    return request(url, { access_token: this.accessToken, code });
  }

  public joinGroup(): Promise<GroupsJoinResponse> {
    const url = getApiUrl('groups.join', this.config);
    return request(url, { access_token: this.accessToken, group_id: this.groupId });
  }
}
