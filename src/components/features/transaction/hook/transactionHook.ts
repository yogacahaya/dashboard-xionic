"use client"
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTransaction, getTransactionById, getTransactions, updateTransaction } from "../service/transactionService";
import { TransactionType } from "../form-validation/transactionType";

export function useGetTransactions() {
    return useQuery({
        queryKey: ['transactions'],
        queryFn: getTransactions
    })
}

export function useGetTransactionById(id: string) {
    return useQuery({
        queryKey: ['transaction', id],
        queryFn: () => getTransactionById(id)
    })
}

export function useCreateTransaction(){
    return useMutation({
        mutationKey: ["transactionCreate"],
        mutationFn: createTransaction
    })
}

export function useUpdateProduct(){
    return useMutation({
        mutationKey: ["transactionUpdate"],
        mutationFn: ({id, data}: {id: string, data: TransactionType}) => updateTransaction(id, data)
    })
}