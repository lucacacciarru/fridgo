import { db } from '~~/src/db';

import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export default defineEventHandler(async event => {

  type Product = {
        id: number;
        name: string;
        quantity: number;
        created_at: string;
      };

  const products = await db.query.product.findMany() as Product[]

  if (products.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Products not found',
    });
  }

  const allProductsNames = products.map(product => product.name)

  const ingredients = `Ingredients list: ${allProductsNames.join(', ')}`

  // const test = "Ingredients list: pollo, pomodori, pasta, pesto, burro, filetto di manzo, pane, maionese, sale"
  
  const { object } = await generateObject({
    model: openai("gpt-4o"),
    schema: z.object({
      recipes: z.array(z.object({
        name: z.string(),
        products: z.array(z.string()),
        steps: z.array(z.string()).min(12).max(20),
        tip: z.string()
      }))
    }),
    system : "All responses must be in Italian. Generate up to 5 unique recipes based on the list of ingredients provided. For each recipe, include a creative name for the dish, a comprehensive list of ingredients with specific quantities, and detailed step-by-step preparation instructions. Each step should be elaborately described, covering all aspects from ingredient preparation to cooking techniques and plating. Ensure that the instructions are clear and thorough enough for novice cooks to easily follow. include a charming tip suggesting how this dish could be part of a romantic lunch or dinner with Enrico Porceddu, making it as romantic and delightful as possible.",
    messages:[
      {
        role : "user", content: ingredients
      }
    ],  
  });

  return { recipes : object.recipes };
});
