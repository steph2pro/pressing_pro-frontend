import { useQuery } from "@tanstack/react-query";
import TransactionApi from "../../../data/datasources/TransactionApi";
import { getTransactionsUseCase } from "../../../domain/usecases/transactions/getTransactionsUseCase";
import { TransactionStatut } from "../../../data/models/transactions";

const transactionApi = new TransactionApi();

export const useTransactionStats = () => {
  const { data: transactionsData } = useQuery({
    queryKey: ["transactions", "all"],
    queryFn: () => getTransactionsUseCase(transactionApi, { limit: 1000 }),
    staleTime: 1000 * 60 * 5,
  });

  const transactions = transactionsData?.data ?? [];

  const stats = {
    total: transactions.length,
    pending: transactions.filter(t => t.statut === TransactionStatut.PENDING).length,
    validated: transactions.filter(t => t.statut === TransactionStatut.VALIDATED).length,
    cancelled: transactions.filter(t => t.statut === TransactionStatut.CANCELLED).length,
    totalDepots: transactions
      .filter(t => t.type === 'depot' && t.statut === TransactionStatut.VALIDATED)
      .reduce((sum, t) => sum + t.montant, 0),
    totalRetraits: transactions
      .filter(t => t.type === 'retrait' && t.statut === TransactionStatut.VALIDATED)
      .reduce((sum, t) => sum + t.montant, 0),
  };

  return {
    stats,
    isLoading: !transactionsData,
  };
};