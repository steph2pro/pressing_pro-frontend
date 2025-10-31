import { Vente, CreateVenteRequest } from '../../../data/models/sales';
import SalesApi from '../../../data/datasources/SalesApi';
import toast from 'react-hot-toast';

export const createSaleUseCase = async (
  venteData: CreateVenteRequest,
  salesApi: SalesApi
): Promise<Vente> => {
  try {
    const response = await salesApi.createSale(venteData);
    toast.success('✅ Vente créée avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la création de la vente :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};