import { CommunitySubscription, CommunitySubscriptionErrorCode, Config, ConfigAuthMode, WidgetEvents } from '#/index';
import { AccountGetProfileShortInfoResponse, GetGroupInfoResponse } from '#/services/CommunitySubscriptionService';
import { COMMUNITY_SUBSCRIPTION_ERROR_TEXT } from '#/services/CommunitySubscriptionService/constants';

import { wait } from '../../utils';

const APP_ID = 100;
const GROUP_ID = 100;
const AT = 'at';

let communitySubscription: CommunitySubscription;

describe('CommunitySubscription', () => {
  beforeEach(() => {
    Config.init({ app: APP_ID, redirectUrl: 'redirectUrl', codeVerifier: 'codeVerifier', state: 'state', mode: ConfigAuthMode.Redirect });
    communitySubscription = new CommunitySubscription();

    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'CommunitySubscription')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  afterEach(() => {
    communitySubscription.close();
  });

  test('Should send UnknownError if error in getProfileShortInfo', async () => {
    const error = new Error('Test error');
    jest.spyOn(communitySubscription['communitySubscriptionService'], 'getProfileShortInfo').mockRejectedValue(error);

    const errorCallback = jest.fn();
    communitySubscription.on(WidgetEvents.ERROR, errorCallback);
    communitySubscription.render({ groupId: GROUP_ID, accessToken: AT });

    await wait(0);

    expect(errorCallback).toHaveBeenCalledWith(expect.objectContaining({
      code: CommunitySubscriptionErrorCode.UnknownError,
      error: COMMUNITY_SUBSCRIPTION_ERROR_TEXT[CommunitySubscriptionErrorCode.UnknownError],
      error_data: error,
    }));
  });

  test('Should send IsServiceAccount if is_service_account in getProfileShortInfo', async () => {
    const accountGetProfileShortInfoResponse: AccountGetProfileShortInfoResponse = {
      response: { is_service_account: true, id: 0 },
    };
    jest.spyOn(communitySubscription['communitySubscriptionService'], 'getProfileShortInfo').mockResolvedValue(accountGetProfileShortInfoResponse);

    const errorCallback = jest.fn();
    communitySubscription.on(WidgetEvents.ERROR, errorCallback);
    communitySubscription.render({ groupId: GROUP_ID, accessToken: AT });

    await wait(0);

    expect(errorCallback).toHaveBeenCalledWith(expect.objectContaining({
      code: CommunitySubscriptionErrorCode.IsServiceAccount,
      error: COMMUNITY_SUBSCRIPTION_ERROR_TEXT[CommunitySubscriptionErrorCode.IsServiceAccount],
    }));
  });

  test('Should send GroupNotFound if false in getGroupInfo', async () => {
    const accountGetProfileShortInfoResponse: AccountGetProfileShortInfoResponse = {
      response: { is_service_account: false, id: 0 },
    };
    jest.spyOn(communitySubscription['communitySubscriptionService'], 'getProfileShortInfo').mockResolvedValue(accountGetProfileShortInfoResponse);

    const getGroupInfoResponse: GetGroupInfoResponse = {
      response: [false, false, false],
    };
    jest.spyOn(communitySubscription['communitySubscriptionService'], 'getGroupInfo').mockResolvedValue(getGroupInfoResponse);

    const errorCallback = jest.fn();
    communitySubscription.on(WidgetEvents.ERROR, errorCallback);
    communitySubscription.render({ groupId: GROUP_ID, accessToken: AT });

    await wait(0);

    expect(errorCallback).toHaveBeenCalledWith(expect.objectContaining({
      code: CommunitySubscriptionErrorCode.GroupNotFound,
      error: COMMUNITY_SUBSCRIPTION_ERROR_TEXT[CommunitySubscriptionErrorCode.GroupNotFound],
    }));
  });

  test('Should send GroupClosed if is_closed in getGroupInfo', async () => {
    const accountGetProfileShortInfoResponse: AccountGetProfileShortInfoResponse = {
      response: { is_service_account: false, id: 0 },
    };
    jest.spyOn(communitySubscription['communitySubscriptionService'], 'getProfileShortInfo').mockResolvedValue(accountGetProfileShortInfoResponse);

    const getGroupInfoResponse: GetGroupInfoResponse = {
      response: [{
        groups: [{
          is_closed: true,
          name: 'string',
          description: 'string',
          photo_100: 'string',
          members_count: 123,
          is_member: false,
          verified: false,
          id: 123,
        }],
      }, false, false],
    };
    jest.spyOn(communitySubscription['communitySubscriptionService'], 'getGroupInfo').mockResolvedValue(getGroupInfoResponse);

    const errorCallback = jest.fn();
    communitySubscription.on(WidgetEvents.ERROR, errorCallback);
    communitySubscription.render({ groupId: GROUP_ID, accessToken: AT });

    await wait(0);

    expect(errorCallback).toHaveBeenCalledWith(expect.objectContaining({
      code: CommunitySubscriptionErrorCode.GroupClosed,
      error: COMMUNITY_SUBSCRIPTION_ERROR_TEXT[CommunitySubscriptionErrorCode.GroupClosed],
    }));
  });
  test('Should send AlreadyMember if is_member in getGroupInfo',
    async () => {
      const accountGetProfileShortInfoResponse: AccountGetProfileShortInfoResponse = {
        response: { is_service_account: false, id: 0 },
      };
      jest.spyOn(communitySubscription['communitySubscriptionService'], 'getProfileShortInfo').mockResolvedValue(accountGetProfileShortInfoResponse);

      const getGroupInfoResponse: GetGroupInfoResponse = {
        response: [{
          groups: [{
            is_closed: false,
            name: 'string',
            description: 'string',
            photo_100: 'string',
            members_count: 123,
            is_member: true,
            verified: false,
            id: 123,
          }],
        }, false, false],
      };
      jest.spyOn(communitySubscription['communitySubscriptionService'], 'getGroupInfo').mockResolvedValue(getGroupInfoResponse);

      const errorCallback = jest.fn();
      communitySubscription.on(WidgetEvents.ERROR, errorCallback);
      communitySubscription.render({ groupId: GROUP_ID, accessToken: AT });

      await wait(0);

      expect(errorCallback).toHaveBeenCalledWith(expect.objectContaining({
        code: CommunitySubscriptionErrorCode.AlreadyMember,
        error: COMMUNITY_SUBSCRIPTION_ERROR_TEXT[CommunitySubscriptionErrorCode.AlreadyMember],
      }));
    });

  test('Should send ScopeMissing if is_member not in getGroupInfo',
    async () => {
      const accountGetProfileShortInfoResponse: AccountGetProfileShortInfoResponse = {
        response: { is_service_account: false, id: 0 },
      };
      jest.spyOn(communitySubscription['communitySubscriptionService'], 'getProfileShortInfo').mockResolvedValue(accountGetProfileShortInfoResponse);

      const getGroupInfoResponse: GetGroupInfoResponse = {
        response: [{
          groups: [{
            is_closed: false,
            name: 'string',
            description: 'string',
            photo_100: 'string',
            members_count: 123,
            verified: false,
            id: 123,
          }],
        }, false, false],
      };
      jest.spyOn(communitySubscription['communitySubscriptionService'], 'getGroupInfo').mockResolvedValue(getGroupInfoResponse);

      const errorCallback = jest.fn();
      communitySubscription.on(WidgetEvents.ERROR, errorCallback);
      communitySubscription.render({ groupId: GROUP_ID, accessToken: AT });

      await wait(0);

      expect(errorCallback).toHaveBeenCalledWith(expect.objectContaining({
        code: CommunitySubscriptionErrorCode.ScopeMissing,
        error: COMMUNITY_SUBSCRIPTION_ERROR_TEXT[CommunitySubscriptionErrorCode.ScopeMissing],
      }));
    });

  test('Should init and render community subscription', async () => {
    const accountGetProfileShortInfoResponse: AccountGetProfileShortInfoResponse = {
      response: { is_service_account: false, id: 0 },
    };
    jest.spyOn(communitySubscription['communitySubscriptionService'], 'getProfileShortInfo').mockResolvedValue(accountGetProfileShortInfoResponse);

    const getGroupInfoResponse: GetGroupInfoResponse = {
      response: [{
        groups: [{ is_closed: false, name: 'name', description: 'description', photo_100: 'photo_100', members_count: 123, is_member: false, verified: true, id: 123,
        }],
      }, false, false],
    };
    jest.spyOn(communitySubscription['communitySubscriptionService'], 'getGroupInfo').mockResolvedValue(getGroupInfoResponse);

    const errorCallback = jest.fn();
    communitySubscription.on(WidgetEvents.ERROR, errorCallback);
    communitySubscription.render({ groupId: GROUP_ID, accessToken: AT });

    await wait(100);

    expect(errorCallback).not.toHaveBeenCalled();

    // @ts-ignore
    const id = communitySubscription.id;
    const modalElement = document.querySelector('.VkIdSdk_CommunitySubscription_modal_' + id);

    expect(modalElement).not.toBeNull();
    expect(modalElement?.querySelector('.VkIdSdk_CommunitySubscription_heading_text_' + id)?.textContent).toBe('name');
    expect(modalElement?.querySelector('.VkIdSdk_CommunitySubscription_description_' + id)?.textContent).toBe('description');
    expect(modalElement?.querySelector('.VkIdSdk_CommunitySubscription_avatar_img_' + id)?.getAttribute('src')).toBe('photo_100');
    expect(modalElement?.getElementsByTagName('button').length).toBe(2);
  });
});
