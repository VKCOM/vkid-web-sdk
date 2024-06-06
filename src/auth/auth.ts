import { querystring } from '@vkontakte/vkjs';

import { AuthDataService } from '#/auth/authDataService';
import { Config, ConfigAuthMode, Prompt } from '#/core/config';
import { clearCodeVerifierCookie, clearStateCookie, codeVerifier, state } from '#/utils/cookie';
import { isDomainAllowed } from '#/utils/domain';
import { generateCodeChallenge } from '#/utils/oauth';
import { getRedirectWithPayloadUrl, getVKIDUrl, RedirectPayload, encodeStatsInfo } from '#/utils/url';
import { ExternalOAuthName } from '#/widgets/oauthList';

import { AUTH_ERROR_TEXT, OAUTH2_RESPONSE, OAUTH2_RESPONSE_TYPE } from './constants';
import {
  AuthError,
  AuthErrorCode,
  AuthParams,
  AuthQueryParams,
  LogoutResult,
  PublicInfoResult,
  TokenResult,
  UserInfoResult,
} from './types';

const CODE_CHALLENGE_METHOD = 's256';

export class Auth {
  /**
   * @ignore
   */
  public static config: Config;

  private dataService: AuthDataService;

  private opener: Window | null;
  private interval: number;

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
    if (data.action === OAUTH2_RESPONSE + state()) {
      if (state() !== data.payload.state) {
        this.dataService.sendStateMismatchError();
      } else {
        this.dataService.sendSuccessData(data.payload);
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
    this.dataService = new AuthDataService();
    this.opener = window.open(url, '_blank');

    if (this.opener) {
      this.subscribe();
    } else {
      this.dataService.sendCannotCreateNewTab();
    }

    return this.dataService.value
      .then((payload) => {
        // Сбрасываем после проверки
        clearStateCookie();
        Auth.config.update({ state: Auth.config.get().state });
        this.redirectWithPayload(payload);
      });
  }

  private readonly loginByRedirect = (url: string) => {
    location.assign(url);
    return Promise.resolve();
  }

  public readonly login = (params?: AuthParams) => {
    const config = Auth.config.get();
    const { scope, app, codeChallenge, prompt } = config;

    codeVerifier(config.codeVerifier);
    state(config.state);

    const authorizePrompt = [...prompt as Prompt[]];
    // Если открыто из 3-в-1, добавляем login в начало
    const hasProvider = Object.values(ExternalOAuthName).includes(params?.provider as unknown as ExternalOAuthName);
    if (hasProvider) {
      authorizePrompt.unshift(Prompt.Login);
    }

    const queryParams: AuthQueryParams = {
      lang_id: params?.lang,
      scheme: params?.scheme,
      code_challenge: codeChallenge || generateCodeChallenge(codeVerifier()),
      code_challenge_method: CODE_CHALLENGE_METHOD,
      client_id: app,
      response_type: OAUTH2_RESPONSE_TYPE,
      scope,
      state: state(),
      provider: params?.provider,
      prompt: authorizePrompt.join(' ').trim(),
      stats_info: encodeStatsInfo({
        flow_source: params?.statsFlowSource,
        session_id: params?.uniqueSessionId,
      }),
    };

    let url = getVKIDUrl('authorize', queryParams, config);

    if (params?.screen) {
      Object.assign(queryParams, {
        oauth_version: 2,
        screen: params?.screen,
        redirect_state: state(),
      });
      url = getVKIDUrl('auth', queryParams, config);
    }

    if (config.mode === ConfigAuthMode.InNewTab) {
      queryParams.origin = location.protocol + '//' + location.hostname;
      return this.loginInNewTab(url);
    } else {
      return this.loginByRedirect(url);
    }
  }

  protected checkState(stateToCheck: string): AuthError | undefined {
    if (state() !== stateToCheck) {
      return {
        code: AuthErrorCode.StateMismatch,
        error: AUTH_ERROR_TEXT[AuthErrorCode.StateMismatch],
        state: stateToCheck,
      };
    }
    clearStateCookie();
  }

  public exchangeCode(code: string, deviceId: string) {
    const config = Auth.config.get();
    state(config.state);

    const queryParams = {
      grant_type: 'authorization_code',
      redirect_uri: config.redirectUrl,
      client_id: config.app,
      code_verifier: codeVerifier(),
      state: state(),
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
        Auth.config.update({ state: config.state, codeVerifier: config.codeVerifier });
        return res;
      });
  }

  public refreshToken(refreshToken: string, deviceId: string) {
    const config = Auth.config.get();
    state(config.state);

    const queryParams = {
      grant_type: 'refresh_token',
      redirect_uri: config.redirectUrl,
      client_id: config.app,
      device_id: deviceId,
      state: state(),
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
