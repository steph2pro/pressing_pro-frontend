import { LigneApprovisionnement, AddLigneApprovisionnementRequest } from '../../../data/models/supplies';
import SupplyApi from '../../../data/datasources/SupplyApi';
import toast from 'react-hot-toast';

export const addSupplyLineUseCase = async (
  lineData: AddLigneApprovisionnementRequest,
  supplyApi: SupplyApi
): Promise<LigneApprovisionnement> => {
  try {
    const response = await supplyApi.addSupplyLine(lineData);
    toast.success('✅ Ligne ajoutée avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de l'ajout de la ligne :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};