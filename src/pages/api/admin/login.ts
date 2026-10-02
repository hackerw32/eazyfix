import type { APIRoute } from 'astro';
import { COOKIE_NAME, SESSION_MAX_AGE, createSessionToken, verifyPassword } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  let password = '';

  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const body = (await request.json().catch(() => ({}))) as { password?: string };
    password = body.password ?? '';
  } else {
    const form = await request.formData();
    password = String(form.get('password') ?? '');
  }

  if (!verifyPassword(password)) {
    return redirect('/admin/login?error=1', 303);
  }

  const token = await createSessionToken();
  cookies.set(COOKIE_NAME, token, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
  });

  return redirect('/admin', 303);
};
