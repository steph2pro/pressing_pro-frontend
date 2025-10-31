import { useQuery } from "@tanstack/react-query";
import TransactionApi from "../../../data/datasources/TransactionApi";
import { getMouvementsTresorerieUseCase } from "../../../domain/usecases/transactions/getMouvementsTresorerieUseCase";
import { MouvementTresorerie } from "../../../data/models/transactions";

const transactionApi = new TransactionApi();

export const useMouvementsTresorerie = () => {
  const query = useQuery({
    queryKey: ["mouvements-tresorerie"],
    queryFn: () => getMouvementsTresorerieUseCase(transactionApi),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  return {
    mouvements: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};