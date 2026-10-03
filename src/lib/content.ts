import { env } from 'cloudflare:workers';
import { site, type Business } from '../data/site';
import { defaultProjects, type Project } from '../data/projects';

export const BUSINESS_KEY = 'business';
export const PROJECTS_KEY = 'projects';

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
 * Deep merge so stored business info keeps working when new fields are added
 * to the defaults. Stored values win; missing values fall back to defaults.
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

export async function getBusiness(): Promise<Business> {
  const db = getDb();
  if (!db) return clone(site.business);

  try {
    const row = await db
      .prepare('SELECT value FROM content WHERE key = ?')
      .bind(BUSINESS_KEY)
      .first<ContentRow>();

    if (!row || !row.value) {
      const seed = clone(site.business);
      await saveBusiness(seed);
      return seed;
    }

    const stored = JSON.parse(row.value) as unknown;
    return mergeContent(site.business, stored);
  } catch {
    return clone(site.business);
  }
}

export async function getProjects(): Promise<Project[]> {
  const db = getDb();
  if (!db) return clone(defaultProjects);

  try {
    const row = await db
      .prepare('SELECT value FROM content WHERE key = ?')
      .bind(PROJECTS_KEY)
      .first<ContentRow>();

    if (!row || !row.value) {
      const seed = clone(defaultProjects);
      await saveProjects(seed);
      return seed;
    }

    const stored = JSON.parse(row.value) as unknown;
    if (!Array.isArray(stored) || stored.length === 0) return clone(defaultProjects);
    return stored as Project[];
  } catch {
    return clone(defaultProjects);
  }
}

async function writeKey(key: string, data: unknown): Promise<void> {
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
    .bind(key, value, updatedAt)
    .run();
}

export async function saveBusiness(data: Business): Promise<void> {
  await writeKey(BUSINESS_KEY, data);
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await writeKey(PROJECTS_KEY, projects);
}
