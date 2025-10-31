import { VenteListResponse, VenteSearchParams } from '../../../data/models/sales';
import SalesApi from '../../../data/datasources/SalesApi';

export const getSalesUseCase = async (
  salesApi: SalesApi,
  params?: VenteSearchParams
): Promise<VenteListResponse> => {
  try {
    const response = await salesApi.getSales(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des ventes :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};