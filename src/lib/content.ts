import { env } from 'cloudflare:workers';
import defaultContent from '../data/site.json';

export type SiteContent = typeof defaultContent;

export const CONTENT_KEY = 'site';

interface ContentRow {
  value: string;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(): Promise<T | null>;
  run(): Promise<unknown>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

function getDb(): D1Database | undefined {
  return (env as unknown as { CONTENT_DB?: D1Database }).CONTENT_DB;
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Deep merge so that content saved in the database keeps working when new
 * fields are added to the default schema. Stored values win; missing values
 * fall back to the defaults.
 */
export function mergeContent<T>(defaults: T, stored: unknown): T {
  if (!isPlainObject(defaults)) {
    return (stored === undefined ? defaults : (stored as T));
  }
  if (!isPlainObject(stored)) return defaults;

  const result: Record<string, unknown> = { ...defaults };
  for (const key of Object.keys(stored)) {
    if (key in defaults) {
      result[key] = mergeContent(
        (defaults as Record<string, unknown>)[key],
        (stored as Record<string, unknown>)[key]
      );
    } else {
      result[key] = (stored as Record<string, unknown>)[key];
    }
  }
  return result as T;
}

export async function getContent(): Promise<SiteContent> {
  const db = getDb();
  if (!db) return clone(defaultContent);

  try {
    const row = await db
      .prepare('SELECT value FROM content WHERE key = ?')
      .bind(CONTENT_KEY)
      .first<ContentRow>();

    if (!row || !row.value) {
      const seed = clone(defaultContent);
      await saveContent(seed);
      return seed;
    }

    const stored = JSON.parse(row.value) as unknown;
    return mergeContent(defaultContent, stored);
  } catch {
    return clone(defaultContent);
  }
}

export async function saveContent(data: SiteContent): Promise<void> {
  const db = getDb();
  if (!db) throw new Error('CONTENT_DB binding is not configured');

  const value = JSON.stringify(data);
  const updatedAt = new Date().toISOString();

  await db
    .prepare(
      `INSERT INTO content (key, value, updated_at)
       VALUES (?, ?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
    )
    .bind(CONTENT_KEY, value, updatedAt)
    .run();
}
