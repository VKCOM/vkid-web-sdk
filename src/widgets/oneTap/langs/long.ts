import { Languages } from '#/types';

import { OneTapContentId } from '../types';

import { Lang, Text } from './types';

const SIGN_IN_LONG: Lang = {
  [Languages.RUS]: 'Войти c VK ID',
  [Languages.UKR]: 'Увійти з VK ID',
  [Languages.BEL]: 'Увайсці з VК ID',
  [Languages.KAZ]: 'VK ID арқылы кіру',
  [Languages.UZB]: 'VK ID dan kirish',
  [Languages.ENG]: 'Sign in with VK ID',
  [Languages.SPA]: 'Iniciar sesión con VK ID',
  [Languages.GERMAN]: 'Mit VK-ID anmelden',
  [Languages.POL]: 'Wejdź z VK ID',
  [Languages.FRA]: 'Se connecter avec VK ID',
  [Languages.TURKEY]: 'VK ID aracılığıyla gir',
};

const SIGN_UP_LONG: Lang = {
  [Languages.RUS]: 'Записаться с VK ID',
  [Languages.UKR]: 'Записатися з VK ID',
  [Languages.BEL]: 'Запісацца з VK ID',
  [Languages.KAZ]: 'VK ID арқылы жазылу',
  [Languages.UZB]: 'VK ID bilan yozilish',
  [Languages.ENG]: 'Sign up with VK ID',
  [Languages.SPA]: 'Registrarse con VK ID',
  [Languages.GERMAN]: 'Mit VK ID anmelden',
  [Languages.POL]: 'Zapisz się z VK ID',
  [Languages.FRA]: 'Prendre RDV avec VK ID',
  [Languages.TURKEY]: 'VK ID ile kaydol',
};

const GET_LONG: Lang = {
  [Languages.RUS]: 'Получить с VK ID',
  [Languages.UKR]: 'Отримати з VK ID',
  [Languages.BEL]: 'Атрымаць з VK ID',
  [Languages.KAZ]: 'VK ID арқылы алу',
  [Languages.UZB]: 'VK ID bilan olish',
  [Languages.ENG]: 'Get with VK ID',
  [Languages.SPA]: 'Obtener con VK ID',
  [Languages.GERMAN]: 'Mit VK ID erhalten',
  [Languages.POL]: 'Otrzymaj z VK ID',
  [Languages.FRA]: 'Obtenir avec VK ID',
  [Languages.TURKEY]: 'VK ID ile al',
};

const OPEN_LONG: Lang = {
  [Languages.RUS]: 'Открыть с VK ID',
  [Languages.UKR]: 'Відкрити з VK ID',
  [Languages.BEL]: 'Адкрыць з VK ID',
  [Languages.KAZ]: 'VK ID арқылы ашу',
  [Languages.UZB]: 'VK ID bilan ochish',
  [Languages.ENG]: 'Open with VK ID',
  [Languages.SPA]: 'Abrir con VK ID',
  [Languages.GERMAN]: 'Mit VK ID öffnen',
  [Languages.POL]: 'Otwórz z VK ID',
  [Languages.FRA]: 'Ouvrir avec VK ID',
  [Languages.TURKEY]: 'VK ID ile aç',
};

const CALCULATE_LONG: Lang = {
  [Languages.RUS]: 'Рассчитать с VK ID',
  [Languages.UKR]: 'Розрахувати з VK ID',
  [Languages.BEL]: 'Разлічыць з VK ID',
  [Languages.KAZ]: 'VK ID арқылы есептеу',
  [Languages.UZB]: 'VK ID yordamida hisoblash',
  [Languages.ENG]: 'Calculate with VK ID',
  [Languages.SPA]: 'Calcular con VK ID',
  [Languages.GERMAN]: 'Mit VK ID berechnen',
  [Languages.POL]: 'Oblicz z VK ID',
  [Languages.FRA]: 'Calculer avec VK ID',
  [Languages.TURKEY]: 'VK ID ile hesapla',
};

const ORDER_LONG: Lang = {
  [Languages.RUS]: 'Заказать с VK ID',
  [Languages.UKR]: 'Замовити з VK ID',
  [Languages.BEL]: 'Заказаць з VK ID',
  [Languages.KAZ]: 'VK ID арқылы тапсырыс беру',
  [Languages.UZB]: 'VK ID bilan buyurtma berish',
  [Languages.ENG]: 'Order with VK ID',
  [Languages.SPA]: 'Pedir con VK ID',
  [Languages.GERMAN]: 'Mit VK ID bestellen',
  [Languages.POL]: 'Zamów z VK ID',
  [Languages.FRA]: 'Commander avec VK ID',
  [Languages.TURKEY]: 'VK ID ile sipariş ver',
};

const PLACE_ORDER_LONG: Lang = {
  [Languages.RUS]: 'Оформить с VK ID',
  [Languages.UKR]: 'Оформити з VK ID',
  [Languages.BEL]: 'Аформіць з VK ID',
  [Languages.KAZ]: 'VK ID арқылы рәсімдеу',
  [Languages.UZB]: 'VK ID bilan shakllantirish',
  [Languages.ENG]: 'Order with VK ID',
  [Languages.SPA]: 'Pedir con VK ID',
  [Languages.GERMAN]: 'Mit VK ID Bestellung aufgeben',
  [Languages.POL]: 'Wypełnij z VK ID',
  [Languages.FRA]: 'Commander avec VK ID',
  [Languages.TURKEY]: 'VK ID ile yap',
};

const SUBMIT_REQUEST_LONG: Lang = {
  [Languages.RUS]: 'Оставить заявку с VK ID',
  [Languages.UKR]: 'Залишити запит з VK ID',
  [Languages.BEL]: 'Пакінуць заяўку з VK ID',
  [Languages.KAZ]: 'VK ID арқылы өтінім қалдыру',
  [Languages.UZB]: 'VK ID bilan talabnoma qoldirish',
  [Languages.ENG]: 'Send request with VK ID',
  [Languages.SPA]: 'Enviar solicitud con VK ID',
  [Languages.GERMAN]: 'Mit VK ID Anfrage stellen',
  [Languages.POL]: 'Zostaw wniosek z VK ID',
  [Languages.FRA]: 'Envoyer demande avec VK ID',
  [Languages.TURKEY]: 'VK ID ile başvuru yap',
};

const PARTICIPATE_LONG: Lang = {
  [Languages.RUS]: 'Участвовать с VK ID',
  [Languages.UKR]: 'Брати участь з VK ID',
  [Languages.BEL]: 'Удзельнічаць з VK ID',
  [Languages.KAZ]: 'VK ID арқылы қатысу',
  [Languages.UZB]: 'VK ID ilan ishtirok etish',
  [Languages.ENG]: 'Participate with VK ID',
  [Languages.SPA]: 'Participar con VK ID',
  [Languages.GERMAN]: 'Mit VK ID teilnehmen',
  [Languages.POL]: 'Uczestnicz z VK ID',
  [Languages.FRA]: 'Participer avec VK ID',
  [Languages.TURKEY]: 'VK ID ile katıl',
};

const texts: Text = {
  [OneTapContentId.SIGN_IN]: SIGN_IN_LONG,
  [OneTapContentId.SIGN_UP]: SIGN_UP_LONG,
  [OneTapContentId.GET]: GET_LONG,
  [OneTapContentId.OPEN]: OPEN_LONG,
  [OneTapContentId.CALCULATE]: CALCULATE_LONG,
  [OneTapContentId.ORDER]: ORDER_LONG,
  [OneTapContentId.PLACE_ORDER]: PLACE_ORDER_LONG,
  [OneTapContentId.SUBMIT_REQUEST]: SUBMIT_REQUEST_LONG,
  [OneTapContentId.PARTICIPATE]: PARTICIPATE_LONG,
};

export const getLongLang = (contentId: OneTapContentId, lang: Languages) => {
  const content = texts[contentId] || texts[OneTapContentId.SIGN_IN];

  return content[lang] || content[Languages.RUS];
};
