import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  driver: 'pglite',
  dbCredentials: {
    url: `local.db`,
  },
  casing: 'snake_case',
  schema: './src/main/db/schema.ts',
  out: './drizzle',
  verbose: true,
} as any);
