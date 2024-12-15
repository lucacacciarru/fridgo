import { ofetch } from 'ofetch';

export const api = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
