import { ofetch } from 'ofetch';

export const api = ofetch.create({
  baseURL: process.env.API_BASE_URL,
});
