import { Config } from '#/index';
import { DataPolicy } from '#/widgets/dataPolicy';

const APP_ID = 100;

let container: HTMLElement;
let iframeElement: HTMLIFrameElement;

let dataPolicy: DataPolicy;

describe('Data Policy', () => {
  beforeEach(() => {
    Config.set({ app: APP_ID });
    dataPolicy = new DataPolicy();

    container = document.createElement('div', {});
    document.body.append(container);

    dataPolicy.render({ container });
    iframeElement = container.querySelector('iframe') as HTMLIFrameElement;
  });

  afterEach(() => {
    dataPolicy.close();
    container.remove();
  });

  test('check iframe url params', () => {
    expect(iframeElement).toBeTruthy();
    const frameSrc = iframeElement.getAttribute('src');
    expect(frameSrc).toContain('user_data_policy');
  });
});
