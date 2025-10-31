import { useQuery } from "@tanstack/react-query";
import TransactionApi from "../../../data/datasources/TransactionApi";
import { getBalanceUseCase } from "../../../domain/usecases/transactions/getBalanceUseCase";
import { Solde } from "../../../data/models/transactions";

const transactionApi = new TransactionApi();

export const useBalance = (options?: { refetchInterval?: number }) => {
  const query = useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalanceUseCase(transactionApi),
    staleTime: 1000 * 60 * 1, // 1 minute
    retry: 1,
    refetchInterval: options?.refetchInterval, // Optionnel: rafraîchissement automatique
  });

  return {
    balance: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};