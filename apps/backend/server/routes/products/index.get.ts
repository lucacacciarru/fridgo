import { db } from '~~/src/db';

export default defineEventHandler(async (event) => {
  const products = await db.query.product.findMany(); 

  if (products.length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Products not found' });
  }

  return products;
});