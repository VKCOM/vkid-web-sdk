import { Config } from '#/index';
import { Captcha } from '#/widgets/captcha';

const APP_ID = 100;

let container: HTMLElement;
let iframeElement: HTMLIFrameElement;

let captcha: Captcha;

describe('Captcha', () => {
  beforeEach(() => {
    Config.set({ app: APP_ID });
    captcha = new Captcha();

    container = document.createElement('div', {});
    document.body.append(container);

    captcha.render({ container });
    iframeElement = container.querySelector('iframe') as HTMLIFrameElement;
  });

  afterEach(() => {
    captcha.close();
    container.remove();
  });

  test('check iframe url params', () => {
    expect(iframeElement).toBeTruthy();
    const frameSrc = iframeElement.getAttribute('src');
    expect(frameSrc).toContain('auth_captcha');
  });
});
