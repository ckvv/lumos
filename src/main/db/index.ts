// import { drizzle } from 'drizzle-orm/libsql';
import { PGlite } from '@electric-sql/pglite';
import { vector } from '@electric-sql/pglite/vector';
import { drizzle } from 'drizzle-orm/pglite';
import { DB_PATH } from '../config';
import * as schema from './schema';

export * as ggufs from './ggufs';
export * as schema from './schema';

export const client = new PGlite({
  extensions: { vector },
});

export const db = drizzle<typeof schema>({
  connection: {
    dataDir: DB_PATH,
  },
  client,
  casing: 'snake_case',
  schema,
} as any);
