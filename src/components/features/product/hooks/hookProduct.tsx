"use client"
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../service/serviceProduct";
import { EditProductType } from "../form-validation/productType";


export function useGetProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })
}

export function useGetProduct(id: string) {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(id)
    })
}

export function useCreateProduct() {
    return useMutation({
        mutationKey: ['createProduct'],
        mutationFn: createProduct
    })
}

export function useUpdateProduct() {
    return useMutation({
        mutationKey: ['updateProduct'],
        mutationFn: ({ id, data }: { id: number, data: EditProductType }) => updateProduct(id, data)
    })
}
export function useDeleteProduct() {
    return useMutation({
        mutationKey: ['deleteProduct'],
        mutationFn: (id: number) => deleteProduct(id)
    })
}