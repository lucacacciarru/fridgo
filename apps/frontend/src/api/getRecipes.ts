
import { api } from './api';


type Recipes = { 
    name: string;
    products: string[];
    steps: string[];
    tip: string
}[]

type GetRecipesResponse = {
  recipes: Recipes[];
};

export async function getRecipes() {
  return await api<GetRecipesResponse>('/ai/recipes');
}
