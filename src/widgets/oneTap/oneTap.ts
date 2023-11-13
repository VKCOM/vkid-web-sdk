import { BridgeMessage } from '#/core/bridge';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isValidHeight, validator } from '#/core/validator';
import { Widget, WidgetEvents } from '#/core/widget';
import { Languages } from '#/types';
import { AgreementsDialog } from '#/widgets/agreementsDialog/agreementsDialog';
import { AgreementsDialogInternalEvents } from '#/widgets/agreementsDialog/events';

import { OneTapInternalEvents, OneTapPublicEvents } from './events';
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
        this.events.emit(OneTapPublicEvents.LOGIN_SUCCESS, event.params);
        break;
      }
      case OneTapInternalEvents.SHOW_FULL_AUTH: {
        this.events.emit(OneTapPublicEvents.SHOW_FULL_AUTH, event.params);
        this.openFullAuth();
        break;
      }
      case OneTapInternalEvents.NOT_AUTHORIZED: {
        this.setState('not_loaded');
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
    const agreementsDialog = new AgreementsDialog();
    const acceptHandler = (event: BridgeMessage<AgreementsDialogInternalEvents & WidgetEvents>) => {
      this.bridge.sendMessage({
        handler: OneTapInternalEvents.START_AUTHORIZE,
        params: event.params,
      });
      agreementsDialog.off(AgreementsDialogInternalEvents.ACCEPT, acceptHandler);
      agreementsDialog.close();
    };

    agreementsDialog.on(AgreementsDialogInternalEvents.ACCEPT, acceptHandler);
    agreementsDialog.render({ container: document.body });
  }

  private openFullAuth() {
    OneTap.__auth.login()
      .then((data) => {
        this.events.emit(OneTapPublicEvents.LOGIN_SUCCESS, data);
      })
      .catch((error) => {
        this.events.emit(OneTapPublicEvents.LOGIN_FAILED, error);
      });
  }

  @validator<OneTapParams>({ styles: [isValidHeight] })
  public render(params: OneTapParams) {
    const oneTapParams: Record<string, any> = {
      style_height: params.styles?.height || defaultStylesParams.height,
      style_border_radius: params.styles?.borderRadius || defaultStylesParams.borderRadius,
      show_alternative_login: params?.showAlternativeLogin ? 1 : 0,
      button_skin: params.skin || 'primary',
      scheme: params.scheme || 'light',
      lang_id: params.lang || Languages.RUS,
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
