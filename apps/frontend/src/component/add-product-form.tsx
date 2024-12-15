'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function AddProductForm() {
  const [image, setImage] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: { 'image/*': [] },
      multiple: false,
    });

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 px-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          placeholder="Enter product name"
        />
      </div>
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          placeholder="Enter quantity"
        />
      </div>
      <div>
        <Label htmlFor="unit">Unit</Label>
        <Input
          id="unit"
          placeholder="Enter unit (e.g., pcs, grams, liters)"
        />
      </div>
      <div>
        <Label>Product Image</Label>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
            isDragActive
              ? 'border-primary'
              : 'border-gray-300'
          }`}>
          <input {...getInputProps()} />
          {image ? (
            <p>Image selected: {image.name}</p>
          ) : isDragActive ? (
            <p>Drop the image here ...</p>
          ) : (
            <p>
              Drag 'n' drop an image here, or click to
              select one
            </p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="w-full">
        Add Product
      </Button>
    </form>
  );
}
