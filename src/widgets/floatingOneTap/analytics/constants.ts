import { FloatingOneTapContentId } from '../types';

export const TEXT_TYPE: Record<FloatingOneTapContentId, string> = {
  [FloatingOneTapContentId.SIGN_IN_TO_SERVICE]: 'service_sign_in',
  [FloatingOneTapContentId.REGISTRATION_FOR_EVENT]: 'event_reg',
  [FloatingOneTapContentId.SUBMIT_APPLICATIONS]: 'request',
  [FloatingOneTapContentId.MAKE_ORDER_WITH_SERVICE]: 'service_order_placing',
  [FloatingOneTapContentId.MAKE_ORDER_WITHOUT_SERVICE]: 'vkid_order_placing',
  [FloatingOneTapContentId.SIGN_IN_TO_ACCOUNT]: 'account_sign_in',
  [FloatingOneTapContentId.FAST_REGISTRATION]: 'fast_reg',
};
