import { Vente } from '../../../data/models/sales';
import SalesApi from '../../../data/datasources/SalesApi';

export const getSaleByIdUseCase = async (
  id: number,
  salesApi: SalesApi
): Promise<Vente> => {
  try {
    const vente = await salesApi.getSaleById(id);
    return vente;
  } catch (error: any) {
    console.error("Erreur lors de la récupération de la vente :", error);
    const message = error?.response?.data?.error || "Vente non trouvée";
    throw new Error(message);
  }
};