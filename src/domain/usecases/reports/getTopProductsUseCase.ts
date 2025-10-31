import { TopProduit } from '../../../data/models/reports';
import ReportApi from '../../../data/datasources/ReportApi';

export const getTopProductsUseCase = async (
  reportApi: ReportApi
): Promise<TopProduit[]> => {
  try {
    const response = await reportApi.getTopProducts();
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des produits populaires :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};