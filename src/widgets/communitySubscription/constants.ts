import { CommunitySubscriptionErrorCode, CommunitySubscriptionErrorText } from '#/widgets/communitySubscription/types';

export const COMMUNITY_SUBSCRIPTION_ERROR_TEXT: CommunitySubscriptionErrorText = {
  [CommunitySubscriptionErrorCode.IsServiceAccount]: 'Service user is not allowed to subscribe',
  [CommunitySubscriptionErrorCode.GroupNotFound]: 'Group not found',
  [CommunitySubscriptionErrorCode.GroupClosed]: 'Group is closed for subscription',
  [CommunitySubscriptionErrorCode.AlreadyMember]: 'Already a member',
  [CommunitySubscriptionErrorCode.ScopeMissing]: 'No group scope in AT',
  [CommunitySubscriptionErrorCode.UnknownError]: 'Unknown error',
  [CommunitySubscriptionErrorCode.BadRequest]: 'Bad request',
  [CommunitySubscriptionErrorCode.RemoteLimitReached]: 'Represents the case when user reached the limit of displays that is controlled remotely.\n' +
  'This happens when you haven\'t payed for enough subscriptions.',
};
