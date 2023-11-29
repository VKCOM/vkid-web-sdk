// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isNotEmptyOAuthList, validator } from '#/core/validator';
import { Widget } from '#/core/widget';
import { WidgetState } from '#/core/widget/types';

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
    this.setState(WidgetState.LOADED);

    this.elements.root.addEventListener('click', this.handleClick.bind(this));

    return this;
  }

  private handleClick(e: Event) {
    const target = (e.target as HTMLElement).closest('[data-oauth]');
    if (!target) {
      return;
    }

    const oauth = target.getAttribute('data-oauth');

    OAuthList.__auth.login({ action: { name: 'sdk_oauth', params: { oauth } } });
  }
}
