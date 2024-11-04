import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'turso',
  dbCredentials: {
    url: 'file:local.db',
  },
  schema: './electron/db/schema.ts',
} as any);
