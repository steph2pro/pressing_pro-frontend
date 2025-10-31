import toast from "react-hot-toast";
import SupplyApi from "../../../data/datasources/SupplyApi";
import { Approvisionnement } from "../../../data/models";

export const cancelSupplyUseCase = async (
  id: number,
  supplyApi: SupplyApi
): Promise<Approvisionnement> => {
  try {
    if (!id || id <= 0) {
      throw new Error("ID d'approvisionnement invalide");
    }

    // Récupérer l'approvisionnement pour vérification
    const supply = await supplyApi.getSupplyById(id);
    
    // Vérifications préalables
    if (supply.statut === 'cancelled') {
      throw new Error("Cet approvisionnement est déjà annulé");
    }
    
    if (supply.statut === 'validated') {
      // Demander une confirmation supplémentaire pour un approvisionnement validé
      console.warn("⚠️ Annulation d'un approvisionnement déjà validé");
    }
    
    // Mettre à jour le statut
    const updatedSupply = await supplyApi.updateSupply(id, { statut: 'cancelled' });
    
    toast.success("❌ Approvisionnement annulé avec succès !");
    
    return updatedSupply;
  } catch (error: any) {
    console.error(`Erreur lors de l'annulation de l'approvisionnement #${id} :`, error);
    const message = error?.message || error?.response?.data?.error || "Erreur lors de l'annulation de l'approvisionnement";
    toast.error(message);
    throw error;
  }
};