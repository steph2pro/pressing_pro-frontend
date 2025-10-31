import { Solde } from '../../../data/models/transactions';
import TransactionApi from '../../../data/datasources/TransactionApi';

export const getBalanceUseCase = async (
  transactionApi: TransactionApi
): Promise<Solde> => {
  try {
    const balance = await transactionApi.getBalance();
    return balance;
  } catch (error: any) {
    console.error("Erreur lors de la récupération du solde :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};