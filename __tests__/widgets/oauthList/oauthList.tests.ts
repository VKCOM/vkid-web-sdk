import { Config, ConfigAuthMode, Languages, OAuthList, OAuthName, Prompt } from '#/index';
import { singleButtonText } from '#/widgets/oauthList/lang';

import { wait } from '../../utils';

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
    Config.init({ app: APP_ID, redirectUrl: 'redirectUrl', codeVerifier: 'codeVerifier', state: 'state', mode: ConfigAuthMode.Redirect });
    oauthList = new OAuthList();

    container = document.createElement('div', {});
    document.body.append(container);

    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'OAuthList')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
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

  test('Should open authorize with correct params', async () => {
    oauthList.render({ container, oauthList: [OAuthName.OK] });
    const vkidButton = container.querySelector('[data-oauth="ok_ru"]') as HTMLDivElement;
    vkidButton.click();
    await wait(0);
    const callArgs: string[] = assignFn.mock.calls[0];
    const searchParams = new URLSearchParams(new URL(callArgs[0]).search);

    expect(searchParams.get('provider')).toEqual('ok_ru');
    expect(searchParams.get('prompt')).toEqual(Prompt.Login);
  });
});
