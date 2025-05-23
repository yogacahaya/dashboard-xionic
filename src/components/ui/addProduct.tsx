"use client";

import React from 'react';
import { Button } from './button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from './input';
import { useCreateProduct } from '../features/product/hooks/hookProduct';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { productSchema, ProductType } from '../features/product/form-validation/productType';

const AddProduct = () => {
  const { mutate: Product, isPending } = useCreateProduct();

  const { register, handleSubmit, formState: { errors } } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductType) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('stock', data.stock);
    formData.append('username', data.username);

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    Product(formData);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"outline"}>Add Product</Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4'>
          <div className='flex flex-col gap-1'>
            <label>Title</label>
            <Input type='text' {...register('title')} />
            {errors.title && <p className='text-red-500 text-sm'>{errors.title.message?.toString()}</p>}
          </div>

          <div className='flex flex-col gap-1'>
            <label>Price</label>
            <Input type='text' {...register('price')} />
            {errors.price && <p className='text-red-500 text-sm'>{errors.price.message?.toString()}</p>}
          </div>

          <div className='flex flex-col gap-1'>
            <label>Stock</label>
            <Input type='text' {...register('stock')} />
            {errors.stock && <p className='text-red-500 text-sm'>{errors.stock.message?.toString()}</p>}
          </div>

          <div className='flex flex-col gap-1'>
            <label>Username</label>
            <Input type='text' {...register('username')} />
            {errors.username && <p className='text-red-500 text-sm'>{errors.username.message?.toString()}</p>}
          </div>

          <div className='flex flex-col gap-1'>
            <label>Image</label>
            <Input type='file' accept='image/*' {...register('image')} />
            {errors.image && <p className='text-red-500 text-sm'>{errors.image.message?.toString()}</p>}
          </div>

          <Button type='submit' className='mt-2' disabled={isPending}>
            {isPending ? <Loader className='w-5 h-5 animate-spin' /> : 'Submit'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};
export default AddProduct;
