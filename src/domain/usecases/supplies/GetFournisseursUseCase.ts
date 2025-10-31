import { Fournisseur } from '../../../data/models/supplies';
import SupplyApi from '../../../data/datasources/SupplyApi';

export const getFournisseursUseCase = async (
  supplyApi: SupplyApi
): Promise<Fournisseur[]> => {
  try {
    const fournisseurs = await supplyApi.getFournisseurs();
    return fournisseurs;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des fournisseurs :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};