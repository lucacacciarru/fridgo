import { db } from '~~/src/db';

export default defineEventHandler(() => {
  return db.query.Product.findMany()
});
