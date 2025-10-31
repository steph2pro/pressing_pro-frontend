import { ProduitRentable, AnalyseBeneficeRequest } from '../../../data/models/benefice';
import ReportApi from '../../../data/datasources/BeneficeApi';

export const getTopProfitableProductsUseCase = async (
  reportApi: ReportApi,
  params: AnalyseBeneficeRequest
): Promise<ProduitRentable[]> => {
  try {
    const response = await reportApi.getTopProfitableProducts(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des produits rentables :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};