'use client';

import { getRecipes } from '@/api/getRecipes';
import { Card, CardContent } from '@/components/ui/card';
import type { Recipe } from '@/types/recipe';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';

export default function RecipesList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { recipes } = await getRecipes();

        setRecipes(recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  if(recipes.length === 0){
    return (
      <div className="flex flex-col space-y-3 mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-6 text-[#333333]">
        Generazione ricette...
      </h1>
        <Skeleton className="h-96 w-full rounded-xl bg-gray-400" />
        <Skeleton className="h-96 w-full rounded-xl bg-gray-400" />
        <Skeleton className="h-96 w-full rounded-xl bg-gray-400" />
        <Skeleton className="h-96 w-full rounded-xl bg-gray-400" />
      </div>
    )

    
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#333333]">
        Ricette generate
      </h1>
      <div className="flex flex-col gap-4">
        {recipes.map((recipe, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex flex-col gap-4">
              <span className="text-lg font-semibold">
                {recipe.name}
              </span>

              <div className="flex flex-col gap-4 md:flex-row">
                <Card>
                  <CardContent className="p-2">
                    <span className="text-md font-medium">
                      Ingredienti:
                    </span>
                    <div className="p-4">
                      <ul className="list-disc space-y-1">
                        {recipe.products.map(
                          (product, index) => (
                            <li key={index}>{product}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex-grow">
                  <CardContent className="p-2">
                    <span className="text-md font-medium">
                      Passaggi:
                    </span>
                    <ol className="list-decimal ml-5 mb-2 space-y-1">
                      {recipe.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>

              <Card className="flex-grow">
                <CardContent className="p-4 bg-rose-300 border rounded-md">
                  <span className="text-md font-medium">
                    Suggerimento:
                  </span>
                  <p>{recipe.tip}</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
