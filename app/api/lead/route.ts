import { NextResponse } from 'next/server';

import { BY_PHONE_HINT, normalizeByPhone } from '@/lib/phone';
import { getRedis } from '@/lib/redis';
import { SOURCE_KEYS } from '@/lib/source';

const INTERESTS = ['subscription', 'order', 'question'] as const;
type Interest = (typeof INTERESTS)[number];

/** Повтор того же номера в течение 10 минут не создаёт новую заявку. */
const DEDUP_SECONDS = 10 * 60;

const text = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const fail = (status: number, error: string, message: string) =>
  NextResponse.json({ ok: false, error, message }, { status });

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail(400, 'bad_request', 'Не удалось прочитать заявку. Обновите страницу и попробуйте ещё раз.');
  }

  // Скрытое поле-ловушка: человек его не видит, бот заполняет.
  if (text(body.website, 200)) return NextResponse.json({ ok: true });

  const name = text(body.name, 80);
  const phone = normalizeByPhone(text(body.phone, 40));
  const interest = INTERESTS.includes(body.interest as Interest) ? (body.interest as Interest) : null;
  const comment = text(body.comment, 1000);

  const fields: Record<string, string> = {};
  if (!name) fields.name = 'Как к вам обращаться?';
  if (!phone) fields.phone = BY_PHONE_HINT;
  if (!interest) fields.interest = 'Выберите, что вас интересует';

  if (!phone || !interest || Object.keys(fields).length) {
    return NextResponse.json({ ok: false, error: 'validation', fields }, { status: 422 });
  }

  // Откуда пришёл клиент: метки рекламы, страница входа, сайт-источник.
  const raw = (body.source ?? {}) as Record<string, unknown>;
  const source: Record<string, string> = {};
  for (const key of SOURCE_KEYS) {
    const value = text(raw[key], 200);
    if (value) source[key] = value;
  }
  source.landing = text(raw.landing, 500);
  source.referrer = text(raw.referrer, 500) || text(req.headers.get('referer'), 500);

  const dedupKey = `lead:dedup:${phone}`;

  try {
    const redis = getRedis();

    // SET NX: ключ создаётся, только если его ещё нет. Это атомарно,
    // поэтому двойной клик не создаст две заявки даже при одновременных запросах.
    const fresh = await redis.set(dedupKey, '1', { nx: true, ex: DEDUP_SECONDS });
    if (fresh === null) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    const lead = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name,
      phone,
      interest,
      comment,
      source,
      userAgent: text(req.headers.get('user-agent'), 300),
    };

    try {
      await redis.lpush('leads', JSON.stringify(lead));
    } catch (error) {
      // Заявка не сохранилась — снимаем блокировку, чтобы человек мог повторить.
      await redis.del(dedupKey).catch(() => undefined);
      throw error;
    }

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error('[api/lead]', error);
    return fail(503, 'storage', 'Не получилось отправить заявку. Попробуйте ещё раз через минуту или загляните к нам: ул. Короля, 9.');
  }
}
