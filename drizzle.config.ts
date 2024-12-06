import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'turso',
  dbCredentials: {
    url: `file:local.db`,
  },
  casing: 'snake_case',
  schema: './src/electron/db/schema.ts',
} as any);
