// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isNumber, isRequired, validator } from '#/core/validator';
import { Widget } from '#/core/widget';
import { Languages, Scheme } from '#/types';
import {
  CommunitySubscriptionBridgeMessage,
  CommunitySubscriptionParams,
  LimitDisplayLocalStorageObjType,
} from '#/widgets/communitySubscription/types';

import { COMMUNITY_SUBSCRIPTION_ERROR_TEXT } from './constants';
import { CommunitySubscriptionEvents, CommunitySubscriptionInternalEvents } from './events';
import { getCommunitySubscriptionTemplate } from './template';

export class CommunitySubscription extends Widget<CommunitySubscriptionParams> {
  protected vkidAppName = 'community_subscription';
  protected limitDisplayLocalStorageObjName = 'vkid_community_subscription:limit_display'
  private accessToken: string;
  private groupId: number;

  public constructor() {
    super();
  }

  protected onBridgeMessageHandler(event: CommunitySubscriptionBridgeMessage) {
    switch (event.handler) {
      case CommunitySubscriptionEvents.Error: {
        if (event.params.code) {
          this.events.emit(CommunitySubscriptionEvents.Error, { ...event.params, error: COMMUNITY_SUBSCRIPTION_ERROR_TEXT[event.params.code] });
        }
        this.close();
        break;
      }
      case CommunitySubscriptionEvents.Success: {
        this.events.emit(CommunitySubscriptionEvents.Success, event.params);
        this.elements.iframe.style.pointerEvents = 'none';
        break;
      }
      case CommunitySubscriptionInternalEvents.Ready: {
        this.bridge.sendMessage({
          handler: CommunitySubscriptionInternalEvents.Data, params: {
            accessToken: this.accessToken,
            groupId: this.groupId,
          },
        });
        break;
      }
      case CommunitySubscriptionEvents.Load: {
        // Проверка по значению из Localstorage, показывали ли ранее
        try {
          const periodInDays = this.config.get().groupSubscriptionsLimit?.periodInDays ?? 30;
          const maxSubscriptionsToShow = this.config.get().groupSubscriptionsLimit?.maxSubscriptionsToShow ?? 2;

          const result = localStorage.getItem(`${this.limitDisplayLocalStorageObjName}`);
          const data: LimitDisplayLocalStorageObjType = result && JSON.parse(result);

          const dateArray = data.filter((date) => this.checkForPeriodEntry(new Date(date), new Date(), periodInDays));

          if (dateArray.length < maxSubscriptionsToShow) {
            localStorage.setItem(this.limitDisplayLocalStorageObjName, JSON.stringify([...dateArray, new Date()]));
          } else {
            break;
          }
        } catch (e) {
          // Первый раз будет ошибка - так как еще нет записи в Localstorage - поэтому значение устанавливаем после отлова ошибки
          if (this.config.get().groupSubscriptionsLimit?.maxSubscriptionsToShow?.toString() === '0') {
            break;
          }
          localStorage.setItem(this.limitDisplayLocalStorageObjName, JSON.stringify([new Date()]));
        }
        super.onBridgeMessageHandler(event);
        break;
      }
      default: {
        super.onBridgeMessageHandler(event);
        break;
      }
    }
  }

  private checkForPeriodEntry(dateDisplay: Date, dateActual: Date, period: number): boolean {
    let result = new Date(dateDisplay);
    result.setDate(result.getDate() + period);
    return result.getTime() > dateActual.getTime();
  }

  @validator<CommunitySubscriptionParams>({ groupId: [isNumber], accessToken: [isRequired] })
  public render(params: CommunitySubscriptionParams): this {
    this.lang = params?.lang || Languages.RUS;
    this.scheme = params?.scheme || Scheme.LIGHT;

    this.accessToken = params.accessToken;
    this.groupId = params.groupId;

    this.container = document.body;
    this.templateRenderer = getCommunitySubscriptionTemplate();
    super.render({ container: this.container, lang: this.lang, scheme: this.scheme });

    return this;
  }
}
