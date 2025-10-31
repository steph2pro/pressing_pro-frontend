import { ApprovisionnementListResponse, ApprovisionnementSearchParams } from '../../../data/models/supplies';
import SupplyApi from '../../../data/datasources/SupplyApi';

export const getSuppliesUseCase = async (
  supplyApi: SupplyApi,
  params?: ApprovisionnementSearchParams
): Promise<ApprovisionnementListResponse> => {
  try {
    const response = await supplyApi.getSupplies(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des approvisionnements :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};