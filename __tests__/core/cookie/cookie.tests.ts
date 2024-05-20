import { Config } from '#/index';
import { clearCodeVerifierCookie, clearStateCookie, codeVerifier, state } from '#/utils/cookie';

const APP_ID = 100;

describe('Cookie', () => {
  beforeEach(() => {
    Config.init({ app: APP_ID, redirectUrl: 'test' });

    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'Cookie')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  it('Should set default state and codeVerifier cookies', () => {
    expect(state()).toBe('nanoid');
    expect(codeVerifier()).toBe('nanoid');
  });

  it('Should set custom state and codeVerifier cookies', () => {
    const CUSTOM_TEXT = 'custom text';

    state(CUSTOM_TEXT);
    codeVerifier(CUSTOM_TEXT);

    expect(state()).toBe(CUSTOM_TEXT);
    expect(codeVerifier()).toBe(CUSTOM_TEXT);
  });

  it('Should clear state and codeVerifier cookies', () => {
    expect(state()).toBeTruthy();
    expect(codeVerifier()).toBeTruthy();

    clearStateCookie();
    clearCodeVerifierCookie();

    expect(document.cookie).toBeFalsy();
  });
});
