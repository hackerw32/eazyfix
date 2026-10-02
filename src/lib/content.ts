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

    return JSON.parse(row.value) as SiteContent;
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
