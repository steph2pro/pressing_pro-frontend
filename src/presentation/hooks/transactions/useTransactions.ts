import { keepPreviousData, useQuery } from "@tanstack/react-query";
import TransactionApi from "../../../data/datasources/TransactionApi";
import { getTransactionsUseCase } from "../../../domain/usecases/transactions/getTransactionsUseCase";
import { Transaction, TransactionSearchParams } from "../../../data/models/transactions";
import { useState } from "react";

const transactionApi = new TransactionApi();

interface UseTransactionsParams extends TransactionSearchParams {
  enabled?: boolean;
}

export const useTransactions = (initialParams: UseTransactionsParams = {}) => {
  const [params, setParams] = useState<TransactionSearchParams>(initialParams);

  const query = useQuery({
    queryKey: ["transactions", params],
    queryFn: () => getTransactionsUseCase(transactionApi, params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2, // 2 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: initialParams.enabled !== false,
  });

  const updateParams = (newParams: Partial<TransactionSearchParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return {
    transactions: query.data?.data ?? [],
    total: query.data?.total ?? 0,
    page: query.data?.page ?? 1,
    limit: query.data?.limit ?? 10,
    pages: query.data?.pages ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    updateParams,
    params,
  };
};