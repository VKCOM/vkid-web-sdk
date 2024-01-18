import { BridgeMessage } from '#/core/bridge';
import { BRIDGE_MESSAGE_TYPE_SDK } from '#/core/bridge/bridge';
import { WidgetEvents } from '#/core/widget';
import { Config } from '#/index';
import { AgreementsDialog } from '#/widgets/agreementsDialog';
import {
  AgreementsDialogInternalEvents,
  AgreementsDialogPublicEvents,
} from '#/widgets/agreementsDialog/events';

import { version } from '../../../package.json';

class TestAgreementsDialog extends AgreementsDialog {
  public onBridgeMessageHandler(event: BridgeMessage<AgreementsDialogInternalEvents | WidgetEvents>) {
    super.onBridgeMessageHandler(event);
  }
}

const APP_ID = 100;

let iframeElement: HTMLIFrameElement;
let agreementsDialog: TestAgreementsDialog;

describe('Agreements Dialog', () => {
  beforeEach(() => {
    Config.set({ app: APP_ID, redirectUrl: 'test' });
    agreementsDialog = new TestAgreementsDialog();

    agreementsDialog.render({ container: document.body });
    iframeElement = document.querySelector('iframe') as HTMLIFrameElement;

    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'Agreements Dialog')
      .addLabel('Suite', 'Units');
  });

  afterEach(() => {
    agreementsDialog.close();
  });

  test('Check iframe url params', () => {
    expect(iframeElement).toBeTruthy();

    const frameSrc = iframeElement.getAttribute('src') as string;
    const location = frameSrc.split(/[?&]/);

    const expectArr = [
      expect(location[0]).toEqual('https://id.vk.com/user_policy_agreements'),
      expect(location[1]).toContain('code_challenge=stringified_SHA256-STRING'),
      expect(location[2]).toContain('code_challenge_method=s256'),
      expect(location[3]).toContain('origin=https%3A%2F%2Frnd-service.ru'),
      expect(frameSrc).toContain('uuid'),
      expect(location[5]).toContain(`v=%22${version}%22`),
      expect(location[6]).toContain('sdk_type=vkid'),
      expect(location[7]).toContain('app_id=100'),
      expect(location[8]).toContain('redirect_uri=test'),
    ];

    expect(location.length).toEqual(expectArr.length);
  });

  test('Must close the iframe on the decline event', () => {
    expect(iframeElement).toBeTruthy();

    agreementsDialog.onBridgeMessageHandler({
      type: BRIDGE_MESSAGE_TYPE_SDK,
      handler: AgreementsDialogInternalEvents.DECLINE,
      params: { uuid: 'uuid' },
    });

    expect(document.querySelector('iframe')).toBeFalsy();
  });

  test('Should emit public ACCEPT after internal', () => {
    expect(iframeElement).toBeTruthy();

    const handler = jest.fn();
    agreementsDialog.on(AgreementsDialogPublicEvents.ACCEPT, handler);
    agreementsDialog.onBridgeMessageHandler({
      type: BRIDGE_MESSAGE_TYPE_SDK,
      handler: AgreementsDialogInternalEvents.ACCEPT,
      params: { uuid: 'uuid' },
    });

    expect(handler).toBeCalled();
  });
});
