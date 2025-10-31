import { Facture, CreateFactureRequest } from '../../../data/models/sales';
import SalesApi from '../../../data/datasources/SalesApi';
import toast from 'react-hot-toast';

export const createFactureUseCase = async (
  factureData: CreateFactureRequest,
  salesApi: SalesApi
): Promise<Facture> => {
  try {
    const response = await salesApi.createFacture(factureData);
    toast.success('✅ Facture créée avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la création de la facture :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};