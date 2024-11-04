import { sqliteTable as table } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';

export const ggufs = table(
  'ggufs',
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    name: t.text().notNull().unique(),
    path: t.text().notNull(),
  },
  (table) => {
    return {
      nameIndex: t.uniqueIndex('name_idx').on(table.name),
    };
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
