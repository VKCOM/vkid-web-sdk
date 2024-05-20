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
import { WINDOW_LOCATION_URL } from '../../constants';

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
    Config.init({ app: APP_ID, redirectUrl: 'test', state: 'state', codeVerifier: 'codeVerifier' });
    agreementsDialog = new TestAgreementsDialog();

    agreementsDialog.render({ container: document.body });
    iframeElement = document.querySelector('iframe') as HTMLIFrameElement;

    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'Agreements Dialog')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  afterEach(() => {
    agreementsDialog.close();
  });

  test('Check iframe url params', () => {
    expect(iframeElement).toBeTruthy();

    const frameSrc = iframeElement.getAttribute('src') as string;
    const location = new URL(frameSrc);
    const searchParams = new URLSearchParams(location.search);

    expect(location.href.split('?')[0]).toEqual('https://id.vk.com/user_policy_agreements');

    const expectArr = [
      expect(searchParams.get('origin')).toEqual(WINDOW_LOCATION_URL),
      expect(searchParams.get('code_challenge')).toEqual('stringified_SHA256-STRING'),
      expect(searchParams.get('code_challenge_method')).toEqual('s256'),
      expect(searchParams.get('v')).toEqual(`\"${version}\"`),
      expect(searchParams.get('sdk_type')).toEqual('vkid'),
      expect(searchParams.get('app_id')).toEqual(APP_ID.toString()),
      expect(searchParams.get('redirect_uri')).toEqual(Config.get().redirectUrl),
      expect(searchParams.get('oauth_version')).toEqual('2'),
      expect(searchParams.get('state')).toEqual(Config.get().state),
    ];

    expect([...new Set(searchParams.keys())].length).toEqual(expectArr.length);
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
