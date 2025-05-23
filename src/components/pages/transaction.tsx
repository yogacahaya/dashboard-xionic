/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2 } from "lucide-react";
import baseApi from "../baseApi/baseApi"; // sesuaikan path baseApi-mu
import AddTransactionSheet from "../ui/addTransaction";

type Transaction = {
  id: string;
  status: string;
  totalPrice: number;
  quantity: number;
  userName: string

};

const STATUS_OPTIONS = ["PENDING", "PAID", "FAILED", "CANCELLED"];

const TransactionPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await baseApi.get("/transactions"); // contoh endpoint get semua transaction
      setTransactions(res.data.data); // sesuaikan response struktur
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      await baseApi.put(`/transactions/${id}`, { status: newStatus });
      // update state lokal setelah update sukses
      setTransactions((prev) =>
        prev.map((trx) =>
          trx.id === id
            ? {
                ...trx,
                status: newStatus,
              }
            : trx
        )
      );
    } catch (error) {
      alert(error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-full mb-4">
        <AddTransactionSheet/>
      </div>
      <Table className="w-[1050px]">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">ID</TableHead>
            <TableHead className="">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(({ id, status, totalPrice, quantity, userName }) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{id}</TableCell>
              <TableCell className="font-medium">{userName}</TableCell>
              <TableCell>
                <Select
                  value={status}
                  onValueChange={(val: any) => updateStatus(id, val)}
                  disabled={updatingId === id}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {updatingId === id && (
                  <Loader2 className="inline-block ml-2 animate-spin" size={16} />
                )}
              </TableCell>
              <TableCell>{quantity}</TableCell>
              <TableCell className="text-right">${totalPrice.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionPage;