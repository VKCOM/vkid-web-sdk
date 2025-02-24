import { Languages } from '#/types';

type Text = Record<Languages, string>;

let failTitleLang: Text = {
  [Languages.RUS]: 'Не удалось подписаться',
  [Languages.UKR]: 'Не вдалося підписатися',
  [Languages.BEL]: '',
  [Languages.KAZ]: '',
  [Languages.UZB]: '',
  [Languages.ENG]: 'Failed to follow community',
  [Languages.SPA]: 'No se pudo seguir a la comunidad',
  [Languages.GERMAN]: 'Das Abonnieren ist fehlgeschlagen',
  [Languages.POL]: 'Nie udało się zasubskrybować',
  [Languages.FRA]: 'Impossible de s\'abonner',
  [Languages.TURKEY]: 'Abone olunamadı',
};
failTitleLang = {
  ...failTitleLang,
  [Languages.BEL]: failTitleLang[Languages.ENG],
  [Languages.KAZ]: failTitleLang[Languages.ENG],
  [Languages.UZB]: failTitleLang[Languages.ENG],
};

let failDescriptionLang: Text = {
  [Languages.RUS]: 'Попробуйте еще раз',
  [Languages.UKR]: 'Спробуйте ще раз',
  [Languages.BEL]: '',
  [Languages.KAZ]: '',
  [Languages.UZB]: '',
  [Languages.ENG]: 'Please try again',
  [Languages.SPA]: 'Prueba de nuevo',
  [Languages.GERMAN]: 'Versuchen Sie es noch einmal',
  [Languages.POL]: 'Spróbuj jeszcze raz',
  [Languages.FRA]: 'Veuillez réessayer',
  [Languages.TURKEY]: 'Tekrar deneyin',
};
failDescriptionLang = {
  ...failDescriptionLang,
  [Languages.BEL]: failDescriptionLang[Languages.ENG],
  [Languages.KAZ]: failDescriptionLang[Languages.ENG],
  [Languages.UZB]: failDescriptionLang[Languages.ENG],
};

let retryButtonLang: Text = {
  [Languages.RUS]: 'Повторить попытку',
  [Languages.UKR]: 'Повторити спробу',
  [Languages.BEL]: '',
  [Languages.KAZ]: '',
  [Languages.UZB]: '',
  [Languages.ENG]: 'Try again',
  [Languages.SPA]: 'Probar de nuevo',
  [Languages.GERMAN]: 'Erneut versuchen',
  [Languages.POL]: 'Powtórz próbę',
  [Languages.FRA]: 'Réessayer',
  [Languages.TURKEY]: 'Tekrar dene',
};
retryButtonLang = {
  ...retryButtonLang,
  [Languages.BEL]: retryButtonLang[Languages.ENG],
  [Languages.KAZ]: retryButtonLang[Languages.ENG],
  [Languages.UZB]: retryButtonLang[Languages.ENG],
};

let cancelButtonLang: Text = {
  [Languages.RUS]: 'Отмена',
  [Languages.UKR]: 'Скасувати',
  [Languages.BEL]: '',
  [Languages.KAZ]: '',
  [Languages.UZB]: '',
  [Languages.ENG]: 'Cancel',
  [Languages.SPA]: 'Cancelar',
  [Languages.GERMAN]: 'Abbrechen',
  [Languages.POL]: 'Anuluj',
  [Languages.FRA]: 'Annuler',
  [Languages.TURKEY]: 'İptal',
};
cancelButtonLang = {
  ...cancelButtonLang,
  [Languages.BEL]: cancelButtonLang[Languages.ENG],
  [Languages.KAZ]: cancelButtonLang[Languages.ENG],
  [Languages.UZB]: cancelButtonLang[Languages.ENG],
};

export { failTitleLang, failDescriptionLang, retryButtonLang, cancelButtonLang };
