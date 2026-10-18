/** Все факты о «Кварте» в одном месте — тексты в блоках берутся отсюда. */

export type Interest = 'subscription' | 'order' | 'question';

export interface Product {
  id: string;
  origin: string;
  region: string;
  notes: string;
  roast: string;
  pack: string;
  price: number;
  /** Для чего подходит — короткая подсказка от бариста. */
  tip: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'ethiopia',
    origin: 'Эфиопия',
    region: 'Иргачеффе',
    notes: 'цветочный, бергамот',
    roast: 'светлая обжарка',
    pack: '250 г',
    price: 32,
    tip: 'Раскрывается в воронке и аэропрессе',
  },
  {
    id: 'colombia',
    origin: 'Колумбия',
    region: 'Уила',
    notes: 'карамель, красное яблоко',
    roast: 'средняя обжарка',
    pack: '250 г',
    price: 29,
    tip: 'Хорош и в фильтре, и с молоком',
  },
  {
    id: 'brazil',
    origin: 'Бразилия',
    region: 'Серрадо',
    notes: 'орех, шоколад',
    roast: 'под эспрессо',
    pack: '250 г',
    price: 26,
    tip: 'Для кофемашины, капучино и моки',
  },
  {
    id: 'drip',
    origin: 'Дрип-пакеты',
    region: 'ассорти',
    notes: 'все три сорта',
    roast: 'для офиса и поездок',
    pack: '10 штук',
    price: 18,
    tip: 'Залить кипятком — и готово, без техники',
  },
];

export const SUBSCRIPTION = {
  price: 54,
  packs: '2 пачки по 250 г',
  period: 'раз в месяц',
};

export const CONTACTS = {
  address: 'Минск, ул. Короля, 9',
  mapUrl: 'https://yandex.by/maps/?text=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA%2C%20%D1%83%D0%BB.%20%D0%9A%D0%BE%D1%80%D0%BE%D0%BB%D1%8F%2C%209',
  hours: [
    { days: 'пн–пт', time: '8:00–20:00' },
    { days: 'сб–вс', time: '10:00–18:00' },
  ],
};

export const DELIVERY = {
  day: 'пятница',
  freeFrom: 50,
};

/** Событие «заполни форму»: кнопки в каталоге и подписке подставляют выбор в форму. */
export const PREFILL_EVENT = 'kvarta:prefill';

export interface PrefillDetail {
  interest: Interest;
  comment?: string;
}
