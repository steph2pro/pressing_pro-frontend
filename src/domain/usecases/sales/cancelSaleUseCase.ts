import { Vente } from '../../../data/models/sales';
import SalesApi from '../../../data/datasources/SalesApi';
import toast from 'react-hot-toast';

export const cancelSaleUseCase = async (
  id: number,
  salesApi: SalesApi
): Promise<Vente> => {
  try {
    const response = await salesApi.cancelSale(id);
    toast.success('✅ Vente annulée avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de l'annulation de la vente :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};