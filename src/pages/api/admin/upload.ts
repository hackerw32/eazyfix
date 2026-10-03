import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { COOKIE_NAME, isValidSession } from '../../../lib/auth';

export const prerender = false;

interface MediaBucket {
  put(
    key: string,
    value: ArrayBuffer,
    options?: { metadata?: Record<string, string> }
  ): Promise<void>;
}

const MAX_BYTES = 6 * 1024 * 1024;
const EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!(await isValidSession(cookies.get(COOKIE_NAME)?.value))) {
    return json({ error: 'unauthorized' }, 401);
  }

  const bucket = (env as unknown as { MEDIA?: MediaBucket }).MEDIA;
  if (!bucket) return json({ error: 'media_not_configured' }, 500);

  let file: File | null = null;
  try {
    const form = await request.formData();
    const value = form.get('file');
    if (value instanceof File) file = value;
  } catch {
    return json({ error: 'invalid_form' }, 400);
  }

  if (!file) return json({ error: 'missing_file' }, 400);
  if (!file.type.startsWith('image/')) return json({ error: 'not_an_image' }, 400);
  if (file.size > MAX_BYTES) return json({ error: 'too_large' }, 413);

  const extension = EXTENSIONS[file.type] ?? 'bin';
  const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

  await bucket.put(key, await file.arrayBuffer(), {
    metadata: { contentType: file.type },
  });

  return json({ url: `/media/${key}` });
};
