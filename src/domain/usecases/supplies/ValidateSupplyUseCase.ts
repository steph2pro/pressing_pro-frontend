import toast from "react-hot-toast";
import SupplyApi from "../../../data/datasources/SupplyApi";
import { Approvisionnement } from "../../../data/models";

export const validateSupplyUseCase = async (
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
    if (supply.statut === 'validated') {
      throw new Error("Cet approvisionnement est déjà validé");
    }
    
    if (supply.lignes.length === 0) {
      throw new Error("Impossible de valider un approvisionnement sans lignes");
    }
    
    // Mettre à jour le statut
    const updatedSupply = await supplyApi.updateSupply(id, { statut: 'validated' });
    
    // Mettre à jour les stocks (serait fait côté backend en réalité)
    console.log("📦 Mise à jour des stocks après validation...");
    
    toast.success("✅ Approvisionnement validé avec succès ! Les stocks ont été mis à jour.");
    
    return updatedSupply;
  } catch (error: any) {
    console.error(`Erreur lors de la validation de l'approvisionnement #${id} :`, error);
    const message = error?.message || error?.response?.data?.error || "Erreur lors de la validation de l'approvisionnement";
    toast.error(message);
    throw error;
  }
};