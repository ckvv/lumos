import { db, schema } from './index';

const { ggufs } = schema;

export async function getALl() {
  return db.select().from(ggufs);
}

export async function setALl(models: any) {
  await db.delete(ggufs);
  return db.insert(ggufs).values(models);
}
