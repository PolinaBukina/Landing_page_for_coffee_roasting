'use client';

import { useSyncExternalStore } from 'react';

import { nextRoast } from '@/lib/roast';
import styles from './Hero.module.css';

/* Дата считается в браузере, чтобы не «застывала» на дне сборки сайта.
   На сервере (и в первую долю секунды) — нейтральный текст «каждую неделю». */
const subscribe = () => () => {};
const getSnapshot = () => {
  const roast = nextRoast();
  return `${roast.isToday ? 'today' : 'thu'}|${roast.label}`;
};
const getServerSnapshot = () => '';

/** Круглый штамп «ближайшая обжарка» — как печать на крафтовой пачке. */
export function RoastStamp() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [kind, label] = snapshot ? snapshot.split('|') : ['', ''];
  const isToday = kind === 'today';

  return (
    <div className={styles.stamp} aria-label={label ? `Ближайшая обжарка: ${label}` : 'Обжарка по четвергам'}>
      <span className={styles.stampTop}>{isToday ? 'обжариваем' : 'ближайшая обжарка'}</span>
      <span className={styles.stampDay}>{isToday ? 'сегодня' : 'чт'}</span>
      <span className={styles.stampDate}>{label || 'каждую неделю'}</span>
    </div>
  );
}
