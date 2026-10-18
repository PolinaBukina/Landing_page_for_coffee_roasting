import { Redis } from '@upstash/redis';

const url = process.env.KV_REST_API_URL;
const token = process.env.KV_REST_API_TOKEN;

if (!url || !token) {
    throw new Error('Нет KV_REST_API_URL / KV_REST_API_TOKEN — выполните vercel env pull .env.local');
}

export const redis = new Redis({ url, token });