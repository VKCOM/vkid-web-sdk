import { BridgeMessage } from '#/core/bridge';
import { BRIDGE_MESSAGE_TYPE_SDK } from '#/core/bridge/bridge';
import { WidgetEvents } from '#/core/widget';
import { Config } from '#/index';
import { AgreementsDialog } from '#/widgets/agreementsDialog';
import { AgreementsDialogInternalEvents } from '#/widgets/agreementsDialog/events';

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
    Config.set({ app: APP_ID });
    agreementsDialog = new TestAgreementsDialog();

    agreementsDialog.render({ container: document.body });
    iframeElement = document.querySelector('iframe') as HTMLIFrameElement;
  });

  afterEach(() => {
    agreementsDialog.close();
  });

  test('check iframe url params', () => {
    expect(iframeElement).toBeTruthy();

    const frameSrc = iframeElement.getAttribute('src') as string;
    const location = frameSrc.split(/[?&]/);

    const expectArr = [
      expect(location[0]).toEqual('https://id.vk.com/user_policy_agreements'),
      expect(location[1]).toContain('code_challenge=stringified_SHA256-STRING'),
      expect(location[2]).toContain('code_challenge_method=s256'),
      expect(location[3]).toContain('origin=https%3A%2F%2Frnd-service.ru'),
      expect(frameSrc).toContain('uuid'),
      expect(frameSrc).toContain('v'),
      expect(location[6]).toContain('app_id=100'),
      expect(location[7]).toContain('sdk_type=vkid'),
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
    agreementsDialog.on(AgreementsDialogInternalEvents.ACCEPT, handler);
    agreementsDialog.onBridgeMessageHandler({
      type: BRIDGE_MESSAGE_TYPE_SDK,
      handler: AgreementsDialogInternalEvents.ACCEPT,
      params: { uuid: 'uuid' },
    });

    expect(handler).toBeCalled();
  });
});
