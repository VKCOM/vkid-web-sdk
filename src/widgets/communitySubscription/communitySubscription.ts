// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isNumber, isRequired, validator } from '#/core/validator';
import { Widget, WidgetEvents } from '#/core/widget';
import { WidgetState } from '#/core/widget/types';
import { CommunitySubscriptionService } from '#/services/CommunitySubscriptionService/';
import { COMMUNITY_SUBSCRIPTION_ERROR_TEXT } from '#/services/CommunitySubscriptionService/constants';
import { Languages, Scheme } from '#/types';
import { CommunitySubscriptionStatsCollector } from '#/widgets/communitySubscription/analytics';
import { CommunitySubscriptionEvents } from '#/widgets/communitySubscription/events';
import { getCommunitySubscriptionTemplate } from '#/widgets/communitySubscription/template';
import { CommunitySubscriptionErrorCode, CommunitySubscriptionParams } from '#/widgets/communitySubscription/types';

export class CommunitySubscription extends Widget<CommunitySubscriptionParams> {
  private readonly communitySubscriptionService: CommunitySubscriptionService;
  private communitySubscriptionStatsCollector: CommunitySubscriptionStatsCollector;

  public constructor() {
    super();
    this.communitySubscriptionService = new CommunitySubscriptionService(this.config);
  }

  @validator<CommunitySubscriptionParams>({ groupId: [isNumber], accessToken: [isRequired] })
  public render(params: CommunitySubscriptionParams): this {
    this.lang = params?.lang || Languages.RUS;
    this.scheme = params?.scheme || Scheme.LIGHT;

    this.container = document.body;
    this.communitySubscriptionService.init({
      accessToken: params.accessToken,
      groupId: params.groupId,
    })
      .then((data) => {
        this.communitySubscriptionStatsCollector = new CommunitySubscriptionStatsCollector(this.config, params.accessToken);
        this.communitySubscriptionStatsCollector.setStatsAdditionalData({
          lang: this.lang,
          scheme: this.scheme,
          groupId: data.groupId,
        });

        this.templateRenderer = getCommunitySubscriptionTemplate({
          lang: this.lang,
          scheme: this.scheme,
          closeWidget: () => this.close(),
          groupsJoin: () => this.communitySubscriptionService.joinGroup(),
          onSuccess: () => this.events.emit(CommunitySubscriptionEvents.SubscribedSuccessfully),
          onError: (e) => this.events.emit(WidgetEvents.ERROR, {
            code: CommunitySubscriptionErrorCode.UnknownError,
            error: COMMUNITY_SUBSCRIPTION_ERROR_TEXT[CommunitySubscriptionErrorCode.UnknownError],
            error_data: e,
          }),
          communitySubscriptionStatsCollector: this.communitySubscriptionStatsCollector,
          ...data,
        });
        this.renderTemplate();
        this.registerElements();
        this.setState(WidgetState.LOADED);
      })
      .catch((e) => {
        this.events.emit(WidgetEvents.ERROR, e);
        this.close();
      });

    return this;
  }
}
