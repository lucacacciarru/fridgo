'use client';

import { Button } from './ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';
import { Input } from './ui/input';
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';
import { createProduct } from '@/api/createProduct';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const ConfirmReceiptDrawer = ({
  isOpen,
  setIsOpen,
}: Props) => {
  const router = useRouter();

  const [productList, setProductList] = useState<
    Pick<Product, 'name' | 'quantity'>[]
  >([]);

  useEffect(() => {
    const productListStorage =
      window.localStorage.getItem('products');

    if (productListStorage) {
      setProductList(
        JSON.parse(productListStorage).products
      );
    }
  }, []);

  async function handleSave() {
    await createProduct(productList);
    setIsOpen(false);
    localStorage.removeItem('products');
    router.refresh();
  }

  function updateName({
    name,
    productIndex,
  }: Pick<Product, 'name'> & { productIndex: number }) {
    // get product index by id

    setProductList(prev =>
      prev.map((product, index) => {
        if (index === productIndex) {
          return {
            ...product,
            name,
          };
        }

        return product;
      })
    );
  }

  function updateQuantity({
    quantity,
    productIndex,
  }: Pick<Product, 'quantity'> & { productIndex: number }) {
    setProductList(prev =>
      prev.map((product, index) => {
        if (index === productIndex) {
          return {
            ...product,
            quantity,
          };
        }
        return product;
      })
    );
  }

  function deleteItem(index: number) {
    setProductList(prev =>
      prev.filter((_, i) => i !== index)
    );
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Items</DrawerTitle>
          <DrawerDescription>
            Make changes to your items here. Click save when
            you re done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {productList.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-2">
              <Input
                value={item.name}
                onChange={e =>
                  updateName({
                    name: e.target.value,
                    productIndex: index,
                  })
                }
                placeholder="Item name"
                className="flex-grow"
              />
              <Input
                type="number"
                value={item.quantity}
                onChange={e =>
                  updateQuantity({
                    quantity: parseInt(e.target.value),
                    productIndex: index,
                  })
                }
                placeholder="Quantity"
                className="w-24"
                min="0"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteItem(index)}
                className="flex-shrink-0">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete item</span>
              </Button>
            </div>
          ))}
        </div>
        <DrawerFooter>
          <Button onClick={handleSave}>Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
