import { api } from './api';

type CreateProductPayload = {
  name: string;
  quantity: number;
}[];

export async function createProduct(
  products: CreateProductPayload
) {
  return await api('/products', {
    method: 'POST',
    body: products,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
