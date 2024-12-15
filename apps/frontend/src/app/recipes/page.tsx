

import { getRecipes } from "@/api/getRecipes";
import { Card, CardContent } from "@/components/ui/card";

export default async function Page() {
  const { recipes } = await getRecipes();

  return (
    <main className="min-h-screen bg-[#F0F0F0] p-4 md:p-4 font-serif">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#333333]">
          Ricette generate
        </h1>
        <div className="flex flex-col gap-4">
          {recipes.map((recipe, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex flex-col gap-4">
                <span className="text-lg font-semibold">{recipe.name}</span>

                <div className="flex flex-col gap-4 md:flex-row">
                
                  <Card>
                    <CardContent className="p-2">
                    <span className="text-md font-medium">Ingredienti:</span>
                      <div className="p-4">
                      <ul className="list-disc">
                      {recipe.products.map((product, index) => (
                        <li key={index}>{product}</li>
                      ))}
                       </ul>
                      </div>
                    
                      
                    </CardContent>
                  </Card>

                  <Card className="flex-grow">
                    <CardContent className="p-2">
                      <span className="text-md font-medium">Passaggi:</span>
                      <ol className="list-decimal ml-5 mb-2">
                        {recipe.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </div>

                <Card className="flex-grow">
                    <CardContent className="p-4 bg-rose-300 border rounded-md">
                    <span className="text-md font-medium">Suggerimento:</span>
                    <p>{recipe.tip}</p>
                    </CardContent>
                  </Card>
                
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
