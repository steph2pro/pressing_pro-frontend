import { TransactionListResponse, TransactionSearchParams } from '../../../data/models/transactions';
import TransactionApi from '../../../data/datasources/TransactionApi';

export const getTransactionsUseCase = async (
  transactionApi: TransactionApi,
  params?: TransactionSearchParams
): Promise<TransactionListResponse> => {
  try {
    const response = await transactionApi.getTransactions(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des transactions :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};