import Image from 'next/image';

import { RoastStamp } from './RoastStamp';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <Image
        src="/images/hero.jpg"
        alt="Свежеобжаренное зерно высыпается в охлаждающий лоток ростера"
        fill
        preload
        sizes="100vw"
        className={styles.photo}
      />
      <div className={styles.shade} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <p className={styles.kicker}>Обжарка кофе · Минск · с 2019 года</p>

        <h1 className={styles.title}>Кварта</h1>

        <div className={styles.bottom}>
          <p className={styles.lead}>
            Обжариваем по четвергам, привозим по пятницам. Зерно приезжает к вам на 1–3 день после обжарки —
            когда вкус самый живой.
          </p>

          <div className={styles.actions}>
            <a href="#zayavka" className="btn">
              Оставить заявку
            </a>
            <a href="#zerno" className={styles.link}>
              Посмотреть зерно ↓
            </a>
          </div>
        </div>

        <RoastStamp />
      </div>
    </section>
  );
}
