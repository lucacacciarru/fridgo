'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function AddProductByPhoto() {
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
    console.log('Photo submitted', image);
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
          {image ? (
            <div className="relative w-full h-48">
              <Image
                src={URL.createObjectURL(image)}
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
              Drag 'n' drop a product image here, or click
              to select one
            </p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="w-full bg-[#0D99FF] hover:bg-[#0B87E0] text-white"
        disabled={!image}>
        Add Product by Photo
      </Button>
    </form>
  );
}
