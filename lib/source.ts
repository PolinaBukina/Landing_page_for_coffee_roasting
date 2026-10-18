export const SOURCE_KEYS = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
    'yclid', 'gclid', 'fbclid',
] as const;

type SourceKey = (typeof SOURCE_KEYS)[number];
export type LeadSource = Partial<Record<SourceKey | 'landing' | 'referrer', string>>;

const STORAGE_KEY = 'kvarta:source';

function current(): LeadSource {
    const params = new URLSearchParams(window.location.search);
    const source: LeadSource = {};
    for (const key of SOURCE_KEYS) {
        const value = params.get(key);
        if (value) source[key] = value.slice(0, 200);
    }
    source.landing = window.location.pathname + window.location.search;
    source.referrer = document.referrer;
    return source;
}

const fromAd = (source: LeadSource) => SOURCE_KEYS.some((key) => source[key]);

export function captureSource(): void {
    try {
        const now = current();
        if (fromAd(now) || !localStorage.getItem(STORAGE_KEY)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(now));
        }
    } catch {
    }
}

export function readSource(): LeadSource {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved) as LeadSource;
    } catch {
    }
    return current();
}