import { z } from 'zod';
import { defineEventHandler, readBody } from 'h3';
import { db } from '~~/src/db';
import { product } from '~~/src/db/schema';


const schema = z.array(z.object({
  name: z.string()
}));

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = schema.safeParse(body);

  if (!result.success) {
    return {
      statusCode: 400,
    };
  }

  const productNames = result.data;

  await db.insert(product).values(productNames.map(({ name }) => ({ name })));

  return {
    statusCode: 201
  };
});
