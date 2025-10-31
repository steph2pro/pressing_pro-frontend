import ProductApi from "../../../data/datasources/ProductApi";
import { ProduitListResponse, ProduitSearchParams } from "../../../data/models";

export const getProductsUseCase = async (
  params: ProduitSearchParams,
  productApi: ProductApi
): Promise<ProduitListResponse> => {
  try {
    const response = await productApi.getProducts(params);
    
    // Log pour le débogage
    console.log(`📦 ${response.total} produit(s) trouvé(s)`, {
      page: response.page,
      totalPages: response.pages,
      filtres: params,
      stockFaible: response.data.filter(p => p.quantite <= p.seuilAlerte).length
    });
    
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des produits :", error);
    const message = error?.response?.data?.error || "Erreur lors du chargement des produits";
    throw new Error(message);
  }
};