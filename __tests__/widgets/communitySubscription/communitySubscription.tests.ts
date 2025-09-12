import { BRIDGE_MESSAGE_TYPE_SDK } from '#/core/bridge/bridge';
import { CommunitySubscriptionEvents, Config } from '#/index';
import { CommunitySubscription } from '#/widgets/communitySubscription';
import { CommunitySubscriptionBridgeMessage } from '#/widgets/communitySubscription/types';

import { WINDOW_LOCATION_URL } from '../../constants';
import { wait } from '../../utils';

const APP_ID = 100;

let iframeElement: HTMLIFrameElement;
let communitySubscription: TestCommunitySubscription;

const openFn = jest.fn();
const removeEventListenerFn = jest.fn();

class TestCommunitySubscription extends CommunitySubscription {
  public onBridgeMessageHandler(event: CommunitySubscriptionBridgeMessage) {
    super.onBridgeMessageHandler(event);
  }
}

describe('CommunitySubscription', () => {
  beforeAll(() => {
    window.open = openFn;
    window.addEventListener = jest.fn().mockImplementation((event, callback) => {
      if (event === 'DOMContentLoaded') {
        setTimeout(callback, 0);
      }
    });
    window.removeEventListener = removeEventListenerFn;
  });

  beforeEach(() => {
    Config.init({ app: APP_ID, redirectUrl: 'test', state: 'test', codeVerifier: 'codeVerifier' });
    communitySubscription = new TestCommunitySubscription();

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
    localStorage.clear();
  });

  test('Check iframe url params', () => {
    communitySubscription.render({
      groupId: 111111,
      accessToken: 'abc',
    });
    iframeElement = document.body.querySelector('iframe') as HTMLIFrameElement;

    expect(iframeElement).toBeTruthy();

    const frameSrc = iframeElement.getAttribute('src') as string;
    const location = new URL(frameSrc);
    const searchParams = new URLSearchParams(location.search);

    expect(location.href.split('?')[0]).toEqual('https://id.vk.ru/community_subscription');

    const expectArr = [
      expect(searchParams.get('scheme')).toEqual('light'),
      expect(searchParams.get('lang')).toEqual('0'),
      expect(searchParams.get('origin')).toEqual(WINDOW_LOCATION_URL),
      expect(searchParams.get('oauth_version')).toEqual('2'),
      expect(searchParams.get('v')).toBeTruthy(),
      expect(searchParams.get('sdk_type')).toEqual('vkid'),
      expect(searchParams.get('app_id')).toEqual('100'),
      expect(searchParams.get('redirect_uri')).toEqual('test'),

    ];

    expect([...new Set(searchParams.keys())].length).toEqual(expectArr.length);
  });

  test('Must be in a state of loading', async () => {
    communitySubscription.render({
      groupId: 111111,
      accessToken: 'abc',
    });

    const communitySubscriptionEl = document.querySelector('[data-test-id="communitySubscription"]');
    await wait(400);
    expect(communitySubscriptionEl?.getAttribute('data-state')).toEqual('loading');
  });

  test('Must be in a state of loaded', async () => {
    communitySubscription.render({
      groupId: 111111,
      accessToken: 'abc',
    });

    communitySubscription.onBridgeMessageHandler({
      type: BRIDGE_MESSAGE_TYPE_SDK,
      handler: CommunitySubscriptionEvents.Load,
      params: {},
    });

    const communitySubscriptionEl = document.querySelector('[data-test-id="communitySubscription"]');
    await wait(400);
    expect(communitySubscriptionEl?.getAttribute('data-state')).toEqual('loaded');
  });

  test('Must be shown taking into the limit maxSubscriptionsToShow: 0', async () => {
    Config.init({
      app: APP_ID,
      redirectUrl: 'test',
      state: 'test',
      codeVerifier: 'codeVerifier',
      groupSubscriptionsLimit: {
        maxSubscriptionsToShow: 0,
        periodInDays: 0,
      },
    });
    communitySubscription.render({
      groupId: 111111,
      accessToken: 'abc',
    });

    communitySubscription.onBridgeMessageHandler({
      type: BRIDGE_MESSAGE_TYPE_SDK,
      handler: CommunitySubscriptionEvents.Load,
      params: {},
    });

    const communitySubscriptionEl = document.querySelector('[data-test-id="communitySubscription"]'); // Ищем элемент
    await wait(5000);
    expect(communitySubscriptionEl?.getAttribute('data-state')).toEqual('not_loaded');
  });

  test('Must be shown taking into the limit maxSubscriptionsToShow: 1 in 10 days', async () => {
    Config.init({
      app: APP_ID,
      redirectUrl: 'test',
      state: 'test',
      codeVerifier: 'codeVerifier',
      groupSubscriptionsLimit: {
        maxSubscriptionsToShow: 1,
        periodInDays: 10,
      },
    });
    communitySubscription.render({
      groupId: 111111,
      accessToken: 'abc',
    });

    communitySubscription.onBridgeMessageHandler({
      type: BRIDGE_MESSAGE_TYPE_SDK,
      handler: CommunitySubscriptionEvents.Load,
      params: {},
    });

    const communitySubscriptionEl = document.querySelector('[data-test-id="communitySubscription"]'); // Ищем элемент
    await wait(400);
    expect(communitySubscriptionEl?.getAttribute('data-state')).toEqual('loaded');
  });
});
