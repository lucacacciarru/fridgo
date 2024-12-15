import { Product } from '@/types/product';
import { ofetch } from 'ofetch';

type Payload = {
  imageAsBase64: string;
};

type Response = Pick<Product, 'name' | 'quantity' | 'id'>[];

export async function analyzeReceipt({
  imageAsBase64,
}: Payload) {
  return await ofetch<Response>(
    'http://localhost:3000/ai/receipt',
    {
      method: 'POST',
      body: { imageAsBase64 },
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
