import { Transaction } from '../../../data/models/transactions';
import TransactionApi from '../../../data/datasources/TransactionApi';

export const getTransactionByIdUseCase = async (
  id: number,
  transactionApi: TransactionApi
): Promise<Transaction> => {
  try {
    const transaction = await transactionApi.getTransactionById(id);
    return transaction;
  } catch (error: any) {
    console.error("Erreur lors de la récupération de la transaction :", error);
    const message = error?.response?.data?.error || "Transaction non trouvée";
    throw new Error(message);
  }
};