import baseApi from "@/components/baseApi/baseApi"
import { TransactionType } from "../form-validation/transactionType";


export const getTransactions = async() => {
    const response = await baseApi.get('/transactions');
    return response.data
}

export const getTransactionById = async(id: string) => {
    const response = await baseApi.get(`/transaction/${id}`);
    return response.data
}

export const createTransaction = async(data: TransactionType) => {
    const response = await baseApi.post('/transaction', data);
    return response.data
}

export const updateTransaction = async(id: string, data: TransactionType) => {
    const response = await baseApi.put(`/transactions/${id}`, data);
    return response.data
}