// import { drizzle } from 'drizzle-orm/libsql';
import { drizzle } from 'drizzle-orm/pglite';
import { DB_PATH } from '../config';
import * as schema from './schema';

export * as ggufs from './ggufs';
export * as schema from './schema';

export const db = drizzle<typeof schema>({
  connection: {
    dataDir: `/Users/chenkai/github/ckvv/lumos/local.db`,
  },
  casing: 'snake_case',
  schema,
} as any);
