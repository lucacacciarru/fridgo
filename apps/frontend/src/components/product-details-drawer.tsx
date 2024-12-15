import { Product } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from './ui/button';
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from './ui/drawer';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { deleteProduct } from '@/api/deleteProduct';
import { useRouter } from 'next/navigation';
type Props = {
  product: Product;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const schema = z.object({
  name: z.string().trim().min(1),
  quantity: z.number().int().positive(),
});

type FormData = z.infer<typeof schema>;

export const ProductDetailsDrawer = ({
  product,
  isOpen,
  setIsOpen,
}: Props) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product.name,
      quantity: product.quantity,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleDelete = async () => {
    await deleteProduct(product.id);
    setIsOpen(false);
    router.refresh();
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}>
      <DrawerContent className="max-w-screen-lg px-8 m-auto">
        <DrawerHeader>
          <DrawerTitle>
            Modifica il tuo prodotto
          </DrawerTitle>
          <DrawerDescription>
            Puoi modificare le informationi del tuo profilo
          </DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label
              htmlFor="name"
              className="text-sm font-medium text-[#333333]">
              Nome
            </Label>
            <Input
              id="name"
              {...register('name')}
              className="mt-1"
            />
          </div>
          <div>
            <Label
              htmlFor="quantity"
              className="text-sm font-medium text-[#333333]">
              Quantità
            </Label>
            <Input
              id="quantity"
              type="number"
              {...register('quantity')}
              className="mt-1"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#0D99FF] hover:bg-[#0B87E0] text-white">
            Aggiorno prodotto
          </Button>
        </form>
        <DrawerFooter className="p-0 pt-4">
          <Button
            onClick={handleDelete}
            variant="destructive">
            Delete Product
          </Button>
          <DrawerClose asChild>
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
