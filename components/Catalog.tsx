import { PRODUCTS } from '@/lib/content';
import { PrefillLink } from './PrefillLink';
import { Reveal } from './Reveal';
import styles from './Catalog.module.css';

export function Catalog() {
  return (
    <section id="zerno" className={`section ${styles.section}`}>
      <div className="container">
        <Reveal className={styles.head}>
          <span className="eyebrow">Зерно</span>
          <h2>
            Что обжариваем <em>сейчас</em>
          </h2>
          <p className="lead">
            Три сорта и дрип-пакеты. Не знаете, что выбрать, — напишите в заявке, чем варите, и подскажем.
          </p>
        </Reveal>
      </div>

      {/* На телефоне карточки листаются пальцем, на компьютере стоят в ряд */}
      <ul className={styles.list}>
        {PRODUCTS.map((product, index) => (
          <li key={product.id} className={styles.card}>
            <div className={styles.label}>
              <span className={styles.num}>№ {String(index + 1).padStart(2, '0')}</span>
              <span className={styles.pack}>{product.pack}</span>
            </div>

            <h3 className={styles.origin}>{product.origin}</h3>
            <p className={styles.region}>{product.region}</p>

            <dl className={styles.facts}>
              <div>
                <dt>Вкус</dt>
                <dd>{product.notes}</dd>
              </div>
              <div>
                <dt>Обжарка</dt>
                <dd>{product.roast}</dd>
              </div>
            </dl>

            <p className={styles.tip}>{product.tip}</p>

            <div className={styles.buy}>
              <span className={styles.price}>
                {product.price} <small>BYN</small>
              </span>
              <PrefillLink
                interest="order"
                comment={`${product.origin} ${product.region}, ${product.pack} — 1 шт.`}
                className={`btn btnGhost ${styles.order}`}
              >
                Заказать
              </PrefillLink>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
