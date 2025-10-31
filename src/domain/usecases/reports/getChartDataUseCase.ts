import { GraphiqueRequest, DonneesGraphique } from '../../../data/models/reports';
import ReportApi from '../../../data/datasources/ReportApi';

export const getChartDataUseCase = async (
  params: GraphiqueRequest,
  reportApi: ReportApi
): Promise<DonneesGraphique> => {
  try {
    const response = await reportApi.getChartData(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des données graphiques :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};