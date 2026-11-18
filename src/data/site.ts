// Facts for the homepage. Every value comes from veon/client.json (ids in comments); nothing is invented here.
const NB = " ";

/** "10540" -> "10 540 грн" with non-breaking spaces. */
export function uah(value: number): string {
  return value.toLocaleString("uk-UA").replace(/\s/g, NB) + NB + "грн";
}

export interface Phone { display: string; href: string; purpose: string; }

// company.contacts.phones
export const phones = {
  main: { display: `067${NB}653${NB}70${NB}65`, href: "tel:+380676537065", purpose: "Основний номер, обидві філії" },
  pregnancy: { display: `067${NB}200${NB}45${NB}33`, href: "tel:+380672004533", purpose: "Постановка на облік з вагітності" },
  surgery: { display: `096${NB}533${NB}52${NB}21`, href: "tel:+380965335221", purpose: "Операційний координатор" },
} satisfies Record<string, Phone>;

// company.contacts.messengers, company.contacts.emails (C-025)
export const channels = {
  telegram: "https://t.me/medialtclinic",
  viber: "viber://chat?number=%2B380676537065",
  email: "medialtclinic@gmail.com",
};

// socials[] with status confirmed
export const socials = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/medialt.clinic/" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/medialtClinics/" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@medialt.clinic" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@medialt.clinic" },
] as const;

export type Day = "Пн" | "Вт" | "Ср" | "Чт" | "Пт" | "Сб" | "Нд";
export const days: { short: Day; full: string }[] = [
  { short: "Пн", full: "Понеділок" },
  { short: "Вт", full: "Вівторок" },
  { short: "Ср", full: "Середа" },
  { short: "Чт", full: "Четвер" },
  { short: "Пт", full: "Пʼятниця" },
  { short: "Сб", full: "Субота" },
  { short: "Нд", full: "Неділя" },
];

const weekday = "8:00–20:00";
const saturday = "8:00–19:00";

function mapUrl(query: string): string {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
}

// company.contacts.addresses, C-001, C-002, C-003
export const branches = [
  {
    id: "uhorska",
    name: "Medialt на Угорській",
    street: `вул.${NB}Угорська,${NB}12`,
    complex: "ЖК «Софіївка»",
    city: "Львів, 79048",
    hours: [weekday, weekday, weekday, weekday, weekday, saturday, null] as (string | null)[],
    onlyLabel: "Важливо знати",
    only: ["У неділю філія не працює, приймає Пасічна"],
    map: mapUrl("Medialt, вул. Угорська, 12, Львів"),
    photo: "uhorska",
    alt: "Фасад медичного центру Medialt на вулиці Угорській, 12: вивіска і жовтий знак з плюсом",
  },
  {
    id: "pasichna",
    name: "Medialt на Пасічній",
    street: `вул.${NB}Пасічна,${NB}166`,
    complex: "ЖК Hygge Lux",
    city: "Львів, 79028, Личаківський район",
    hours: [weekday, weekday, weekday, weekday, weekday, saturday, "9:00–15:00"] as (string | null)[],
    onlyLabel: "Лише тут",
    only: [
      "Операційний блок і хірургія одного дня",
      "Прийом у неділю, 9:00–15:00",
      "Забір аналізів у неділю, 9:00–12:00",
    ],
    map: mapUrl("Medialt, вул. Пасічна, 166, Львів"),
    photo: "pasichna",
    alt: "Рецепція Medialt на Пасічній: дерев'яна стійка і кругле дзеркало-арка з плюсом",
  },
] as const;

// C-002
export const labNote = "Забір аналізів: пн–сб, 8:00–13:00; у неділю, 9:00–12:00, лише на Пасічній.";

export interface Price { label: string; value: string; }
export interface Route {
  id: string;
  name: string;
  from: string;
  lead: string;
  main: Price;
  prices: Price[];
  extra?: string[];
  where: string;
  line: { label: string; phone?: Phone; telegram?: boolean };
  more: string;
  photo: string;
  alt: string;
}

// company.products_services, company.business_lines, C-003, C-007, C-008
export const routes: Route[] = [
  {
    id: "pregnancy",
    name: "Вагітність",
    from: "від" + NB + uah(10540),
    lead: "Пакети ведення вагітності за триместрами і окрема лінія для постановки на облік.",
    main: { label: "I триместр", value: uah(23300) },
    prices: [
      { label: "II триместр", value: "від" + NB + uah(10540) },
      { label: "III триместр", value: uah(19420) },
      { label: "Допологова консультація педіатра", value: uah(1970) },
    ],
    where: "Адміністратор підкаже філію і лікаря, який вестиме вагітність.",
    line: { label: "Окрема лінія вагітності", phone: phones.pregnancy },
    more: "Що входить у пакет",
    photo: "pregnancy",
    alt: "Лікарка Medialt у зеленій формі проводить УЗД",
  },
  {
    id: "child",
    name: "Дитині",
    from: "від" + NB + uah(1270),
    lead: "Педіатр, вакцинація і супровід малюка в пакеті «Здоровий малюк». Дитячі ЛОР, алерголог, гастроентеролог, гінеколог, психіатр.",
    main: { label: "Консультація педіатра", value: uah(1270) },
    prices: [
      { label: "Пакет «Здоровий малюк»", value: "від" + NB + uah(17920) },
      { label: "Чекап для немовлят 0–9 міс", value: uah(6180) },
      { label: "Довідка 086/о", value: "від" + NB + uah(2360) },
    ],
    where: "У неділю, 9:00–15:00, відчинена філія на Пасічній.",
    line: { label: "Записати дитину", phone: phones.main, telegram: true },
    more: "Усі дитячі послуги",
    photo: "child",
    alt: "Світлий коридор клініки з полицями дитячих книжок",
  },
  {
    id: "adult",
    name: "Дорослим",
    from: "від" + NB + uah(1270),
    lead: "23 спеціальності: сімейний лікар, акушер-гінеколог, кардіолог, ендокринолог, ЛОР, невролог, уролог та інші.",
    main: { label: "Консультація профільного лікаря", value: uah(1270) },
    prices: [
      { label: "Психіатр", value: uah(1890) },
      { label: "Комплексне УЗД ОЧП", value: uah(1400) },
      { label: "Холтер-ЕКГ 24 год", value: uah(1540) },
    ],
    where: "Аналізи — з лабораторіями-партнерами Synevo і Dila.",
    line: { label: "Записатися до лікаря", phone: phones.main, telegram: true },
    more: "Усі спеціальності",
    photo: "adult",
    alt: "Лікарка Medialt усміхається пацієнтці під час консультації",
  },
  {
    id: "checkup",
    name: "Check-up",
    from: "від" + NB + uah(2920),
    lead: "13 програм обстеження: для жінок, чоловіків, дітей, серця.",
    main: { label: "Кардіо-чекап", value: uah(2920) },
    prices: [
      { label: "Для жінок до 40", value: "від" + NB + uah(6470) },
      { label: "Для школярів", value: uah(7260) },
      { label: "Для чоловіків", value: "від" + NB + uah(13080) },
    ],
    where: "Не знаєте, яку програму обрати? Напишіть у Telegram, адміністратор підбере.",
    line: { label: "Підібрати програму", phone: phones.main, telegram: true },
    more: "Усі чекапи",
    photo: "checkup",
    alt: "Адміністраторки Medialt з документами біля рецепції",
  },
  {
    id: "surgery",
    name: "Хірургія",
    from: "через координатора",
    lead: "Хірургія одного дня в операційному блоці на Пасічній, 166.",
    main: { label: "Вартість", value: "розраховує координатор після консультації" },
    prices: [],
    extra: ["Загальна", "ЛОР", "Оперативна гінекологія", "Оперативна урологія", "Пластична"],
    where: "Операційний блок працює лише на Пасічній.",
    line: { label: "Операційний координатор", phone: phones.surgery },
    more: "Усі напрями хірургії",
    photo: "surgery",
    alt: "Двоє хірургів Medialt під час операції в операційній",
  },
];

// header and mobile menu anchors (ux/demo-home.md §6)
export const anchors = [
  { href: "#routes", label: "Напрями" },
  { href: "#branches", label: "Філії" },
  { href: "#trust", label: "Чому Medialt" },
  { href: "#book", label: "Як записатися" },
  { href: "#contacts", label: "Контакти" },
];

export const FUTURE = "Розділ у розробці";
