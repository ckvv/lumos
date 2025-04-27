// import { sqliteTable as table } from 'drizzle-orm/sqlite-core';
import { pgTable as table } from 'drizzle-orm/pg-core';
import * as t from 'drizzle-orm/pg-core';

export const ggufs = table(
  'ggufs',
  {
    id: t.integer().primaryKey(),
    modelName: t.text().notNull().unique(),
    modelPath: t.text().notNull(),
  },
  (table) => {
    return [t.uniqueIndex('model_name_idx').on(table.modelName)];
  },
);

export const settings = table(
  'settings',
  {
    id: t.integer().primaryKey(),
    key: t.text().notNull().unique(),
    value: t.text().notNull(),
  },
);
