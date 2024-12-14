'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createProduct } from '@/api/createProduct';
import { useRouter } from 'next/navigation';

export default function AddProductForm() {
  const { refresh } = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await createProduct({
      name: formData.name,
      quantity: parseInt(formData.quantity),
    });
    refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 px-6">
      <div>
        <Label
          htmlFor="name"
          className="text-sm font-medium text-[#333333]">
          Product Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          className="mt-1"
        />
      </div>
      <div>
        <Label
          htmlFor="quantity"
          className="text-sm font-medium text-[#333333]">
          Quantity
        </Label>
        <Input
          id="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Enter quantity"
          className="mt-1"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-[#0D99FF] hover:bg-[#0B87E0] text-white">
        Add Product
      </Button>
    </form>
  );
}
