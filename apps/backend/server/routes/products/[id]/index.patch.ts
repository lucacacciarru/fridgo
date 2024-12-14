import { z } from 'zod';
import { readBody } from 'h3';
import { db } from '~~/src/db';
import { product } from '~~/src/db/schema';
import { eq } from 'drizzle-orm';

const schema = z.object({
  name: z.string(),
  quantity: z.number().min(1),
});

export default eventHandler(async event => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  const result = schema.safeParse(body);

  if (!result.success) {
    return {
      statusCode: 400,
    };
  }

  await db
    .update(product)
    .set(result.data)
    .where(eq(product.id, id));

  return {
    statusCode: 200,
  };
});
