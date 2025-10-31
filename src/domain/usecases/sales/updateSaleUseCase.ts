import { Vente, UpdateVenteRequest } from '../../../data/models/sales';
import SalesApi from '../../../data/datasources/SalesApi';
import toast from 'react-hot-toast';

export const updateSaleUseCase = async (
  id: number,
  venteData: UpdateVenteRequest,
  salesApi: SalesApi
): Promise<Vente> => {
  try {
    const response = await salesApi.updateSale(id, venteData);
    toast.success('✅ Vente modifiée avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la modification de la vente :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};