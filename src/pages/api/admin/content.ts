import type { APIRoute } from 'astro';
import { COOKIE_NAME, isValidSession } from '../../../lib/auth';
import { getBusiness, saveBusiness } from '../../../lib/content';
import type { Business } from '../../../data/site';

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
  const business = await getBusiness();
  return json(business);
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  if (!(await ensureAuthorized(cookies.get(COOKIE_NAME)?.value))) {
    return json({ error: 'unauthorized' }, 401);
  }

  let body: Business;
  try {
    body = (await request.json()) as Business;
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  await saveBusiness(body);
  return json({ ok: true });
};
