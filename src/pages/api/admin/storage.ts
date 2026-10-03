import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { COOKIE_NAME, isValidSession } from '../../../lib/auth';

export const prerender = false;

interface KVListKey {
  name: string;
  metadata?: { size?: number | string; kind?: string } | null;
}

interface KVListResult {
  keys: KVListKey[];
  list_complete: boolean;
  cursor?: string;
}

interface MediaBucket {
  list(options?: { cursor?: string }): Promise<KVListResult>;
}

const LIMIT_BYTES = 1024 * 1024 * 1024;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export const GET: APIRoute = async ({ cookies }) => {
  if (!(await isValidSession(cookies.get(COOKIE_NAME)?.value))) {
    return json({ error: 'unauthorized' }, 401);
  }

  const bucket = (env as unknown as { MEDIA?: MediaBucket }).MEDIA;
  if (!bucket) return json({ error: 'media_not_configured' }, 500);

  let used = 0;
  let images = 0;
  let files = 0;
  let cursor: string | undefined;

  try {
    do {
      const result = await bucket.list(cursor ? { cursor } : undefined);
      for (const key of result.keys) {
        used += Number(key.metadata?.size ?? 0);
        if (key.name.startsWith('files/')) files += 1;
        else images += 1;
      }
      cursor = result.list_complete ? undefined : result.cursor;
    } while (cursor);
  } catch {
    /* ignore listing errors */
  }

  return json({ used, limit: LIMIT_BYTES, images, files });
};
