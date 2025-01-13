import { querystring } from '@vkontakte/vkjs';

import { AuthStatsCollector } from '#/auth/analytics/AuthStatsCollector';
import { AuthDataService } from '#/auth/authDataService';
import { Config, ConfigAuthMode, ConfigResponseMode, Prompt } from '#/core/config';
import { clearCodeVerifierCookie, clearStateCookie, codeVerifier as codeVerifierCookie, setExtIdCookie, state } from '#/utils/cookie';
import { isDomainAllowed } from '#/utils/domain';
import { generateCodeChallenge } from '#/utils/oauth';
import { encodeStatsInfo, getRedirectWithPayloadUrl, getVKIDUrl, RedirectPayload } from '#/utils/url';
import { uuid } from '#/utils/uuid';
import { ExternalOAuthName } from '#/widgets/oauthList';

import { AUTH_ERROR_TEXT, OAUTH2_RESPONSE, OAUTH2_RESPONSE_TYPE } from './constants';
import { AuthError, AuthErrorCode, AuthParams, AuthQueryParams, AuthStatsFlowSource, LogoutResult, PublicInfoResult, TokenResult, UserInfoResult } from './types';

const CODE_CHALLENGE_METHOD = 's256';

export class Auth {
  /**
   * @ignore
   */
  public static config: Config;

  private dataService: AuthDataService;

  private opener: Window | null;
  private interval: number;
  private readonly id: string = uuid();
  private readonly analytics: AuthStatsCollector;
  private state: string;
  private codeVerifier: string;

  public constructor() {
    this.analytics = new AuthStatsCollector(Auth.config);
  }

  private readonly close = () => {
    this.opener && this.opener.close();
  }

  private readonly handleMessage = ({ origin, source, data }: MessageEvent) => {
    if (source !== this.opener || !this.opener || !isDomainAllowed(origin)) {
      return;
    }

    this.unsubscribe();

    if (data.payload.error) {
      this.dataService.sendAuthorizationFailed(data.payload.error);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    if (data.action === OAUTH2_RESPONSE + this.state) {
      if (this.state !== data.payload.state) {
        this.dataService.sendStateMismatchError();
      } else {
        setExtIdCookie(data.payload.ext_id);
        delete data.payload.ext_id;
        // Сбрасываем после проверки
        clearStateCookie();
        this.state = '';

        const { responseMode } = Auth.config.get();
        if (responseMode === ConfigResponseMode.Redirect) {
          this.redirectWithPayload(data.payload);
          this.close();
        } else {
          this.dataService.sendSuccessData(data.payload);
        }
      }
      return;
    }

    this.dataService.sendEventNotSupported();
  }

  private readonly handleInterval = () => {
    if (this.opener?.closed) {
      this.unsubscribe();
      this.dataService.sendNewTabHasBeenClosed();
    }
  };

  private readonly subscribe = () => {
    this.interval = window.setInterval(this.handleInterval, 1000);
    window.addEventListener('message', this.handleMessage);
    this.dataService.removeCallback();
  }

  private readonly unsubscribe = () => {
    window.removeEventListener('message', this.handleMessage);
    clearInterval(this.interval);
    this.dataService.setCallback(this.close);
  }

  private readonly loginInNewTab = (url: string) => {
    const opener = window.open(url, '_blank');
    return this.handleWindowOpen(opener);
  }

  private readonly loginInNewWindow = (url: string) => {
    const width = 800;
    const height = 800;
    const top = screen.height / 2 - height / 2;
    const left = screen.width / 2 - width / 2;

    const windowFeatures = `top=${top},left=${left},width=${width},height=${height},location`;

    const opener = window.open(url, '_blank', windowFeatures);
    return this.handleWindowOpen(opener);
  }

  private readonly handleWindowOpen = (opener: Window | null) => {
    this.dataService = new AuthDataService();
    this.opener = opener;

    if (this.opener) {
      this.subscribe();
    } else {
      this.dataService.sendCannotCreateNewTab();
    }

    return this.dataService.value;
  }

  private readonly loginByRedirect = (url: string) => {
    location.assign(url);
    return Promise.resolve();
  }

  public readonly login = (params?: AuthParams) => {
    const config = Auth.config.get();
    const { scope, app, codeChallenge, prompt } = config;
    const flowSource = params?.statsFlowSource || AuthStatsFlowSource.AUTH;
    const sessionId = params?.uniqueSessionId || this.id;

    if (flowSource === AuthStatsFlowSource.AUTH) {
      this.analytics.setUniqueSessionId(sessionId);
    }

    this.codeVerifier = codeVerifierCookie(config.codeVerifier);
    this.state = state(config.state);

    const authorizePrompt = [...prompt as Prompt[]];
    // Если открыто из 3-в-1, добавляем login в начало
    const hasProvider = Object.values(ExternalOAuthName).includes(params?.provider as unknown as ExternalOAuthName);
    if (hasProvider || params?.screen) {
      authorizePrompt.unshift(Prompt.Login);
    }

    const queryParams: AuthQueryParams = {
      lang_id: params?.lang,
      scheme: params?.scheme,
      code_challenge: codeChallenge || generateCodeChallenge(this.codeVerifier),
      code_challenge_method: CODE_CHALLENGE_METHOD,
      client_id: app,
      response_type: OAUTH2_RESPONSE_TYPE,
      scope,
      state: this.state,
      provider: params?.provider,
      prompt: authorizePrompt.join(' ').trim(),
      stats_info: encodeStatsInfo({
        flow_source: flowSource,
        session_id: sessionId,
      }),
    };

    if (config.mode !== ConfigAuthMode.Redirect) {
      if (flowSource === AuthStatsFlowSource.AUTH) {
        void this.analytics.sendCustomAuthStart(params?.provider);
      }
      queryParams.origin = location.protocol + '//' + location.hostname;
    }

    let url = getVKIDUrl('authorize', queryParams, config);

    switch (config.mode) {
      case ConfigAuthMode.InNewWindow:
        return this.loginInNewWindow(url);
      case ConfigAuthMode.InNewTab:
        return this.loginInNewTab(url);
      default: {
        if (flowSource === AuthStatsFlowSource.AUTH) {
          return this.analytics.sendCustomAuthStart(params?.provider).finally(() => {
            void this.loginByRedirect(url);
          });
        }
        return this.loginByRedirect(url);
      }
    }
  }

  protected checkState(stateToCheck: string): AuthError | undefined {
    if (this.state !== stateToCheck) {
      return {
        code: AuthErrorCode.StateMismatch,
        error: AUTH_ERROR_TEXT[AuthErrorCode.StateMismatch],
        state: stateToCheck,
      };
    }
    clearStateCookie();
    this.state = '';
  }

  public exchangeCode(code: string, deviceId: string, codeVerifier?: string) {
    const config = Auth.config.get();
    this.state = state(config.state);

    const queryParams = {
      grant_type: 'authorization_code',
      redirect_uri: config.redirectUrl,
      client_id: config.app,
      code_verifier: codeVerifier || this.codeVerifier || codeVerifierCookie(),
      state: this.state,
      device_id: deviceId,
    };

    const queryParamsString = querystring.stringify(queryParams);

    return fetch(`https://${config.__vkidDomain}/oauth2/auth?${queryParamsString}`, {
      method: 'POST',
      body: new URLSearchParams({ code }),
    })
      .then((res) => this.oauthSectionFetchHandler<Omit<TokenResult, 'id_token'>>(res))
      .then((res) => {
        const checkStateError = this.checkState(res.state);
        if (checkStateError) {
          throw checkStateError;
        }
        // Сбрасываем динамические параметры после обмена кода
        clearCodeVerifierCookie();
        this.codeVerifier = '';
        return res;
      });
  }

  public refreshToken(refreshToken: string, deviceId: string) {
    const config = Auth.config.get();
    this.state = state(config.state);

    const queryParams = {
      grant_type: 'refresh_token',
      redirect_uri: config.redirectUrl,
      client_id: config.app,
      device_id: deviceId,
      state: this.state,
    };

    const queryParamsString = querystring.stringify(queryParams);

    return fetch(`https://${config.__vkidDomain}/oauth2/auth?${queryParamsString}`, {
      method: 'POST',
      body: new URLSearchParams({ refresh_token: refreshToken }),
    })
      .then((res) => this.oauthSectionFetchHandler<TokenResult>(res))
      .then((res) => {
        const checkStateError = this.checkState(res.state);
        if (checkStateError) {
          throw checkStateError;
        }
        Auth.config.update({ state: config.state });
        return res;
      });
  }

  public logout(accessToken: string) {
    const config = Auth.config.get();

    const queryParams = {
      client_id: config.app,
    };

    const queryParamsString = querystring.stringify(queryParams);

    return fetch(`https://${config.__vkidDomain}/oauth2/logout?${queryParamsString}`, {
      method: 'POST',
      body: new URLSearchParams({ access_token: accessToken }),
    })
      .then((res) => this.oauthSectionFetchHandler<LogoutResult>(res));
  }

  public userInfo(accessToken: string) {
    const config = Auth.config.get();

    const queryParams = {
      client_id: config.app,
    };

    const queryParamsString = querystring.stringify(queryParams);

    return fetch(`https://${config.__vkidDomain}/oauth2/user_info?${queryParamsString}`, {
      method: 'POST',
      body: new URLSearchParams({ access_token: accessToken }),
    })
      .then((res) => this.oauthSectionFetchHandler<UserInfoResult>(res));
  }

  public publicInfo(idToken: string) {
    const config = Auth.config.get();

    const queryParams = {
      client_id: config.app,
    };

    const queryParamsString = querystring.stringify(queryParams);

    return fetch(`https://${config.__vkidDomain}/oauth2/public_info?${queryParamsString}`, {
      method: 'POST',
      body: new URLSearchParams({ id_token: idToken }),
    })
      .then((res) => this.oauthSectionFetchHandler<PublicInfoResult>(res));
  }

  protected oauthSectionFetchHandler<T extends object>(res: Response) {
    return res.json().then((resJson: T | AuthError) => {
      if ('error' in resJson) {
        throw resJson;
      }

      return resJson;
    });
  }

  protected redirectWithPayload(payload: RedirectPayload) {
    location.assign(getRedirectWithPayloadUrl(payload, Auth.config));
  }
}
