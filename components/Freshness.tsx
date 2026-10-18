import Image from 'next/image';

import { Reveal } from './Reveal';
import styles from './Freshness.module.css';

const STEPS = [
  { day: 'Чт', text: 'Обжариваем партию по 5 кг' },
  { day: 'Пт', text: 'Развозим по Минску' },
  { day: '1–3', text: 'день — пьёте у себя дома или в офисе' },
];

export function Freshness() {
  return (
    <section id="svezhest" className="section">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.media}>
          <Image
            src="/images/beans.jpg"
            alt="Свежеобжаренные кофейные зёрна на льняной ткани"
            fill
            sizes="(min-width: 900px) 45vw, 100vw"
            className={styles.photo}
          />
        </Reveal>

        <Reveal className={styles.text}>
          <span className="eyebrow">Почему свежесть</span>
          <h2>
            Кофе живёт <em>недолго</em>
          </h2>
          <p className="lead">
            После обжарки зерно несколько дней раскрывается, а через пару месяцев выдыхается — даже в красивой
            пачке. На полке магазина оно часто стоит именно столько. Мы обжариваем маленькими партиями и сразу
            отдаём — поэтому до вас кофе доезжает, пока вкус самый яркий.
          </p>

          <ol className={styles.steps}>
            {STEPS.map((step) => (
              <li key={step.day}>
                <span className={styles.day}>{step.day}</span>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
