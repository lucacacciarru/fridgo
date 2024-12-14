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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import AddProductForm from './add-product-form';
import AddProductByPhoto from './add-product-by-photo';
import { Product } from '@/types/product';

type Props = {
  products: Product[];
};

export default function KitchenInventory({
  products,
}: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <Card
            key={product.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <h2 className="text-lg font-semibold text-[#333333]">
                    {product.name}
                  </h2>
                  <p className="text-sm text-[#666666]">
                    Quantity: {product.quantity}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="fixed bottom-8 right-8">
        <Button
          onClick={() => setIsDrawerOpen(true)}
          className="bg-[#0D99FF] hover:bg-[#0B87E0] text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-semibold text-[#333333]">
              Add New Product
            </DrawerTitle>
          </DrawerHeader>
          <Tabs
            defaultValue="manual"
            className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">
                Manual Entry
              </TabsTrigger>
              <TabsTrigger value="photo">
                Add by Photo
              </TabsTrigger>
            </TabsList>
            <TabsContent value="manual">
              <AddProductForm />
            </TabsContent>
            <TabsContent value="photo">
              <AddProductByPhoto />
            </TabsContent>
          </Tabs>
          <DrawerFooter>
            <Button
              onClick={() => setIsDrawerOpen(false)}
              variant="outline"
              className="w-full">
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
