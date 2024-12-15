import { api } from './api';

export async function deleteProduct(id: string) {
  await api('/products/' + id, {
    body: { id },
    method: 'POST',
  });
}
