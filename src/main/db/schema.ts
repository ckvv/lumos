import { sqliteTable as table } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';

export const ggufs = table(
  'ggufs',
  {
    id: t.int().primaryKey({ autoIncrement: true }),
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
    id: t.int().primaryKey({ autoIncrement: true }),
    key: t.text().notNull().unique(),
    value: t.text().notNull(),
  },
);
