import toast from "react-hot-toast";
import TransactionApi from "../../../data/datasources/TransactionApi";
import { TransactionSearchParams } from "../../../data/models/Transaction";

export interface TransactionStats {
  totalDepots: number;
  totalRetraits: number;
  totalEnAttente: number;
  totalValidees: number;
}

export const getTransactionStatsUseCase = async (
  params?: TransactionSearchParams,
  transactionApi?: TransactionApi
): Promise<TransactionStats> => {
  try {
    const transactions = await transactionApi.getTransactions(params);
    
    const stats = transactions.data.reduce((acc, transaction) => {
      if (transaction.type === 'depot') {
        acc.totalDepots += transaction.montant;
      } else {
        acc.totalRetraits += transaction.montant;
      }
      
      if (transaction.statut === 'pending') {
        acc.totalEnAttente += 1;
      } else if (transaction.statut === 'validated') {
        acc.totalValidees += 1;
      }
      
      return acc;
    }, {
      totalDepots: 0,
      totalRetraits: 0,
      totalEnAttente: 0,
      totalValidees: 0
    });

    return stats;
  } catch (error: any) {
    console.error("Erreur lors du calcul des statistiques :", error);
    const message = error?.response?.data?.error || "Erreur lors du calcul des statistiques";
    toast.error(message);
    throw error;
  }
};