import { Transaction, CreateTransactionRequest } from '../../../data/models/transactions';
import TransactionApi from '../../../data/datasources/TransactionApi';
import toast from 'react-hot-toast';

export const createTransactionUseCase = async (
  transactionData: CreateTransactionRequest,
  transactionApi: TransactionApi
): Promise<Transaction> => {
  try {
    const response = await transactionApi.createTransaction(transactionData);
    toast.success('✅ Transaction créée avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la création de la transaction :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};