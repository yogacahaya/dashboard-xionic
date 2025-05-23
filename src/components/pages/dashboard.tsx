"use client"
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteProduct, useGetProducts } from '../features/product/hooks/hookProduct';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Product } from '../features/product/service/serviceProduct';
import { Button } from '../ui/button';
import AddProduct from '../ui/addProduct';
import EditProduct from '../ui/editProduct';

const Dashboard = () => {

  const {data: products, isLoading} = useGetProducts()
  const {mutate: deleteProduct} = useDeleteProduct()

  const deleteItem = (id: number) => {
     deleteProduct(id);
     alert('item successfully deleted')
  }

  if(isLoading) return <div className='flex justify-center items-center h-screen'><Loader2 className='w-10 h-10 animate-spin'/></div>

  return (
    <div className='p-6 flex flex-col gap-2 '>
      <div className='right'>
        <AddProduct/>
      </div>
    <Table className='w-[1050px]'>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Id</TableHead>
      <TableHead>Image</TableHead>
      <TableHead>Title</TableHead>
  <TableHead>Stock</TableHead>
      <TableHead>Price</TableHead>
      <TableHead className="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {products?.data?.map((product: Product) => (
      <TableRow key={product.id}>
        <TableCell className="font-medium">{product.id}</TableCell>
        <TableCell className="font-medium">
          <Image src={product.image} alt={product.title} width={50} height={50} className='w-auto h-auto object-cover'/>
        </TableCell>
        <TableCell>{product.title}</TableCell>
        <TableCell>{product.stock}</TableCell>
        <TableCell>{product.price}</TableCell>
        <TableCell className="text-right grid grid-cols-2 gap-2">
          <EditProduct id={product.id}/>
          <Button variant={"destructive"} className='w-40 h-auto' onClick={() => deleteItem(product.id)}>Delete</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
    </div>
  )
}

export default Dashboard