import { CONTACTS } from '@/lib/content';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.logo}>Кварта</p>
          <p className={styles.muted}>Обжарка кофе в Минске с 2019 года</p>
        </div>
        <div className={styles.muted}>
          <p>{CONTACTS.address}</p>
          <p>{CONTACTS.hours.map((h) => `${h.days} ${h.time}`).join(' · ')}</p>
        </div>
        <p className={`${styles.muted} ${styles.small}`}>
          Учебный проект: клиент вымышленный, заявки никто не обработает.
        </p>
      </div>
    </footer>
  );
}
