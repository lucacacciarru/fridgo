import RecipesList from "@/component/recipes-list";



export default async function Page() {

  return (
    <main className="min-h-screen bg-[#F0F0F0] p-4 md:p-4 font-serif">
     <RecipesList />
    </main>
  );
}
