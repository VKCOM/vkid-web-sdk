import { Languages } from '#/types';

type Text = Record<Languages, string>;

export const providerLang = 'VK ID';

export const longLang: Text = {
  [Languages.RUS]: 'Войти c VK ID',
  [Languages.UKR]: 'Увійти з VK ID',
  [Languages.ENG]: 'Sign in with VK ID',
  [Languages.SPA]: 'Iniciar sesión con VK ID',
  [Languages.GERMAN]: 'Mit VK-ID anmelden',
  [Languages.POL]: 'Wejdź z VK ID',
  [Languages.FRA]: 'Se connecter avec VK ID',
  [Languages.TURKEY]: 'VK ID aracılığıyla gir',
};

export const shortLang: Text = {
  [Languages.RUS]: 'Продолжить',
  [Languages.UKR]: 'Продовжити',
  [Languages.ENG]: 'Continue',
  [Languages.SPA]: 'Continuar',
  [Languages.GERMAN]: 'Fortfahren',
  [Languages.POL]: 'Kontynuuj',
  [Languages.FRA]: 'Continuer',
  [Languages.TURKEY]: 'Devam',
};
