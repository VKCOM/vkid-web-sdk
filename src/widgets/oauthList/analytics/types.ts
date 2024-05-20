import { ProductionStatsEventScreen, ProductionStatsFieldsItem } from '#/core/analytics';

export enum MultibrandingStatsProviders {
  VK = 'vk',
  OK = 'ok',
  MAIL = 'mail',
}

interface MultibrandingOauthAddedParamsFieldsItem extends ProductionStatsFieldsItem {
  name: MultibrandingStatsProviders;
}

export type MultibrandingOauthParamsScreen = ProductionStatsEventScreen.MULTIBRANDING | ProductionStatsEventScreen.NOWHERE | ProductionStatsEventScreen.FLOATING_ONE_TAP;

export interface MultibrandingOauthAddedParams {
  screen: MultibrandingOauthParamsScreen;
  fields: MultibrandingOauthAddedParamsFieldsItem[];
}

export interface MultibrandingButtonShowParams {
  screen: MultibrandingOauthParamsScreen;
  isIcon: boolean;
}

export type MultibrandingButtonTapParams = MultibrandingButtonShowParams;
