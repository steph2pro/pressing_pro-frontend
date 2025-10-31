import toast from "react-hot-toast";
import TransactionApi from "../../../data/datasources/TransactionApi";
import { Solde, MouvementTresorerie, TransactionListResponse } from "../../../data/models/Transaction";

export interface DashboardData {
  solde: Solde;
  mouvements: MouvementTresorerie[];
  recentTransactions: TransactionListResponse;
}

export const getDashboardDataUseCase = async (
  transactionApi: TransactionApi
): Promise<DashboardData> => {
  try {
    const [solde, mouvements, recentTransactions] = await Promise.all([
      transactionApi.getBalance(),
      transactionApi.getMouvementsTresorerie(),
      transactionApi.getTransactions({ page: 1, limit: 5 })
    ]);

    return {
      solde,
      mouvements,
      recentTransactions
    };
  } catch (error: any) {
    console.error("Erreur lors de la récupération des données du dashboard :", error);
    const message = error?.response?.data?.error || "Erreur lors du chargement du dashboard";
    toast.error(message);
    throw error;
  }
};