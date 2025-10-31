import toast from "react-hot-toast";
import ReportApi from "../../../data/datasources/ReportApi";
import { TopProduit, PerformanceCategorie, DonneesGraphique, StatistiqueListResponse } from "../../../data/models/Reports";

export interface DashboardReportsData {
  statistics: StatistiqueListResponse;
  topProducts: TopProduit[];
  performanceByCategory: PerformanceCategorie[];
  chartData: DonneesGraphique;
}

export const getDashboardReportsUseCase = async (
  reportApi: ReportApi
): Promise<DashboardReportsData> => {
  try {
    const [statistics, topProducts, performanceByCategory, chartData] = await Promise.all([
      reportApi.getStatistics(),
      reportApi.getTopProducts(),
      reportApi.getPerformanceByCategory(),
      reportApi.getChartData({ metrique: 'chiffre_affaire', periode: '30j' })
    ]);

    return {
      statistics,
      topProducts,
      performanceByCategory,
      chartData
    };
  } catch (error: any) {
    console.error("Erreur lors de la récupération des données de reporting :", error);
    const message = error?.response?.data?.error || "Erreur lors du chargement des rapports";
    toast.error(message);
    throw error;
  }
};