import { Config, Languages, OAuthList, OAuthName } from '#/index';
import { singleButtonText } from '#/widgets/oauthList/lang';

const APP_ID = 100;

let container: HTMLElement;
let oauthList: OAuthList;

const assignFn = jest.fn();
const removeEventListenerFn = jest.fn();

describe('OAuthList', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: {
        hash: {
          endsWith: jest.fn(),
          includes: jest.fn(),
        },
        assign: assignFn,
      },
      writable: true,
    });
    window.addEventListener = jest.fn().mockImplementation((event, callback) => {
      if (event === 'DOMContentLoaded') {
        setTimeout(callback, 0);
      }
    });
    window.removeEventListener = removeEventListenerFn;
  });

  beforeEach(() => {
    Config.set({ app: APP_ID });
    oauthList = new OAuthList();

    container = document.createElement('div', {});
    document.body.append(container);

    reporter
      .addLabel('Layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'OAuthList')
      .addLabel('Suite', 'Units');
  });

  afterEach(() => {
    oauthList.close();
    container.remove();
  });

  test('Should render specific oauth list', () => {
    oauthList.render({ container, oauthList: [OAuthName.VK, OAuthName.OK] });
    const oauthItemDivOauthes = Array.prototype.slice.call(container.getElementsByClassName('VkIdSdk_oauth_item'))
      .map((el: HTMLElement) => el.getAttribute('data-oauth') );
    expect(oauthItemDivOauthes).toEqual([OAuthName.VK, OAuthName.OK]);
  });

  test('Should render correct link text in single mode', () => {
    oauthList.render({ container, oauthList: [OAuthName.VK] });
    const linkText = container.querySelector('.VkIdSdk_oauth_button_text')?.innerHTML;
    expect(linkText).toEqual(singleButtonText[Languages.RUS][OAuthName.VK]);
  });

  test('Should render correct single mode', () => {
    oauthList.render({ container, oauthList: [OAuthName.VK] });
    const oauthListDiv = container.querySelector('.VkIdSdk_oauth_list');
    expect(oauthListDiv?.getAttribute('data-single-mode')).not.toBeNull();
  });

  test('Should open auth with correct action', () => {
    oauthList.render({ container, oauthList: [OAuthName.VK] });
    const vkidButton = container.querySelector('[data-oauth="vkid"]') as HTMLDivElement;
    vkidButton.click();
    const action = JSON.stringify({ name: 'sdk_oauth', params: { oauth: 'vkid' } });
    expect(assignFn).toBeCalledWith(expect.stringContaining(`action=${encodeURIComponent(btoa(action))}`));
  });
});
