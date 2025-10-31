import SupplyApi from '../../../data/datasources/SupplyApi';
import toast from 'react-hot-toast';

export const deleteSupplyUseCase = async (
  id: number,
  supplyApi: SupplyApi
): Promise<void> => {
  try {
    await supplyApi.deleteSupply(id);
    toast.success('✅ Approvisionnement supprimé avec succès !');
  } catch (error: any) {
    console.error("Erreur lors de la suppression de l'approvisionnement :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};