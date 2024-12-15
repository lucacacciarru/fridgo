
import type { Recipe } from '@/types/recipe';
import { api } from './api';

type GetRecipesResponse = {
  recipes: Recipe[];
};

export async function getRecipes() {
  return await api<GetRecipesResponse>('/ai/recipes');
}
