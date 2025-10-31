import { Approvisionnement } from '../../../data/models/supplies';
import SupplyApi from '../../../data/datasources/SupplyApi';

export const getSupplyByIdUseCase = async (
  id: number,
  supplyApi: SupplyApi
): Promise<Approvisionnement> => {
  try {
    const supply = await supplyApi.getSupplyById(id);
    return supply;
  } catch (error: any) {
    console.error("Erreur lors de la récupération de l'approvisionnement :", error);
    const message = error?.response?.data?.error || "Approvisionnement non trouvé";
    throw new Error(message);
  }
};