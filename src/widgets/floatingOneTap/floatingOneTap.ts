import { AuthError, AuthParams, AuthStatsFlowSource } from '#/auth/types';
import { ProductionStatsEventScreen } from '#/core/analytics';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isRequired, validator } from '#/core/validator';
import { Widget, WidgetEvents } from '#/core/widget';
import { WidgetError, WidgetErrorCode, WidgetState } from '#/core/widget/types';
import { Languages, Scheme } from '#/types';
import { RedirectPayload } from '#/utils/url';
import { AgreementsDialog, AgreementsDialogPublicEvents, AgreementsDialogBridgeMessage } from '#/widgets/agreementsDialog';
import { AgreementsDialogStatsFlowSource } from '#/widgets/agreementsDialog/types';
import { OAuthList, OAuthListParams, OAuthName } from '#/widgets/oauthList';

import { FloatingOneTapStatsCollector } from './analytics';
import { FloatingOneTapInternalEvents } from './events';
import { getFloatingOneTapTemplate } from './template';
import { FloatingOneTapBridgeFullAuthParams, FloatingOneTapBridgeMessage, FloatingOneTapContentId, FloatingOneTapIndent, FloatingOneTapParams } from './types';

const defaultIndent: Required<FloatingOneTapIndent> = {
  top: 12,
  right: 12,
  bottom: 12,
};

export class FloatingOneTap extends Widget<Omit<FloatingOneTapParams, 'appName'>> {
  private readonly analytics: FloatingOneTapStatsCollector;
  protected vkidAppName = 'floating_one_tap_auth';

  public constructor() {
    super();
    this.analytics = new FloatingOneTapStatsCollector(FloatingOneTap.config);
  }

  protected onBridgeMessageHandler(event: FloatingOneTapBridgeMessage) {
    switch (event.handler) {
      case FloatingOneTapInternalEvents.LOGIN_SUCCESS: {
        const params = event.params as RedirectPayload;
        this.redirectWithPayload(params);
        break;
      }
      case FloatingOneTapInternalEvents.SHOW_FULL_AUTH: {
        const params = event.params as FloatingOneTapBridgeFullAuthParams;
        const authParams: Partial<AuthParams> = {};

        if (params.screen) {
          authParams.screen = params.screen;
          authParams.statsFlowSource = AuthStatsFlowSource.FLOATING_ONE_TAP_ALTERNATIVE;
        }

        if (params.sdk_oauth) {
          authParams.provider = params.sdk_oauth;
        }

        this.openFullAuth(authParams);
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

  protected onErrorHandler(error: WidgetError) {
    this.analytics.sendIframeLoadingFailed();
    this.analytics.sendNoUserButtonShow();
    super.onErrorHandler(error);
  }

  private createAgreementsDialogWidget() {
    const params = {
      container: document.body,
      lang: this.lang,
      scheme: this.scheme,
      stats_flow_source: AgreementsDialogStatsFlowSource.FLOATING_ONE_TAP,
    };
    const agreementsDialog = new AgreementsDialog();
    const acceptHandler = (event: AgreementsDialogBridgeMessage) => {
      this.bridge.sendMessage({
        handler: FloatingOneTapInternalEvents.START_AUTHORIZE,
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
      statsFlowSource: AuthStatsFlowSource.FLOATING_ONE_TAP,
      ...value,
      lang: this.lang,
      scheme: this.scheme,
    };

    FloatingOneTap.auth.login(params)
      .catch((error: AuthError) => {
        this.events.emit(WidgetEvents.ERROR, {
          code: WidgetErrorCode.AuthError,
          text: error.error,
        });
      });
  }

  private login(value?: AuthParams) {
    this.analytics.sendNoUserButtonTap()
      .finally(() => {
        this.openFullAuth(value);
      });
  }

  private renderOAuthList(params: OAuthListParams) {
    if (!params.oauthList.length) {
      return;
    }
    const oauthList = new OAuthList();
    oauthList.render({
      ...params,
      flowSource: ProductionStatsEventScreen.FLOATING_ONE_TAP,
    });
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

    this.analytics.sendSdkInit();
    this.templateRenderer = getFloatingOneTapTemplate({
      login: this.login.bind(this),
      close: this.close.bind(this),
      scheme: this.scheme,
      lang: this.lang,
      indent: Object.assign(defaultIndent, params.indent || {}),
      contentId: queryParams.content_id,
      appName: params.appName,
      renderOAuthList: this.renderOAuthList.bind(this),
      providers,
    });
    this.analytics.sendScreenProcessed({
      scheme: this.scheme,
      lang: this.lang,
      contentId: queryParams.content_id,
    });
    return super.render({ container: document.body, ...queryParams });
  }
}
