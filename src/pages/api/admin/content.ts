import type { APIRoute } from 'astro';
import { COOKIE_NAME, isValidSession } from '../../../lib/auth';
import { getContent, saveContent, type SiteContent } from '../../../lib/content';

export const prerender = false;

async function ensureAuthorized(token: string | undefined): Promise<boolean> {
  return isValidSession(token);
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export const GET: APIRoute = async ({ cookies }) => {
  if (!(await ensureAuthorized(cookies.get(COOKIE_NAME)?.value))) {
    return json({ error: 'unauthorized' }, 401);
  }
  const content = await getContent();
  return json(content);
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  if (!(await ensureAuthorized(cookies.get(COOKIE_NAME)?.value))) {
    return json({ error: 'unauthorized' }, 401);
  }

  let body: SiteContent;
  try {
    body = (await request.json()) as SiteContent;
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  await saveContent(body);
  return json({ ok: true });
};
