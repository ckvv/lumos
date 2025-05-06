import { integer, jsonb, pgTable, serial, text, timestamp, vector } from 'drizzle-orm/pg-core';

const timestamps = {
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),
};

export const ggufs = pgTable(
  'ggufs',
  {
    id: serial().primaryKey(),
    modelName: text().notNull().unique(),
    modelPath: text().notNull(),
    ...timestamps,
  },
);

export const settings = pgTable(
  'settings',
  {
    id: serial().primaryKey(),
    key: text().notNull().unique(),
    value: text().notNull(),
    ...timestamps,
  },
);

export const files = pgTable(
  'files',
  {
    id: serial().primaryKey(),
    hash: text().notNull().unique(),
    name: text().notNull(),
    path: text().notNull(),
    type: text().notNull(), // 文件类型（如 pdf, txt）
    size: integer().notNull(),
    stutus: text().notNull(), // 处理状态（未处理/已向量化/出错）
    metadata: jsonb(),
    ...timestamps,
  },
);

export const fileChunks = pgTable(
  'file_chunks',
  {
    id: serial().primaryKey(),
    fileId: integer().references(() => files.id),
    chunkIndex: integer().notNull(), // 片段编号（第几段）
    chunkText: text().notNull(), // 片段原始文本
    embedding: vector('embedding', { dimensions: 1536 }),
    ...timestamps,
  },
);
