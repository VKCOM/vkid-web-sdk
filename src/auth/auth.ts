import { Config } from '#/core/config';
import { isDomainAllowed } from '#/utils/domain';
import { getVKIDUrl } from '#/utils/url';

import { AuthDataService } from './authDataService';
import { AUTH_RESPONSE_TOKEN, AUTH_VK_CONNECT_RESPONSE } from './constants';
import { AuthParams, AuthResponse } from './types';

export class Auth {
  public static __config: Config;

  private readonly config: Config;
  private dataService: AuthDataService;

  private opener: Window | null;
  private interval: number;

  public constructor() {
    this.config = Auth.__config;
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

    if (data.action === AUTH_VK_CONNECT_RESPONSE) {
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

  public readonly login = (params?: AuthParams): Promise<AuthResponse> => {
    this.dataService = new AuthDataService();
    const queryParams: Partial<Record<string, string>> = {
      scheme: params?.scheme,
      lang_id: params?.lang,
      origin: location.protocol + '//' + location.hostname,
      response_type: AUTH_RESPONSE_TOKEN,
    };

    const url = getVKIDUrl('auth', queryParams, this.config.get());
    this.opener = window.open(url, '_blank');

    if (this.opener) {
      this.subscribe();
    } else {
      this.dataService.sendCannotCreateNewTab();
    }

    return this.dataService.value;
  }
}
