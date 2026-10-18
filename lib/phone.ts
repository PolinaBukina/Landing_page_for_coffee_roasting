/** Мобильные операторы (A1, МТС, life:) и городские Минска. */
const CODES = ['25', '29', '33', '44', '17'];

export const BY_PHONE_HINT = 'Нужен белорусский номер, например +375 29 123-45-67';

/**
 * Принимает «+375 (29) 123-45-67», «80291234567», «291234567» и т.п.
 * Возвращает номер в виде +375291234567 или null, если номер неверный.
 */
export function normalizeByPhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');

  if (digits.startsWith('375')) digits = digits.slice(3);
  else if (digits.startsWith('80')) digits = digits.slice(2);

  if (digits.length !== 9) return null;
  if (!CODES.includes(digits.slice(0, 2))) return null;

  return `+375${digits}`;
}
