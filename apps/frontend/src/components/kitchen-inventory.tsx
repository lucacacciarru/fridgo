'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { AddProductDrawer } from './add-product-drawer';
import { ProductCard } from './product-card';
import { ProductDetailsDrawer } from './product-details-drawer';

type Props = {
  products: Product[];
};

export default function KitchenInventory({
  products,
}: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] =
    useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Product>(products[0]);

  function handleProductClick(product: Product) {
    setSelectedProduct(product);
    setIsDetailsDrawerOpen(true);
  }

  return (
    <div className="relative min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>
      <div className="fixed bottom-8 right-8">
        <Button
          onClick={() => setIsDrawerOpen(true)}
          className="bg-[#0D99FF] hover:bg-[#0B87E0] text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="size-6" />
        </Button>
      </div>
      <AddProductDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <ProductDetailsDrawer
        isOpen={isDetailsDrawerOpen}
        setIsOpen={setIsDetailsDrawerOpen}
        product={selectedProduct as Product}
      />
    </div>
  );
}
