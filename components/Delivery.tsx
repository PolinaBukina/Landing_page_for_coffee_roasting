import { CONTACTS, DELIVERY } from '@/lib/content';
import { Reveal } from './Reveal';
import styles from './Delivery.module.css';

interface Row {
  name: string;
  value: string;
}

const DELIVERY_ROWS: Row[] = [
  { name: 'День доставки', value: DELIVERY.day },
  { name: `Заказ от ${DELIVERY.freeFrom} BYN`, value: 'бесплатно' },
  { name: `Заказ до ${DELIVERY.freeFrom} BYN`, value: 'уточнит менеджер' },
  { name: 'Подписка', value: 'всегда бесплатно' },
];

const PICKUP_ROWS: Row[] = [
  { name: 'Адрес', value: 'ул. Короля, 9' },
  ...CONTACTS.hours.map((h) => ({ name: h.days, value: h.time })),
];

function PriceList({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div>
      <h3 className={styles.title}>{title}</h3>
      <dl className={styles.list}>
        {rows.map((row) => (
          <div key={row.name} className={styles.row}>
            <dt>{row.name}</dt>
            <span className={styles.dots} aria-hidden="true" />
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Delivery() {
  return (
    <section id="dostavka" className="section">
      <div className="container">
        <Reveal className={styles.head}>
          <span className="eyebrow">Доставка и самовывоз</span>
          <h2>
            Привезём <em>в пятницу</em> или заберите сами
          </h2>
        </Reveal>

        <Reveal className={styles.columns}>
          <PriceList title="Доставка по Минску" rows={DELIVERY_ROWS} />
          <PriceList title="Самовывоз из мастерской" rows={PICKUP_ROWS} />
        </Reveal>

        <p className={styles.map}>
          <a href={CONTACTS.mapUrl} target="_blank" rel="noreferrer">
            Открыть мастерскую на карте ↗
          </a>
        </p>
      </div>
    </section>
  );
}
