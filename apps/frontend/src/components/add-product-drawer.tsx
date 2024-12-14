'use client';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@radix-ui/react-tabs';
import AddProductByPhoto from './add-product-by-photo';
import AddProductForm from './add-product-form';
import { Button } from './ui/button';
import {
  Drawer,
  DrawerTitle,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from './ui/drawer';

type Props = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
};

export const AddProductDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
}: Props) => {
  return (
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
  );
};
