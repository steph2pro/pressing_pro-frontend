import { SeuilRentabilite, AnalyseBeneficeRequest } from '../../../data/models/benefice';
import BeneficeApi from '../../../data/datasources/BeneficeApi';

export const calculateBreakEvenUseCase = async (
  reportApi: BeneficeApi,
  params: AnalyseBeneficeRequest
): Promise<SeuilRentabilite> => {
  try {
    const response = await reportApi.calculateBreakEven(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors du calcul du seuil de rentabilité :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};