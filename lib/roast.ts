/** Обжарка — по четвергам, считаем по минскому времени (UTC+3, без перехода на летнее). */
const MINSK_OFFSET_MS = 3 * 60 * 60 * 1000;
const THURSDAY = 4;

const MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

export interface NextRoast {
  isToday: boolean;
  label: string; // «22 октября»
}

export function nextRoast(now: Date = new Date()): NextRoast {
  // «Минский» день недели и дата, независимо от часового пояса посетителя
  const minsk = new Date(now.getTime() + MINSK_OFFSET_MS);
  const day = minsk.getUTCDay();
  const daysAhead = (THURSDAY - day + 7) % 7;

  const roast = new Date(minsk.getTime() + daysAhead * 24 * 60 * 60 * 1000);

  return {
    isToday: daysAhead === 0,
    label: `${roast.getUTCDate()} ${MONTHS[roast.getUTCMonth()]}`,
  };
}
