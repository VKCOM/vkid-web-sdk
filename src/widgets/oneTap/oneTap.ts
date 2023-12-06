import { AuthParams } from '#/auth/types';
import { BridgeMessage } from '#/core/bridge';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isValidHeight, validator } from '#/core/validator';
import { Widget, WidgetEvents } from '#/core/widget';
import { WidgetState } from '#/core/widget/types';
import { Languages, Scheme } from '#/types';
import { AgreementsDialog } from '#/widgets/agreementsDialog/agreementsDialog';
import { AgreementsDialogPublicEvents } from '#/widgets/agreementsDialog/events';

import { OneTapInternalEvents } from './events';
import { getOneTapTemplate } from './template';
import { OneTapParams, OneTapStyles } from './types';

const defaultStylesParams: Required<OneTapStyles> = {
  width: 0,
  height: 44,
  borderRadius: 8,
};

const BUTTON_SPACING = 12;

export class OneTap extends Widget<OneTapParams> {
  protected vkidAppName = 'button_one_tap_auth';

  protected onBridgeMessageHandler(event: BridgeMessage<OneTapInternalEvents | WidgetEvents>) {
    switch (event.handler) {
      // TODO: hidePreloadButton на событие ошибки
      case OneTapInternalEvents.LOGIN_SUCCESS: {
        this.redirectWithPayload(event.params);
        break;
      }
      case OneTapInternalEvents.SHOW_FULL_AUTH: {
        const params: Partial<AuthParams> = {};
        if (event.params.screen) {
          params.screen = event.params.screen;
        }
        this.openFullAuth(params);
        break;
      }
      case OneTapInternalEvents.NOT_AUTHORIZED: {
        this.setState(WidgetState.NOT_LOADED);
        clearTimeout(this.timeoutTimer);
        this.elements?.iframe?.remove();
        break;
      }
      case OneTapInternalEvents.SHOW_AGREEMENTS_DIALOG: {
        this.createAgreementsDialogWidget();
        break;
      }
      default: {
        super.onBridgeMessageHandler(event);
        break;
      }
    }
  }

  private createAgreementsDialogWidget() {
    const params = {
      container: document.body,
      lang: this.lang,
      scheme: this.scheme,
    };
    const agreementsDialog = new AgreementsDialog();
    const acceptHandler = (event: BridgeMessage<AgreementsDialogPublicEvents & WidgetEvents>) => {
      this.bridge.sendMessage({
        handler: OneTapInternalEvents.START_AUTHORIZE,
        params: event.params,
      });
      agreementsDialog.off(AgreementsDialogPublicEvents.ACCEPT, acceptHandler);
      agreementsDialog.close();
    };

    agreementsDialog.on(AgreementsDialogPublicEvents.ACCEPT, acceptHandler);
    agreementsDialog.render(params);
  }

  private openFullAuth(value?: AuthParams) {
    const params = {
      ...value,
      lang: this.lang,
      scheme: this.scheme,
    };
    OneTap.__auth.login(params);
  }

  @validator<OneTapParams>({ styles: [isValidHeight] })
  public render(params: OneTapParams) {
    this.lang = params?.lang || Languages.RUS;
    this.scheme = params?.scheme || Scheme.LIGHT;

    const oneTapParams: Record<string, any> = {
      style_height: params.styles?.height || defaultStylesParams.height,
      style_border_radius: params.styles?.borderRadius || defaultStylesParams.borderRadius,
      show_alternative_login: params?.showAlternativeLogin ? 1 : 0,
      button_skin: params.skin || 'primary',
      scheme: this.scheme,
      lang_id: this.lang,
    };

    this.templateRenderer = getOneTapTemplate({
      width: params.styles?.width || defaultStylesParams.width,
      iframeHeight: oneTapParams.show_alternative_login ? oneTapParams.style_height * 2 + BUTTON_SPACING : oneTapParams.style_height,
      height: oneTapParams.style_height,
      borderRadius: oneTapParams.style_border_radius,
      openFullAuth: this.openFullAuth.bind(this),
      skin: oneTapParams.button_skin,
      scheme: oneTapParams.scheme,
      lang: oneTapParams.lang_id,
    });

    return super.render({ container: params.container, ...oneTapParams });
  }
}
