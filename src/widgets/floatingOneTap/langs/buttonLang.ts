import { Languages } from '#/types';
import { FloatingOneTapContentId } from '#/widgets/floatingOneTap/types';

import { Lang } from './types';

const SIGN_IN: Lang = {
  [Languages.RUS]: 'Войти c VK ID',
  [Languages.UKR]: 'Увійти з VK ID',
  [Languages.ENG]: 'Sign in with VK ID',
  [Languages.SPA]: 'Iniciar sesión con VK ID',
  [Languages.GERMAN]: 'Mit VK-ID anmelden',
  [Languages.POL]: 'Wejdź z VK ID',
  [Languages.FRA]: 'Se connecter avec VK ID',
  [Languages.TURKEY]: 'VK ID aracılığıyla gir',
};

const CONTINUE: Lang = {
  [Languages.RUS]: 'Продолжить с VK ID',
  [Languages.UKR]: 'Продовжити з VK ID',
  [Languages.ENG]: 'Continue with VK ID',
  [Languages.SPA]: 'Continuar con VK ID',
  [Languages.GERMAN]: 'Mit VK-ID fortfahren',
  [Languages.POL]: 'Kontynuuj z VK ID',
  [Languages.FRA]: 'Continuer avec VK ID',
  [Languages.TURKEY]: 'VK ID aracılığıyla devam et',
};

const MAKE_ORDER: Lang = {
  [Languages.RUS]: 'Оформить с VK ID',
  [Languages.UKR]: 'Оформити з VK ID',
  [Languages.ENG]: 'Order with VK ID',
  [Languages.SPA]: 'Pedir con VK ID',
  [Languages.GERMAN]: 'Mit VK-ID bestellen',
  [Languages.POL]: 'Wypełnij z VK ID',
  [Languages.FRA]: 'Commander avec VK ID',
  [Languages.TURKEY]: 'VK ID aracılığıyla oluştur',
};

export const getButtonLang = (contentId: FloatingOneTapContentId, lang: Languages): string => {
  switch (contentId) {
    case FloatingOneTapContentId.SIGN_IN_TO_SERVICE:
    case FloatingOneTapContentId.SIGN_IN_TO_ACCOUNT:
      return SIGN_IN[lang] || SIGN_IN[Languages.RUS];
    case FloatingOneTapContentId.REGISTRATION_FOR_EVENT:
    case FloatingOneTapContentId.SUBMIT_APPLICATIONS:
      return CONTINUE[lang] || CONTINUE[Languages.RUS];
    case FloatingOneTapContentId.MAKE_ORDER_WITH_SERVICE:
    case FloatingOneTapContentId.MAKE_ORDER_WITHOUT_SERVICE:
      return MAKE_ORDER[lang] || MAKE_ORDER[Languages.RUS];
    default:
      return SIGN_IN[Languages.RUS];
  }
};
