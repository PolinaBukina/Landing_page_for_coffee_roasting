'use client';

import { useEffect, useRef, useState, type ComponentProps } from 'react';

type SubmitEvent = Parameters<NonNullable<ComponentProps<'form'>['onSubmit']>>[0];

import { BY_PHONE_HINT, normalizeByPhone } from '@/lib/phone';
import { captureSource, readSource } from '@/lib/source';
import styles from './LeadForm.module.css';

type Interest = 'subscription' | 'order' | 'question';
type Field = 'name' | 'phone' | 'interest';
type Status = 'idle' | 'sending' | 'done' | 'duplicate' | 'error';

const INTERESTS: { value: Interest; label: string }[] = [
    { value: 'subscription', label: 'Подписка' },
    { value: 'order', label: 'Разовый заказ' },
    { value: 'question', label: 'Вопрос' },
];

const TIMEOUT_MS = 15_000;
const NETWORK_ERROR =
    'Не получилось связаться с сервером. Проверьте интернет и нажмите «Отправить» ещё раз — всё, что вы ввели, сохранилось.';

export function LeadForm({ defaultInterest }: { defaultInterest?: Interest }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [interest, setInterest] = useState<Interest | ''>(defaultInterest ?? '');
    const [comment, setComment] = useState('');
    const [website, setWebsite] = useState('');

    const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
    const [status, setStatus] = useState<Status>('idle');
    const [message, setMessage] = useState('');

    const inFlight = useRef(false);

    useEffect(() => {
        captureSource();
    }, []);

    const clearError = (field: Field) =>
        setErrors((prev) => {
            if (!prev[field]) return prev;
            const next = { ...prev };
            delete next[field];
            return next;
        });

    const validate = () => {
        const found: Partial<Record<Field, string>> = {};
        if (!name.trim()) found.name = 'Как к вам обращаться?';
        if (!normalizeByPhone(phone)) found.phone = BY_PHONE_HINT;
        if (!interest) found.interest = 'Выберите, что вас интересует';
        return found;
    };

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        if (inFlight.current) return;

        const form = event.currentTarget;
        const found = validate();
        setErrors(found);
        if (Object.keys(found).length) {
            requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
            return;
        }

        inFlight.current = true;
        setStatus('sending');
        setMessage('');

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
            const res = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, interest, comment, website, source: readSource() }),
                signal: controller.signal,
            });
            const data = await res.json().catch(() => ({}));

            if (res.ok && data.ok) {
                setStatus(data.duplicate ? 'duplicate' : 'done');
                return;
            }
            if (res.status === 422 && data.fields) {
                setErrors(data.fields);
                setStatus('idle');
                return;
            }
            setStatus('error');
            setMessage(data.message || 'Что-то пошло не так. Попробуйте ещё раз через минуту.');
        } catch {
            setStatus('error');
            setMessage(NETWORK_ERROR);
        } finally {
            clearTimeout(timer);
            inFlight.current = false;
        }
    }

    if (status === 'done' || status === 'duplicate') {
        return (
            <div className={styles.done} role="status">
                <p className={styles.doneTitle}>
                    {status === 'done' ? 'Спасибо, заявка у нас!' : 'Эта заявка уже у нас'}
                </p>
                <p>
                    {status === 'done'
                        ? 'Менеджер перезвонит в рабочее время: пн–пт 8:00–20:00, сб–вс 10:00–18:00.'
                        : 'Вы уже отправляли заявку с этим номером — повторять не нужно, мы перезвоним.'}
                </p>
            </div>
        );
    }

    const sending = status === 'sending';

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label className={styles.field}>
                <span>Имя</span>
                <input
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); clearError('name'); }}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'err-name' : undefined}
                />
                {errors.name && <small id="err-name" className={styles.error}>{errors.name}</small>}
            </label>

            <label className={styles.field}>
                <span>Телефон</span>
                <input
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+375 29 123-45-67"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); clearError('phone'); }}
                    onBlur={() => {
                        if (phone.trim() && !normalizeByPhone(phone)) setErrors((p) => ({ ...p, phone: BY_PHONE_HINT }));
                    }}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'err-phone' : undefined}
                />
                {errors.phone && <small id="err-phone" className={styles.error}>{errors.phone}</small>}
            </label>

            <fieldset
                className={styles.choices}
                aria-invalid={Boolean(errors.interest)}
                aria-describedby={errors.interest ? 'err-interest' : undefined}
            >
                <legend>Что вас интересует</legend>
                {INTERESTS.map((item) => (
                    <label key={item.value} className={styles.choice}>
                        <input
                            type="radio"
                            name="interest"
                            value={item.value}
                            checked={interest === item.value}
                            onChange={() => { setInterest(item.value); clearError('interest'); }}
                        />
                        {item.label}
                    </label>
                ))}
                {errors.interest && <small id="err-interest" className={styles.error}>{errors.interest}</small>}
            </fieldset>

            <label className={styles.field}>
                <span>Комментарий <i>— необязательно</i></span>
                <textarea name="comment" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
            </label>

            <div className={styles.trap} aria-hidden="true">
                <input tabIndex={-1} autoComplete="off" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>

            {status === 'error' && <p className={styles.alert} role="alert">{message}</p>}

            <button type="submit" disabled={sending}>
                {sending ? 'Отправляем…' : 'Отправить заявку'}
            </button>
        </form>
    );
}