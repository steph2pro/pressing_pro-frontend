import { useQuery } from "@tanstack/react-query";
import TransactionApi from "../../../data/datasources/TransactionApi";
import { getTransactionByIdUseCase } from "../../../domain/usecases/transactions/getTransactionByIdUseCase";
import { Transaction } from "../../../data/models/transactions";

const transactionApi = new TransactionApi();

export const useTransactionById = (id: number | null) => {
  const query = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => {
      if (!id) throw new Error("ID transaction requis");
      return getTransactionByIdUseCase(id, transactionApi);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });

  return {
    transaction: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};