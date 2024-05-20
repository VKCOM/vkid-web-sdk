import { Languages } from '#/types';

import { Lang } from './types';

const DESCRIPTION: Lang = {
  [Languages.RUS]: 'После этого вам станут доступны все возможности сервиса. Ваши данные будут надёжно защищены.',
  [Languages.UKR]: 'Після цього вам стануть доступні всі можливості сервісу. Ваші дані будуть надійно захищені.',
  [Languages.BEL]: 'Пасля гэтага вам стануць даступны ўсе магчымасці сэрвісу. Вашы даныя будуць надзейна абаронены.',
  [Languages.KAZ]: 'Содан кейін сізге сервистің барлық мүмкіндігі қолжетімді болып, деректеріңіз сенімді қораулы болады.',
  [Languages.UZB]: 'Bundan so‘ng, sizga xizmatning barcha imkoniyatlari ochiladi. Maʼlumotlaringiz ishonchli himoyalanadi.',
  [Languages.ENG]: 'Afterwards, you\'ll have access to\u00A0all of\u00A0the\u00A0service\'s features. Your personal data will be carefully protected.',
  [Languages.SPA]: 'Después, tendrás acceso a\u00A0todas las funciones del\u00A0servicio. Tus datos personales estarán cuidadosamente protegidos.',
  [Languages.GERMAN]: 'Anschließend stehen Ihnen alle Funktionen des Dienstes zur Verfügung. Ihre\u00A0persönlichen Daten werden sorgfältig geschützt.',
  [Languages.POL]: 'Po tym wszystkie funkcje serwisu będą dostępne. Twoje dane będą dobrze chronione.',
  [Languages.FRA]: 'Cela vous permettra d\'avoir accès à\u00A0toutes les\u00A0fonctionnalités du service. Vos données personnelles seront soigneusement protégées.',
  [Languages.TURKEY]: 'Bundan sonra hizmetin tüm özellikleri kullanımınıza sunulacaktır. Verileriniz güvenilir bir şekilde korunacaktır.',
};

export const getDescriptionLang = (lang: Languages): string => {
  return DESCRIPTION[lang] || DESCRIPTION[Languages.RUS];
};
