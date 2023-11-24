import { Languages } from '#/types';
import { OAuthName } from '#/widgets/oauthList/types';

type Text = Record<Languages, string>;

export const linkLongTextLang: Text = {
  [Languages.RUS]: 'или c помощью',
  [Languages.UKR]: 'або за допомогою',
  [Languages.ENG]: 'or sign in with',
  [Languages.SPA]: 'o inicia sesión con',
  [Languages.GERMAN]: 'oder mit Hilfe',
  [Languages.POL]: 'lub z pomocą',
  [Languages.FRA]: 'ou via',
  [Languages.TURKEY]: 'veya işbu yöntemle',
};

export const linkShortTextLang: Text = {
  [Languages.RUS]: 'или',
  [Languages.UKR]: 'або',
  [Languages.ENG]: 'or',
  [Languages.SPA]: 'o',
  [Languages.GERMAN]: 'oder',
  [Languages.POL]: 'lub',
  [Languages.FRA]: 'ou',
  [Languages.TURKEY]: 'ya da',
};

export const singleButtonText = {
  [Languages.RUS]: {
    [OAuthName.OK]: 'Войти через OK',
    [OAuthName.MAIL]: 'Войти с Почтой Mail.ru',
    [OAuthName.VK]: 'Войти с VK ID',
  },
  [Languages.UKR]: 'Увійти з {provider}',
  [Languages.ENG]: 'Sign in with {provider}',
  [Languages.SPA]: 'Iniciar sesión con {provider}',
  [Languages.GERMAN]: 'Über {provider} anmelden',
  [Languages.POL]: 'Wejdź poprzez {provider}',
  [Languages.FRA]: 'Connexion via {provider}',
  [Languages.TURKEY]: '{provider}\'den gir',
};
