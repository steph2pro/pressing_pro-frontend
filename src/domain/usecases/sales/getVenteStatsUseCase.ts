import { VenteStats } from '../../../data/models/sales';
import SalesApi from '../../../data/datasources/SalesApi';

export const getSalesStatsUseCase = async (
  salesApi: SalesApi,
  dateDebut?: Date,
  dateFin?: Date
): Promise<VenteStats> => {
  try {
    const stats = await salesApi.getSalesStats();
    return stats;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des statistiques :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};