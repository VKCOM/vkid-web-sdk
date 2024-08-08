import type { AuthError, AuthParams } from '#/auth';
import { AuthStatsFlowSource } from '#/auth/types';
import { ProductionStatsEventScreen } from '#/core/analytics';
import { ConfigAuthMode } from '#/core/config';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isNotEmptyOAuthList, validator } from '#/core/validator';
import { Widget, WidgetEvents } from '#/core/widget';
import { WidgetErrorCode, WidgetState } from '#/core/widget/types';
import { Languages, Scheme } from '#/types';
import { MultibrandingButtonTapParams, MultibrandingOauthParamsScreen } from '#/widgets/oauthList/analytics/types';

import { MultibrandingStatsProviders, OAuthListStatsCollector } from './analytics';
import { OAuthListInternalEvents } from './events';
import { getOAuthListTemplate } from './template';
import { OAuthListParams, OAuthName } from './types';

export class OAuthList extends Widget<OAuthListParams> {
  private readonly analytics: OAuthListStatsCollector;
  private providers: OAuthName[];
  private flowSource: MultibrandingOauthParamsScreen;
  private uniqueSessionId: string;

  public constructor() {
    super();
    this.analytics = new OAuthListStatsCollector(this.config);
  }

  private sendStartAnalytics() {
    const providers = new Set(this.providers);
    this.analytics.sendMultibrandingOauthAdded({
      screen: this.flowSource,
      fields: [{
        name: MultibrandingStatsProviders.VK,
        value: (+providers.has(OAuthName.VK)).toString(),
      }, {
        name: MultibrandingStatsProviders.OK,
        value: (+providers.has(OAuthName.OK)).toString(),
      }, {
        name: MultibrandingStatsProviders.MAIL,
        value: (+providers.has(OAuthName.MAIL)).toString(),
      }],
    });

    if (providers.has(OAuthName.VK)) {
      this.analytics.sendVkButtonShow({
        screen: this.flowSource,
        isIcon: providers.size > 1,
      });
    }

    if (providers.has(OAuthName.OK)) {
      this.analytics.sendOkButtonShow({
        screen: this.flowSource,
        isIcon: providers.size > 1,
      });
    }

    if (providers.has(OAuthName.MAIL)) {
      this.analytics.sendMailButtonShow({
        screen: this.flowSource,
        isIcon: providers.size > 1,
      });
    }
  }

  @validator<OAuthListParams>({ oauthList: [isNotEmptyOAuthList] })
  public render(params: OAuthListParams): this {
    this.lang = params?.lang || Languages.RUS;
    this.scheme = params?.scheme || Scheme.LIGHT;
    this.providers = params.oauthList;
    this.flowSource = params?.flowSource || ProductionStatsEventScreen.MULTIBRANDING;
    this.uniqueSessionId = params?.uniqueSessionId || this.id;

    this.analytics.setUniqueSessionId(this.uniqueSessionId);

    this.templateRenderer = getOAuthListTemplate({
      lang: this.lang,
      oauthList: params.oauthList,
      height: params.styles?.height,
      borderRadius: params.styles?.borderRadius,
      scheme: this.scheme,
    });
    this.container = params.container;
    this.renderTemplate();
    this.registerElements();
    this.setState(WidgetState.LOADED);
    this.sendStartAnalytics();
    this.elements.root.addEventListener('click', this.handleClick.bind(this));

    return this;
  }

  private handleClick(e: Event) {
    const target = (e.target as HTMLElement).closest('[data-oauth]');
    if (!target) {
      return;
    }

    const oauth = target.getAttribute('data-oauth') as OAuthName;

    const params: AuthParams = {
      lang: this.lang,
      scheme: this.scheme,
      provider: oauth,
      statsFlowSource: AuthStatsFlowSource.MULTIBRANDING,
      uniqueSessionId: this.uniqueSessionId,
    };

    let sendProviderButtonTap: (params: MultibrandingButtonTapParams) => Promise<unknown>;

    switch (oauth) {
      case OAuthName.VK:
        sendProviderButtonTap = this.analytics.sendVkButtonTap.bind(this.analytics);
        break;
      case OAuthName.OK:
        sendProviderButtonTap = this.analytics.sendOkButtonTap.bind(this.analytics);
        break;
      case OAuthName.MAIL:
        sendProviderButtonTap = this.analytics.sendMailButtonTap.bind(this.analytics);
        break;
    }

    const openFullAuth = () => {
      OAuthList.auth.login(params)
        .then((res) => {
          this.events.emit(OAuthListInternalEvents.LOGIN_SUCCESS, res);
        })
        .catch((error: AuthError) => {
          this.events.emit(WidgetEvents.ERROR, {
            code: WidgetErrorCode.AuthError,
            text: error.error,
          });
        });
    };

    const sendProviderButtonTapParams = {
      screen: this.flowSource,
      isIcon: this.providers.length > 1,
    };

    if (this.config.get().mode === ConfigAuthMode.Redirect) {
      sendProviderButtonTap(sendProviderButtonTapParams).finally(openFullAuth);
    } else {
      void sendProviderButtonTap(sendProviderButtonTapParams);
      openFullAuth();
    }
  }
}
