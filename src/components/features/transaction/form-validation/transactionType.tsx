import { z } from "zod";

export const transactionType = z.object({
  productName: z.string().min(1, { message: "Product is required" }),
  quantity: z.string().min(1, { message: "Quantity is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  amount: z.string().min(1, { message: "Total price is required" }),
  userName: z.string().min(1, { message: "User name is required" }),
  status: z.string().min(1, { message: "Status is required" }),
});

export type TransactionType = z.infer<typeof transactionType>;