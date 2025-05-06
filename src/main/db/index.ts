import { PGlite } from '@electric-sql/pglite';
import { vector } from '@electric-sql/pglite/vector';
import { drizzle } from 'drizzle-orm/pglite';
import { DB_PATH } from '../config.ts';
import * as schema from './schema.ts';

export * as ggufs from './ggufs.ts';
export * as schema from './schema.ts';

export const client = new PGlite(DB_PATH, {
  extensions: { vector },
});

console.log('DB_PATH', DB_PATH);
export const db = drizzle<typeof schema>({
  client,
  casing: 'snake_case',
  schema,
} as any);
