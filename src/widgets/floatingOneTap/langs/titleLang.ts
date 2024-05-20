import { Languages } from '#/types';
import { FloatingOneTapContentId } from '#/widgets/floatingOneTap/types';

import { Lang } from './types';

const SIGN_IN_TO_SERVICE: Lang = {
  [Languages.RUS]: 'Войдите в\u00A0сервис или\u00A0зарегистрируйтесь',
  [Languages.UKR]: 'Увійдіть у\u00A0сервіс або\u00A0зареєструйтеся',
  [Languages.BEL]: 'Увайдзіце ў\u00A0сэрвіс ці\u00A0зарэгіструйцеся',
  [Languages.KAZ]: 'Сервиске кіріңіз немесе тіркеліңіз',
  [Languages.UZB]: 'Xizmatga\u00A0kiring va\u00A0ro‘yxatdan o‘ting',
  [Languages.ENG]: 'Sign in to\u00A0service or\u00A0sign up',
  [Languages.SPA]: 'Acceder al\u00A0servicio o\u00A0registrarse',
  [Languages.GERMAN]: 'Melden Sie sich beim\u00A0Dienst\u00A0an oder registrieren Sie\u00A0sich',
  [Languages.POL]: 'Wejdź do\u00A0serwisu lub\u00A0zarejestruj się',
  [Languages.FRA]: 'Connectez-vous au\u00A0service ou\u00A0inscrivez-vous',
  [Languages.TURKEY]: 'Hizmete\u00A0girin yada\u00A0oturum oluşturun',
};

const SIGN_IN_TO_ACCOUNT: Lang = {
  [Languages.RUS]: 'Войдите в учётную запись {service}',
  [Languages.UKR]: 'Увійдіть в обліковий запис {service}',
  [Languages.BEL]: 'Увайдзіце ва ўліковы запіс {service}',
  [Languages.KAZ]: '{service} есептік жазбасына кіріңіз',
  [Languages.UZB]: '{service} hisobiga kiring',
  [Languages.ENG]: 'Sign in to\u00A0{service} account',
  [Languages.SPA]: 'Acceder a la cuenta\u00A0{service}',
  [Languages.GERMAN]: 'Melden Sie sich bei Ihrem\u00A0{service}-Konto an',
  [Languages.POL]: 'Wejdź na rachunek {service}',
  [Languages.FRA]: 'Connectez-vous à\u00A0{service}',
  [Languages.TURKEY]: '{service} hesabına girin',
};

const REGISTRATION_FOR_EVENT: Lang = {
  [Languages.RUS]: 'Зарегистрируйтесь на\u00A0мероприятие',
  [Languages.UKR]: 'Зареєструйтеся на\u00A0захід',
  [Languages.BEL]: 'Зарэгіструйцеся на\u00A0мерапрыемства',
  [Languages.KAZ]: 'Шараға тіркеліңіз',
  [Languages.UZB]: 'Tadbirda\u00A0ro‘yxatdan o‘ting',
  [Languages.ENG]: 'Sign up for\u00A0event',
  [Languages.SPA]: 'Registrarse en\u00A0el\u00A0evento',
  [Languages.GERMAN]: 'Melden\u00A0Sie\u00A0sich für\u00A0die\u00A0Veranstaltung\u00A0an',
  [Languages.POL]: 'Zarejestruj się na\u00A0wydarzenie',
  [Languages.FRA]: 'Inscrivez-vous à\u00A0l\'événement',
  [Languages.TURKEY]: 'Eylemde\u00A0kaydolun',
};

const SUBMIT_APPLICATIONS: Lang = {
  [Languages.RUS]: 'Подайте заявку с\u00A0VK\u00A0ID',
  [Languages.UKR]: 'Подайте запит з\u00A0VK\u00A0ID',
  [Languages.BEL]: 'Падайце заяўку з\u00A0VK\u00A0ID',
  [Languages.KAZ]: 'VK\u00A0ID арқылы тапсырыс жасаңыз',
  [Languages.UZB]: 'VK\u00A0ID\u00A0yordamida talabnoma berish',
  [Languages.ENG]: 'Apply with\u00A0VK\u00A0ID',
  [Languages.SPA]: 'Solicitar con\u00A0VK\u00A0ID',
  [Languages.GERMAN]: 'Bewerben Sie mit\u00A0VK-ID',
  [Languages.POL]: 'Złóż wniosek z\u00A0VK\u00A0ID',
  [Languages.FRA]: 'Envoyez une\u00A0demande avec\u00A0VK\u00A0ID',
  [Languages.TURKEY]: 'VK\u00A0ID\u00A0yardımıyla başvuru gönderin',
};

const MAKE_ORDER_WITH_SERVICE: Lang = {
  [Languages.RUS]: 'Оформите заказ в\u00A0{service} с\u00A0VK\u00A0ID',
  [Languages.UKR]: 'Оформіть замовлення в\u00A0{service} з\u00A0VK\u00A0ID',
  [Languages.BEL]: 'Аформіце заказ у\u00A0{service} з\u00A0VK\u00A0ID',
  [Languages.KAZ]: '{service} сервисінде \u00A0VK\u00A0ID арқылы тапсырыс жасаңыз',
  [Languages.UZB]: 'VK\u00A0ID\u00A0orqali {service}\u00A0da buyurtma\u00A0shakllantirish',
  [Languages.ENG]: 'Place order on\u00A0{service} with\u00A0VK\u00A0ID',
  [Languages.SPA]: 'Realizar pedido en\u00A0{service} con\u00A0VK\u00A0ID',
  [Languages.GERMAN]: 'Machen Sie eine\u00A0Bestellung auf\u00A0{service} mit\u00A0VK-ID',
  [Languages.POL]: 'Wypełnij zamówienie w\u00A0{service} z\u00A0VK\u00A0ID',
  [Languages.FRA]: 'Passez la\u00A0commande sur\u00A0{service} avec\u00A0VK\u00A0ID',
  [Languages.TURKEY]: 'VK\u00A0ID\u00A0aracılığıyla {service} te sipariş oluşturun',
};

const MAKE_ORDER_WITHOUT_SERVICE: Lang = {
  [Languages.RUS]: 'Оформите заказ с\u00A0VK\u00A0ID',
  [Languages.UKR]: 'Оформіть замовлення з\u00A0VK\u00A0ID',
  [Languages.BEL]: 'Аформіце заказ з\u00A0VK\u00A0ID',
  [Languages.KAZ]: 'VK\u00A0ID арқылы тапсырыс жасаңыз',
  [Languages.UZB]: 'VK\u00A0ID\u00A0orqali buyurtmani shakllantirish',
  [Languages.ENG]: 'Place order with\u00A0VK\u00A0ID',
  [Languages.SPA]: 'Realizar pedido con\u00A0VK\u00A0ID',
  [Languages.GERMAN]: 'Machen Sie eine\u00A0Bestellung mit\u00A0VK-ID',
  [Languages.POL]: 'Wypełnij zamówienie z\u00A0VK\u00A0ID',
  [Languages.FRA]: 'Passez la\u00A0commande avec\u00A0VK\u00A0ID',
  [Languages.TURKEY]: 'VK\u00A0ID\u00A0aracılığıyla sipariş oluşturun',
};

export const getTitleLang = (contentId: FloatingOneTapContentId, lang: Languages, appName: string): string => {
  let result = SIGN_IN_TO_SERVICE[Languages.RUS];

  switch (contentId) {
    case FloatingOneTapContentId.SIGN_IN_TO_SERVICE:
      result = SIGN_IN_TO_SERVICE[lang];
      break;
    case FloatingOneTapContentId.SIGN_IN_TO_ACCOUNT:
      result = SIGN_IN_TO_ACCOUNT[lang];
      break;
    case FloatingOneTapContentId.REGISTRATION_FOR_EVENT:
      result = REGISTRATION_FOR_EVENT[lang];
      break;
    case FloatingOneTapContentId.SUBMIT_APPLICATIONS:
      result = SUBMIT_APPLICATIONS[lang];
      break;
    case FloatingOneTapContentId.MAKE_ORDER_WITH_SERVICE:
      result = MAKE_ORDER_WITH_SERVICE[lang];
      break;
    case FloatingOneTapContentId.MAKE_ORDER_WITHOUT_SERVICE:
      result = MAKE_ORDER_WITHOUT_SERVICE[lang];
      break;
    default:
      break;
  }

  return result.replace('{service}', appName);
};
