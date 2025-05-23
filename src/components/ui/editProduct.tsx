"use client";
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from './button';
import { Input } from './input';
import { useUpdateProduct } from '../features/product/hooks/hookProduct';
import { editProductSchema, EditProductType } from '../features/product/form-validation/productType';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const EditProduct = ({id}: {id: number}) => {
    
    const { mutate: updateProduct } = useUpdateProduct();
    const {register, handleSubmit, formState: { errors }, reset} = useForm<EditProductType>({
        resolver: zodResolver(editProductSchema)
    });

    const onSubmit = (data: EditProductType) => {
        updateProduct({id, data})
        reset()
        alert('Product updated successfully')
    }

  return (
    <div>
        <Sheet>
  <SheetTrigger>
    <Button variant="outline">Edit Product</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit Product</SheetTitle>
    </SheetHeader>
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
            <label>Title</label>
            <Input placeholder='Title' {...register('title')}/>
            {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
        </div>
        <div className='flex flex-col gap-2'>
            <label>Price</label>
            <Input placeholder='Price' {...register('price')}/>
            {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
        </div>
        <div className='flex flex-col gap'>
            <label>Stock</label>
            <Input placeholder='Stock' {...register('stock')}/>
            {errors.stock && <p className='text-red-500'>{errors.stock.message}</p>}
        </div>
        <div className='flex justify-end'>
            <Button type='submit'>Edit</Button>
        </div>
    </form>
  </SheetContent>
</Sheet>
    </div>
  )
}

export default EditProduct