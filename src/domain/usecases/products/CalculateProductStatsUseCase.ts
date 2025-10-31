import ProductApi from "../../../data/datasources/ProductApi";
import { ProduitSearchParams } from "../../../data/models";

export interface ProductStats {
  totalProduits: number;
  produitsActifs: number;
  produitsInactifs: number;
  totalValeurStock: number;
  produitsStockFaible: number;
  produitsStockCritique: number;
  moyennePrixVente: number;
  moyenneMarge: number;
  topCategories: Array<{
    categorieId: number;
    categorieNom: string;
    count: number;
    valeurStock: number;
  }>;
  produitsPlusRentables: Array<{
    produitId: number;
    produitNom: string;
    margeUnitaire: number;
    margeTotale: number;
  }>;
}

export const calculateProductStatsUseCase = async (
  params: ProduitSearchParams,
  productApi: ProductApi
): Promise<ProductStats> => {
  try {
    // Récupérer tous les produits (sans pagination)
    const allProducts = await productApi.getProducts({ ...params, limit: 1000 });
    
    const stats: ProductStats = {
      totalProduits: allProducts.total,
      produitsActifs: allProducts.data.filter(p => p.statut === 'active').length,
      produitsInactifs: allProducts.data.filter(p => p.statut === 'inactive').length,
      totalValeurStock: allProducts.data.reduce((sum, product) => sum + (product.quantite * product.prixAchat), 0),
      produitsStockFaible: allProducts.data.filter(p => p.quantite > 0 && p.quantite <= p.seuilAlerte && p.quantite > p.seuilAlerte * 0.5).length,
      produitsStockCritique: allProducts.data.filter(p => p.quantite > 0 && p.quantite <= p.seuilAlerte * 0.5).length,
      moyennePrixVente: 0,
      moyenneMarge: 0,
      topCategories: [],
      produitsPlusRentables: []
    };
    
    // Calculer les moyennes
    if (allProducts.data.length > 0) {
      stats.moyennePrixVente = allProducts.data.reduce((sum, product) => sum + product.prixVente, 0) / allProducts.data.length;
      
      const marges = allProducts.data.map(product => {
        const margeUnitaire = product.prixVente - product.prixAchat;
        return (margeUnitaire / product.prixAchat) * 100;
      });
      stats.moyenneMarge = marges.reduce((sum, marge) => sum + marge, 0) / marges.length;
    }
    
    // Calculer les top catégories
    const categoriesMap = new Map();
    allProducts.data.forEach(product => {
      const existing = categoriesMap.get(product.categorieId) || { 
        categorieNom: product.categorie?.nom || 'Inconnue', 
        count: 0, 
        valeurStock: 0 
      };
      categoriesMap.set(product.categorieId, {
        categorieNom: existing.categorieNom,
        count: existing.count + 1,
        valeurStock: existing.valeurStock + (product.quantite * product.prixAchat)
      });
    });
    
    stats.topCategories = Array.from(categoriesMap.entries())
      .map(([categorieId, data]) => ({ categorieId, ...data }))
      .sort((a, b) => b.valeurStock - a.valeurStock)
      .slice(0, 5);
    
    // Calculer les produits les plus rentables
    stats.produitsPlusRentables = allProducts.data
      .map(product => {
        const margeUnitaire = product.prixVente - product.prixAchat;
        const margeTotale = margeUnitaire * product.quantite;
        return {
          produitId: product.id,
          produitNom: product.nom,
          margeUnitaire,
          margeTotale
        };
      })
      .sort((a, b) => b.margeTotale - a.margeTotale)
      .slice(0, 5);
    
    console.log("📊 Statistiques des produits calculées", stats);
    
    return stats;
  } catch (error: any) {
    console.error("Erreur lors du calcul des statistiques des produits :", error);
    const message = error?.response?.data?.error || "Erreur lors du calcul des statistiques";
    throw new Error(message);
  }
};