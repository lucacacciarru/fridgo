'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import AddProductForm from './add-product-form';

type Product = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Apples',
    quantity: 5,
    unit: 'pcs',
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 2,
    name: 'Milk',
    quantity: 2,
    unit: 'liters',
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 3,
    name: 'Bread',
    quantity: 1,
    unit: 'loaf',
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 4,
    name: 'Eggs',
    quantity: 12,
    unit: 'pcs',
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 5,
    name: 'Cheese',
    quantity: 500,
    unit: 'grams',
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 6,
    name: 'Tomatoes',
    quantity: 6,
    unit: 'pcs',
    image: '/placeholder.svg?height=100&width=100',
  },
];

export default function KitchenInventory() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="relative min-h-screen pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Quantity: {product.quantity}{' '}
                    {product.unit}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="fixed bottom-4 right-4">
        <Button onClick={() => setIsDrawerOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add New Product</DrawerTitle>
          </DrawerHeader>
          <AddProductForm />
          <DrawerFooter>
            <Button onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
