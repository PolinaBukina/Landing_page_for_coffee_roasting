import Image from 'next/image';

import { SUBSCRIPTION } from '@/lib/content';
import { PrefillLink } from './PrefillLink';
import { Reveal } from './Reveal';
import styles from './Subscription.module.css';

const INCLUDED = [
  `${SUBSCRIPTION.packs} ${SUBSCRIPTION.period}`,
  'Зерно из свежей четверговой обжарки',
  'Доставка по Минску бесплатно',
  'Сорта подберём под то, чем вы варите',
];

export function Subscription() {
  return (
    <section id="podpiska" className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.text}>
          <span className={`eyebrow ${styles.eyebrow}`}>Подписка</span>
          <h2>
            Свежий кофе <em>без напоминаний</em>
          </h2>
          <p className={styles.lead}>
            Не нужно следить, когда закончится пачка. Раз в месяц привозим две — из той обжарки, что была
            накануне.
          </p>

          <div className={styles.media}>
            <Image
              src="/images/bags.jpg"
              alt="Крафтовые пачки свежего кофе на рабочем столе обжарщика"
              fill
              sizes="(min-width: 900px) 40vw, 100vw"
              className={styles.photo}
            />
          </div>
        </Reveal>

        <Reveal className={styles.card}>
          <p className={styles.price}>
            {SUBSCRIPTION.price}
            <span> BYN / мес</span>
          </p>

          <ul className={styles.list}>
            {INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <PrefillLink interest="subscription" className={`btn ${styles.cta}`}>
            Оформить подписку
          </PrefillLink>
          <p className={styles.note}>Менеджер перезвонит и уточнит сорта и адрес.</p>
        </Reveal>
      </div>
    </section>
  );
}
