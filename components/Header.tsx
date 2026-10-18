import styles from './Header.module.css';

const NAV = [
  { href: '#svezhest', label: 'Свежесть' },
  { href: '#zerno', label: 'Зерно' },
  { href: '#podpiska', label: 'Подписка' },
  { href: '#dostavka', label: 'Доставка' },
  { href: '#my', label: 'О нас' },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.logo} aria-label="Кварта — наверх">
          Кварта
        </a>

        <nav className={styles.nav} aria-label="Разделы">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#zayavka" className={styles.cta}>
          Заявка
        </a>
      </div>
    </header>
  );
}
