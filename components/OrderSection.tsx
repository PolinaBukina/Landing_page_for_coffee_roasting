import { CONTACTS } from '@/lib/content';
import { LeadForm } from './LeadForm';
import styles from './OrderSection.module.css';

export function OrderSection() {
  return (
    <section id="zayavka" className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.text}>
          <span className="eyebrow">Заявка</span>
          <h2>
            Оставьте номер&nbsp;— <em>перезвоним</em>
          </h2>
          <p className="lead">
            Корзина не нужна: менеджер перезвонит, поможет выбрать зерно и договорится о доставке или самовывозе.
          </p>

          <div className={styles.contacts}>
            <div>
              <h3>Мастерская</h3>
              <p>{CONTACTS.address}</p>
              <a href={CONTACTS.mapUrl} target="_blank" rel="noreferrer">
                На карте ↗
              </a>
            </div>
            <div>
              <h3>Часы работы</h3>
              {CONTACTS.hours.map((h) => (
                <p key={h.days}>
                  {h.days} — {h.time}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.formCard}>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
