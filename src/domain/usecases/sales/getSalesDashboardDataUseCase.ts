import toast from "react-hot-toast";
import SalesApi from "../../../data/datasources/SalesApi";
import { VenteListResponse, FactureListResponse, VenteStats } from "../../../data/models";

export interface SalesDashboardData {
  recentSales: VenteListResponse;
  recentInvoices: FactureListResponse;
  stats: VenteStats;
}

export const getSalesDashboardDataUseCase = async (
  salesApi: SalesApi
): Promise<SalesDashboardData> => {
  try {
    const [recentSales, recentInvoices, stats] = await Promise.all([
      salesApi.getSales({ page: 1, limit: 5 }),
      salesApi.getInvoices({ page: 1, limit: 5 }),
      salesApi.getSalesStats()
    ]);

    return {
      recentSales,
      recentInvoices,
      stats
    };
  } catch (error: any) {
    console.error("Erreur lors de la récupération des données du dashboard ventes :", error);
    const message = error?.response?.data?.error || "Erreur lors du chargement du dashboard";
    toast.error(message);
    throw error;
  }
};