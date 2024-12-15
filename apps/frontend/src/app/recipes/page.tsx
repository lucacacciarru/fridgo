export type Recipe = {
  name: string;
  products: string[];
  steps: string[];
  tip: string;
};

import { getRecipes } from "@/api/getRecipes";
import { Card, CardContent } from "@/components/ui/card";

export default async function Page() {
  const { recipes } = await getRecipes();

  return (
    <main className="min-h-screen bg-[#F0F0F0] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#333333]">
          Ricette generate
        </h1>
        <div className="flex flex-col gap-4">
          {recipes.map((recipe, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex flex-col gap-4">
                <span className="text-lg font-semibold">{recipe.name}</span>

                <div className="flex gap-4">
                
                  <Card>
                    <CardContent className="p-4">
                    <span className="text-md font-medium">Ingredienti:</span>
                      <ul className="list-disc">
                      {recipe.products.map((product, index) => (
                        <li key={index}>{product}</li>
                      ))}
                       </ul>
                    </CardContent>
                  </Card>

                  <Card className="flex-grow">
                    <CardContent className="p-4">
                      <span className="text-md font-medium">Passaggi:</span>
                      <ol className="list-decimal ml-5 mb-2">
                        {recipe.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </div>

                <span className="text-md font-medium">Suggerimento:</span>
                <p>{recipe.tip}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
