import { StatistiqueListResponse } from '../../../data/models/reports';
import ReportApi from '../../../data/datasources/ReportApi';

export const getStatisticsUseCase = async (
  reportApi: ReportApi,
  params?: any
): Promise<StatistiqueListResponse> => {
  try {
    const response = await reportApi.getStatistics(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des statistiques :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};