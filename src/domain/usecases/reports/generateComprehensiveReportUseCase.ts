import toast from "react-hot-toast";
import ReportApi from "../../../data/datasources/ReportApi";
import { RapportRequest } from "../../../data/models/reports";

export interface ComprehensiveReportData {
  salesReport: any;
  financialReport: any;
  topProducts: any[];
  performanceByCategory: any[];
}

export const generateComprehensiveReportUseCase = async (
  params: RapportRequest,
  reportApi: ReportApi
): Promise<ComprehensiveReportData> => {
  try {
    const [salesReport, financialReport, topProducts, performanceByCategory] = await Promise.all([
      reportApi.generateSalesReport(params),
      reportApi.generateFinancialReport(params),
      reportApi.getTopProducts(),
      reportApi.getPerformanceByCategory()
    ]);

    toast.success("📋 Rapport complet généré avec succès !");
    return {
      salesReport,
      financialReport,
      topProducts,
      performanceByCategory
    };
  } catch (error: any) {
    console.error("Erreur lors de la génération du rapport complet :", error);
    const message = error?.response?.data?.error || "Erreur lors de la génération du rapport complet";
    toast.error(message);
    throw error;
  }
};