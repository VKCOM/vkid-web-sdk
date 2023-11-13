import { Languages } from '#/types';

type Text = Record<Languages, string>;

export const providerLang = 'VK ID';

export const longLang: Text = {
  [Languages.RUS]: `Войти c ${providerLang}`,
  [Languages.UKR]: `Увійти з ${providerLang}`,
  [Languages.ENG]: `Sign in with ${providerLang}`,
  [Languages.SPA]: `Iniciar sesión con ${providerLang}`,
  [Languages.GERMAN]: `Sign in with ${providerLang}`,
  [Languages.POL]: `Wejdź poprzez ${providerLang}`,
  [Languages.FRA]: `Sign in with ${providerLang}`,
  [Languages.TURKEY]: `${providerLang} den gir`,
};

export const shortLang: Text = {
  [Languages.RUS]: 'Продолжить',
  [Languages.UKR]: 'Продовжити',
  [Languages.ENG]: 'Continue',
  [Languages.SPA]: 'Continuar',
  [Languages.GERMAN]: 'Fortfahren',
  [Languages.POL]: 'Kontynuuj',
  [Languages.FRA]: 'Continue',
  [Languages.TURKEY]: 'Devam',
};
