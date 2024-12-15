'use client';

import { getRecipes } from '@/api/getRecipes';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

  if (recipes.length === 0) {
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-4xl font-bold tracking-tight">
          Ricette generate
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          {recipes.map(recipe => (
            <Card
              key={recipe.name}
              className="overflow-hidden">
              <CardHeader>
                <CardTitle>{recipe.name}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div>
                  <h3 className="mb-3 font-semibold">
                    Ingredienti:
                  </h3>
                  <ul className="grid gap-2">
                    {recipe.products.map(ingredient => (
                      <li
                        key={ingredient}
                        className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 font-semibold">
                    Passaggi:
                  </h3>
                  <ol className="grid gap-2">
                    {recipe.steps.map((step, index) => (
                      <li
                        key={index}
                        className="flex gap-2">
                        <span className="font-mono text-sm text-muted-foreground">
                          {String(index + 1).padStart(
                            2,
                            '0'
                          )}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                {recipe.tip && (
                  <>
                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="mb-2 font-semibold">
                        Suggerimento:
                      </h3>
                      <CardDescription>
                        {recipe.tip}
                      </CardDescription>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
