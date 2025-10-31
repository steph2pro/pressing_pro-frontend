import { AnalyseBenefice, AnalyseBeneficeRequest } from '../../../data/models/benefice';
import ReportApi from '../../../data/datasources/BeneficeApi';

export const getProfitAnalysisUseCase = async (
  reportApi: ReportApi,
  params: AnalyseBeneficeRequest
): Promise<AnalyseBenefice> => {
  try {
    const response = await reportApi.getProfitAnalysis(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de l'analyse des bénéfices :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};