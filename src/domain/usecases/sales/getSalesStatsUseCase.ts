import toast from "react-hot-toast";
import SalesApi from "../../../data/datasources/SalesApi";
import { VenteStats } from "../../../data/models";

export const getSalesStatsUseCase = async (
  salesApi: SalesApi
): Promise<VenteStats> => {
  try {
    return await salesApi.getSalesStats();
  } catch (error: any) {
    console.error("Erreur lors de la récupération des statistiques de vente :", error);
    const message = error?.response?.data?.error || "Erreur lors du chargement des statistiques";
    toast.error(message);
    throw error;
  }
};