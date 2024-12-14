import { getProducts } from '@/api/getProducts';
import KitchenInventory from '@/components/kitchen-inventory';

export default async function KitchenInventoryPage() {
  const response = await getProducts();
  return (
    <main className="min-h-screen bg-[#F0F0F0] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#333333]">
          Kitchen Inventory
        </h1>
        <KitchenInventory products={response.products} />
      </div>
    </main>
  );
}
