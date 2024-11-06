import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

export * as schema from './schema';

export const db = drizzle<typeof schema>({
  connection: {
    url: 'file:local.db',
  },
  casing: 'snake_case',
  schema,
} as any);
