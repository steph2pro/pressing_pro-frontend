import { FactureListResponse, FactureSearchParams } from '../../../data/models/sales';
import SalesApi from '../../../data/datasources/SalesApi';

export const getFacturesUseCase = async (
  salesApi: SalesApi,
  params?: FactureSearchParams
): Promise<FactureListResponse> => {
  try {
    const response = await salesApi.getFactures(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des factures :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};