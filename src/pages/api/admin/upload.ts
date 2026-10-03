import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { COOKIE_NAME, isValidSession } from '../../../lib/auth';

export const prerender = false;

interface MediaBucket {
  put(
    key: string,
    value: ArrayBuffer,
    options?: { metadata?: Record<string, string | number> }
  ): Promise<void>;
}

const IMAGE_MAX = 6 * 1024 * 1024;
const FILE_MAX = 24 * 1024 * 1024;

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

function safeName(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
  return (cleaned || 'file').slice(0, 80);
}

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!(await isValidSession(cookies.get(COOKIE_NAME)?.value))) {
    return json({ error: 'unauthorized' }, 401);
  }

  const bucket = (env as unknown as { MEDIA?: MediaBucket }).MEDIA;
  if (!bucket) return json({ error: 'media_not_configured' }, 500);

  let file: File | null = null;
  let kind = 'image';
  try {
    const form = await request.formData();
    const value = form.get('file');
    if (value instanceof File) file = value;
    const requestedKind = form.get('kind');
    if (typeof requestedKind === 'string' && requestedKind === 'file') kind = 'file';
  } catch {
    return json({ error: 'invalid_form' }, 400);
  }

  if (!file) return json({ error: 'missing_file' }, 400);

  const isFile = kind === 'file';
  const max = isFile ? FILE_MAX : IMAGE_MAX;

  if (!isFile && !file.type.startsWith('image/')) return json({ error: 'not_an_image' }, 400);
  if (file.size > max) {
    return json({ error: 'too_large', max }, 413);
  }

  const cleanName = safeName(file.name || 'file');
  const extension = isFile
    ? cleanName.includes('.')
      ? cleanName.split('.').pop()
      : 'bin'
    : EXTENSIONS[file.type] ?? 'bin';
  const key = isFile
    ? `files/${Date.now()}-${cleanName}`
    : `img/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

  await bucket.put(key, await file.arrayBuffer(), {
    metadata: {
      contentType: file.type || 'application/octet-stream',
      size: file.size,
      name: file.name || cleanName,
      kind: isFile ? 'file' : 'image',
    },
  });

  return json({ url: `/media/${key}`, name: file.name || cleanName, size: file.size });
};
