import type { APIRoute } from 'astro';
import { COOKIE_NAME, isValidSession } from '../../../lib/auth';
import { getSiteContent, saveSiteContent } from '../../../lib/content';
import type { SiteContentDefaults } from '../../../data/site';

export const prerender = false;

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
  return json(await getSiteContent());
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  if (!(await isValidSession(cookies.get(COOKIE_NAME)?.value))) {
    return json({ error: 'unauthorized' }, 401);
  }

  let body: SiteContentDefaults;
  try {
    body = (await request.json()) as SiteContentDefaults;
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  await saveSiteContent(body);
  return json({ ok: true });
};
