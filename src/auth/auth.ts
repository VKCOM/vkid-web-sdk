import { AuthDataService } from '#/auth/authDataService';
import { Config, ConfigAuthMode } from '#/core/config';
import { isDomainAllowed } from '#/utils/domain';
import { getRedirectWithPayloadUrl, getVKIDUrl } from '#/utils/url';
import { uuid } from '#/utils/uuid';

import { AUTH_RESPONSE_TOKEN, AUTH_VK_CONNECT_RESPONSE } from './constants';
import { AuthParams, AuthQueryParams } from './types';

export class Auth {
  /**
   * @ignore
   */
  public static __config: Config;

  private uuid: string;
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

    if (data.action === AUTH_VK_CONNECT_RESPONSE + this.uuid) {
      this.dataService.sendSuccessData(data.payload);
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

  private readonly loginInNewTab = (url: string): void => {
    this.dataService = new AuthDataService();
    this.opener = window.open(url, '_blank');

    if (this.opener) {
      this.subscribe();
    } else {
      this.dataService.sendCannotCreateNewTab();
    }

    this.dataService.value
      .then((payload) => {
        this.redirectWithPayload(payload);
      })
      .catch(console.error);
  }

  private readonly loginByRedirect = (url: string): void => {
    location.assign(url);
  }

  public readonly login = (params?: AuthParams): void => {
    const config = Auth.__config.get();
    this.uuid = uuid();

    const queryParams: AuthQueryParams = {
      uuid: this.uuid,
      lang_id: params?.lang,
      scheme: params?.scheme,
      screen: params?.screen,
      response_type: AUTH_RESPONSE_TOKEN,
      action: params?.action ? btoa(JSON.stringify(params.action)) : undefined,
    };

    const getUrl = () => getVKIDUrl('auth', queryParams, config);

    if (config.mode === ConfigAuthMode.InNewTab) {
      queryParams.origin = location.protocol + '//' + location.hostname;
      this.loginInNewTab(getUrl());
    } else {
      this.loginByRedirect(getUrl());
    }
  }

  // TODO: добавить типы
  protected redirectWithPayload(payload: any) {
    location.assign(getRedirectWithPayloadUrl(payload, Auth.__config));
  }
}
