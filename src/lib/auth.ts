import { env } from 'cloudflare:workers';

export const COOKIE_NAME = 'eazyfix_session';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getSecret(): string {
  const secret = (env as unknown as { SESSION_SECRET?: string }).SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not configured');
  return secret;
}

function getPassword(): string {
  const password = (env as unknown as { ADMIN_PASSWORD?: string }).ADMIN_PASSWORD;
  if (!password) throw new Error('ADMIN_PASSWORD is not configured');
  return password;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmac(data: string, key: string): Promise<string> {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(data));
  return toBase64Url(new Uint8Array(signature));
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function verifyPassword(input: string): boolean {
  try {
    return timingSafeEqual(input, getPassword());
  } catch {
    return false;
  }
}

export async function createSessionToken(): Promise<string> {
  const issuedAt = Date.now().toString();
  const signature = await hmac(issuedAt, getSecret());
  return `${issuedAt}.${signature}`;
}

export async function isValidSession(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  try {
    const [issuedAt, signature] = token.split('.');
    if (!issuedAt || !signature) return false;
    const expected = await hmac(issuedAt, getSecret());
    if (!timingSafeEqual(signature, expected)) return false;
    const age = Date.now() - Number(issuedAt);
    return age >= 0 && age < MAX_AGE_SECONDS * 1000;
  } catch {
    return false;
  }
}

export const SESSION_MAX_AGE = MAX_AGE_SECONDS;
