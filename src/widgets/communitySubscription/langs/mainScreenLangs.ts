import { Languages } from '#/types';

type Text = Record<Languages, string>;

let subscribeButtonLang: Text = {
  [Languages.RUS]: 'Подписаться на сообщество',
  [Languages.UKR]: 'Підписатися на спільноту',
  [Languages.BEL]: '',
  [Languages.KAZ]: '',
  [Languages.UZB]: '',
  [Languages.ENG]: 'Follow community',
  [Languages.SPA]: 'Seguir a la comunidad',
  [Languages.GERMAN]: 'Community abonnieren',
  [Languages.POL]: 'Subskrybuj społeczność',
  [Languages.FRA]: 'Suivre la communauté',
  [Languages.TURKEY]: 'Topluluğa kaydol',
};
subscribeButtonLang = {
  ...subscribeButtonLang,
  [Languages.BEL]: subscribeButtonLang[Languages.ENG],
  [Languages.KAZ]: subscribeButtonLang[Languages.ENG],
  [Languages.UZB]: subscribeButtonLang[Languages.ENG],
};

let anotherTimeButtonLang: Text = {
  [Languages.RUS]: 'В другой раз',
  [Languages.UKR]: 'Іншим разом',
  [Languages.BEL]: '',
  [Languages.KAZ]: '',
  [Languages.UZB]: '',
  [Languages.ENG]: 'Maybe later',
  [Languages.SPA]: 'Quizás más tarde',
  [Languages.GERMAN]: 'Nächstes Mal',
  [Languages.POL]: 'Innym razem',
  [Languages.FRA]: 'Plus tard',
  [Languages.TURKEY]: 'Başka sefer',
};
anotherTimeButtonLang = {
  ...anotherTimeButtonLang,
  [Languages.BEL]: anotherTimeButtonLang[Languages.ENG],
  [Languages.KAZ]: anotherTimeButtonLang[Languages.ENG],
  [Languages.UZB]: anotherTimeButtonLang[Languages.ENG],
};

enum Plurals {
  One,
  Few,
  Many,
}

type TextWithPlurals = Record<Languages, Record<Plurals, string>>;

const getPlural = (langMap: TextWithPlurals) => (lang: Languages, count: number) => {
  const plural = count > 999 ? Plurals.Many : count % 10 === 1 && count % 100 !== 11 ? Plurals.One :
    count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20) ? Plurals.Few :
      Plurals.Many;
  return langMap[lang][plural];
};

let subscribersLang: TextWithPlurals = {
  [Languages.RUS]: {
    [Plurals.One]: ' подписчик',
    [Plurals.Few]: ' подписчика',
    [Plurals.Many]: ' подписчиков',
  },
  [Languages.UKR]: {
    [Plurals.One]: ' підписник',
    [Plurals.Few]: ' підписники',
    [Plurals.Many]: ' підписників',
  },
  [Languages.BEL]: {
    [Plurals.One]: '',
    [Plurals.Few]: '',
    [Plurals.Many]: '',
  },
  [Languages.KAZ]: {
    [Plurals.One]: '',
    [Plurals.Few]: '',
    [Plurals.Many]: '',
  },
  [Languages.UZB]: {
    [Plurals.One]: '',
    [Plurals.Few]: '',
    [Plurals.Many]: '',
  },
  [Languages.ENG]: {
    [Plurals.One]: ' follower',
    [Plurals.Few]: ' followers',
    [Plurals.Many]: ' followers',
  },
  [Languages.SPA]: {
    [Plurals.One]: ' seguidor',
    [Plurals.Few]: ' seguidores',
    [Plurals.Many]: ' seguidores',
  },
  [Languages.GERMAN]: {
    [Plurals.One]: ' Abonnent',
    [Plurals.Few]: ' Abonnenten',
    [Plurals.Many]: ' Abonnenten',
  },
  [Languages.POL]: {
    [Plurals.One]: ' subskrybent',
    [Plurals.Few]: ' subskrybenci',
    [Plurals.Many]: ' subskrybentów',
  },
  [Languages.FRA]: {
    [Plurals.One]: ' abonné',
    [Plurals.Few]: ' abonnés',
    [Plurals.Many]: ' abonnés',
  },
  [Languages.TURKEY]: {
    [Plurals.One]: ' abone',
    [Plurals.Few]: ' abone',
    [Plurals.Many]: ' abone',
  },
};
subscribersLang = {
  ...subscribersLang,
  [Languages.BEL]: subscribersLang[Languages.ENG],
  [Languages.KAZ]: subscribersLang[Languages.ENG],
  [Languages.UZB]: subscribersLang[Languages.ENG],
};

let friendsLang: TextWithPlurals = {
  [Languages.RUS]: {
    [Plurals.One]: ' друг',
    [Plurals.Few]: ' друга',
    [Plurals.Many]: ' друзей',
  },
  [Languages.UKR]: {
    [Plurals.One]: ' друг',
    [Plurals.Few]: ' друга',
    [Plurals.Many]: ' друзів',
  },
  [Languages.BEL]: {
    [Plurals.One]: '',
    [Plurals.Few]: '',
    [Plurals.Many]: '',
  },
  [Languages.KAZ]: {
    [Plurals.One]: '',
    [Plurals.Few]: '',
    [Plurals.Many]: '',
  },
  [Languages.UZB]: {
    [Plurals.One]: '',
    [Plurals.Few]: '',
    [Plurals.Many]: '',
  },
  [Languages.ENG]: {
    [Plurals.One]: ' friend',
    [Plurals.Few]: ' friends',
    [Plurals.Many]: ' friends',
  },
  [Languages.SPA]: {
    [Plurals.One]: ' amigo',
    [Plurals.Few]: ' amigos',
    [Plurals.Many]: ' amigos',
  },
  [Languages.GERMAN]: {
    [Plurals.One]: ' Freund',
    [Plurals.Few]: ' Freunde',
    [Plurals.Many]: ' Freunde',
  },
  [Languages.POL]: {
    [Plurals.One]: ' znajomy',
    [Plurals.Few]: ' znajomi',
    [Plurals.Many]: ' znajomych',
  },
  [Languages.FRA]: {
    [Plurals.One]: ' ami',
    [Plurals.Few]: ' amis',
    [Plurals.Many]: ' amis',
  },
  [Languages.TURKEY]: {
    [Plurals.One]: ' arkadaş',
    [Plurals.Few]: ' arkadaş',
    [Plurals.Many]: ' arkadaş',
  },
};
friendsLang = {
  ...friendsLang,
  [Languages.BEL]: friendsLang[Languages.ENG],
  [Languages.KAZ]: friendsLang[Languages.ENG],
  [Languages.UZB]: friendsLang[Languages.ENG],
};

const getFriendsPlural = getPlural(friendsLang);
const getSubscribersPlural = getPlural(subscribersLang);

export { subscribeButtonLang, anotherTimeButtonLang, getFriendsPlural, getSubscribersPlural };
