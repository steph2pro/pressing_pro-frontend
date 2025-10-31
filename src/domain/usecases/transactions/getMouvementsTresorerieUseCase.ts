import { MouvementTresorerie } from '../../../data/models/transactions';
import TransactionApi from '../../../data/datasources/TransactionApi';

export const getMouvementsTresorerieUseCase = async (
  transactionApi: TransactionApi
): Promise<MouvementTresorerie[]> => {
  try {
    const mouvements = await transactionApi.getMouvementsTresorerie();
    return mouvements;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des mouvements de trésorerie :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};