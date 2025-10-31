import toast from "react-hot-toast";
import ProductApi from "../../../data/datasources/ProductApi";
import { Produit } from "../../../data/models";

export const toggleProductStatusUseCase = async (
  id: number,
  productApi: ProductApi
): Promise<Produit> => {
  try {
    if (!id || id <= 0) {
      throw new Error("ID de produit invalide");
    }

    // Récupérer le produit actuel
    const produitActuel = await productApi.getProductById(id);
    
    const nouveauStatut = produitActuel.statut === 'active' ? 'inactive' : 'active';
    
    const response = await productApi.updateProduct(id, { statut: nouveauStatut });
    
    const message = nouveauStatut === 'active' 
      ? "✅ Produit activé avec succès !" 
      : "⏸️ Produit désactivé avec succès !";
    
    toast.success(message);
    
    console.log(`🔄 Statut du produit #${id} changé`, {
      ancienStatut: produitActuel.statut,
      nouveauStatut,
      nom: produitActuel.nom
    });
    
    return response;
  } catch (error: any) {
    console.error(`Erreur lors du changement de statut du produit #${id} :`, error);
    const message = error?.message || error?.response?.data?.error || "Erreur lors du changement de statut";
    toast.error(message);
    throw error;
  }
};