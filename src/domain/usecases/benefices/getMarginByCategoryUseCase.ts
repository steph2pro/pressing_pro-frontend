import { MargeCategorie, AnalyseBeneficeRequest } from '../../../data/models/benefice';
import ReportApi from '../../../data/datasources/BeneficeApi';

export const getMarginByCategoryUseCase = async (
  reportApi: ReportApi,
  params: AnalyseBeneficeRequest
): Promise<MargeCategorie[]> => {
  try {
    const response = await reportApi.getMarginByCategory(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des marges par catégorie :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};