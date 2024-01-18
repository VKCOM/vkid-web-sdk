import { AuthParams } from '#/auth/types';
import { BridgeMessage } from '#/core/bridge';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isRequired, validator } from '#/core/validator';
import { Widget, WidgetEvents } from '#/core/widget';
import { WidgetState } from '#/core/widget/types';
import { Languages, Scheme } from '#/types';
import { AgreementsDialog } from '#/widgets/agreementsDialog/agreementsDialog';
import { AgreementsDialogInternalEvents } from '#/widgets/agreementsDialog/events';
import { OAuthList, OAuthListParams, OAuthName } from '#/widgets/oauthList';

import { FloatingOneTapInternalEvents } from './events';
import { getFloatingOneTapTemplate } from './template';
import { FloatingOneTapContentId, FloatingOneTapIndent, FloatingOneTapParams } from './types';

const defaultIndent: Required<FloatingOneTapIndent> = {
  top: 12,
  right: 12,
  bottom: 12,
};

export class FloatingOneTap extends Widget<Omit<FloatingOneTapParams, 'appName'>> {
  protected vkidAppName = 'floating_one_tap_auth';

  protected onBridgeMessageHandler(event: BridgeMessage<FloatingOneTapInternalEvents | WidgetEvents>) {
    switch (event.handler) {
      case FloatingOneTapInternalEvents.LOGIN_SUCCESS: {
        this.redirectWithPayload(event.params);
        break;
      }
      case FloatingOneTapInternalEvents.SHOW_FULL_AUTH: {
        const params: Partial<AuthParams> = {};
        if (event.params.screen) {
          params.screen = event.params.screen;
        }
        if (event.params.sdk_oauth) {
          params.action = { name: 'sdk_oauth', params: { oauth: event.params.sdk_oauth } };
        }
        this.openFullAuth(params);
        break;
      }
      case FloatingOneTapInternalEvents.NOT_AUTHORIZED: {
        this.setState(WidgetState.NOT_LOADED);
        setTimeout(() => {
          // Ожидает выполнение анимации и меняет ui
          this.setState(WidgetState.LOADED);
        }, 500);
        clearTimeout(this.timeoutTimer);
        break;
      }
      case FloatingOneTapInternalEvents.SHOW_AGREEMENTS_DIALOG: {
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
    const acceptHandler = (event: BridgeMessage<AgreementsDialogInternalEvents & WidgetEvents>) => {
      this.bridge.sendMessage({
        handler: FloatingOneTapInternalEvents.START_AUTHORIZE,
        params: event.params,
      });
      agreementsDialog.off(AgreementsDialogInternalEvents.ACCEPT, acceptHandler);
      agreementsDialog.close();
    };

    agreementsDialog.on(AgreementsDialogInternalEvents.ACCEPT, acceptHandler);
    agreementsDialog.render(params);
  }

  private openFullAuth(value?: AuthParams) {
    const params = {
      ...value,
      lang: this.lang,
      scheme: this.scheme,
    };
    FloatingOneTap.__auth.login(params);
  }

  private renderOAuthList(params: OAuthListParams) {
    if (!params.oauthList.length) {
      return;
    }
    const oauthList = new OAuthList();
    oauthList.render(params);
  }

  @validator<FloatingOneTapParams>({ appName: [isRequired] })
  public render(params: FloatingOneTapParams) {
    this.lang = params?.lang || Languages.RUS;
    this.scheme = params?.scheme || Scheme.LIGHT;
    const providers = (params.oauthList || []).filter((provider) => provider !== OAuthName.VK);

    const queryParams: Record<string, any> = {
      scheme: this.scheme,
      lang_id: this.lang,
      show_alternative_login: params?.showAlternativeLogin ? 1 : 0,
      content_id: params?.contentId || FloatingOneTapContentId.SIGN_IN_TO_SERVICE,
      providers: providers.join(','),
    };

    this.templateRenderer = getFloatingOneTapTemplate({
      openFullAuth: this.openFullAuth.bind(this),
      close: this.close.bind(this),
      scheme: this.scheme,
      lang: this.lang,
      indent: Object.assign(defaultIndent, params.indent || {}),
      contentId: queryParams.content_id,
      appName: params.appName,
      renderOAuthList: this.renderOAuthList.bind(this),
      providers,
    });

    return super.render({ container: document.body, ...queryParams });
  }
}
