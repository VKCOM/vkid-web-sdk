import { Languages } from '#/types';

import { OneTapContentId } from '../types';

import { Lang, Text } from './types';

export const providerLang = 'VK ID';

const SIGN_IN_SHORT: Lang = {
  [Languages.RUS]: 'Продолжить',
  [Languages.UKR]: 'Продовжити',
  [Languages.BEL]: 'Працягнуць',
  [Languages.KAZ]: 'Жалғастыру',
  [Languages.UZB]: 'Davom etish',
  [Languages.ENG]: 'Continue',
  [Languages.SPA]: 'Continuar',
  [Languages.GERMAN]: 'Fortfahren',
  [Languages.POL]: 'Kontynuuj',
  [Languages.FRA]: 'Continuer',
  [Languages.TURKEY]: 'Devam',
};

const SIGN_UP_SHORT: Lang = {
  [Languages.RUS]: 'Записаться',
  [Languages.UKR]: 'Записатися',
  [Languages.BEL]: 'Запісацца',
  [Languages.KAZ]: 'Жазылу',
  [Languages.UZB]: 'Yozilish',
  [Languages.ENG]: 'Sign up',
  [Languages.SPA]: 'Registrarse',
  [Languages.GERMAN]: 'Anmelden',
  [Languages.POL]: 'Zapisz się',
  [Languages.FRA]: 'Prendre RDV',
  [Languages.TURKEY]: 'Kaydol',
};

const GET_SHORT: Lang = {
  [Languages.RUS]: 'Получить',
  [Languages.UKR]: 'Отримати',
  [Languages.BEL]: 'Атрымаць',
  [Languages.KAZ]: 'Алу',
  [Languages.UZB]: 'Olish',
  [Languages.ENG]: 'Get',
  [Languages.SPA]: 'Obtener',
  [Languages.GERMAN]: 'Erhalten',
  [Languages.POL]: 'Otrzymaj',
  [Languages.FRA]: 'Obtenir',
  [Languages.TURKEY]: 'Al',
};

const OPEN_SHORT: Lang = {
  [Languages.RUS]: 'Открыть',
  [Languages.UKR]: 'Відкрити',
  [Languages.BEL]: 'Адкрыць',
  [Languages.KAZ]: 'Ашу',
  [Languages.UZB]: 'Ochish',
  [Languages.ENG]: 'Open',
  [Languages.SPA]: 'Abrir',
  [Languages.GERMAN]: 'Öffnen',
  [Languages.POL]: 'Otwórz',
  [Languages.FRA]: 'Ouvrir',
  [Languages.TURKEY]: 'Aç',
};

const CALCULATE_SHORT: Lang = {
  [Languages.RUS]: 'Рассчитать',
  [Languages.UKR]: 'Розрахувати',
  [Languages.BEL]: 'Разлічыць',
  [Languages.KAZ]: 'Есептеу',
  [Languages.UZB]: 'Hisoblash',
  [Languages.ENG]: 'Calculate',
  [Languages.SPA]: 'Calcular',
  [Languages.GERMAN]: 'Berechnen',
  [Languages.POL]: 'Oblicz',
  [Languages.FRA]: 'Calculer',
  [Languages.TURKEY]: 'Hesapla',
};

const ORDER_SHORT: Lang = {
  [Languages.RUS]: 'Заказать',
  [Languages.UKR]: 'Замовити',
  [Languages.BEL]: 'Заказаць',
  [Languages.KAZ]: 'Тапсырыс беру',
  [Languages.UZB]: 'Buyurtma berish',
  [Languages.ENG]: 'Order',
  [Languages.SPA]: 'Pedir',
  [Languages.GERMAN]: 'Bestellen',
  [Languages.POL]: 'Zamów',
  [Languages.FRA]: 'Commander',
  [Languages.TURKEY]: 'Sipariş ver',
};

const PLACE_ORDER_SHORT: Lang = {
  [Languages.RUS]: 'Оформить заказ',
  [Languages.UKR]: 'Оформити замовлення',
  [Languages.BEL]: 'Аформіць заказ',
  [Languages.KAZ]: 'Тапсырысты рәсімдеу',
  [Languages.UZB]: 'Buyurtmani shakllantirish',
  [Languages.ENG]: 'Place order',
  [Languages.SPA]: 'Hacer pedido',
  [Languages.GERMAN]: 'Bestellung aufgeben',
  [Languages.POL]: 'Wypełnij zamówienie',
  [Languages.FRA]: 'Passer commande',
  [Languages.TURKEY]: 'Siparişi tamamlar',
};

const SUBMIT_REQUEST_SHORT: Lang = {
  [Languages.RUS]: 'Оставить заявку',
  [Languages.UKR]: 'Залишити запит',
  [Languages.BEL]: 'Пакінуць заяўку',
  [Languages.KAZ]: 'Өтінім қалдыру',
  [Languages.UZB]: 'Talabnoma qoldirish',
  [Languages.ENG]: 'Send request',
  [Languages.SPA]: 'Enviar solicitud',
  [Languages.GERMAN]: 'Anfrage stellen',
  [Languages.POL]: 'Pozostaw wniosek',
  [Languages.FRA]: 'Envoyer demande',
  [Languages.TURKEY]: 'Başvuru bırak',
};

const PARTICIPATE_SHORT: Lang = {
  [Languages.RUS]: 'Участвовать',
  [Languages.UKR]: 'Брати участь',
  [Languages.BEL]: 'Удзельнічаць',
  [Languages.KAZ]: 'Қатысу',
  [Languages.UZB]: 'Ishtirok etish',
  [Languages.ENG]: 'Participate',
  [Languages.SPA]: 'Participar',
  [Languages.GERMAN]: 'Teilnehmen',
  [Languages.POL]: 'Uczestnicz',
  [Languages.FRA]: 'Participer',
  [Languages.TURKEY]: 'Katıl',
};

const texts: Text = {
  [OneTapContentId.SIGN_IN]: SIGN_IN_SHORT,
  [OneTapContentId.SIGN_UP]: SIGN_UP_SHORT,
  [OneTapContentId.GET]: GET_SHORT,
  [OneTapContentId.OPEN]: OPEN_SHORT,
  [OneTapContentId.CALCULATE]: CALCULATE_SHORT,
  [OneTapContentId.ORDER]: ORDER_SHORT,
  [OneTapContentId.PLACE_ORDER]: PLACE_ORDER_SHORT,
  [OneTapContentId.SUBMIT_REQUEST]: SUBMIT_REQUEST_SHORT,
  [OneTapContentId.PARTICIPATE]: PARTICIPATE_SHORT,
};

export const getShortLang = (contentId: OneTapContentId, lang: Languages) => {
  const content = texts[contentId] || texts[OneTapContentId.SIGN_IN];

  return content[lang] || content[Languages.RUS];
};
