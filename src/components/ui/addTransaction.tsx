// ui/AddTransactionSheet.tsx
"use client"

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  transactionType,
  TransactionType,
} from "../features/transaction/form-validation/transactionType";
import { useCreateTransaction } from "../features/transaction/hook/transactionHook";
import { Check, Loader2 } from "lucide-react";

const AddTransactionSheet = () => {
  const { mutate: createTransaction, isPending } = useCreateTransaction();

  const form = useForm<TransactionType>({
    resolver: zodResolver(transactionType),
    defaultValues: {
      userName: "",
      productName: "",
      price: "",
      quantity: "",
      amount: "",
    },
  });

  const onSubmit = (data: TransactionType) => {
    console.log("Submitting:", data);
    createTransaction(data);
    alert("Transaction successfully created");
    form.reset();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add Transaction</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Transaction</SheetTitle>
          <SheetDescription>
            Fill out the form below to record a new transaction.
          </SheetDescription>
        </SheetHeader>

        {/* ✅ Form and Submit Button */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4"
        >
          <Input {...form.register("userName")} placeholder="User Name" />
          <Input {...form.register("productName")} placeholder="Product Name" />
          <Input {...form.register("price")} placeholder="Price" />
          <select {...form.register("status")} className="input-class">
            <option value="">Select status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            </select>
          <Input {...form.register("quantity")} placeholder="Quantity" />
          <Input {...form.register("amount")} placeholder="Amount" />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center gap-2 z-50"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Submit
                </>
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddTransactionSheet;
