import { AuthError } from '#/auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isNotEmptyOAuthList, validator } from '#/core/validator';
import { Widget } from '#/core/widget';

import { OAuthListPublicEvents } from './events';
import { getOAuthListTemplate } from './template';
import { OAuthListParams } from './types';

export class OAuthList extends Widget<OAuthListParams> {
  @validator<OAuthListParams>({ oauthList: [isNotEmptyOAuthList] })
  public render(params: OAuthListParams): this {
    this.templateRenderer = getOAuthListTemplate({
      lang: params.lang,
      oauthList: params.oauthList,
      height: params.styles?.height,
      borderRadius: params.styles?.borderRadius,
      scheme: params.scheme,
    });
    this.container = params.container;
    this.renderTemplate();
    this.registerElements();
    this.setState('loaded');

    this.elements.root.addEventListener('click', this.handleClick.bind(this));

    return this;
  }

  private handleClick(e: Event) {
    const target = (e.target as HTMLElement).closest('[data-oauth]');
    if (!target) {
      return;
    }

    const oauth = target.getAttribute('data-oauth');

    OAuthList.__auth.login({ action: { name: 'sdk_oauth', params: { oauth } } })
      .then((data) => {
        this.events.emit(OAuthListPublicEvents.LOGIN_SUCCESS, data);
      })
      .catch((error: AuthError) => {
        this.events.emit(OAuthListPublicEvents.LOGIN_FAILED, error);
      });
  }
}
