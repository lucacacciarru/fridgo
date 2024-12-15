import { Product } from '@/types/product';
import { api } from './api';

type Payload = {
  imageAsBase64: string;
};

type Response = Pick<Product, 'name' | 'quantity' | 'id'>[];

export async function analyzeReceipt({
  imageAsBase64,
}: Payload) {
  return await api<Response>('/ai/receipt', {
    method: 'POST',
    body: { imageAsBase64 },
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
