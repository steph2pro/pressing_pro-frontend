import { PerformanceCategorie } from '../../../data/models/reports';
import ReportApi from '../../../data/datasources/ReportApi';

export const getPerformanceByCategoryUseCase = async (
  reportApi: ReportApi
): Promise<PerformanceCategorie[]> => {
  try {
    const response = await reportApi.getPerformanceByCategory();
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des performances par catégorie :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};