import { ofetch } from 'ofetch';

type CreateProductPayload = {
  name: string;
  quantity: number;
}[];

export async function createProduct(
  products: CreateProductPayload
) {
  return await ofetch('http://localhost:3000/products', {
    method: 'POST',
    body: products,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
