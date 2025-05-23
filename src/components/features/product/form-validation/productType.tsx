import { z } from 'zod';

export const productSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    price: z.string().min(1, { message: "Price is required" }),
    stock: z.string().min(1, { message: "Stock is required" }),
    image: z.any().refine((file: FileList) => file?.length === 1, {
      message: "Image is required",
    }).optional(),
    username: z.string().min(1, { message: "Username is required" }),
})
export const editProductSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    price: z.string().min(1, { message: "Price is required" }),
    stock: z.string().min(1, { message: "Stock is required" }),
})

export type ProductType = z.infer<typeof productSchema>
export type EditProductType = z.infer<typeof editProductSchema>
