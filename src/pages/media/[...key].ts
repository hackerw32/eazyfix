import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

interface MediaBucket {
  getWithMetadata(
    key: string,
    type: 'arrayBuffer'
  ): Promise<{ value: ArrayBuffer | null; metadata: { contentType?: string } | null }>;
}

export const GET: APIRoute = async ({ params }) => {
  const key = params.key ?? '';
  if (!key || key.includes('..')) return new Response('Not found', { status: 404 });

  const bucket = (env as unknown as { MEDIA?: MediaBucket }).MEDIA;
  if (!bucket) return new Response('Media not configured', { status: 500 });

  const { value, metadata } = await bucket.getWithMetadata(key, 'arrayBuffer');
  if (!value) return new Response('Not found', { status: 404 });

  return new Response(value, {
    headers: {
      'Content-Type': metadata?.contentType ?? 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
