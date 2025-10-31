import { Approvisionnement, CreateApprovisionnementRequest } from '../../../data/models/supplies';
import SupplyApi from '../../../data/datasources/SupplyApi';
import toast from 'react-hot-toast';

export const createSupplyUseCase = async (
  supplyData: CreateApprovisionnementRequest,
  supplyApi: SupplyApi
): Promise<Approvisionnement> => {
  try {
    const response = await supplyApi.createSupply(supplyData);
    toast.success('✅ Approvisionnement créé avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la création de l'approvisionnement :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};