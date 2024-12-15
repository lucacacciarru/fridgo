import { z } from 'zod';
import { defineEventHandler } from 'h3';

import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';

const schema = z.object({
  imageAsBase64: z.string().optional().nullable(),
})

export default defineEventHandler(async (event) => {

  const body = await readBody(event);

  const result = schema.safeParse(body);

  if (!result.success) {
    return {
      statusCode: 400,
    };
  }

  const {imageAsBase64} = result.data;

  const { object } = await generateObject({
    model: openai("gpt-4o"),
    schema: z.object({
      products: z.array(z.object({
        id: z.string().uuid(),
        name: z.string(),
        quantity: z.number().min(1)
      }))
    }),
    system : "Analyze the image of a receipt and extract only the food-related items and their quantity, excluding all non-food products or categories. Focus solely on food products and disregard any irrelevant details or non-food entries present on the receipt",
    messages:[
      {
        role : "user", content: [{
          type: 'image',
          image: imageAsBase64,
        },], 
      }
    ],  
  });


  return {products: object.products}
});
