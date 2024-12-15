import type { Product } from '@/types/product';
import { api } from './api';

type GetProductResponse = {
  products: Product[];
};
export async function getProducts() {
  return await api<GetProductResponse>('/products');
}
