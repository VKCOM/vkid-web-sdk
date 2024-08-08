import { AuthError, AuthParams, AuthStatsFlowSource } from '#/auth/types';
import { ProductionStatsEventScreen } from '#/core/analytics';
import { ConfigAuthMode } from '#/core/config';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isValidHeight, validator } from '#/core/validator';
import { Widget, WidgetEvents } from '#/core/widget';
import { WidgetError, WidgetErrorCode, WidgetState } from '#/core/widget/types';
import { Languages, Scheme } from '#/types';
import { RedirectPayload } from '#/utils/url';
import { OAuthList, OAuthListInternalEvents, OAuthListParams, OAuthName } from '#/widgets/oauthList';

import { OneTapStatsButtonType, OneTapStatsCollector } from './analytics';
import { OneTapInternalEvents } from './events';
import { getOneTapTemplate } from './template';
import { OneTapBridgeFullAuthParams, OneTapBridgeMessage, OneTapContentId, OneTapParams, OneTapSkin, OneTapStyles } from './types';

const defaultStylesParams: Required<OneTapStyles> = {
  width: 0,
  height: 44,
  borderRadius: 8,
};

const BUTTON_SPACING = 12;

export class OneTap extends Widget<OneTapParams> {
  private readonly analytics: OneTapStatsCollector;
  protected vkidAppName = 'button_one_tap_auth';
  private statsBtnType: OneTapStatsButtonType;
  private fastAuthDisabled: boolean;

  public constructor() {
    super();
    this.analytics = new OneTapStatsCollector(OneTap.config);
  }

  private readonly setStatsButtonType = (type: OneTapStatsButtonType) => {
    if (!this.statsBtnType) {
      this.statsBtnType = type;
      if (this.fastAuthDisabled) {
        this.statsBtnType && this.analytics.sendOneTapButtonNoUserShow(this.statsBtnType);
      }
    }
  }

  private readonly sendSuccessLoginEvent = (params: RedirectPayload) => {
    this.events.emit(OneTapInternalEvents.LOGIN_SUCCESS, params);
  }

  protected onBridgeMessageHandler(event: OneTapBridgeMessage) {
    switch (event.handler) {
      case OneTapInternalEvents.SHOW_FULL_AUTH: {
        const params = event.params as OneTapBridgeFullAuthParams;
        const authParams: Partial<AuthParams> = {};

        if (params.screen) {
          authParams.screen = params.screen;
        }

        if (params.sdk_oauth) {
          authParams.provider = params.sdk_oauth;
          authParams.statsFlowSource = AuthStatsFlowSource.MULTIBRANDING;
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
      case OneTapInternalEvents.AUTHENTICATION_INFO: {
        this.events.emit(OneTapInternalEvents.AUTHENTICATION_INFO, event.params);
        break;
      }
      default: {
        super.onBridgeMessageHandler(event);
        break;
      }
    }
  }
  protected onErrorHandler(error: WidgetError) {
    this.analytics.sendFrameLoadingFailed();
    this.analytics.sendOneTapButtonNoUserShow(this.statsBtnType);
    super.onErrorHandler(error);
  }

  private openFullAuth(value?: AuthParams) {
    const params = {
      statsFlowSource: AuthStatsFlowSource.BUTTON_ONE_TAP,
      ...value,
      uniqueSessionId: this.id,
      lang: this.lang,
      scheme: this.scheme,
    };

    OneTap.auth.login(params)
      .then(this.sendSuccessLoginEvent)
      .catch((error: AuthError) => {
        this.events.emit(WidgetEvents.ERROR, {
          code: WidgetErrorCode.AuthError,
          text: error.error,
        });
      });
  }

  private login(value?: AuthParams) {
    if (this.config.get().mode === ConfigAuthMode.Redirect) {
      this.analytics.sendOneTapButtonNoUserTap(this.statsBtnType)
        .finally(() => {
          this.openFullAuth(value);
        });
    } else {
      void this.analytics.sendOneTapButtonNoUserTap(this.statsBtnType);
      this.openFullAuth(value);
    }
  }

  private renderOAuthList(params: OAuthListParams) {
    if (!params.oauthList.length) {
      return;
    }
    const oauthList = new OAuthList();
    oauthList
      .on(OAuthListInternalEvents.LOGIN_SUCCESS, this.sendSuccessLoginEvent)
      .render({
        ...params,
        flowSource: ProductionStatsEventScreen.NOWHERE,
        uniqueSessionId: this.id,
      });
  }

  @validator<OneTapParams>({ styles: [isValidHeight] })
  public render(params: OneTapParams) {
    this.lang = params?.lang || Languages.RUS;
    this.scheme = params?.scheme || Scheme.LIGHT;
    this.fastAuthDisabled = params.fastAuthEnabled === false;
    const providers = (params.oauthList || []).filter((provider) => provider !== OAuthName.VK);

    const oneTapParams: Record<string, any> = {
      style_height: params.styles?.height || defaultStylesParams.height,
      style_border_radius: params.styles?.borderRadius || defaultStylesParams.borderRadius,
      show_alternative_login: params?.showAlternativeLogin ? 1 : 0,
      button_skin: params.skin || OneTapSkin.Primary,
      content_id: params?.contentId || OneTapContentId.SIGN_IN,
      scheme: this.scheme,
      lang_id: this.lang,
      providers: providers.join(','),
      uuid: this.id,
    };

    this.analytics.setUniqueSessionId(this.id);
    this.templateRenderer = getOneTapTemplate({
      width: params.styles?.width || defaultStylesParams.width,
      iframeHeight: oneTapParams.show_alternative_login ? oneTapParams.style_height * 2 + BUTTON_SPACING : oneTapParams.style_height,
      height: oneTapParams.style_height,
      borderRadius: oneTapParams.style_border_radius,
      login: this.login.bind(this),
      skin: oneTapParams.button_skin,
      scheme: oneTapParams.scheme,
      lang: oneTapParams.lang_id,
      contentId: oneTapParams.content_id,
      renderOAuthList: this.renderOAuthList.bind(this),
      providers,
      setStatsButtonType: this.setStatsButtonType.bind(this),
    });
    this.analytics.sendScreenProceed({
      scheme: this.scheme,
      lang: this.lang,
      skin: oneTapParams.button_skin,
      contentId: oneTapParams.content_id,
    });

    if (this.fastAuthDisabled) {
      oneTapParams.fastAuthDisabled = true;
    }

    return super.render({ container: params.container, ...oneTapParams });
  }
}
