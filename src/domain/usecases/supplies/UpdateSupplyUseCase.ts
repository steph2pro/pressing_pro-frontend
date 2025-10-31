import { Approvisionnement, UpdateApprovisionnementRequest } from '../../../data/models/supplies';
import SupplyApi from '../../../data/datasources/SupplyApi';
import toast from 'react-hot-toast';

export const updateSupplyUseCase = async (
  id: number,
  supplyData: UpdateApprovisionnementRequest,
  supplyApi: SupplyApi
): Promise<Approvisionnement> => {
  try {
    const response = await supplyApi.updateSupply(id, supplyData);
    toast.success('✅ Approvisionnement modifié avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la modification de l'approvisionnement :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};