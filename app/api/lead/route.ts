import { NextResponse } from 'next/server';

import { BY_PHONE_HINT, normalizeByPhone } from '@/lib/phone';
import { redis } from '@/lib/redis';

const INTERESTS = ['subscription', 'order', 'question'] as const;
type Interest = (typeof INTERESTS)[number];

const DEDUP_SECONDS = 10 * 60;

const SOURCE_KEYS = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
    'yclid', 'gclid', 'fbclid',
] as const;

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
            await redis.del(dedupKey).catch(() => undefined);
            throw error;
        }

        return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
    } catch (error) {
        console.error('[api/lead]', error);
        return fail(503, 'storage', 'Не получилось отправить заявку. Попробуйте ещё раз через минуту или позвоните нам.');
    }
}