import { z } from 'zod';
import { defineEventHandler, readBody } from 'h3';
import { db } from '~~/src/db';
import { product } from '~~/src/db/schema';


const schema = z.array(z.object({
  name: z.string(),
  quantity: z.number().min(1)
}));

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = schema.safeParse(body);

  if (!result.success) {
    return {
      statusCode: 400,
    };
  }

  const products = result.data;

  await db.insert(product).values(products.map(({ name, quantity }) => ({ name, quantity })));

  return {
    statusCode: 201
  };
});
