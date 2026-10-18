import { Redis } from '@upstash/redis';

let client: Redis | null = null;

/**
 * Подключение к Upstash создаётся при первом запросе, а не при импорте:
 * иначе сборка падает там, где переменных окружения нет.
 */
export function getRedis(): Redis {
  if (client) return client;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    throw new Error('Нет KV_REST_API_URL / KV_REST_API_TOKEN — выполните vercel env pull .env.local');
  }

  client = new Redis({ url, token });
  return client;
}
