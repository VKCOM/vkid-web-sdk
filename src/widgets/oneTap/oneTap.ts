import { AuthError, AuthParams, AuthStatsFlowSource } from '#/auth/types';
import { ProductionStatsEventScreen } from '#/core/analytics';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isValidHeight, validator } from '#/core/validator';
import { Widget, WidgetEvents } from '#/core/widget';
import { WidgetError, WidgetErrorCode, WidgetState } from '#/core/widget/types';
import { Languages, Scheme } from '#/types';
import { RedirectPayload } from '#/utils/url';
import { AgreementsDialog, AgreementsDialogBridgeMessage, AgreementsDialogPublicEvents } from '#/widgets/agreementsDialog';
import { AgreementsDialogStatsFlowSource } from '#/widgets/agreementsDialog/types';
import { OAuthList, OAuthListParams, OAuthName } from '#/widgets/oauthList';

import { OneTapStatsButtonType, OneTapStatsCollector } from './analytics';
import { OneTapInternalEvents } from './events';
import { getOneTapTemplate } from './template';
import { OneTapBridgeFullAuthParams, OneTapBridgeMessage, OneTapParams, OneTapStyles } from './types';

const defaultStylesParams: Required<OneTapStyles> = {
  width: 0,
  height: 44,
  borderRadius: 8,
};

const BUTTON_SPACING = 12;

export class OneTap extends Widget<OneTapParams> {
  private readonly analytics: OneTapStatsCollector;
  protected vkidAppName = 'button_one_tap_auth';
  private statsBtnType: OneTapStatsButtonType | null = null;

  public constructor() {
    super();
    this.analytics = new OneTapStatsCollector(OneTap.config);
  }

  private readonly setStatsButtonType = (type: OneTapStatsButtonType) => {
    if (!this.statsBtnType) {
      this.statsBtnType = type;
    }
  }

  protected onBridgeMessageHandler(event: OneTapBridgeMessage) {
    switch (event.handler) {
      // TODO: hidePreloadButton на событие ошибки
      case OneTapInternalEvents.LOGIN_SUCCESS: {
        const params = event.params as RedirectPayload;
        this.redirectWithPayload(params);
        break;
      }
      case OneTapInternalEvents.SHOW_FULL_AUTH: {
        const params = event.params as OneTapBridgeFullAuthParams;
        const authParams: Partial<AuthParams> = {};

        if (params.screen) {
          authParams.screen = params.screen;
          authParams.statsFlowSource = AuthStatsFlowSource.BUTTON_ONE_TAP_ALTERNATIVE;
        }

        if (params.sdk_oauth) {
          authParams.provider = params.sdk_oauth;
        }

        this.openFullAuth(authParams);
        break;
      }
      case OneTapInternalEvents.NOT_AUTHORIZED: {
        this.analytics.sendNoSessionFound();
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
  protected onErrorHandler(error: WidgetError) {
    this.statsBtnType && this.analytics.sendOneTapButtonNoUserShow(this.statsBtnType);
    this.analytics.sendFrameLoadingFailed();
    super.onErrorHandler(error);
  }

  private createAgreementsDialogWidget() {
    const params = {
      container: document.body,
      lang_id: this.lang,
      scheme: this.scheme,
      stats_flow_source: AgreementsDialogStatsFlowSource.BUTTON_ONE_TAP,
    };
    const agreementsDialog = new AgreementsDialog();
    const acceptHandler = (event: AgreementsDialogBridgeMessage) => {
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
      statsFlowSource: AuthStatsFlowSource.BUTTON_ONE_TAP,
      ...value,
      lang: this.lang,
      scheme: this.scheme,
    };

    OneTap.auth.login(params)
      .catch((error: AuthError) => {
        this.events.emit(WidgetEvents.ERROR, {
          code: WidgetErrorCode.AuthError,
          text: error.error,
        });
      });
  }

  private login(value?: AuthParams) {
    this.statsBtnType && this.analytics.sendOneTapButtonNoUserTap(this.statsBtnType)
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
      flowSource: ProductionStatsEventScreen.NOWHERE,
    });
  }

  @validator<OneTapParams>({ styles: [isValidHeight] })
  public render(params: OneTapParams) {
    this.lang = params?.lang || Languages.RUS;
    this.scheme = params?.scheme || Scheme.LIGHT;
    const providers = (params.oauthList || []).filter((provider) => provider !== OAuthName.VK);

    const oneTapParams: Record<string, any> = {
      style_height: params.styles?.height || defaultStylesParams.height,
      style_border_radius: params.styles?.borderRadius || defaultStylesParams.borderRadius,
      show_alternative_login: params?.showAlternativeLogin ? 1 : 0,
      button_skin: params.skin || 'primary',
      scheme: this.scheme,
      lang_id: this.lang,
      providers: providers.join(','),
    };

    this.analytics.sendSdkInit();
    this.templateRenderer = getOneTapTemplate({
      width: params.styles?.width || defaultStylesParams.width,
      iframeHeight: oneTapParams.show_alternative_login ? oneTapParams.style_height * 2 + BUTTON_SPACING : oneTapParams.style_height,
      height: oneTapParams.style_height,
      borderRadius: oneTapParams.style_border_radius,
      login: this.login.bind(this),
      skin: oneTapParams.button_skin,
      scheme: oneTapParams.scheme,
      lang: oneTapParams.lang_id,
      renderOAuthList: this.renderOAuthList.bind(this),
      providers,
      setStatsButtonType: this.setStatsButtonType.bind(this),
    });

    return super.render({ container: params.container, ...oneTapParams });
  }
}
