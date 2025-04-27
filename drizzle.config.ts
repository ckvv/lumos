import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  driver: 'pglite',
  dbCredentials: {
    url: `file:local.db`,
  },
  casing: 'snake_case',
  schema: './src/main/db/schema.ts',
  out: './drizzle',
} as any);
