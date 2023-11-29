import { Languages } from '#/types';
import { OAuthName } from '#/widgets/oauthList/types';

type Text = Record<Languages, string>;

export const linkTextLang: Text = {
  [Languages.RUS]: 'или войти через VK ID с использованием данных из сервиса',
  [Languages.UKR]: 'orsign in withVKID using information fromaservice',
  [Languages.ENG]: 'orsign in withVKID using information fromaservice',
  [Languages.SPA]: 'orsign in withVKID using information fromaservice',
  [Languages.GERMAN]: 'orsign in withVKID using information fromaservice',
  [Languages.POL]: 'orsign in withVKID using information fromaservice',
  [Languages.FRA]: 'orsign in withVKID using information fromaservice',
  [Languages.TURKEY]: 'orsign in withVKID using information fromaservice',
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
  [Languages.FRA]: 'Connexion avec {provider}',
  [Languages.TURKEY]: '{provider}\'den gir',
};
