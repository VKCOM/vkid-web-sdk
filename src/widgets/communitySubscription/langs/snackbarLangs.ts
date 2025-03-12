import { Languages } from '#/types';

type Text = Record<Languages, string>;

let snackbarLang: Text = {
  [Languages.RUS]: 'Вы подписаны на сообщество',
  [Languages.UKR]: 'Ви підписані на спільноту',
  [Languages.ENG]: 'You now follow this community',
  [Languages.SPA]: 'Ahora sigues a esta comunidad',
  [Languages.GERMAN]: 'Sie folgen dieser Community',
  [Languages.POL]: 'Subskrybujesz społeczność',
  [Languages.FRA]: 'Vous suivez la communauté',
  [Languages.TURKEY]: 'Siz topluluğa abonesiniz',
  [Languages.BEL]: '',
  [Languages.KAZ]: '',
  [Languages.UZB]: '',
};

snackbarLang = {
  ...snackbarLang,
  [Languages.BEL]: snackbarLang[Languages.ENG],
  [Languages.KAZ]: snackbarLang[Languages.ENG],
  [Languages.UZB]: snackbarLang[Languages.ENG],
};

export { snackbarLang };
