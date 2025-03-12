import { AuthError, AuthParams, AuthStatsFlowSource } from '#/auth/types';
import { ProductionStatsEventScreen } from '#/core/analytics';
import { ConfigAuthMode } from '#/core/config';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isRequired, validator } from '#/core/validator';
import { Widget, WidgetEvents } from '#/core/widget';
import { WidgetError, WidgetErrorCode, WidgetState } from '#/core/widget/types';
import { Languages, Scheme } from '#/types';
import { RedirectPayload } from '#/utils/url';
import { OAuthList, OAuthListInternalEvents, OAuthListParams, OAuthName } from '#/widgets/oauthList';

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

  private readonly sendSuccessLoginEvent = (params: RedirectPayload) => {
    this.events.emit(FloatingOneTapInternalEvents.LOGIN_SUCCESS, params);
    this.bridge.sendMessage({ handler: FloatingOneTapInternalEvents.LOGIN_SUCCESS, params: {} });
  }

  protected onBridgeMessageHandler(event: FloatingOneTapBridgeMessage) {
    switch (event.handler) {
      case FloatingOneTapInternalEvents.SHOW_FULL_AUTH: {
        const params = event.params as FloatingOneTapBridgeFullAuthParams;
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
      case FloatingOneTapInternalEvents.NOT_AUTHORIZED: {
        this.setState(WidgetState.NOT_LOADED);
        setTimeout(() => {
          // Ожидает выполнение анимации и меняет ui
          this.setState(WidgetState.LOADED);
        }, 500);
        clearTimeout(this.timeoutTimer);
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

  private openFullAuth(value?: AuthParams) {
    const params = {
      statsFlowSource: AuthStatsFlowSource.FLOATING_ONE_TAP,
      ...value,
      uniqueSessionId: this.id,
      lang: this.lang,
      scheme: this.scheme,
    };

    FloatingOneTap.auth.login(params)
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
      this.analytics.sendNoUserButtonTap()
        .finally(() => {
          this.openFullAuth(value);
        });
    } else {
      void this.analytics.sendNoUserButtonTap();
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
        flowSource: ProductionStatsEventScreen.FLOATING_ONE_TAP,
        uniqueSessionId: this.id,
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
      uuid: this.id,
    };

    this.analytics.setUniqueSessionId(this.id);
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

    this.analytics.sendScreenProceed({
      scheme: this.scheme,
      lang: this.lang,
      contentId: queryParams.content_id,
    });

    if (params.fastAuthEnabled === false) {
      this.analytics.sendNoUserButtonShow();
      queryParams.fastAuthDisabled = true;
    }

    return super.render({ container: document.body, ...queryParams });
  }
}
