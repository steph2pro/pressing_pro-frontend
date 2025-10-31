import toast from "react-hot-toast";
import ProductApi from "../../../data/datasources/ProductApi";
import { Produit } from "../../../data/models";

export const updateProductStockUseCase = async (
  id: number,
  nouvelleQuantite: number,
  motif: string,
  productApi: ProductApi
): Promise<Produit> => {
  try {
    if (!id || id <= 0) {
      throw new Error("ID de produit invalide");
    }

    if (nouvelleQuantite < 0) {
      throw new Error("La quantité ne peut pas être négative");
    }

    if (!motif || motif.trim() === '') {
      throw new Error("Le motif de modification du stock est obligatoire");
    }

    // Récupérer le produit actuel
    const produitActuel = await productApi.getProductById(id);
    
    const difference = nouvelleQuantite - produitActuel.quantite;
    const variation = difference > 0 ? "augmenté" : "diminué";

    const response = await productApi.updateProduct(id, { quantite: nouvelleQuantite });
    
    toast.success(
      `📦 Stock ${variation} de ${Math.abs(difference)} unité(s) - ${motif}`
    );

    console.log(`📦 Stock du produit #${id} mis à jour`, {
      ancienStock: produitActuel.quantite,
      nouveauStock: nouvelleQuantite,
      difference,
      motif
    });
    
    return response;
  } catch (error: any) {
    console.error(`Erreur lors de la mise à jour du stock du produit #${id} :`, error);
    const message = error?.message || error?.response?.data?.error || "Erreur lors de la mise à jour du stock";
    toast.error(message);
    throw error;
  }
};