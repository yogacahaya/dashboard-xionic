import baseApi from "@/components/baseApi/baseApi"
import { EditProductType } from "../form-validation/productType";

export type Product = {
    id: number;
    title: string;
    price?: number;
    image: string;
    stock?: number;
    createdAt?: string;
    updatedAt?: string;
}

export const getProducts = async() => {
    const response = await baseApi.get('/products');
    return response.data
}

export const getProduct = async(id: string) => {
    const response = await baseApi.get(`/product/${id}`);
    return response.data
}

export const createProduct = async(formData: FormData) => {
    const response = await baseApi.post('/product', formData);
    return response.data
}

export const updateProduct = async(id: number, data: EditProductType) => {
    const response = await baseApi.put(`/product/${id}`, data);
    return response.data
}

export const deleteProduct = async(id: number) => {
    const response = await baseApi.delete(`/product/${id}`);
    return response.data
}