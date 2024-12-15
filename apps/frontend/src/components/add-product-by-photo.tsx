'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { analyzeReceipt } from '@/api/analyzeReceipt';
import Image from 'next/image';

type Props = {
  setIsConfirmReceiptDrawer: (open: boolean) => void;
  setIsDrawerOpen: (open: boolean) => void;
};
export default function AddProductByPhoto({
  setIsConfirmReceiptDrawer,
  setIsDrawerOpen,
}: Props) {
  const [base64Image, setBase64Image] = useState<
    string | null
  >(null);

  const [imagePreview, setImagePreview] = useState<
    string | null
  >(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setBase64Image(reader.result.split(',')[1]);
          setImagePreview(reader.result as string);
        }
      };
      reader.onerror = () => {
        console.error('Error reading file');
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: { 'image/*': [] },
      multiple: false,
    });

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    // Handle form submission here
    const data = await analyzeReceipt({
      imageAsBase64: base64Image!,
    });
    localStorage.setItem('products', JSON.stringify(data));
    setIsDrawerOpen(false);
    setIsConfirmReceiptDrawer(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 px-6">
      <div>
        <div
          {...getRootProps()}
          className={`mt-1 border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors duration-200 ${
            isDragActive
              ? 'border-[#0D99FF] bg-[#E6F4FF]'
              : 'border-[#E5E5E5] hover:border-[#0D99FF] hover:bg-[#F5F5F5]'
          }`}>
          <input {...getInputProps()} />
          {imagePreview ? (
            <div className="relative w-full h-48">
              <Image
                src={imagePreview}
                alt="Uploaded product"
                layout="fill"
                objectFit="contain"
              />
            </div>
          ) : isDragActive ? (
            <p className="text-[#0D99FF]">
              Drop the image here ...
            </p>
          ) : (
            <p className="text-[#666666]">
              Drag and drop a product image here, or click
              to select one
            </p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="w-full bg-[#0D99FF] hover:bg-[#0B87E0] text-white"
        disabled={!base64Image}>
        Add Product by Photo
      </Button>
    </form>
  );
}
