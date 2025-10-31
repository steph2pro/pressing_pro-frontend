import { AnalyseMargeCible, AnalyseMargeRequest } from '../../../data/models/benefice';
import BeneficeApi from '../../../data/datasources/BeneficeApi';

export const analyzeMarginTargetUseCase = async (
  reportApi: BeneficeApi,
  params: AnalyseMargeRequest
): Promise<AnalyseMargeCible> => {
  try {
    const response = await reportApi.analyzeMarginTarget(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de l'analyse de marge cible :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};