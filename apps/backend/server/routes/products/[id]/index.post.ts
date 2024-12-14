import { z } from 'zod';
import { readBody } from 'h3';
import { db } from '~~/src/db';
import { product } from '~~/src/db/schema';
import { eq } from 'drizzle-orm';

export default eventHandler(async event => {
  const id = getRouterParam(event, 'id');
  await db.delete(product).where(eq(product.id, id));

  return {
    statusCode: 200,
  };
});
