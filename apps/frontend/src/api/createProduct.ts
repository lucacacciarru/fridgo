import { ofetch } from 'ofetch';

type CreateProductPayload = {
  name: string;
  quantity: number;
};

export async function createProduct(
  product: CreateProductPayload
) {
  return await ofetch('http://localhost:3000/products', {
    method: 'POST',
    body: [product],
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
