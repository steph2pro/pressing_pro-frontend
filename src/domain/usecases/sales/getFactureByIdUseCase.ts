import { Facture } from '../../../data/models/sales';
import SalesApi from '../../../data/datasources/SalesApi';

export const getFactureByIdUseCase = async (
  id: number,
  salesApi: SalesApi
): Promise<Facture> => {
  try {
    const facture = await salesApi.getFactureById(id);
    return facture;
  } catch (error: any) {
    console.error("Erreur lors de la récupération de la facture :", error);
    const message = error?.response?.data?.error || "Facture non trouvée";
    throw new Error(message);
  }
};