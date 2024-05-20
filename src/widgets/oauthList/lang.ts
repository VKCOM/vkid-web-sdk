import { Languages } from '#/types';
import { OAuthName } from '#/widgets/oauthList/types';

type Text = Record<Languages, string>;

export const linkTextLang: Text = {
  [Languages.RUS]: 'или войти через VK ID с использованием данных из сервиса',
  [Languages.UKR]: 'або увійти через VK ID з використанням даних із сервісу',
  [Languages.BEL]: 'ці ўвайсці праз VK ID з выкарыстаннем даных з сэрвісу',
  [Languages.KAZ]: 'сервистегі деректерді пайдаланып VK ID арқылы кіру',
  [Languages.UZB]: 'yoki xizmatning maʼlumotlaridan foydalangan holda VK ID orqali kirish',
  [Languages.ENG]: 'or sign in with VK ID using information from a service',
  [Languages.SPA]: 'o iniciar sesión con VK ID utilizando la información de un servicio',
  [Languages.GERMAN]: 'oder melden Sie sich mit Ihrer VK-ID an, indem Sie Informationen aus dem Dienst verwenden',
  [Languages.POL]: 'lub wejdź poprzez VK ID przy użyciu danych z serwisu',
  [Languages.FRA]: 'ou se connecter avec VK ID en utilisant les informations d\'un service',
  [Languages.TURKEY]: 'Ya da hizmetteki verileri kullanarak VK ID hizmeti yardımıyla gir',
};

export const singleButtonText = {
  [Languages.RUS]: {
    [OAuthName.OK]: 'Войти через OK',
    [OAuthName.MAIL]: 'Войти с Почтой Mail.ru',
    [OAuthName.VK]: 'Войти с VK ID',
  },
  [Languages.UKR]: 'Увійти з {provider}',
  [Languages.BEL]: 'Увайсці з {provider}',
  [Languages.KAZ]: '{provider} кіру',
  [Languages.UZB]: '{provider} orqali kirish',
  [Languages.ENG]: 'Sign in with {provider}',
  [Languages.SPA]: 'Iniciar sesión con {provider}',
  [Languages.GERMAN]: 'Mit {provider} anmelden',
  [Languages.POL]: 'Zaloguj się z {provider}',
  [Languages.FRA]: 'Se connecter avec {provider}',
  [Languages.TURKEY]: '{provider}\'den gir',
};
