import { api } from './api';

export async function deleteProduct(id: string) {
  await api('http://localhost:3000/products/' + id, {
    body: { id },
    method: 'POST',
  });
}
